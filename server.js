import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const publicUploadsDir = path.join(__dirname, 'public', 'uploads');
const distUploadsDir = path.join(distPath, 'uploads');
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(dataDir, 'uploads');
const sigsFile = path.join(dataDir, 'signatories.json');
const cmsFile = path.join(dataDir, 'cms-data.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const DEFAULT_SIGNATORIES = [
  {
    id: 'org-43',
    name: 'Antalya Sanatçılar Derneği',
    organization: 'Antalya Sanatçılar Derneği',
    city: 'Antalya',
    date: '2026-10-16',
    type: 'institutional',
    emailVerified: true
  },
  {
    id: 'org-44',
    name: 'Yeşil Artvin Derneği',
    organization: 'Yeşil Artvin Derneği',
    city: 'Artvin',
    date: '2026-10-16',
    type: 'institutional',
    emailVerified: true
  },
  {
    id: 'org-45',
    name: 'Derelerin Kardeşliği Platformu (DEKAP)',
    organization: 'Derelerin Kardeşliği Platformu (DEKAP)',
    city: 'Artvin-Rize-Trabzon-Giresun-Ordu-Samsun',
    message:
      'Yaşamsal varlığımız su, alınıp satılan, kendşne efendi arayan bir kaynak değil, tüm canlı/cansız yaşamın var olduğu ekosistemin en temel hakkıdır. Hiçbir canlı suyaberişim hakkının diğerlerinden öncelikli olduğunu ileri süremez/iddia edemez...',
    date: '2026-10-17',
    type: 'institutional',
    emailVerified: true
  },
  {
    id: 'sig-1792174998011',
    name: 'Necdet Demirci',
    organization: 'Mimar',
    city: 'Balıkesir',
    date: '2026-10-16',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792215319920',
    name: 'İlkay Nişancı',
    organization: 'Akademisyen',
    city: 'İstanbul',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792220661845',
    name: 'Ali Yalçın Göymen',
    organization: 'Akademisyen',
    city: 'Berlin',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792221951238',
    name: 'Ömer Şan',
    organization: 'Gazeteci /Yazar',
    city: 'Ankara',
    message:
      "Hedef, 'İklim krizine uyum' değil; 'iklim krizine/değişikliğine neden olan müdahalelerin durdurulması' olmalıdır!",
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792223802693',
    name: 'Mert Yedek',
    organization: 'Avukat',
    city: 'Eskişehir',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792225429862',
    name: 'İlkay Öz',
    organization: 'Siyaset Bilimci',
    city: 'İstanbul',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792225793366',
    name: 'Sercan Dede',
    city: 'Ankara',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792227068065',
    name: 'Önder İşleyen',
    city: 'Ankara',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  }
];

function getSignatoryKey(sig) {
  if (!sig) return '';
  const isInst =
    sig.type === 'institutional' ||
    Boolean(sig.organization && sig.organization === sig.name);
  if (isInst) {
    return `inst:${String(sig.organization || sig.name || '').trim().toLowerCase()}`;
  }
  return `ind:${String(sig.name || '').trim().toLowerCase()}|${String(sig.city || '').trim().toLowerCase()}`;
}

function getRemovedSignatorySet(cmsData) {
  const cms = cmsData || readRawCmsFromDisk();
  return new Set(
    (cms.removedSignatoryIds || []).map((id) => String(id).trim().toLowerCase())
  );
}

function isSignatoryRemoved(sig, removedSet) {
  if (!sig) return true;
  const idKey = String(sig.id || '').trim().toLowerCase();
  const nameKey = String(sig.organization || sig.name || '').trim().toLowerCase();
  const sigKey = getSignatoryKey(sig);
  return removedSet.has(idKey) || removedSet.has(nameKey) || removedSet.has(sigKey);
}

function deduplicateSignatories(list, removedSet = new Set()) {
  const map = new Map();
  for (const sig of list) {
    if (!sig || (!sig.name && !sig.organization)) continue;
    if (isSignatoryRemoved(sig, removedSet)) continue;
    const key = getSignatoryKey(sig);
    if (!key) continue;
    const prev = map.get(key);
    if (!prev) {
      map.set(key, sig);
    } else {
      map.set(key, {
        ...prev,
        ...sig,
        id: prev.id || sig.id,
        city: sig.city || prev.city,
        message: sig.message || prev.message,
        organization: sig.organization || prev.organization
      });
    }
  }
  return Array.from(map.values());
}

function readExtraSignatories(cmsData) {
  const removedSet = getRemovedSignatorySet(cmsData);
  let diskList = [];
  try {
    if (fs.existsSync(sigsFile)) {
      const parsed = JSON.parse(fs.readFileSync(sigsFile, 'utf-8'));
      if (Array.isArray(parsed)) {
        diskList = parsed;
      }
    }
  } catch (err) {
    console.error('Error reading signatories:', err);
  }
  return deduplicateSignatories([...DEFAULT_SIGNATORIES, ...diskList], removedSet);
}

