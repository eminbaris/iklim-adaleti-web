# İklim Adaleti Forumu (iklimadaleti.org) – Proje Kuralları ve Kısıtlamalar

Bu projede yapılacak tüm kod, tasarım ve sunucu güncellemelerinde aşağıdaki kurallara kesin olarak uyulmalıdır:

## 1. Sıfır Veri Kaybı ve Kontrollü Güncelleme (Non-Destructive Updates)
- **Mevcut İçerikleri Koru:** Hiçbir menü, etkinlik (`events`), forum (`forums`), çalışma grubu (`workingGroups`), sonuç bildirgesi (`declarations`), politika belgesi (`policies`), PDF veya görsel (`/uploads/*`) silinmemeli ya da bozulmamalıdır.
- **Canlı İmzaları Senkronize Et:** `server.js` veya `data/signatories.json` dosyalarında değişiklik yapıp GitHub'a (`origin main`) göndermeden önce **mutlaka** `https://iklimadaleti.org/api/signatories` uç noktasındaki canlı imzalar kontrol edilmeli ve yeni gelen imzalar hem `data/signatories.json` hem de `server.js` (`DEFAULT_SIGNATORIES`) içine yedeklenmelidir.

## 2. İmza Sistemi Kuralları (Kurum vs. Birey Ayrımı ve Tek Tıkla Kayıt)
- **Tek Tıkla Anında Kayıt:** İmza formu (`SignDeclarationModal.tsx` ve `/api/signatories`) **tek adımda (1-tıkla)** imzayı anında kaydetmelidir. Kullanıcıların önüne e-posta doğrulama kodu (OTP) engeli konulmamalıdır. `/api/send-verification-code` uç noktası da gelen imzayı ilk istekte otomatik olarak kaydetmelidir.
- **Kesin Kurum / Şahıs Ayrımı ve Tekilleştirme:**
  - Bir kayıt **hem İmzacı Kurumlar hem Bireysel İmzacılar** listesinde aynı anda yer alamaz (çift kayıt kesinlikle yasaktır).
  - Kurum anahtar kelimeleri içeren girişler (*Dernek, Sendika, Vakıf, Baro, Oda, Parti, Meclis, Platform, İnisiyatif, Savunması, Dayanışması, Federasyon, Konfederasyon, Kooperatif, TMMOB, KESK, DİSK, TTB* vb.) her zaman **`type: 'institutional'`** olarak sınıflandırılmalı ve yalnızca **İmzacı Kurumlar** listesinde görünmelidir. Kurum adına form dolduran temsilci/iletişim kişisi bireysel listeye ayrıca eklenmemelidir.
  - Kurum alanına meslek/unvan yazan kişiler (*Avukat, Öğretmen, Emekli, İşçi, Mimar, Mühendis, Doktor, Hekim, Öğrenci, Gazeteci, Serbest* vb.) her zaman **`type: 'individual'`** olarak sınıflandırılmalı ve **Bireysel İmzacılar** listesinde görünmelidir.

## 3. Çoklu Sayfa (URL), SEO ve Sosyal Medya Önizleme Yapısı
- **Bağımsız URL Yapısı:** Her menü sekmesi (`/`, `/forumlar`, `/calisma-gruplari`, `/sonuc-bildirgeleri`, `/politika-program`, `/etkinlikler`) ve her tekil etkinlik (`/etkinlikler/<slug>`) doğrudan paylaşılabilir bağımsız URL yapısını korumalıdır.
- **Dinamik OpenGraph ve Site Haritası:** `server.js` üzerindeki dinamik OpenGraph (`og:title`, `og:description`, `og:image`), `/sitemap.xml` ve `/robots.txt` üretimi korunmalı; tekil etkinlik linkleri paylaşıldığında etkinliğin kendi afişi ve bilgileri önizleme kartında çıkmalıdır.
- **Admin Paneli:** `/admin` ve `/yonetim` adresleri ile mevcut yönetici/editör giriş bilgileri ve yetkileri değiştirilmemelidir.

## 4. Ortam, İletişim ve Dağıtım (Deployment) Bilgileri
- **Resmi E-posta Adresi:** Sitede ve tüm resmi metinlerde (Footer, KVKK, İletişim vb.) kullanılacak tek resmi e-posta adresi **`iklimadaleti2026@gmail.com`** olmalıdır (`iletisim@iklimadaleti.org` vb. varsayımsal adresler kesinlikle kullanılmamalıdır).
- **Git & Coolify:** Canlı ortam `https://github.com/eminbaris/iklim-adaleti-web.git` (`main` dalı) üzerinden Coolify ile `https://iklimadaleti.org` adresinde çalışmaktadır.
- **Yerel Node Yolu (Windows):** PowerShell varsayılan `PATH` içinde `node` bulunmadığında `C:\Users\MSI\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe` kullanılarak `node --check server.js` ile sözdizimi doğrulaması yapılmalıdır.
