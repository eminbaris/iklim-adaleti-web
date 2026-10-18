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
    "id": "org-43",
    "name": "ANSAN Antalya Sanatçılar Derneği",
    "organization": "ANSAN Antalya Sanatçılar Derneği",
    "city": "Antalya",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-44",
    "name": "Yeşil Artvin Derneği",
    "organization": "Yeşil Artvin Derneği",
    "city": "Artvin",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-45",
    "name": "Derelerin Kardeşliği Platformu (DEKAP)",
    "organization": "Derelerin Kardeşliği Platformu (DEKAP)",
    "city": "Artvin-Rize-Trabzon-Giresun-Ordu-Samsun",
    "message": "Yaşamsal varlığımız su, alınıp satılan, kendşne efendi arayan bir kaynak değil, tüm canlı/cansız yaşamın var olduğu ekosistemin en temel hakkıdır. Hiçbir canlı suyaberişim hakkının diğerlerinden öncelikli olduğunu ileri süremez/iddia edemez...",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792174998011",
    "name": "Necdet Demirci",
    "organization": "Mimar",
    "city": "Balıkesir",
    "date": "2026-10-16",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792215319920",
    "name": "İlkay Nişancı",
    "organization": "Akademisyen",
    "city": "İstanbul",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792220661845",
    "name": "Ali Yalçın Göymen",
    "organization": "Akademisyen",
    "city": "Berlin",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792221951238",
    "name": "Ömer Şan",
    "organization": "Gazeteci /Yazar",
    "city": "Ankara",
    "message": "Hedef, 'İklim krizine uyum' değil; 'iklim krizine/değişikliğine neden olan müdahalelerin durdurulması' olmalıdır!",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792223802693",
    "name": "Mert Yedek",
    "organization": "Avukat",
    "city": "Eskişehir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792225429862",
    "name": "İlkay Öz",
    "organization": "Siyaset Bilimci",
    "city": "İstanbul",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792225793366",
    "name": "Sercan Dede",
    "city": "Ankara",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792227068065",
    "name": "Önder İşleyen",
    "city": "Ankara",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792231166730",
    "name": "Varto Ekoloji Platformu",
    "organization": "Varto Ekoloji Platformu",
    "city": "Muş Varto",
    "message": "İmzalıyorum çünkü;\nBizler Varto Ekoloji Platformu çatısı altında, toprağına, merasına ve suyuna sahip çıkan üretici kadınlarız. Coğrafyamızda doğamızı ve yaşam alanlarımızı hedef alan talana karşı bir yıla yakındır kurduğumuz Direniş Çadırı'nda gece gündüz nöbetteyiz. O çadır sadece bir nöbet yeri değil; toprağını, merasını ve suyunu rant projelerine teslim etmeyenlerin ortak iradesi ve direniş kalemizdir.\nİklim krizini ve doğa tahribatını en çok hisseden biz üretici kadınlar; Varto'nun yaylalar",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792231606688",
    "name": "Ebru delice",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792231766729",
    "name": "Sol Feminist Hareketi",
    "organization": "Sol Feminist Hareketi",
    "city": "Türkiye",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792231766961",
    "name": "Kaş Çevre Platformu",
    "organization": "Kaş Çevre Platformu",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792231767180",
    "name": "Kumluca Pir Sultan Abdal Derneği",
    "organization": "Kumluca Pir Sultan Abdal Derneği",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-49",
    "name": "Çiftçiler Sendikası (Çiftçi-Sen)",
    "organization": "Çiftçiler Sendikası (Çiftçi-Sen)",
    "city": "",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-50",
    "name": "Validebağ Gönüllüleri Derneği",
    "organization": "Validebağ Gönüllüleri Derneği",
    "city": "",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-51",
    "name": "Vaminon (Arhavi Maden İstemiyor)",
    "organization": "Vaminon (Arhavi Maden İstemiyor)",
    "city": "",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-52",
    "name": "Fethiye Kent Konseyi",
    "organization": "Fethiye Kent Konseyi",
    "city": "",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792232026160",
    "name": "Tacim Çiçek",
    "city": "İzmir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792232436607",
    "name": "Serdar Aktaş",
    "organization": "İşçi",
    "city": "Denizli",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "org-53",
    "name": "Toroçder",
    "organization": "Toroçder",
    "city": "",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-54",
    "name": "İzmir Varto Ekoloji",
    "organization": "İzmir Varto Ekoloji",
    "city": "İzmir",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-55",
    "name": "Validebağ Savunması",
    "organization": "Validebağ Savunması",
    "city": "İstanbul",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-rec-asli-odman",
    "name": "Aslı Odman",
    "organization": "Akademisyen",
    "city": "İstanbul",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-ziya-gokerkucuk",
    "name": "Ziya Gökerküçük",
    "organization": "Eğitimci",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-nur-nese-karahan",
    "name": "Nur Neşe Karahan",
    "organization": "Emekli",
    "city": "Artvin",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-sefa-taskin",
    "name": "Sefa Taşkın",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-adnan-alin",
    "name": "Adnan Alin",
    "organization": "Eğitimci - Sendika Emekçisi",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-veli-bingoltekin",
    "name": "Veli Bingöltekin",
    "organization": "Araştırmacı / Yazar",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-baris-keskinkilic",
    "name": "Barış Keskinkılıç",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-ali-merdan-celik",
    "name": "Ali Merdan Çelik",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-yusuf-aksoy",
    "name": "Yusuf Aksoy",
    "organization": "Yazar",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-yuksel-kunter",
    "name": "Yüksel Kunter",
    "organization": "Emekli",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-rec-hidayet-karakus",
    "name": "Hidayet Karakuş",
    "organization": "Emekli",
    "city": "",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792237242014",
    "name": "Orhun Çoban",
    "organization": "Emekli/Gazeteci",
    "city": "Denizli",
    "message": "Birlikte kazanacağız...",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792238544395",
    "name": "Edremit Sol Parti İlçe Başkanı",
    "organization": "Edremit Sol Parti İlçe Başkanı",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792238883174",
    "name": "Mehmet KAÇMAZ",
    "organization": "Emekli/Eğitimci",
    "city": "Balıkesir",
    "message": "Sonuçlarına katlanmamak için sö ve karar sahibi olmak istiyorum. Okul öncesinden başlayarak, tüm öğrencilere ücretsiz  bir öğün sağlıklı yemek ve temiz su verilmesi konusunda yetkililerin bağlayıcı karar alması zorlanmalıdır.",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792239216677",
    "name": "Güven Subaşı",
    "organization": "avukat",
    "city": "Bandırma",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792240554713",
    "name": "Özlem BAHÇECİ",
    "organization": "İşçi",
    "city": "Eskişehir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792240658490",
    "name": "Uğur Kurnaz",
    "organization": "İşçi",
    "city": "Denizli",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792240707621",
    "name": "Özgür Erhun",
    "organization": "Avukat",
    "city": "Eskişehir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792241132610",
    "name": "Tülin Koç",
    "organization": "Emekli Öğretmen",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792241315496",
    "name": "Yücelay Sal",
    "organization": "Hukukçu/ Edebiyatçı",
    "city": "İzmir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792241441677",
    "name": "Ezgican Erhun",
    "organization": "Gazeteci",
    "city": "Eskişehir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792245096193",
    "name": "Akhisar Çevre Derneği",
    "organization": "Akhisar Çevre Derneği",
    "city": "AKHİSAR-MANİSA",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792248490763",
    "name": "Nezih Yağar",
    "organization": "emekli",
    "city": "antalya",
    "message": "sermayenin zehrinin sonuçlarını çekmek istemiyoruz",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792248768499",
    "name": "Merve Avcı",
    "organization": "Avukat",
    "city": "İstanbul",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792249092242",
    "name": "Sedat Gül",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792251973360",
    "name": "Nuran Kamalı Şahin",
    "organization": "Emekli",
    "city": "Balıkesir",
    "message": "Emperyalist talana karşı iklim adalet formunu destekliyorum",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792252055323",
    "name": "İrfan Akkaya",
    "organization": "Eskişehir Gıda Topluluğu",
    "city": "Eskişehir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792252689953",
    "name": "Yalçın Ünal",
    "organization": "Avukat",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792252720745",
    "name": "Rıza kurt",
    "organization": "Emekli",
    "city": "İstanbul",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792252723621",
    "name": "Mehmet Ali Sönmez",
    "organization": "Enekli",
    "city": "Balikesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792253109581",
    "name": "Hayrettin uluman",
    "organization": "Emekli gazeteci, yazar",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792253333311",
    "name": "Şenol Yıldırım",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792245323818",
    "name": "Mustafa Sen",
    "organization": "İnşaat Mühendisi",
    "city": "Manisa",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792245417268",
    "name": "Azîz  karabelli",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792245911417",
    "name": "Fuat Ercan",
    "organization": "Akademisyen",
    "city": "İstanbul",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "org-1",
    "name": "Öğrenci Veli Derneği (Velider)",
    "organization": "Öğrenci Veli Derneği (Velider)",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-2",
    "name": "Tüm Emeklilerin Sendikası",
    "organization": "Tüm Emeklilerin Sendikası",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-3",
    "name": "Salda Gölü Koruma Derneği",
    "organization": "Salda Gölü Koruma Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-4",
    "name": "Uşak Ulubey Doğal Üretim ve Dayanışma Derneği (ÇEDAY)",
    "organization": "Uşak Ulubey Doğal Üretim ve Dayanışma Derneği (ÇEDAY)",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-5",
    "name": "Gerede Çayı Temiz Aksın Platformu",
    "organization": "Gerede Çayı Temiz Aksın Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-6",
    "name": "Derelerin Kardeşliği Akdeniz Platformu",
    "organization": "Derelerin Kardeşliği Akdeniz Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-7",
    "name": "İkizdere Dernekler Federasyonu",
    "organization": "İkizdere Dernekler Federasyonu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-8",
    "name": "Uluslararası Çevre Gazetecileri Derneği",
    "organization": "Uluslararası Çevre Gazetecileri Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-9",
    "name": "Şavşat Dernekleri Federasyonu",
    "organization": "Şavşat Dernekleri Federasyonu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-10",
    "name": "İstanbul Şavşat Derneği",
    "organization": "İstanbul Şavşat Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-11",
    "name": "Samsun Çevre Platformu (Samçep)",
    "organization": "Samsun Çevre Platformu (Samçep)",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-12",
    "name": "Samandağ Ekoloji Grubu",
    "organization": "Samandağ Ekoloji Grubu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-13",
    "name": "Antakya Çevre Koruma Derneği",
    "organization": "Antakya Çevre Koruma Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-14",
    "name": "İstanbul Kent Çevre Doğa ve Canlı Hakları Derneği",
    "organization": "İstanbul Kent Çevre Doğa ve Canlı Hakları Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-15",
    "name": "Sivas Zara Çaylıca Köyü Derneği",
    "organization": "Sivas Zara Çaylıca Köyü Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-16",
    "name": "Köyceğiz Çevre ve Doğa Koruma Derneği",
    "organization": "Köyceğiz Çevre ve Doğa Koruma Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-17",
    "name": "Kemaliye ve Köyleri Çevre Platformu",
    "organization": "Kemaliye ve Köyleri Çevre Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-18",
    "name": "Denizli Avdan Platformu",
    "organization": "Denizli Avdan Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-19",
    "name": "Acıbadem Sakinleri Dayanışması",
    "organization": "Acıbadem Sakinleri Dayanışması",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-20",
    "name": "Gümüşhacıköy Çevre Platformu",
    "organization": "Gümüşhacıköy Çevre Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-21",
    "name": "Saros Gönüllüleri",
    "organization": "Saros Gönüllüleri",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-22",
    "name": "Araklı Karadere Vadisi Yaylaları Doğayı ve Yaban Hayatını Koruma Derneği",
    "organization": "Araklı Karadere Vadisi Yaylaları Doğayı ve Yaban Hayatını Koruma Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-23",
    "name": "Fethiye Ekolojik Yaşam Derneği",
    "organization": "Fethiye Ekolojik Yaşam Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-24",
    "name": "Antalya Kadın Danışma Merkezi ve Dayanışma Derneği",
    "organization": "Antalya Kadın Danışma Merkezi ve Dayanışma Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-25",
    "name": "İnsanca Felsefe Sanat ve Bilim Çevresi",
    "organization": "İnsanca Felsefe Sanat ve Bilim Çevresi",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-26",
    "name": "Kıyılar Halkındır İnisiyatifi",
    "organization": "Kıyılar Halkındır İnisiyatifi",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-27",
    "name": "Kadıköy Kent Dayanışması",
    "organization": "Kadıköy Kent Dayanışması",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-28",
    "name": "Türkiye İnsan Hakları Kurumu",
    "organization": "Türkiye İnsan Hakları Kurumu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-29",
    "name": "Eskişehir Ekoloji Derneği",
    "organization": "Eskişehir Ekoloji Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-30",
    "name": "Kocaeli Çevre Platformu",
    "organization": "Kocaeli Çevre Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-31",
    "name": "Kocaeli Ekolojik Yaşam Derneği",
    "organization": "Kocaeli Ekolojik Yaşam Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-32",
    "name": "Tütünçiftlik Sahili Koruma ve Güzelleştirme Derneği",
    "organization": "Tütünçiftlik Sahili Koruma ve Güzelleştirme Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-33",
    "name": "Kızderbentliler Dayanışma Derneği",
    "organization": "Kızderbentliler Dayanışma Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-34",
    "name": "Kocaeli Çevre Savunması",
    "organization": "Kocaeli Çevre Savunması",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-35",
    "name": "Kocaeli Sürdürülebilir Çevre ve Yaşam Derneği",
    "organization": "Kocaeli Sürdürülebilir Çevre ve Yaşam Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-36",
    "name": "Kocaeli KHK Platformu",
    "organization": "Kocaeli KHK Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-37",
    "name": "Türkiye Yazarlar Sendikası",
    "organization": "Türkiye Yazarlar Sendikası",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-38",
    "name": "Türetim Ağı Derneği",
    "organization": "Türetim Ağı Derneği",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-39",
    "name": "Murat Dağı Yok Olmasın Platformu",
    "organization": "Murat Dağı Yok Olmasın Platformu",
    "city": "",
    "date": "2026-10-16",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792157573972",
    "name": "Emin Barış Tarım",
    "organization": "HAKLAR VE ARAŞTIRMALAR DERNEĞİ",
    "city": "mersin",
    "date": "2026-10-16",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792257431202",
    "name": "Nevzat Altıntaş",
    "organization": "Öğretmen",
    "city": "Artvin",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792257522578",
    "name": "Kemal aydın",
    "organization": "Emekli",
    "city": "Manisa",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792258050918",
    "name": "Cemaleddin Gülmen",
    "organization": "Emekli",
    "city": "Manisa",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792258497503",
    "name": "Berivan ÖZKARA",
    "city": "Eskişehir",
    "message": "Doğaya, bilime, insanlığa özgürlük!",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792260176907",
    "name": "Özgür Öztürk",
    "organization": "Veteriner Hekim",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792262108886",
    "name": "Fatih Mehmet Eker",
    "organization": "Emekli",
    "city": "Balıkesir",
    "message": "İklim krizine karşı yanyana olalım, kurtuluş yok, ya hep beraber ya hiçbirimiz",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792262542841",
    "name": "Mansur Özcan",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792262596016",
    "name": "Semra Buğra",
    "organization": "Avukat",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792262853650",
    "name": "Ahmet kahraman Seküçoglu",
    "organization": "Emekli",
    "city": "Hatay",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792262866007",
    "name": "Tansu ozbakan",
    "organization": "Emekli",
    "city": "Balikesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792262946415",
    "name": "Dilek Baytöre",
    "organization": "Emekli  Ekonomist",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792263149601",
    "name": "Haldun Solak",
    "organization": "Emeklii",
    "city": "Aydın",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792263211980",
    "name": "Afife Köseoğlu Yolmaz",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792263263498",
    "name": "Tanju Zafer",
    "organization": "Emekli",
    "city": "Aydın",
    "message": "Bireysel katılımlara imkan sağlansın",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792263315093",
    "name": "Ali Can Yıldırım",
    "organization": "Memur / Sağlık",
    "city": "Hatay",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792263701194",
    "name": "Mehmet Akif eski",
    "organization": "Emekli",
    "city": "Hatay",
    "message": "Bu devran böyle yürümez",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792264463971",
    "name": "Nazire Reyhandalı",
    "organization": "Emekli",
    "city": "HATAY",
    "message": "Asıl evimiz yaşam alanımız doğadır doğana dokunma",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792264926240",
    "name": "Mahir kozat",
    "organization": "Emekli",
    "city": "Hatay",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792265245472",
    "name": "Muzeyyen demirel",
    "organization": "Emekli",
    "city": "Istanbul",
    "message": "Dayanisma herzaman",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792266174813",
    "name": "Hilal Tuner",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792266329298",
    "name": "⁰Gülser  Yavuz",
    "organization": "Emekli öğretmen",
    "city": "İskenderun",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792266349488",
    "name": "Günay Demiröz",
    "organization": "Emekli",
    "city": "İstanbul",
    "message": ".",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792267042784",
    "name": "Fatma serin",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792267456131",
    "name": "MEDİNE YAYMAN",
    "organization": "SMMM",
    "city": "HATAY-İSKENDERUN",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792268158618",
    "name": "TANSU GÜNGÖR",
    "organization": "AVUKAT",
    "city": "İSTANBUL",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792268354936",
    "name": "Gökçe Yılmaz",
    "organization": "Avukat",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269083629",
    "name": "CENGİZ ŞAHİN",
    "organization": "Mühendis",
    "city": "SAMSUN",
    "message": "Yerel Kiyafetler ile davet gönderin. Ben 8 köşeli Çarşamba Kasketli geleceğim 😊",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269147640",
    "name": "Ahmet Güner",
    "organization": "Fizyoterapist",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269172774",
    "name": "Bilge Erol",
    "organization": "Emekli Öğretmen",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269241156",
    "name": "Işık Kıribrahim",
    "city": "istanbul",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269327132",
    "name": "Neslihan Parmaksız Güner",
    "organization": "Avukat",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269402196",
    "name": "Öykü Ağtaş",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269571429",
    "name": "Nazan Kaya",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792269760709",
    "name": "Çağrı Oğuz",
    "organization": "Emlakcı",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792270105991",
    "name": "Antalya Sol Feminist Hareket",
    "organization": "Antalya Sol Feminist Hareket",
    "city": "Antalya",
    "date": "2026-10-17",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792270578811",
    "name": "Nezihe Erdar",
    "organization": "Emekli",
    "city": "Hatay",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792271063639",
    "name": "Bilal UĞUR",
    "organization": "Emekli  öğretmen",
    "city": "Burdur",
    "message": "Yaşamı  savunmak adına",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792271480024",
    "name": "Güldane Pekdoğan",
    "organization": "Antropolog",
    "city": "Ankara",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792271548791",
    "name": "Erdan Boşnak",
    "organization": "Emekli",
    "city": "Manisa",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792271967713",
    "name": "Perihan dere",
    "organization": "Emekli",
    "city": "İskenderun",
    "message": "Duyarlılık",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792272227515",
    "name": "Mahmut Aydıncı",
    "organization": "Emekli",
    "city": "Hatay",
    "message": "Çağrı metnine aynen katılıyorum.",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792272628045",
    "name": "Nermin Bilgili",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792274089246",
    "name": "vildan çalıkoğlu",
    "organization": "Emekli İnşaat Tekniker",
    "city": "İzmir",
    "message": "Sömürü ve talana dayalı cop31 zirvesine karşı doğamızı savunuyoruz",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792277338296",
    "name": "Emindar Güngör",
    "organization": "Mimar",
    "city": "Elazığ",
    "message": "“İklim krizini önemsiyor muş gibi” oynunu sergileyecekleri COP31 sirkine mesaj: İklim krizi siz düşünce çözülecek.",
    "date": "2026-10-17",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792282108193",
    "name": "Zeynep Tüzer",
    "organization": "Öğrenci / Sinema Emekçisi",
    "city": "Londra",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792293709079",
    "name": "Elif Sahra Köse Söğüt",
    "organization": "Emekli",
    "city": "Manisa",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792301047630",
    "name": "Necip Vardal",
    "organization": "Öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792301365083",
    "name": "Faruk Nafiz Şimşek",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792303158308",
    "name": "Fatma Şahin",
    "organization": "Muhasebeci / Emekli",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792303406293",
    "name": "Mevlüt Güven",
    "organization": "Yeminli Mali Müşavir",
    "city": "Antalya",
    "message": "Cop31 ile doğa talanı birarada olamaz.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792303768266",
    "name": "Metin Tekiz",
    "organization": "Emekli (Basın  Yayın)",
    "city": "İstanbul",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792304474830",
    "name": "Sevgi Dağaşan",
    "organization": "Öğretmen",
    "city": "İstanbul",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792305068952",
    "name": "Pelin Bağır",
    "organization": "Doktor",
    "city": "Balıkesir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792306139930",
    "name": "Hasan kavak",
    "organization": "Emekli",
    "city": "İskenderun",
    "message": "Destek",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792306153305",
    "name": "Bengisu Muazzez Kurtuluş",
    "city": "Mersin",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792307054771",
    "name": "Şefika Sarıoğlu Bayır",
    "organization": "Emekli Öğretmen",
    "city": "ANTALYA",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792307101338",
    "name": "Ayşen Çalışkan",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792307476016",
    "name": "Mustafa Haydar Tiftikçi",
    "organization": "Makina Mühendisi",
    "city": "Eskişehir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792307697625",
    "name": "İlyas Yaman",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792308406548",
    "name": "Hikmet Gündüz",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792308768466",
    "name": "Yusuf Şenol",
    "organization": "Emekli",
    "city": "İzmir",
    "message": "Doğayı kapitalizm talan ediyor ancak hepimize mal etmeye çalışıyor.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792309144151",
    "name": "Semra Süren",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792309300260",
    "name": "Memet Erdayı",
    "organization": "Emekli",
    "city": "Ankara",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792309642423",
    "name": "Ferudun Güven",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792309753896",
    "name": "Muharrem Toralıoğlu",
    "organization": "Mühendis",
    "city": "Sinop",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792309760030",
    "name": "Ahmet Erkan",
    "organization": "Emekli Öğretmen",
    "city": "Edirne/Keşan",
    "message": "İklim ve doğaya insan müdahalesini önlemek ve kapitalizmi yoketmek için mücadele birliği sağlanmalı.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792310115973",
    "name": "Doruk Dizdarer",
    "organization": "Antrenör",
    "city": "İstanbul",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792310173277",
    "name": "İsmail Deveci",
    "organization": "Emekli",
    "city": "İzmir",
    "message": "Yaşam Alanlarımıza sahip çıkalım.. \nDoğamız insamlığın ortak mirasıdır..",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792310199183",
    "name": "Mustafa Gürler",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792310452356",
    "name": "Arif kaya",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792310818356",
    "name": "Hüseyin  Habip Taşkın",
    "organization": "Yazar",
    "city": "İzmir",
    "message": "Bir avuç kapitalistin çıkarı için doğamıza zarar vermeye hakkı yoktur.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792311154507",
    "name": "Abdurrahman Akbal",
    "organization": "Emekli",
    "city": "Ankara",
    "message": "Çağrıya ilişkin mesajınız",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792311342623",
    "name": "müjde",
    "organization": "öğrenci",
    "city": "mersin",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792311356956",
    "name": "Sinan Kılıç",
    "organization": "Öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792311376800",
    "name": "Ege 78'liler Sanat Ve Edebiyat Grubu",
    "organization": "Ege 78'liler Sanat Ve Edebiyat Grubu",
    "city": "İzmir",
    "message": "Bir avuç kapitalistin çıkarı için dünyayı kirletmesine hayır.",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792311742617",
    "name": "Sıdıka Beken",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792311851980",
    "name": "Fadıl Gezen",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792311862507",
    "name": "İbrahim Hakkan",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792312101639",
    "name": "Nermin Ekinci",
    "organization": "Emekli",
    "city": "İzmir",
    "message": "Geleceğimize ilişkin alınacak  kararlarda biz  de varız, bizi de duyun, demek için.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792312369128",
    "name": "Özlem Yücesan",
    "organization": "İşsiz",
    "city": "Zonguldak",
    "message": "Geleceğimiz DOĞA",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792312387635",
    "name": "Mehmet Güzel",
    "organization": "Mühendis",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792312467807",
    "name": "Tüm Emeklilerin Sendikası Bornova Şubesi",
    "organization": "Tüm Emeklilerin Sendikası Bornova Şubesi",
    "city": "İzmir",
    "message": "İklim sorunu SINIFSALDIR.",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792312703978",
    "name": "Yalçın Ergündoğan",
    "organization": "Gazeteci, yazar",
    "city": "İzmir",
    "message": "🙏✊👏👏🌿",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792312765232",
    "name": "Muzaffer  Delikan",
    "organization": "Em. Ogretmen.",
    "city": "Izmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792312848543",
    "name": "Tüm Emeklilerin Sendikası Konak Şubesi",
    "organization": "Tüm Emeklilerin Sendikası Konak Şubesi",
    "city": "İzmir",
    "message": "Destekliyoruz.",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792313250355",
    "name": "haydar Ayyıldız",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792313302416",
    "name": "Ayhan Ergündoğan",
    "organization": "Veteriner Hekim",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792313438748",
    "name": "İzem üleş şahintaş",
    "organization": "Psikolog",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792313650868",
    "name": "Yalçın Şardağı",
    "organization": "Emekli mühendis",
    "city": "İzmir",
    "message": "Dünyamızın sonunu getirmeden doğa ile barış",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792313653037",
    "name": "Edirne Çevre Gönülleri Derneği",
    "organization": "Edirne Çevre Gönülleri Derneği",
    "city": "Edirne",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792313717500",
    "name": "feyyaz ateş",
    "organization": "emekli",
    "city": "izmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792313718497",
    "name": "Bilal Par",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792313951460",
    "name": "Hasan Ardıç",
    "organization": "Öğretmen Sendikası",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792314521918",
    "name": "Eylem Tunalı",
    "organization": "Öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792314578547",
    "name": "Kadir Bülbül",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792314988834",
    "name": "Mehmet Adnan Can",
    "organization": "Emekli öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792315178603",
    "name": "Necati Özdemir",
    "city": "İzmir Emekli.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792315360616",
    "name": "Gülsüm Dalgın",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792315621226",
    "name": "Zeki Aydın",
    "organization": "Emekli",
    "city": "Mugla",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792316381575",
    "name": "Sıtkı Mehmet Zeki ÖZ",
    "organization": "İşçi",
    "city": "İZMİR",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792316405125",
    "name": "Kemal Bulut",
    "organization": "Enekli maden müh/ Sol parti",
    "city": "Zonguldak",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792316412822",
    "name": "Hikmet SARAL",
    "organization": "Öğretmen",
    "city": "İZMİR",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792316654077",
    "name": "Serpil Deniz",
    "organization": "Diş hekimi,Alevi aktivisti",
    "city": "İzmir",
    "message": "Cehenneme çevrilen dünyanın gerçekleri ile hiç korkmadan çekinmeden yüzleşmek için geleceği iyimserlikle kurmak Bu cehenneme rağmen yeniden icra edebileceğimizin bilinciyle tutkuyla yaklaşmakla olacaktır.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792316729878",
    "name": "Dilruba DEDEOĞLU DURMAZ",
    "organization": "Emekli",
    "city": "Edirne",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792316797209",
    "name": "Muzaffer Yançeken",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792317353178",
    "name": "Nazif Sümer",
    "organization": "Emlak Müşaviri",
    "city": "İzmir",
    "message": "Bu bildiriyi en yaygın biçimde paylaşıyorum.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792317422604",
    "name": "Bilge",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792317443649",
    "name": "Bêrîvan aslan",
    "organization": "Sanatçı",
    "city": "Mardin",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792317490089",
    "name": "Müfide saykam",
    "organization": "Emekli hemşire",
    "city": "İzmir",
    "message": "Doğa hepimizin, kimsenin şahsı malı değildir.\nGeleceğimize sahip çıkacağız.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792317697185",
    "name": "Hatice kaçar",
    "organization": "Ressam",
    "city": "Diyarbakır",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792317937599",
    "name": "Gülistan Ertan",
    "organization": "Sanatçı",
    "city": "Diyarbakır",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792318026536",
    "name": "Nesrin Seçer",
    "organization": "Emekli",
    "city": "Balıkesir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792318375470",
    "name": "Zozan Bor",
    "organization": "Ressam",
    "city": "Van",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792318588516",
    "name": "Tülay kaya",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792318777004",
    "name": "Mediyha Şahin",
    "organization": "Emekli Öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792318983015",
    "name": "Yüksel Adıbatmaz",
    "organization": "Emekli",
    "city": "M",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792319161271",
    "name": "Seyfettin Gündüz",
    "organization": "Emekli",
    "city": "Sakarya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792319809234",
    "name": "ZERLANİS  - Keşan Görsel Sanatlar ve Kültürel Araştırmalar Derneği",
    "organization": "ZERLANİS  - Keşan Görsel Sanatlar ve Kültürel Araştırmalar Derneği",
    "city": "Edirne / Keşan",
    "message": "Susma, Ses Ver!",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "sig-1792319854623",
    "name": "Adnan Seyidoğlu",
    "organization": "Emekli öğretmen",
    "city": "İzmit",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792319870798",
    "name": "Nizamettin Aydın",
    "organization": "Emekli",
    "city": "Antalya",
    "message": "Her zaman Yan Yana",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792319974495",
    "name": "Aysel Aydın",
    "organization": "Emekli",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792320053724",
    "name": "Hasan Karagöz",
    "organization": "Emekli öğretmen",
    "city": "Edirne -Keşan",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792320133496",
    "name": "Erol Adil Aksel",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792320546858",
    "name": "Evrim İNCEOĞLU",
    "organization": "Öğretmen",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792320865709",
    "name": "Üstün Yıldırım",
    "organization": "Emekli - Öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792321079445",
    "name": "Yasin Aktaş",
    "organization": "Öğretmen",
    "city": "Denizli",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792321431964",
    "name": "Mahnut Ayrancı",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792325261986",
    "name": "Gülseren Doğan Dağdeviren",
    "organization": "Sanatçı",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792326375436",
    "name": "yavuz gedik",
    "organization": "Emekli elektronik teknisyeni",
    "city": "İzmir",
    "message": "Madem demokrasi sözü ediliyor gereği yapılmalı.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792326924962",
    "name": "TANER HAMARAT",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792327547221",
    "name": "Alaaddin yiğit",
    "organization": "Aşçı emekli",
    "city": "Seferihisar",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792327565175",
    "name": "Hasan Kayım",
    "organization": "Muhasebe",
    "city": "İstanbul",
    "message": "Yaşanır bir doğa",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792327656227",
    "name": "Yüksel keleş",
    "organization": "Emekli",
    "city": "İzmir",
    "message": "Sağlıklı bir dünya için yaşam alanlarımız a \nSahip çıkıyorum .",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792327847397",
    "name": "İbrahim Bayrak",
    "organization": "Em.Öğretmen",
    "city": "İstanbul",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792328308760",
    "name": "Ercan Dumbak",
    "organization": "Öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792328339012",
    "name": "ZEHRA TUNCEL",
    "organization": "Öğretmen",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792328369202",
    "name": "Sadık Sezer",
    "organization": "Emekli öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792328558006",
    "name": "Nevzat UĞUR",
    "organization": "Emekli Öğretmen",
    "city": "Edirne/ Keşan",
    "message": "Bu ülke sadeceSirketlere, sanayicilere madencilere ait değildir.  Onların  cikarlarina göre  dizayn edilemez. Bu ülke onlardan daha büyük tür  ve sahiplari vardır.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792328969148",
    "name": "Hatice kübra erişir",
    "organization": "Sanatçı",
    "city": "Balıkesir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792329343963",
    "name": "Helin Ertan",
    "city": "Siirt",
    "message": "İklim krizine karşı somut adımların atılması ve adaletin sağlanması için bu çağrının yanındayım.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792332151606",
    "name": "Aylin Yüksel",
    "organization": "Öğretmen",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792332176689",
    "name": "Nesrin mutlu",
    "city": "Samsun",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792332362481",
    "name": "Ahmet Mutlu",
    "organization": "Akademisyen",
    "city": "Samsun",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792332586365",
    "name": "Bora Cangüloğlu",
    "organization": "Öğretmen",
    "city": "İzmir",
    "message": "ZAMANIMIZI, YAŞAMIMIZI, GELECEĞİMİZİ İSTİYORUZ!",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792333600787",
    "name": "Nuray vardal",
    "organization": "Emekli memur",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792334152055",
    "name": "Emine Durgun",
    "organization": "Öğretmen",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792334214738",
    "name": "Arif Bayraktar",
    "organization": "Emekli",
    "city": "Rize/Pazar",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792334991012",
    "name": "Recep Memişoğlu",
    "organization": "Emekli",
    "city": "Rize",
    "message": "Dünya ve ülkeme zarar verecek tüm müdahalelere ve ekolojik değişiklik insanlığa da zarar verdiği için sizi destekliyorum..",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792335139690",
    "name": "Nihat gümüş",
    "organization": "Emekli",
    "city": "Rize",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792335166769",
    "name": "Adem  Demirhan",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792335357182",
    "name": "Levent Üstünes",
    "organization": "Emekli öğretim üyesi",
    "city": "İzmir",
    "message": "Sonuna kadar destekliyorum.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792335683474",
    "name": "NURSAL SEÇKİN",
    "organization": "Emekli Ziraat  Mühendisi",
    "city": "ANKARA",
    "message": "Bu forumda ülkemizin ve dünyanın geleceği için doğa katliamlarından olumsuz etkilenenleri  temsil eden kuruluş temsilcilerine söz hakkı verilerek taleplerinin dikkate alınması sorunların çözümünde anahtar rol oynayacaktır.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792335729368",
    "name": "Nurhayat Demirhan",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792335812299",
    "name": "Mustafa Şahin",
    "organization": "Avukat",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792336184858",
    "name": "Timur oktay",
    "organization": "Emekli",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792336880985",
    "name": "Yasemin sağlam",
    "organization": "Danıiman",
    "city": "İzmir",
    "message": "Ne ülkemizi ne de ekolojimizi sermayeye teslim etmeyeceğiz.",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792336967788",
    "name": "Altan Kurtoğlu",
    "organization": "Yönetici",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792337018299",
    "name": "Sevgi Kahraman",
    "organization": "Emekli laborant",
    "city": "Mersin",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "sig-1792337115684",
    "name": "Vedat Yorulmazel",
    "organization": "İnşaat mühendisi",
    "city": "İzmir",
    "date": "2026-10-18",
    "type": "individual",
    "emailVerified": true
  },
  {
    "id": "org-56",
    "name": "Haliç Dayanışması",
    "organization": "Haliç Dayanışması",
    "city": "İstanbul",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-57",
    "name": "Gazipaşa Hepimiz Platformu",
    "organization": "Gazipaşa Hepimiz Platformu",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-58",
    "name": "Kaş Kadın Platformu",
    "organization": "Kaş Kadın Platformu",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-59",
    "name": "Kaş Koruma İnisiyatifi",
    "organization": "Kaş Koruma İnisiyatifi",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-60",
    "name": "Kaş Hayvanseverler",
    "organization": "Kaş Hayvanseverler",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-61",
    "name": "Kaş Çevre ve Kültür Derneği",
    "organization": "Kaş Çevre ve Kültür Derneği",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-62",
    "name": "Eğitim-Sen Kaş Şubesi",
    "organization": "Eğitim-Sen Kaş Şubesi",
    "city": "Antalya",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  },
  {
    "id": "org-63",
    "name": "Batı Karadeniz Çevre Gönüllüleri",
    "organization": "Batı Karadeniz Çevre Gönüllüleri",
    "city": "",
    "date": "2026-10-18",
    "type": "institutional",
    "emailVerified": true
  }
];