function writeExtraSignatories(list, cmsData) {
  try {
    const removedSet = getRemovedSignatorySet(cmsData);
    const current = readExtraSignatories(cmsData);
    const merged = deduplicateSignatories([...current, ...(Array.isArray(list) ? list : [])], removedSet);
    fs.writeFileSync(sigsFile, JSON.stringify(merged, null, 2), 'utf-8');
    return merged;
  } catch (err) {
    console.error('Error writing signatories:', err);
    return readExtraSignatories(cmsData);
  }
}

function saveExtraSignatory(sig) {
  const current = readExtraSignatories();
  return writeExtraSignatories([...current, sig]);
}

const DEFAULT_CMS = {
  forums: [],
  workingGroups: [],
  declarations: [],
  policies: [
    {
      id: 'pol-1792169995327',
      slug: 'pol-1792169995327',
      title: 'İklim Adaleti Forumu Program Örgütlenme ve Strateji Belgesi',
      excerpt:
        'Bu programın temel sorusu şudur: İklim krizi karşısında dönüşüm kimin için, kim tarafından, hangi haklar gözetilerek ve hangi bedeller kimlere yüklenerek kurulacaktır?',
      content: [
        'Bu programın temel sorusu şudur: İklim krizi karşısında dönüşüm kimin için, kim tarafından, hangi haklar gözetilerek ve hangi bedeller kimlere yüklenerek kurulacaktır?'
      ],
      category: 'Politika & Program',
      date: 'Haziran 2026',
      author: 'İklim Adaleti Forumu',
      authorRole: 'Politika / Program',
      readTimeMinutes: 10,
      tags: ['Politika / Program'],
      pdfUrl: '/uploads/1792170006227-_AF_PROGRAM_BELGES__docx.pdf'
    }
  ],
  events: [
    {
      id: 'ev-1792164191275',
      title: 'Samsun İklim Adaleti Forumu',
      date: '17.10.2026',
      time: '13:00',
      location: 'Elektrik Mühendisleri Odası (EMO) Samsun Şubesi',
      type: 'Forum',
      description:
        'YERELLERİN SÖZÜ COP31’DE BULUŞUYOR! İKLİM ADALETİ FORUMU\n\nOcak 2026’da Antalya Barosu tarafından başlatılan İklim Adaleti Forumu süreci, COP31’e hazırlık kapsamında Türkiye’nin dört bir yanında yerellerin katılımıyla İklim Adaleti Forumları büyümeye devam ediyor.\n\nAkbelen’den Karadeniz’e, Trakya\'dan, Akdeniz’e, Doğuya; köylerden kentlere, yaşam alanlarını savunanların mücadelesi ortak bir zeminde buluşuyor. Antalya Barosu, İstanbul Barosu ve Türkiye Barolar Birliği’nin de desteğiyle yürütülen bu süreçte, yerellerin yıllardır sürdürdüğü mücadelelerin, deneyimlerin ve taleplerin Kasım ayında Antalya’da gerçekleştirilecek üç günlük programa taşınmasına hazırlanılıyor.\n\nKaradeniz hattında iki ayrı İklim Adaleti Forumu gerçekleştirilmesi planlandı. Bunlardan ilki yaklaşık iki ay önce Rize’de oldu. Trabzon, Artvin ve Rize’nin yerelleri, STK\'lar, yaşam savunucularıyla geniş katılımlı, verimli bir forum gerçekleştirildi.\n\nSamsun\'daki forumda Sinop, Amasya, Ordu ve Giresun gibi yakın havzaların yerelleri, toprakları için mücadele eden köylüleri, emekçileri bir araya getirmeyi hedefleniyor. 17 Ekim Cumartesi Samsun Elektrik Mühendisleri Odasından, COP31’e doğru itiraz sesleri birleşiyor.\n\nSamsun’daki forumda buluşalım.\n\n📅 Tarih: 17 Ekim 2026 Cumartesi\n🕒 Saat: 13.00\n📍 Yer: Elektrik Mühendisleri Odası (EMO) Samsun Şubesi',
      imageUrl: '/uploads/1792164176567-samsuforum.png'
    },
    {
      id: 'ev-1792162131784',
      title: 'Eskişehir İklim Adaleti Forumu',
      date: '17.10.2026',
      time: '14:00',
      location: 'Taşbaşı Kültür Merkezi - Kırmızı Salon, Eskişehir',
      type: 'Forum',
      description:
        'Doğanın ve Yaşam Haklarımızın Yanındayız\n\nİklim krizi sadece derecelerin yükselmesinden ibaret değil, aşırı hava olayları, biyoçeşitlilik kaybı, gıda ve su krizi ile doğrudan yaşam hakkımızı tehdit eden toplumsal ve hukuki bir adalet meselesidir.\n\nKrizin etkilerini en derin hisseden toplulukların, yaşam alanlarının ve ekosistemlerin sesini yükseltmek, doğayı ve geleceğimizi hukuki ve ekolojik bir mücadele hattında savunmak için bir araya geliyoruz.\n\nEskişehir Ekoloji Derneği bünyesinde gerçekleştireceğimiz İklim Adaleti Forumu’nda, iklim krizine karşı hukuki haklarımızı, ekolojik mücadele yöntemlerini ve adil bir geleceğin nasıl inşa edileceğini konuşacağız.\n\nKonuşmacılarımız Avukat Onat Ötnü ve Avukat Mert Yedek’in katılımıyla gerçekleşecek bu önemli buluşmaya tüm yurttaşlarımızı bekliyoruz.\n\n📅 Tarih: 17 Ekim 2026\n🕑 Saat: 14.00\n📍 Yer: Taşbaşı Kültür Merkezi - Kırmızı Salon',
      imageUrl: '/uploads/1792162144088-eski_ehir_17_10_2026.png'
    },
    {
      id: 'ev-1792163395400',
      title: 'Uşak İklim Adaleti Forumu',
      date: '20.10.2026',
      time: '16:00',
      location: 'Atatürk Kültür Merkezi, 2 Nolu Salonu - Uşak',
      type: 'Forum',
      description:
        'İklim Krizine Karşı Ekolojik ve Sosyal Adalet İçin Uşak’ta Buluşuyoruz\n\nİklim krizi, yalnızca çevresel bir felaket değil, sermaye odaklı büyüme politikalarının, doğa talanının ve sosyo-ekonomik derin eşitsizliklerin ürettiği sistemik bir hak ve adalet krizidir.\n\nKrize en az katkıda bulunan yerel toplulukların, tarım üreticilerinin, kadınların, çocukların ve gelecek kuşakların krizin en ağır yükünü taşımak zorunda bırakılması kabul edilemez. Kuraklık, su varlıklarının ticarileştirilmesi, maden ve sanayi baskısıyla tahrif edilen yaşam alanlarımız, doğanın ve yurttaşların en temel yaşam haklarını tehdit etmektedir.\n\nTam da bu nedenle, doğanın metalaştırılmasına karşı ekosistem haklarını, iklim krizinin getirdiği yıkımlara karşı ise halkların, emeğin ve gelecek nesillerin iklim adaletini savunmak için bir araya geliyoruz.\n\nUşak Barosu ev sahipliğinde düzenleyeceğimiz İklim Adaleti Forumu’nda, ekolojik yıkımın hukuki boyutlarını, hak ihlallerini, yerel mücadele tecrübelerini ve adil bir geçişin imkanlarını hep birlikte tartışacağız.\n\nDoğanın, suyun, toprağın ve yaşamın hakkını, hukukun ve toplumsal dayanışmanın gücüyle savunmak isteyen tüm yurttaşlarımızı sesimize güç vermeye davet ediyoruz.\n\n🗓️ 20 Ekim 2026 Salı\n⏱️ 16.00\n🧭 Atatürk Kültür Merkezi, 2 Nolu Salonu - Uşak',
      imageUrl: '/uploads/1792163368686-u_ak_20_10_2026.png'
    },
    {
      id: 'ev-1792161567412',
      title: 'Döşemealtı İklim Adaleti Forumu',
      date: '25.10.2026',
      time: '13:00',
      location: 'Yeşilpark Kültür Merkezi Tiyatro Salonu (Yeşilbayır / Döşemealtı - ANTALYA)',
      type: 'Forum',
      description:
        'Rant projelerine ve ekolojik yıkıma karşı yaşam alanlarımızı, emeğimizi ve doğayı savunmak için buluşuyoruz. İklim adaleti mücadelemizi konuşmak ve ortak sözümüzü büyütmek üzere tüm halkımızı Döşemealtı İklim Adaleti Forumu’na çağırıyoruz.\n\n📆 25 Ekim 2026 Pazar | ⏰ 13.00\n📍 Yeşilpark Kültür Merkezi Tiyatro Salonu (Yeşilbayır / Döşemealtı)',
      imageUrl: '/uploads/1792161526273-d__emealt__forum.jpeg'
    },
    {
      id: 'ev-1792164859279',
      title: 'Fethiye 2. İklim Adaleti Forumu',
      date: '31.10.2026',
      time: '14:00 - 16:00',
      location: 'Kitaphane - Fethiye',
      type: 'Forum',
      description:
        'Mayıs ayında gerçekleştirdiğimiz tanışma ve bilgilendirme toplantısında, iklim krizine karşı yerelden yükselen, katılımcı ve demokratik bir mücadeleyi birlikte kurmak için bir araya gelmiştik. Kıyılarımızı, koylarımızı, ormanlarımızı, tarım alanlarımızı ve ortak yaşamımızı tehdit eden politikalar karşısında başlattığımız tartışmayı büyütmek üzere yeniden buluşuyoruz.\n\nİklim Adaleti Forumu\'nun "Zamanımızı, yaşamımızı, geleceğimizi istiyoruz!" çağrısını Fethiye\'den birlikte karşılamak; 15-17 Kasım\'da Antalya\'da gerçekleşecek buluşmaya yerel mücadelelerimizin sözünü ve taleplerini taşımak istiyoruz. Bu toplantıda iklim adaleti mücadelesinde ortak adımlarımızı, Antalya buluşmasına katılımı ve dayanışma olanaklarımızı birlikte konuşacağız.\n\nYaşamımız ve geleceğimiz üzerinde söz, karar ve denetim hakkımızı savunmak için tüm yurttaşları, emek ve meslek örgütlerini, ekoloji hareketlerini, gençleri, üreticileri ve yaşam savunucularını toplantımıza davet ediyoruz.\n\n📍 KİTAPHANE - FETHİYE | 📅 31 EKİM 2026 CUMARTESİ | 🕒 14.00 - 16:00',
      imageUrl: '/uploads/1792164708020-fethiye_2_bulu_ma.jpeg'
    }
  ],
  removedSignatoryIds: [],
  deletedItemKeys: [],
  customAdminPass: null,
  users: []
};

