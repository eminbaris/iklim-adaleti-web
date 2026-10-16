import express from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const dataDir = path.join(__dirname, 'data');
const sigsFile = path.join(dataDir, 'signatories.json');
const cmsFile = path.join(dataDir, 'cms-data.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readExtraSignatories() {
  try {
    if (fs.existsSync(sigsFile)) {
      return JSON.parse(fs.readFileSync(sigsFile, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading signatories:', err);
  }
  return [];
}

function writeExtraSignatories(list) {
  try {
    fs.writeFileSync(sigsFile, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing signatories:', err);
  }
}

function saveExtraSignatory(sig) {
  const current = readExtraSignatories();
  current.push(sig);
  writeExtraSignatories(current);
  return current;
}

const DEFAULT_CMS = {
  forums: [],
  workingGroups: [],
  declarations: [],
  events: [],
  removedSignatoryIds: [],
  customAdminPass: null
};

function readCmsData() {
  try {
    if (fs.existsSync(cmsFile)) {
      const parsed = JSON.parse(fs.readFileSync(cmsFile, 'utf-8'));
      return { ...DEFAULT_CMS, ...parsed };
    }
  } catch (err) {
    console.error('Error reading CMS data:', err);
  }
  return { ...DEFAULT_CMS };
}

function writeCmsData(data) {
  try {
    const current = readCmsData();
    const merged = { ...current, ...data };
    fs.writeFileSync(cmsFile, JSON.stringify(merged, null, 2), 'utf-8');
    return merged;
  } catch (err) {
    console.error('Error writing CMS data:', err);
    return readCmsData();
  }
}

function getAdminPassword() {
  const cms = readCmsData();
  return cms.customAdminPass || process.env.ADMIN_PASS || 'iklim2026';
}

function createServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // 1. Public endpoint: get all CMS dynamic content + extra signatories
  app.get('/api/cms', (_req, res) => {
    const cms = readCmsData();
    res.json({
      forums: cms.forums || [],
      workingGroups: cms.workingGroups || [],
      declarations: cms.declarations || [],
      events: cms.events || [],
      removedSignatoryIds: cms.removedSignatoryIds || [],
      signatories: readExtraSignatories()
    });
  });

  // 2. Get verified extra signatories saved on the server
  app.get('/api/signatories', (_req, res) => {
    const cms = readCmsData();
    res.json({
      signatories: readExtraSignatories(),
      removedSignatoryIds: cms.removedSignatoryIds || []
    });
  });

  // 3. Save a newly verified signatory on the server
  app.post('/api/signatories', (req, res) => {
    const { name, organization, city, message, type } = req.body || {};
    if (!name || !city) {
      return res.status(400).json({ error: 'Eksik bilgi' });
    }
    const newSig = {
      id: `sig-${Date.now()}`,
      name: String(name).trim(),
      organization: organization ? String(organization).trim() : undefined,
      city: String(city).trim(),
      message: message ? String(message).trim() : undefined,
      date: new Date().toISOString().split('T')[0],
      type: type || (organization ? 'institutional' : 'individual'),
      emailVerified: true
    };
    const updated = saveExtraSignatory(newSig);
    res.json({ ok: true, signatory: newSig, signatories: updated });
  });

  // 4. Admin login check
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body || {};
    if (!password || String(password) !== getAdminPassword()) {
      return res.status(401).json({ error: 'Yönetici şifresi hatalı.' });
    }
    res.json({ ok: true });
  });

  // 5. Admin save CMS content (forums, workingGroups, declarations, events, signatories, password)
  app.post('/api/admin/save', (req, res) => {
    const { password, forums, workingGroups, declarations, events, signatories, removedSignatoryIds, newAdminPass } =
      req.body || {};

    if (!password || String(password) !== getAdminPassword()) {
      return res.status(401).json({ error: 'Yetkisiz işlem: Yönetici şifresi hatalı.' });
    }

    const updates = {};
    if (Array.isArray(forums)) updates.forums = forums;
    if (Array.isArray(workingGroups)) updates.workingGroups = workingGroups;
    if (Array.isArray(declarations)) updates.declarations = declarations;
    if (Array.isArray(events)) updates.events = events;
    if (Array.isArray(removedSignatoryIds)) updates.removedSignatoryIds = removedSignatoryIds;
    if (newAdminPass && String(newAdminPass).trim().length >= 4) {
      updates.customAdminPass = String(newAdminPass).trim();
    }

    const savedCms = writeCmsData(updates);
    if (Array.isArray(signatories)) {
      writeExtraSignatories(signatories);
    }

    res.json({
      ok: true,
      forums: savedCms.forums,
      workingGroups: savedCms.workingGroups,
      declarations: savedCms.declarations,
      events: savedCms.events,
      removedSignatoryIds: savedCms.removedSignatoryIds,
      signatories: readExtraSignatories()
    });
  });

  // 6. Send 6-digit verification code via Gmail / SMTP
  app.post('/api/send-verification-code', async (req, res) => {
    const { email, name, organization, code } = req.body || {};
    if (!email || !code) {
      return res.status(400).json({ error: 'E-posta ve kod gereklidir.' });
    }

    const candidateUsers = process.env.SMTP_USER
      ? [process.env.SMTP_USER, 'iklimadaleti2026@gmail.com', 'eminbaris33@gmail.com']
      : ['iklimadaleti2026@gmail.com', 'eminbaris33@gmail.com'];
    const uniqueUsers = [...new Set(candidateUsers)];
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    if (!smtpPass) {
      return res.json({ ok: true, previewCode: code });
    }

    const signerTitle = organization ? `${organization} (${name})` : name;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #fbf9f5;">
        <h2 style="color: #0B4F71; margin-top: 0;">COP31'e Doğru İklim Adaleti Forumu</h2>
        <p style="color: #292524; font-size: 15px; line-height: 1.6;">
          Merhaba <strong>${signerTitle || ''}</strong>,
        </p>
        <p style="color: #44403c; font-size: 14px; line-height: 1.6;">
          İklim Adaleti Forumu Çağrı Metni'ni imzalamak için tek kullanımlık 6 haneli e-posta doğrulama kodunuz aşağıdadır:
        </p>
        <div style="margin: 24px 0; padding: 16px; background-color: #ffffff; border: 2px solid #0B4F71; border-radius: 10px; text-align: center;">
          <span style="font-family: monospace; font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #0B4F71;">${code}</span>
        </div>
        <p style="color: #78716c; font-size: 12px; line-height: 1.5;">
          Bu kodu web sayfasındaki doğrulama ekranına girerek imzanızı tamamlayabilirsiniz.<br/>
          iklimadaleti.org
        </p>
      </div>
    `;

    let lastErr = null;
    for (const smtpUser of uniqueUsers) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: `"İklim Adaleti Forumu" <${smtpUser}>`,
          replyTo: 'iklimadaleti2026@gmail.com',
          to: email,
          subject: `İklim Adaleti Forumu - İmza Onay Kodunuz: ${code}`,
          html: htmlBody
        });

        return res.json({ ok: true, sent: true });
      } catch (err) {
        lastErr = err;
      }
    }

    console.error('SMTP error:', lastErr);
    return res.status(500).json({ error: 'E-posta gönderilemedi', previewCode: code });
  });

  app.use(express.static(distPath));
  app.use((_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  return app;
}

const port = Number(process.env.PORT) || 3000;
createServer().listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

if (port !== 80) {
  createServer()
    .listen(80, '0.0.0.0', () => {
      console.log('Server also listening on http://0.0.0.0:80');
    })
    .on('error', () => {
      // Ignore if port 80 is privileged
    });
}