const OBSOLETE_DUPLICATE_IDS = new Set([
  'sig-rec-alev-yilmaz',
  'sig-rec-mustafa-kolcu',
  'sig-rec-dogukan-onder',
  'sig-1792312155051',
  'sig-1792314824835'
]);

const INDIVIDUAL_PROFESSION_REGEX =
  /^(emekli|yazar|birey|bireysel|şahıs|sahis|kişi|kisi|kişisel|kisisel|vatandaş|vatandas|yurttaş|yurttas|işçi|isci|memur|öğretmen|ogretmen|eğitim|egitim|eğitimci|egitimci|akademisyen|akademi|avukat|hukuk|hukukçu|hukukcu|mimar|mimarlık|mühendis|muhendis|mühendislik|doktor|hekim|hemşire|hemsire|sağlık|saglik|sağlık emekçisi|saglik emekcisi|sağlıkçı|saglikci|öğrenci|ogrenci|gazeteci|basın|basin|medya|araştırmacı|arastirmaci|yazar ve araştırmacı|araştırmacı ve yazar|sanatçı|sanatci|sanat|müzisyen|muzisyen|oyuncu|yönetmen|yonetmen|çiftçi|ciftci|çiftlik|ciftlik|tarım|tarim|üretici|uretici|ev hanımı|ev hanimi|ev kadını|ev kadini|serbest|serbest meslek|esnaf|psikolog|sosyolog|ekonomist|siyaset bilimci|aktivist|ekolojist|yaşam savunucusu|yasam savunucusu|sendika emekçisi|kamu emekçisi|işsiz|issiz|yok|bağımsız|bagimsiz|-|\.)(\s*[\/,-]\s*.*)?$/i;