function readRawCmsFromDisk() {
  try {
    if (fs.existsSync(cmsFile)) {
      return JSON.parse(fs.readFileSync(cmsFile, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading raw CMS file:', err);
  }
  return {};
}

function parseEventDateForSort(dateStr, timeStr) {
  if (!dateStr) return Number.MAX_SAFE_INTEGER;
  const clean = String(dateStr).trim();
  const dmy = clean.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
  if (dmy) {
    const [hh = 0, mm = 0] = String(timeStr || '').split(/[:.]/).map(Number);
    return new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]), hh || 0, mm || 0).getTime();
  }
  const ymd = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (ymd) {
    const [hh = 0, mm = 0] = String(timeStr || '').split(/[:.]/).map(Number);
    return new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]), hh || 0, mm || 0).getTime();
  }
  const parsed = Date.parse(clean);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

function mergeCollectionByKey(defaults, currentList, incomingList, isDeletedFn, keyAttr = 'title') {
  const map = new Map();
  const allItems = [
    ...(Array.isArray(defaults) ? defaults : []),
    ...(Array.isArray(currentList) ? currentList : []),
    ...(Array.isArray(incomingList) ? incomingList : [])
  ];
  for (const item of allItems) {
    if (!item || isDeletedFn(item)) continue;
    const idKey = String(item.id || '').trim().toLowerCase();
    const titleKey = String(item[keyAttr] || item.title || item.name || '').trim().toLowerCase();
    // Find if an entry already exists by ID or by title/name
    let existingMapKey = null;
    for (const [k, v] of map.entries()) {
      const vId = String(v.id || '').trim().toLowerCase();
      const vTitle = String(v[keyAttr] || v.title || v.name || '').trim().toLowerCase();
      if ((idKey && vId === idKey) || (titleKey && vTitle === titleKey)) {
        existingMapKey = k;
        break;
      }
    }
    const targetKey = existingMapKey || idKey || titleKey;
    if (!targetKey) continue;
    map.set(targetKey, { ...(map.get(targetKey) || {}), ...item });
  }
  return Array.from(map.values());
}

