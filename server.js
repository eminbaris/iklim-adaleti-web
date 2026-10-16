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

function saveExtraSignatory(sig) {
  try {
    const current = readExtraSignatories();
    current.push(sig);
    fs.writeFileSync(sigsFile, JSON.stringify(current, null, 2), 'utf-8');
    return current;
  } catch (err) {
    console.error('Error saving signatory:', err);
    return [];
  }
}

function createServer() {
  const app = express();
  app.use(express.json());

  // 1. Get verified extra signatories saved on the server
  app.get('/api/signatories', (_req, res) => {
    res.json({ signatories: readExtraSignatories() });
  });

  // 2. Save a newly verified signatory on the server
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

  // 3. Send 6-digit verification code via Gmail / SMTP
  app.post('/api/send-verification-code', async (req, res) => {
    const { email, name, organization, code } = req.body || {};
    if (!email || !code) {
      return res.status(400).json({ error: 'E-posta ve kod gereklidir.' });
    }

    const smtpUser = process.env.SMTP_USER || 'eminbaris33@gmail.com';
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    if (!smtpPass) {
      // If SMTP_PASS is not set yet in Coolify Environment Variables, fallback to preview code
      return res.json({ ok: true, previewCode: code });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const signerTitle = organization ? `${organization} (${name})` : name;

      await transporter.sendMail({
        from: `"İklim Adaleti Forumu" <${smtpUser}>`,
        to: email,
        subject: `İklim Adaleti Forumu - İmza Onay Kodunuz: ${code}`,
        html: `
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
        `
      });

      return res.json({ ok: true, sent: true });
    } catch (err) {
      console.error('SMTP error:', err);
      return res.status(500).json({ error: 'E-posta gönderilemedi', previewCode: code });
    }
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