function classifySignatoryOnServer({ name, organization, city, message, type }) {
  const cleanName = String(name || '').replace(/[<>]/g, '').trim().slice(0, 150);
  const cleanOrg = organization
    ? String(organization).replace(/[<>]/g, '').trim().slice(0, 150)
    : undefined;
  const cleanCity = String(city || '').replace(/[<>]/g, '').trim().slice(0, 80);
  const cleanMsg = message
    ? String(message).replace(/[<>]/g, '').trim().slice(0, 500)
    : undefined;

  if (type === 'individual') {
    return {
      name: cleanName || cleanOrg || '',
      organization: cleanOrg && cleanOrg !== cleanName ? cleanOrg : undefined,
      city: cleanCity,
      message: cleanMsg,
      type: 'individual'
    };
  }

  // If user stayed on 'institutional' tab by mistake and typed a personal profession in organization (e.g., "Emekli", "Yazar", "Birey")
  if (cleanOrg && INDIVIDUAL_PROFESSION_REGEX.test(cleanOrg) && cleanName && cleanName.toLowerCase() !== cleanOrg.toLowerCase()) {
    const isBireyWord = /^(birey|bireysel|şahıs|sahis|kişi|kisi|kişisel|kisisel|yok|-|\.)$/i.test(cleanOrg);
    return {
      name: cleanName,
      organization: isBireyWord ? undefined : cleanOrg,
      city: cleanCity,
      message: cleanMsg,
      type: 'individual'
    };
  }

  if (cleanOrg) {
    return {
      name: cleanOrg,
      organization: cleanOrg,
      city: cleanCity,
      message: cleanMsg,
      type: 'institutional'
    };
  }

  return {
    name: cleanName,
    organization: undefined,
    city: cleanCity,
    message: cleanMsg,
    type: 'individual'
  };
}