function normalizeBaseId(idStr) {
  return String(idStr || '')
    .trim()
    .toLowerCase()
    .replace(/^(ev-|forum-)/, '');
}

function normalizeAndSyncCms(rawCms) {
  const deletedKeys = new Set(
    (rawCms.deletedItemKeys || []).map((k) => String(k).trim().toLowerCase())
  );
  const removedSigIds = Array.from(
    new Set((rawCms.removedSignatoryIds || []).map((k) => String(k).trim()))
  );

  const isDeleted = (item) => {
    if (!item) return true;
    const idStr = String(item.id || '').trim().toLowerCase();
    const baseId = normalizeBaseId(idStr);
    const titleStr = String(item.title || item.name || '').trim().toLowerCase();
    if (!titleStr) return true;
    return (
      deletedKeys.has(idStr) ||
      (baseId && deletedKeys.has(`ev-${baseId}`)) ||
      (baseId && deletedKeys.has(`forum-${baseId}`)) ||
      deletedKeys.has(titleStr)
    );
  };

  // 1. Collect and sync all Events (from DEFAULT_CMS.events + rawCms.events + rawCms.forums)
  const eventMap = new Map();
  const upsertEvent = (ev) => {
    if (isDeleted(ev)) return;
    const baseId = normalizeBaseId(ev.id);
    const titleKey = String(ev.title || '').trim().toLowerCase();
    let matchedKey = null;
    for (const [k, v] of eventMap.entries()) {
      if ((baseId && normalizeBaseId(v.id) === baseId) || String(v.title || '').trim().toLowerCase() === titleKey) {
        matchedKey = k;
        break;
      }
    }
    const targetKey = matchedKey || baseId || titleKey;
    eventMap.set(targetKey, { ...(eventMap.get(targetKey) || {}), ...ev });
  };

  for (const ev of DEFAULT_CMS.events) upsertEvent(ev);
  for (const ev of rawCms.events || []) upsertEvent(ev);

  for (const f of rawCms.forums || []) {
    if (isDeleted(f)) continue;
    const baseId = normalizeBaseId(f.id);
    const titleKey = String(f.title || '').trim().toLowerCase();
    let exists = false;
    for (const v of eventMap.values()) {
      if ((baseId && normalizeBaseId(v.id) === baseId) || String(v.title || '').trim().toLowerCase() === titleKey) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      const fullText = Array.isArray(f.content)
        ? f.content.join('\n\n')
        : String(f.content || f.excerpt || '');
      upsertEvent({
        id: String(f.id || `ev-${Date.now()}`).replace(/^forum-/, 'ev-'),
        title: f.title,
        date: f.date || '',
        time: '',
        location: f.author && f.author !== 'İklim Adaleti Forumu' ? f.author : 'Türkiye',
        type: f.category || 'Forum',
        description: fullText,
        imageUrl: f.imageUrl,
        videoUrl: f.videoUrl,
        pdfUrl: f.pdfUrl
      });
    }
  }

  const syncedEvents = Array.from(eventMap.values()).sort(
    (a, b) => parseEventDateForSort(a.date, a.time) - parseEventDateForSort(b.date, b.time)
  );

  // 2. Collect and sync all Forums (from rawCms.forums + syncedEvents)
  const forumMap = new Map();
  const upsertForum = (f) => {
    if (isDeleted(f)) return;
    const baseId = normalizeBaseId(f.id);
    const titleKey = String(f.title || '').trim().toLowerCase();
    let matchedKey = null;
    for (const [k, v] of forumMap.entries()) {
      if ((baseId && normalizeBaseId(v.id) === baseId) || String(v.title || '').trim().toLowerCase() === titleKey) {
        matchedKey = k;
        break;
      }
    }
    const targetKey = matchedKey || baseId || titleKey;
    forumMap.set(targetKey, { ...(forumMap.get(targetKey) || {}), ...f });
  };

  for (const f of rawCms.forums || []) upsertForum(f);

  for (const ev of syncedEvents) {
    const paragraphs = String(ev.description || ev.title).split(/\n\s*\n/);
    upsertForum({
      id: String(ev.id || `forum-${Date.now()}`).replace(/^ev-/, 'forum-'),
      slug: String(ev.id || `forum-${Date.now()}`).replace(/^ev-/, 'forum-'),
      title: ev.title,
      excerpt: paragraphs.slice(0, 2).join('\n\n') || ev.title,
      content: paragraphs,
      category: ev.type || 'Forum',
      date: ev.date,
      author: ev.location || 'İklim Adaleti Forumu',
      authorRole: 'İklim Adaleti Forumu',
      readTimeMinutes: 3,
      tags: [ev.type || 'Forum'],
      imageUrl: ev.imageUrl,
      videoUrl: ev.videoUrl,
      pdfUrl: ev.pdfUrl
    });
  }

  const syncedForums = Array.from(forumMap.values()).sort(
    (a, b) => parseEventDateForSort(a.date, '') - parseEventDateForSort(b.date, '')
  );

  // 3. Merge workingGroups, declarations, policies additively with DEFAULT_CMS
  const syncedWorkingGroups = mergeCollectionByKey(
    DEFAULT_CMS.workingGroups,
    rawCms.workingGroups,
    [],
    isDeleted,
    'name'
  );
  const syncedDeclarations = mergeCollectionByKey(
    DEFAULT_CMS.declarations,
    rawCms.declarations,
    [],
    isDeleted,
    'title'
  );
  const syncedPolicies = mergeCollectionByKey(
    DEFAULT_CMS.policies,
    rawCms.policies,
    [],
    isDeleted,
    'title'
  );

  return {
    ...DEFAULT_CMS,
    ...rawCms,
    events: syncedEvents,
    forums: syncedForums,
    workingGroups: syncedWorkingGroups,
    declarations: syncedDeclarations,
    policies: syncedPolicies,
    removedSignatoryIds: removedSigIds,
    deletedItemKeys: Array.from(deletedKeys)
  };
}