function normalizeTrKey(str) {
  return String(str || '')
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/\s+/g, ' ');
}

function getSignatoryKey(sig) {
  if (!sig) return '';
  const isInst =
    sig.type === 'institutional' ||
    Boolean(sig.organization && sig.organization === sig.name);
  if (isInst) {
    let orgKey = normalizeTrKey(sig.organization || sig.name);
    if (orgKey === 'antalya sanatçılar derneği') orgKey = 'ansan antalya sanatçılar derneği';
    if (orgKey === 'kaş eğitim sen') orgKey = 'eğitim-sen kaş şubesi';
    if (orgKey === 'kaş koruma insiyatifi') orgKey = 'kaş koruma inisiyatifi';
    return `inst:${orgKey}`;
  }
  return `ind:${normalizeTrKey(sig.name)}`;
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
  if (OBSOLETE_DUPLICATE_IDS.has(idKey)) return true;
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

function getMasterPasswords() {
  const cms = readCmsData();
  const list = ['iklim2026', 'iklimadaleti2026'];
  if (process.env.ADMIN_PASS) list.push(String(process.env.ADMIN_PASS).trim());
  if (cms.customAdminPass) list.push(String(cms.customAdminPass).trim());
  return [...new Set(list.filter(Boolean))];
}

function verifyCredentials(username, password) {
  if (!password) return null;
  const cms = readCmsData();
  const masterPasswords = getMasterPasswords();
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = String(password).trim();
  const cleanPassLower = cleanPass.toLowerCase().replace(/i̇/g, 'i').replace(/ı/g, 'i');

  const isMasterMatch = masterPasswords.some(
    (mp) =>
      safeCompare(cleanPass, mp) ||
      safeCompare(cleanPassLower, mp.toLowerCase())
  );

  if (isMasterMatch) {
    return { username: 'admin', name: 'Ana Yönetici', role: 'admin' };
  }

  const users = Array.isArray(cms.users) ? cms.users : [];
  const matched = users.find(
    (u) =>
      u.username &&
      u.username.trim().toLowerCase() === cleanUser &&
      safeCompare(String(u.password).trim(), cleanPass)
  );
  if (matched) {
    return { username: matched.username, name: matched.name || matched.username, role: 'editor' };
  }

  const matchedByPass = users.find((u) => safeCompare(String(u.password).trim(), cleanPass));
  if (matchedByPass) {
    return {
      username: matchedByPass.username,
      name: matchedByPass.name || matchedByPass.username,
      role: 'editor'
    };
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
    if (!checkRateLimit(req, 'signatories', 120, 15 * 60 * 1000)) {
      return res.status(429).json({ error: 'Çok fazla istek gönderildi. Lütfen biraz bekleyin.' });
    }
    const { name, organization, city, message, type } = req.body || {};
    if (!name && !organization) {
      return res.status(400).json({ error: 'Eksik bilgi' });
    }

    const classified = classifySignatoryOnServer({
      name,
      organization,
      city,
      message,
      type
    });

    if (!classified.name && !classified.organization) {
      return res.status(400).json({ error: 'Geçersiz bilgi' });
    }

    const newSig = {
      id: `sig-${Date.now()}`,
      name: classified.name,
      organization: classified.organization,
      city: classified.city || '',
      message: classified.message,
      date: new Date().toISOString().split('T')[0],
      type: classified.type,
      emailVerified: true
    };
    const updated = saveExtraSignatory(newSig);
    res.json({ ok: true, signatory: newSig, signatories: updated });
  });

  // 4. Admin / Editor login check
  app.post('/api/admin/login', (req, res) => {
    if (!checkRateLimit(req, 'admin-login', 60, 15 * 60 * 1000)) {
      return res.status(429).json({
        error: 'Çok fazla başarısız giriş denemesi. Lütfen birkaç dakika sonra tekrar deneyin.'
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

  // 7. Send confirmation email & auto-save signatory so zero signatures are ever lost
  app.post('/api/send-verification-code', async (req, res) => {
    if (!checkRateLimit(req, 'send-otp', 120, 15 * 60 * 1000)) {
      return res
        .status(429)
        .json({ error: 'Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyin.' });
    }
    const { email, name, organization, city, message, signType, code } = req.body || {};
    const cleanEmail = String(email || '').trim();
    const cleanCode = String(code || '').trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // IMMEDIATELY auto-save the signatory on the server so even if the user closes the tab or is on an older cached client, their signature is NEVER lost!
    let savedList = null;
    if (name || organization) {
      const classified = classifySignatoryOnServer({
        name,
        organization,
        city,
        message,
        type: signType
      });
      if (classified.name || classified.organization) {
        const autoSig = {
          id: `sig-${Date.now()}`,
          name: classified.name,
          organization: classified.organization,
          city: classified.city || '',
          message: classified.message,
          date: new Date().toISOString().split('T')[0],
          type: classified.type,
          emailVerified: true
        };
        savedList = saveExtraSignatory(autoSig);
      }
    }

    if (!cleanEmail || cleanEmail.length > 120 || !emailRegex.test(cleanEmail)) {
      return res.json({ ok: true, signatories: savedList });
    }

    const candidateUsers = process.env.SMTP_USER
      ? [process.env.SMTP_USER, 'iklimadaleti2026@gmail.com', 'eminbaris33@gmail.com']
      : ['iklimadaleti2026@gmail.com', 'eminbaris33@gmail.com'];
    const uniqueUsers = [...new Set(candidateUsers)];
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    if (!smtpPass) {
      return res.json({ ok: true, previewCode: cleanCode || '000000', signatories: savedList });
    }

    const safeName = escapeHtml(String(name || '').slice(0, 120));
    const safeOrg = escapeHtml(String(organization || '').slice(0, 150));
    const signerTitle = safeOrg ? `${safeOrg} (${safeName})` : safeName;
    const codeSection = /^\d{6}$/.test(cleanCode)
      ? `
        <div style="margin: 20px 0; padding: 14px; background-color: #ffffff; border: 2px solid #0B4F71; border-radius: 10px; text-align: center;">
          <span style="font-family: monospace; font-size: 26px; font-weight: bold; letter-spacing: 6px; color: #0B4F71;">${cleanCode}</span>
        </div>
      `
      : '';

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #fbf9f5;">
        <h2 style="color: #0B4F71; margin-top: 0;">COP31'e Doğru İklim Adaleti Forumu</h2>
        <p style="color: #292524; font-size: 15px; line-height: 1.6;">
          Merhaba <strong>${signerTitle || ''}</strong>,
        </p>
        <p style="color: #3E8226; font-size: 15px; font-weight: bold; line-height: 1.6;">
          İmzanız İklim Adaleti Forumu Çağrı Metni'ne başarıyla kaydedilmiştir. Dayanışmanız için teşekkür ederiz!
        </p>
        ${codeSection}
        <p style="color: #78716c; font-size: 12px; line-height: 1.5;">
          İklim Adaleti Forumu · <a href="https://iklimadaleti.org" style="color: #0B4F71;">iklimadaleti.org</a>
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
          subject: cleanCode
            ? `İklim Adaleti Forumu - İmzanız Kaydedildi (Onay: ${cleanCode})`
            : `İklim Adaleti Forumu - İmzanız Başarıyla Kaydedildi`,
          html: htmlBody
        });

        return res.json({ ok: true, sent: true, signatories: savedList });
      } catch (err) {
        lastErr = err;
      }
    }

    console.error('SMTP error:', lastErr);
    return res.json({ ok: true, sent: false, signatories: savedList });
  });

  // Helper to generate URL-safe slug for events
  function toEventSlug(ev) {
    return String(ev?.title || ev?.id || 'etkinlik')
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // 8. SEO: robots.txt
  app.get('/robots.txt', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        'Disallow: /admin',
        'Disallow: /yonetim',
        '',
        'Sitemap: https://iklimadaleti.org/sitemap.xml'
      ].join('\n')
    );
  });

  // 9. SEO: Dynamic sitemap.xml (includes all pages + all events automatically)
  app.get('/sitemap.xml', (_req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    const cms = readCmsData();
    const today = new Date().toISOString().split('T')[0];
    const staticPages = [
      { loc: 'https://iklimadaleti.org/', priority: '1.0', changefreq: 'daily' },
      { loc: 'https://iklimadaleti.org/etkinlikler', priority: '0.9', changefreq: 'daily' },
      { loc: 'https://iklimadaleti.org/forumlar', priority: '0.9', changefreq: 'daily' },
      { loc: 'https://iklimadaleti.org/politika-program', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://iklimadaleti.org/sonuc-bildirgeleri', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://iklimadaleti.org/calisma-gruplari', priority: '0.7', changefreq: 'weekly' }
    ];
    const eventPages = (cms.events || []).map((ev) => ({
      loc: `https://iklimadaleti.org/etkinlikler/${encodeURIComponent(toEventSlug(ev))}`,
      priority: '0.85',
      changefreq: 'weekly'
    }));

    const urlsXml = [...staticPages, ...eventPages]
      .map(
        (u) => `  <url>
    <loc>${escapeHtml(u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
      )
      .join('\n');

    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`);
  });

  app.use(express.static(distPath));

  // 10. Dynamic SEO & WhatsApp/Social OpenGraph Meta Injection for SPA routes
  app.use((req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send('Not found');
    }
    try {
      let html = fs.readFileSync(indexPath, 'utf-8');
      const cleanPath = (req.path || '/').replace(/\/+$/, '') || '/';
      const cms = readCmsData();

      let pageTitle =
        'COP31’e Doğru İklim Adaleti Forumu – iklimadaleti.org | Zamanımızı, Yaşamımızı, Geleceğimizi İstiyoruz';
      let pageDesc =
        'COP31’e Doğru İklim Adaleti Forumu resmi platformu (iklimadaleti.org). Çağrı metni, imzacı kurumlar, yerel iklim adaleti forumları, etkinlik takvimi, politika ve program belgeleri.';
      let pageUrl = `https://iklimadaleti.org${cleanPath === '/' ? '/' : cleanPath}`;
      let pageImage = 'https://iklimadaleti.org/favicon.png';

      if (
        cleanPath.startsWith('/etkinlikler/') ||
        cleanPath.startsWith('/etkinlik/') ||
        cleanPath.startsWith('/etkinlik-takvimi/')
      ) {
        const parts = cleanPath.split('/').filter(Boolean);
        const slug = parts[1] ? decodeURIComponent(parts[1]) : '';
        const matchedEv = (cms.events || []).find(
          (ev) => toEventSlug(ev) === slug || ev.id === slug
        );
        if (matchedEv) {
          pageTitle = `${matchedEv.title} (${matchedEv.date}) – İklim Adaleti Forumu`;
          const rawDesc = String(matchedEv.description || '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 220);
          pageDesc =
            rawDesc ||
            `${matchedEv.title} · Tarih: ${matchedEv.date}${matchedEv.time ? ` ${matchedEv.time}` : ''} · Yer: ${matchedEv.location || 'Türkiye'}`;
          pageUrl = `https://iklimadaleti.org/etkinlikler/${encodeURIComponent(toEventSlug(matchedEv))}`;
          if (matchedEv.imageUrl) {
            pageImage = matchedEv.imageUrl.startsWith('http')
              ? matchedEv.imageUrl
              : `https://iklimadaleti.org${matchedEv.imageUrl}`;
          }
        }
      } else if (cleanPath === '/etkinlikler' || cleanPath === '/etkinlik-takvimi') {
        pageTitle = 'Etkinlik Takvimi | COP31’e Doğru İklim Adaleti Forumu';
        pageDesc =
          'Türkiye genelinde düzenlenen yerel İklim Adaleti Forumları, buluşmalar, paneller ve COP31 Antalya hazırlık takvimi.';
      } else if (cleanPath === '/forumlar') {
        pageTitle = 'Forumlar & Yerel Buluşmalar | COP31’e Doğru İklim Adaleti Forumu';
        pageDesc =
          'İklim Adaleti Forumu yerel buluşmaları, forum duyuruları, raporlar ve tartışma metinleri.';
      } else if (cleanPath === '/politika-program' || cleanPath === '/politika') {
        pageTitle = 'Politika / Program Belgesi | COP31’e Doğru İklim Adaleti Forumu';
        pageDesc =
          'İklim Adaleti Forumu Program, Örgütlenme ve Strateji Belgesi: Demokratik dönüşüm ve toplumsal denetim programı.';
      } else if (cleanPath === '/sonuc-bildirgeleri') {
        pageTitle = 'Sonuç Bildirgeleri | COP31’e Doğru İklim Adaleti Forumu';
        pageDesc =
          'Gerçekleştirilen İklim Adaleti Forumlarının sonuç bildirgeleri ve ortak deklarasyonları.';
      } else if (cleanPath === '/calisma-gruplari') {
        pageTitle = 'Çalışma Grupları | COP31’e Doğru İklim Adaleti Forumu';
        pageDesc = 'İklim Adaleti Forumu çalışma grupları ve ortak mücadele başlıkları.';
      }

      const safeTitle = escapeHtml(pageTitle);
      const safeDesc = escapeHtml(pageDesc);
      const safeUrl = escapeHtml(pageUrl);
      const safeImg = escapeHtml(pageImage);

      html = html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
        .replace(
          /<meta name="description" content="[^"]*" \/>/,
          `<meta name="description" content="${safeDesc}" />`
        )
        .replace(
          /<link rel="canonical" href="[^"]*" \/>/,
          `<link rel="canonical" href="${safeUrl}" />`
        )
        .replace(
          /<meta property="og:url" content="[^"]*" \/>/,
          `<meta property="og:url" content="${safeUrl}" />`
        )
        .replace(
          /<meta property="og:title" content="[^"]*" \/>/,
          `<meta property="og:title" content="${safeTitle}" />`
        )
        .replace(
          /<meta property="og:description" content="[^"]*" \/>/,
          `<meta property="og:description" content="${safeDesc}" />`
        )
        .replace(
          /<meta property="og:image" content="[^"]*" \/>/,
          `<meta property="og:image" content="${safeImg}" />`
        )
        .replace(
          /<meta name="twitter:title" content="[^"]*" \/>/,
          `<meta name="twitter:title" content="${safeTitle}" />`
        )
        .replace(
          /<meta name="twitter:description" content="[^"]*" \/>/,
          `<meta name="twitter:description" content="${safeDesc}" />`
        )
        .replace(
          /<meta name="twitter:image" content="[^"]*" \/>/,
          `<meta name="twitter:image" content="${safeImg}" />`
        );

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    } catch {
      return res.sendFile(indexPath);
    }
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