function readCmsData() {
  try {
    if (fs.existsSync(cmsFile)) {
      const parsed = JSON.parse(fs.readFileSync(cmsFile, 'utf-8'));
      return normalizeAndSyncCms({ ...DEFAULT_CMS, ...parsed });
    }
  } catch (err) {
    console.error('Error reading CMS data:', err);
  }
  return normalizeAndSyncCms({ ...DEFAULT_CMS });
}

function writeCmsData(data) {
  try {
    const current = readCmsData();
    const nextDeleted = new Set([
      ...(current.deletedItemKeys || []),
      ...(data.deletedItemKeys || [])
    ]);
    const nextRemovedSigs = Array.from(
      new Set([
        ...(current.removedSignatoryIds || []),
        ...(data.removedSignatoryIds || [])
      ])
    );

    const isDeleted = (item) => {
      if (!item) return true;
      const idStr = String(item.id || '').trim().toLowerCase();
      const baseId = normalizeBaseId(idStr);
      const titleStr = String(item.title || item.name || '').trim().toLowerCase();
      return (
        nextDeleted.has(idStr) ||
        (baseId && nextDeleted.has(`ev-${baseId}`)) ||
        (baseId && nextDeleted.has(`forum-${baseId}`)) ||
        nextDeleted.has(titleStr)
      );
    };

    // Additive merge + in-place update across ALL collections so saving one section NEVER breaks another
    const mergedForums = Array.isArray(data.forums)
      ? mergeCollectionByKey(DEFAULT_CMS.forums, current.forums, data.forums, isDeleted, 'title')
      : current.forums;
    const mergedEvents = Array.isArray(data.events)
      ? mergeCollectionByKey(DEFAULT_CMS.events, current.events, data.events, isDeleted, 'title')
      : current.events;
    const mergedGroups = Array.isArray(data.workingGroups)
      ? mergeCollectionByKey(DEFAULT_CMS.workingGroups, current.workingGroups, data.workingGroups, isDeleted, 'name')
      : current.workingGroups;
    const mergedDeclarations = Array.isArray(data.declarations)
      ? mergeCollectionByKey(DEFAULT_CMS.declarations, current.declarations, data.declarations, isDeleted, 'title')
      : current.declarations;
    const mergedPolicies = Array.isArray(data.policies)
      ? mergeCollectionByKey(DEFAULT_CMS.policies, current.policies, data.policies, isDeleted, 'title')
      : current.policies;

    const merged = normalizeAndSyncCms({
      ...current,
      ...data,
      forums: mergedForums,
      events: mergedEvents,
      workingGroups: mergedGroups,
      declarations: mergedDeclarations,
      policies: mergedPolicies,
      removedSignatoryIds: nextRemovedSigs,
      deletedItemKeys: Array.from(nextDeleted)
    });
    fs.writeFileSync(cmsFile, JSON.stringify(merged, null, 2), 'utf-8');
    return merged;
  } catch (err) {
    console.error('Error writing CMS data:', err);
    return readCmsData();
  }
}

function safeCompare(a, b) {
  const bufA = Buffer.from(String(a || ''), 'utf-8');
  const bufB = Buffer.from(String(b || ''), 'utf-8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(url) {
  if (!url) return undefined;
  const clean = String(url).trim();
  if (
    clean.startsWith('/uploads/') ||
    clean.startsWith('https://') ||
    clean.startsWith('http://')
  ) {
    return clean;
  }
  return undefined;
}

// In-memory rate limiter for brute-force & spam protection
const rateBuckets = new Map();
function checkRateLimit(req, bucketName, maxRequests, windowMs) {
  const ip =
    String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
      .split(',')[0]
      .trim();
  const key = `${bucketName}:${ip}`;
  const now = Date.now();
  const entry = rateBuckets.get(key);
  if (!entry || now > entry.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

function getMasterPassword() {
  const cms = readCmsData();
  return cms.customAdminPass || process.env.ADMIN_PASS || 'iklim2026';
}

function verifyCredentials(username, password) {
  if (!password) return null;
  const cms = readCmsData();
  const masterPass = getMasterPassword();
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = String(password);

  if (
    (!cleanUser || cleanUser === 'admin' || cleanUser === 'yonetici') &&
    safeCompare(cleanPass, masterPass)
  ) {
    return { username: 'admin', name: 'Ana Yönetici', role: 'admin' };
  }

  const users = Array.isArray(cms.users) ? cms.users : [];
  const matched = users.find(
    (u) =>
      u.username &&
      u.username.trim().toLowerCase() === cleanUser &&
      safeCompare(String(u.password), cleanPass)
  );
  if (matched) {
    return { username: matched.username, name: matched.name || matched.username, role: 'editor' };
  }

  if (!cleanUser) {
    const matchedByPass = users.find((u) => safeCompare(String(u.password), cleanPass));
    if (matchedByPass) {
      return {
        username: matchedByPass.username,
        name: matchedByPass.name || matchedByPass.username,
        role: 'editor'
      };
    }
  }

  return null;
}

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'application/pdf'
]);

const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.mp4',
  '.webm',
  '.pdf'
]);

function createServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '75mb' }));

  // Global HTTP Security Headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });

  // Serve uploaded photos, videos, and PDFs from runtime data/uploads, public/uploads, and dist/uploads
  app.use(
    '/uploads',
    (_req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; object-src 'self'; frame-ancestors 'self'; img-src 'self' data:; media-src 'self'; style-src 'unsafe-inline'"
      );
      next();
    },
    express.static(uploadsDir),
    express.static(publicUploadsDir),
    express.static(distUploadsDir)
  );

  // 1. Public endpoint: get all CMS dynamic content + extra signatories
  app.get('/api/cms', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const cms = readCmsData();
    res.json({
      forums: cms.forums || [],
      workingGroups: cms.workingGroups || [],
      declarations: cms.declarations || [],
      policies: cms.policies || [],
      events: cms.events || [],
      removedSignatoryIds: cms.removedSignatoryIds || [],
      signatories: readExtraSignatories(cms)
    });
  });

  // 2. Get verified extra signatories saved on the server
  app.get('/api/signatories', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const cms = readCmsData();
    res.json({
      signatories: readExtraSignatories(cms),
      removedSignatoryIds: cms.removedSignatoryIds || []
    });
  });

  // 3. Save a newly verified signatory on the server
  app.post('/api/signatories', (req, res) => {
    if (!checkRateLimit(req, 'signatories', 10, 15 * 60 * 1000)) {
      return res.status(429).json({ error: 'Çok fazla istek gönderildi. Lütfen biraz bekleyin.' });
    }
    const { name, organization, city, message, type } = req.body || {};
    if (!name || !city) {
      return res.status(400).json({ error: 'Eksik bilgi' });
    }
    const cleanName = String(name).replace(/[<>]/g, '').trim().slice(0, 150);
    const cleanOrg = organization
      ? String(organization).replace(/[<>]/g, '').trim().slice(0, 150)
      : undefined;
    const cleanCity = String(city).replace(/[<>]/g, '').trim().slice(0, 80);
    const cleanMsg = message
      ? String(message).replace(/[<>]/g, '').trim().slice(0, 500)
      : undefined;

    if (!cleanName || !cleanCity) {
      return res.status(400).json({ error: 'Geçersiz bilgi' });
    }

    const newSig = {
      id: `sig-${Date.now()}`,
      name: cleanName,
      organization: cleanOrg,
      city: cleanCity,
      message: cleanMsg,
      date: new Date().toISOString().split('T')[0],
      type: type === 'individual' ? 'individual' : cleanOrg ? 'institutional' : 'individual',
      emailVerified: true
    };
    const updated = saveExtraSignatory(newSig);
    res.json({ ok: true, signatory: newSig, signatories: updated });
  });

  // 4. Admin / Editor login check
  app.post('/api/admin/login', (req, res) => {
    if (!checkRateLimit(req, 'admin-login', 12, 15 * 60 * 1000)) {
      return res.status(429).json({
        error: 'Çok fazla başarısız giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.'
      });
    }
    const { username, password } = req.body || {};
    const user = verifyCredentials(username, password);
    if (!user) {
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı.' });
    }
    const cms = readCmsData();
    const safeUsers = (cms.users || []).map((u) => ({
      id: u.id,
      username: u.username,
      name: u.name,
      role: u.role || 'editor'
    }));
    res.json({ ok: true, user, users: safeUsers });
  });

  // 5. Upload photo, video, or PDF file from Admin Panel (strictly whitelisted)
  app.post('/api/admin/upload', (req, res) => {
    if (!checkRateLimit(req, 'admin-upload', 30, 15 * 60 * 1000)) {
      return res.status(429).json({ error: 'Çok fazla yükleme isteği.' });
    }
    const { username, password, filename, dataUrl } = req.body || {};
    const authUser = verifyCredentials(username, password);
    if (!authUser) {
      return res.status(401).json({ error: 'Yetkisiz işlem.' });
    }
    if (!dataUrl || !filename) {
      return res.status(400).json({ error: 'Dosya verisi eksik.' });
    }
    try {
      const matches = String(dataUrl).match(/^data:([^;]+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: 'Geçersiz dosya formatı.' });
      }
      const mimeType = matches[1].toLowerCase().trim();
      const ext = path.extname(String(filename)).toLowerCase();
      if (!ALLOWED_MIME_TYPES.has(mimeType) || !ALLOWED_EXTENSIONS.has(ext)) {
        return res.status(400).json({
          error: 'Yalnızca fotoğraf (JPG, PNG, WEBP), video (MP4, WEBM) ve PDF yüklenebilir.'
        });
      }
      const buffer = Buffer.from(matches[2], 'base64');
      if (buffer.length > 50 * 1024 * 1024) {
        return res.status(400).json({ error: 'Dosya boyutu 50 MB sınırını aşıyor.' });
      }
      const baseSafe = path
        .basename(String(filename), path.extname(String(filename)))
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 60);
      const storedName = `${Date.now()}-${baseSafe || 'medya'}${ext}`;
      const filePath = path.join(uploadsDir, storedName);
      fs.writeFileSync(filePath, buffer);
      return res.json({ ok: true, url: `/uploads/${storedName}` });
    } catch (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Dosya yüklenemedi.' });
    }
  });

  // 6. Admin save CMS content
  app.post('/api/admin/save', (req, res) => {
    if (!checkRateLimit(req, 'admin-save', 40, 15 * 60 * 1000)) {
      return res.status(429).json({ error: 'Çok fazla kayıt isteği.' });
    }
    const {
      username,
      password,
      forums,
      workingGroups,
      declarations,
      policies,
      events,
      signatories,
      removedSignatoryIds,
      newAdminPass,
      newUser,
      deleteUserId,
      deleteItemKey
    } = req.body || {};

    const authUser = verifyCredentials(username, password);
    if (!authUser) {
      return res.status(401).json({ error: 'Yetkisiz işlem: Şifre hatalı.' });
    }

    const currentCms = readCmsData();
    const updates = {};
    if (Array.isArray(forums)) {
      updates.forums = forums.map((f) => ({
        ...f,
        imageUrl: sanitizeUrl(f.imageUrl),
        videoUrl: sanitizeUrl(f.videoUrl),
        pdfUrl: sanitizeUrl(f.pdfUrl)
      }));
    }
    if (Array.isArray(workingGroups)) {
      updates.workingGroups = workingGroups.map((g) => ({
        ...g,
        imageUrl: sanitizeUrl(g.imageUrl),
        videoUrl: sanitizeUrl(g.videoUrl),
        pdfUrl: sanitizeUrl(g.pdfUrl)
      }));
    }
    if (Array.isArray(declarations)) {
      updates.declarations = declarations.map((d) => ({
        ...d,
        imageUrl: sanitizeUrl(d.imageUrl),
        videoUrl: sanitizeUrl(d.videoUrl),
        pdfUrl: sanitizeUrl(d.pdfUrl)
      }));
    }
    if (Array.isArray(policies)) {
      updates.policies = policies.map((p) => ({
        ...p,
        imageUrl: sanitizeUrl(p.imageUrl),
        videoUrl: sanitizeUrl(p.videoUrl),
        pdfUrl: sanitizeUrl(p.pdfUrl)
      }));
    }
    if (Array.isArray(events)) {
      updates.events = events.map((ev) => ({
        ...ev,
        imageUrl: sanitizeUrl(ev.imageUrl),
        videoUrl: sanitizeUrl(ev.videoUrl),
        pdfUrl: sanitizeUrl(ev.pdfUrl)
      }));
    }
    if (Array.isArray(removedSignatoryIds)) {
      updates.removedSignatoryIds = removedSignatoryIds;
    }
    if (deleteItemKey) {
      const keysToAdd = Array.isArray(deleteItemKey) ? deleteItemKey : [deleteItemKey];
      updates.deletedItemKeys = [
        ...(currentCms.deletedItemKeys || []),
        ...keysToAdd.map((k) => String(k))
      ];
    }

    // Only master admin can change master password or manage users
    if (authUser.role === 'admin') {
      if (newAdminPass && String(newAdminPass).trim().length >= 4) {
        updates.customAdminPass = String(newAdminPass).trim();
      }

      let currentUsers = Array.isArray(currentCms.users) ? [...currentCms.users] : [];
      if (newUser && newUser.username && newUser.password) {
        const exists = currentUsers.some(
          (u) => u.username.toLowerCase() === String(newUser.username).trim().toLowerCase()
        );
        if (!exists) {
          currentUsers.push({
            id: `usr-${Date.now()}`,
            username: String(newUser.username).trim().slice(0, 50),
            name: String(newUser.name || newUser.username).trim().slice(0, 80),
            password: String(newUser.password).trim(),
            role: 'editor'
          });
        }
        updates.users = currentUsers;
      }

      if (deleteUserId) {
        currentUsers = currentUsers.filter((u) => u.id !== deleteUserId);
        updates.users = currentUsers;
      }
    }

    const savedCms = writeCmsData(updates);
    const savedSigs = Array.isArray(signatories)
      ? writeExtraSignatories(signatories, savedCms)
      : readExtraSignatories(savedCms);

    const safeUsers = (savedCms.users || []).map((u) => ({
      id: u.id,
      username: u.username,
      name: u.name,
      role: u.role || 'editor'
    }));

    res.json({
      ok: true,
      forums: savedCms.forums,
      workingGroups: savedCms.workingGroups,
      declarations: savedCms.declarations,
      policies: savedCms.policies,
      events: savedCms.events,
      removedSignatoryIds: savedCms.removedSignatoryIds,
      signatories: savedSigs,
      users: safeUsers
    });
  });

  // 7. Send 6-digit verification code via Gmail / SMTP
  app.post('/api/send-verification-code', async (req, res) => {
    if (!checkRateLimit(req, 'send-otp', 8, 15 * 60 * 1000)) {
      return res
        .status(429)
        .json({ error: 'Çok fazla kod isteği gönderildi. Lütfen birkaç dakika bekleyin.' });
    }
    const { email, name, organization, code } = req.body || {};
    const cleanEmail = String(email || '').trim();
    const cleanCode = String(code || '').trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!cleanEmail || cleanEmail.length > 120 || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Geçerli bir e-posta adresi giriniz.' });
    }
    if (!/^\d{6}$/.test(cleanCode)) {
      return res.status(400).json({ error: 'Geçersiz doğrulama kodu formatı.' });
    }

    const candidateUsers = process.env.SMTP_USER
      ? [process.env.SMTP_USER, 'iklimadaleti2026@gmail.com', 'eminbaris33@gmail.com']
      : ['iklimadaleti2026@gmail.com', 'eminbaris33@gmail.com'];
    const uniqueUsers = [...new Set(candidateUsers)];
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    if (!smtpPass) {
      return res.json({ ok: true, previewCode: cleanCode });
    }

    const safeName = escapeHtml(String(name || '').slice(0, 120));
    const safeOrg = escapeHtml(String(organization || '').slice(0, 150));
    const signerTitle = safeOrg ? `${safeOrg} (${safeName})` : safeName;
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
          <span style="font-family: monospace; font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #0B4F71;">${cleanCode}</span>
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
          to: cleanEmail,
          subject: `İklim Adaleti Forumu - İmza Onay Kodunuz: ${cleanCode}`,
          html: htmlBody
        });

        return res.json({ ok: true, sent: true });
      } catch (err) {
        lastErr = err;
      }
    }

    console.error('SMTP error:', lastErr);
    return res.status(500).json({ error: 'E-posta gönderilemedi' });
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
