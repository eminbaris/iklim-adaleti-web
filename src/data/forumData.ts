/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article, Brochure, Signatory, WorkingGroup, ForumEvent } from '../types.ts';

export const INITIAL_SIGNATORY_ORGANIZATIONS: string[] = [
  'Öğrenci Veli Derneği (Velider)',
  'Tüm Emeklilerin Sendikası',
  'Salda Gölü Koruma Derneği',
  'Uşak Ulubey Doğal Üretim ve Dayanışma Derneği (ÇEDAY)',
  'Gerede Çayı Temiz Aksın Platformu',
  'Derelerin Kardeşliği Akdeniz Platformu',
  'İkizdere Dernekler Federasyonu',
  'Uluslararası Çevre Gazetecileri Derneği',
  'Şavşat Dernekleri Federasyonu',
  'İstanbul Şavşat Derneği',
  'Samsun Çevre Platformu (Samçep)',
  'Samandağ Ekoloji Grubu',
  'Antakya Çevre Koruma Derneği',
  'İstanbul Kent Çevre Doğa ve Canlı Hakları Derneği',
  'Sivas Zara Çaylıca Köyü Derneği',
  'Köyceğiz Çevre ve Doğa Koruma Derneği',
  'Kemaliye ve Köyleri Çevre Platformu',
  'Denizli Avdan Platformu',
  'Acıbadem Sakinleri Dayanışması',
  'Gümüşhacıköy Çevre Platformu',
  'Saros Gönüllüleri',
  'Araklı Karadere Vadisi Yaylaları Doğayı ve Yaban Hayatını Koruma Derneği',
  'Fethiye Ekolojik Yaşam Derneği',
  'Antalya Kadın Danışma Merkezi ve Dayanışma Derneği',
  'İnsanca Felsefe Sanat ve Bilim Çevresi',
  'Kıyılar Halkındır İnisiyatifi',
  'Kadıköy Kent Dayanışması',
  'Türkiye İnsan Hakları Kurumu',
  'Eskişehir Ekoloji Derneği',
  'Kocaeli Çevre Platformu',
  'Kocaeli Ekolojik Yaşam Derneği',
  'Tütünçiftlik Sahili Koruma ve Güzelleştirme Derneği',
  'Kızderbentliler Dayanışma Derneği',
  'Kocaeli Çevre Savunması',
  'Kocaeli Sürdürülebilir Çevre ve Yaşam Derneği',
  'Kocaeli KHK Platformu',
  'Türkiye Yazarlar Sendikası',
  'Türetim Ağı Derneği',
  'Murat Dağı Yok Olmasın Platformu',
  'Marmara Ereğlisi Çevre Gönüllüleri',
  'Tekirdağ Kent Konseyi',
  'Kırsal Çevre ve Ormancılık Sorunları Araştırma Derneği',
  'ANSAN Antalya Sanatçılar Derneği',
  'Yeşil Artvin Derneği',
  'Derelerin Kardeşliği Platformu (DEKAP)',
  'Sol Feminist Hareketi',
  'Kaş Çevre Platformu',
  'Kumluca Pir Sultan Abdal Derneği',
  'Çiftçiler Sendikası (Çiftçi-Sen)',
  'Validebağ Gönüllüleri Derneği',
  'Vaminon (Arhavi Maden İstemiyor)',
  'Fethiye Kent Konseyi',
  'Varto Ekoloji Platformu',
  'Validebağ Savunması',
  'Toroçder',
  'İzmir Varto Ekoloji',
  'Haliç Dayanışması',
  'Gazipaşa Hepimiz Platformu',
  'Kaş Kadın Platformu',
  'Kaş Koruma İnisiyatifi',
  'Kaş Hayvanseverler',
  'Kaş Çevre ve Kültür Derneği',
  'Eğitim-Sen Kaş Şubesi',
  'Batı Karadeniz Çevre Gönüllüleri',
  'Edremit Sol Parti İlçe Başkanlığı',
  'Kayınormanı Derneği'
];

const INITIAL_ORGANIZATION_CITIES: Record<string, string> = {
  'ANSAN Antalya Sanatçılar Derneği': 'Antalya',
  'Yeşil Artvin Derneği': 'Artvin',
  'Derelerin Kardeşliği Platformu (DEKAP)': 'Artvin-Rize-Trabzon-Giresun-Ordu-Samsun',
  'Varto Ekoloji Platformu': 'Muş Varto',
  'Validebağ Savunması': 'İstanbul',
  'İzmir Varto Ekoloji': 'İzmir',
  'Haliç Dayanışması': 'İstanbul',
  'Gazipaşa Hepimiz Platformu': 'Antalya',
  'Kaş Kadın Platformu': 'Antalya',
  'Kaş Koruma İnisiyatifi': 'Antalya',
  'Kaş Hayvanseverler': 'Antalya',
  'Kaş Çevre ve Kültür Derneği': 'Antalya',
  'Eğitim-Sen Kaş Şubesi': 'Antalya',
  'Edremit Sol Parti İlçe Başkanlığı': 'Balıkesir'
};

export const CALL_TEXT_FULL = `COP31'e DOĞRU İKLİM ADALETİ FORUMU

ZAMANIMIZI, YAŞAMIMIZI, GELECEĞİMİZİ İSTİYORUZ!

COP31 Şirketlerin Değil, Emeğin ve Halklarındır!
Kasım ayında COP31 için devletler, şirketler ve uzmanlar Antalya'da bir araya gelerek enerjinin, tarımın, sanayinin ve kentlerin geleceğini tartışacak.

Peki işçiler, çiftçiler, emekliler, işsizler, bakım emeği verenler ve gençler nerede? Dünyayı emeğiyle var edenler, neden kendi gelecekleri üzerinde söz ve karar sahibi olamıyor?

İklim krizi yalnızca uzmanların çözeceği teknik bir sorun değildir; üretimin, emeğin, mülkiyetin ve toplumsal kaynakların nasıl örgütleneceğine dair siyasal bir meseledir. Kararların kimler tarafından ve hangi çıkarlar doğrultusunda alındığı asıl belirleyicidir. Bu nedenle yalnızca sonuçlara katlanmak değil, politikaların belirlenmesinde ve uygulanmasında doğrudan söz ve karar sahibi olmak istiyoruz.

ZAMAN DA BİR SINIF MESELESİDİR!

Diplomatların ve şirket temsilcilerinin toplantılara katılacak zamanı ve bütçesi varken; vardiyadaki işçinin, tarladaki çiftçinin, kuryenin, öğretmenin ve sağlık emekçisinin aynı imkânı yoktur. Bir yönetici için toplantıya katılmak mesaisinin bir parçasıyken; bir emekçi için ücretinden, yıllık izninden veya iş güvencesinden vazgeçmek demektir.

Zaman; dinlenmenin, örgütlenmenin, itiraz etmenin ve geleceğimiz hakkında karar verebilmenin maddi koşuludur. Zamanımızı talep etmek, yalnızca takvimden bir gün istemek değil; çalışma saatlerinin kısaltılmasından dinlenme hakkına, yaşamın ritmini sermayenin çarklarından kurtarma kavgasıdır. Zamanı üzerinde söz sahibi olamayanın yaşamı üzerindeki karar hakkı da sınırlıdır.

BİZ SEYİRCİ DEĞİL, KARAR SAHİBİYİZ!

Bir işçiyi panele çağırmak ya da bir köylüye sembolik söz hakkı vermek gerçek katılım değildir. Şirketler neyin üretileceğine, hangi kaynakların tüketileceğine karar verirken emekçilerin yalnızca sonuçları dinlemesini kabul etmiyoruz.

Biz yalnızca söz hakkı değil; örgütlenme, itiraz, karar ve denetim hakkı talep ediyoruz. Enerji, tarım, sanayi ve kent politikalarında doğrudan etkilenenlerin belirleyici olduğu, kararların şeffaf ve kamusal biçimde alındığı demokratik mekanizmalar istiyoruz.

ADİL DÖNÜŞÜM YETMEZ; DEMOKRATİK DÖNÜŞÜM GEREKİR!

İşçiden uyum sağlaması, çiftçiden üretimini dönüştürmesi, yurttaştan tüketimini kısması istenirken şirketlerin kâr odaklı mülkiyet ve karar gücü dokunulmaz bırakılamaz. "Yeşil dönüşüm" adı altında doğanın ve emeğin yeni sömürü pazarlarına dönüştürülmesini, dönüşümün yeni maden sahaları, mülksüzleştirmeler ve işsizlik pahasına yapılmasını reddediyoruz.

Asıl soru şudur: Ne üretilecek, nasıl üretilecek, kimin için üretilecek ve kimin denetiminde olacak?

Üretimin toplumsal ihtiyaçlar ve ekolojik sınırlar gözetilerek yeniden örgütlenmesini; şirketlerin kâr hırsına terk edilen enerjinin, toprağın, suyun ve tüm ortak varlıklarımızın üzerinde kamusal mülkiyeti ve tabandan toplumsal denetimi savunuyoruz.

TARİHSEL SERMAYE MERKEZLERİNİN EKOLOJİK BORCU PARAYLA ÖLÇÜLEMEZ!

Sanayileşmenin servetini biriktirenlerle ekolojik yıkımın bedelini ödeyenler aynı değildir. Emperyalist merkezlerin tarihsel sorumluluğu karbon piyasalarına veya finansman paketlerine indirgenemez. Ekolojik yıkımın bedelini ödeyen halklar, kaynakların nasıl yönetileceği konusunda doğrudan karar sahibi olmalıdır.

COP31 GÜNLERİNDE ÜCRETLİ İZİN VE FİİLİ KATILIM HAKKIMIZI TALEP EDİYORUZ!

Emekçilerin ve gençlerin tartışmalara eşit koşullarda katılabilmesi için 9–20 Kasım 2026 tarihleri arasında:

- Etkinliklere katılmak isteyen kamu çalışanlarına idari, özel sektör çalışanlarına ücretli izin hakkı tanınmalıdır. Sendikaları ve meslek örgütlerini bu hakkı toplu sözleşmelerle ve fiili eylemlilikle güvenceye almaya çağırıyoruz.
- Katılım izinleri yıllık ücretten, primden veya iş güvencesinden düşülmemeli; sendikalı-sendikasız tüm çalışanlar için yasal koruma sağlanmalıdır.
- Antalya'daki kamusal etkinlikler için ücretsiz toplu ulaşım, düşük gelirlilere konaklama ve bağımlı yakını olanlara kamusal bakım desteği sağlanmalıdır.
- Emek, kadın, gençlik ve yaşam alanı örgütlerinin müzakere süreçlerine doğrudan ve bağımsız temsille katılımı tanınmalıdır.
- Yatırım planları ile ekolojik etki raporları şeffaf bir şekilde kamusal erişime açılmalı, toplumsal denetim hakkı engellenmemelidir.

15–16–17 KASIM'DA ANTALYA'DA BULUŞUYORUZ!
İklim Adaleti Forumu olarak 15–17 Kasım tarihlerinde Antalya'da buluşuyoruz.

Talan edilen meraların, kurutulan nehirlerin, yakılan ormanların ve toprağını savunan köylülerin sesiyle orada olacağız. Antalya'nın yalnızca şirketlerin ve kapalı kapı diplomasisinin vitrini olmasına izin vermeyeceğiz. Ücretimizden ve işimizden taviz vermeden, kendi örgütlerimiz ve meşru taleplerimizle toplanacağız.

Çünkü dünyanın geleceğini belirlemek ayrıcalıklı bir azınlığın tekeli değil; yaşamı her gün yeniden üretenlerin ellerindedir.

ZAMAN HAKKIMIZI İSTİYORUZ!
SÖZ, ÖRGÜTLENME VE KARAR HAKKIMIZI İSTİYORUZ!
ÜRETİM VE YAŞAM ÜZERİNDE TOPLUMSAL DENETİM İSTİYORUZ!

İKLİM ADALETİ FORUMU

İMZACI KURUMLAR:
${INITIAL_SIGNATORY_ORGANIZATIONS.map((org, idx) => `${idx + 1}. ${org}`).join('\n')}`;

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'cagri-metni-2026',
    slug: 'cop31e-dogru-iklim-adaleti-forumu-cagri-metni',
    title: 'COP31’e Doğru İklim Adaleti Forumu Çağrı Metni: Zamanımızı, Yaşamımızı, Geleceğimizi İstiyoruz!',
    excerpt: 'COP31 Şirketlerin Değil, Emeğin ve Halklarındır! 15–16–17 Kasım 2026 tarihlerinde Antalya’da buluşuyoruz.',
    content: CALL_TEXT_FULL,
    category: 'Sonuç Bildirgesi',
    tags: ['COP31', 'İklim Adaleti Forumu', 'Antalya', 'Emek', 'Demokratik Dönüşüm'],
    author: 'İklim Adaleti Forumu',
    authorRole: 'Ortak Çağrı Metni',
    date: '2026-10-16',
    readTimeMinutes: 5,
    featured: true,
    signable: true,
    keyPoints: [
      'Zaman da bir sınıf meselesidir: çalışma saatlerinin kısaltılması ve dinlenme hakkı.',
      'Biz seyirci değil, karar sahibiyiz: enerji, tarım, sanayi ve kent politikalarında demokratik mekanizmalar.',
      'Adil dönüşüm yetmez, demokratik dönüşüm gerekir: ortak varlıklar üzerinde kamusal mülkiyet ve toplumsal denetim.',
      '9–20 Kasım 2026 COP31 günlerinde ücretli izin ve fiili katılım hakkı.',
      '15–16–17 Kasım 2026 tarihlerinde Antalya’da İklim Adaleti Forumu buluşması.'
    ]
  }
];

export const BROCHURES: Brochure[] = [];

export const INITIAL_SIGNATORIES: Signatory[] = INITIAL_SIGNATORY_ORGANIZATIONS.map((org, idx) => ({
  id: `org-${idx + 1}`,
  name: org,
  organization: org,
  city: INITIAL_ORGANIZATION_CITIES[org] || '',
  date: '2026-10-16',
  type: 'institutional',
  emailVerified: true
}));

export const INITIAL_EXTRA_SIGNATORIES: Signatory[] = [
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
  },
  {
    id: 'sig-1792231606688',
    name: 'Ebru delice',
    city: 'Antalya',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792232026160',
    name: 'Tacim Çiçek',
    city: 'İzmir',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792232436607',
    name: 'Serdar Aktaş',
    organization: 'İşçi',
    city: 'Denizli',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-asli-odman',
    name: 'Aslı Odman',
    organization: 'Akademisyen',
    city: 'İstanbul',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-ziya-gokerkucuk',
    name: 'Ziya Gökerküçük',
    organization: 'Eğitimci',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-nur-nese-karahan',
    name: 'Nur Neşe Karahan',
    organization: 'Emekli',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-sefa-taskin',
    name: 'Sefa Taşkın',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-adnan-alin',
    name: 'Adnan Alin',
    organization: 'Eğitimci - Sendika Emekçisi',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-veli-bingoltekin',
    name: 'Veli Bingöltekin',
    organization: 'Araştırmacı / Yazar',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-baris-keskinkilic',
    name: 'Barış Keskinkılıç',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-ali-merdan-celik',
    name: 'Ali Merdan Çelik',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-yusuf-aksoy',
    name: 'Yusuf Aksoy',
    organization: 'Yazar',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-yuksel-kunter',
    name: 'Yüksel Kunter',
    organization: 'Emekli',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-rec-hidayet-karakus',
    name: 'Hidayet Karakuş',
    organization: 'Emekli',
    city: '',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  },
  {
    id: 'sig-1792237242014',
    name: 'Orhun Çoban',
    organization: 'Emekli/Gazeteci',
    city: 'Denizli',
    message: 'Birlikte kazanacağız...',
    date: '2026-10-17',
    type: 'individual',
    emailVerified: true
  }
];

export const INITIAL_POLICIES: Article[] = [
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
];

export const INITIAL_EVENTS: ForumEvent[] = [
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
];

export const INITIAL_FORUMS: Article[] = INITIAL_EVENTS.map((ev) => {
  const paragraphs = String(ev.description || ev.title).split(/\n\s*\n/);
  return {
    id: ev.id.replace(/^ev-/, 'forum-'),
    slug: ev.id.replace(/^ev-/, 'forum-'),
    title: ev.title,
    excerpt: paragraphs.slice(0, 2).join('\n\n') || ev.title,
    content: paragraphs,
    category: ev.type || 'Forum',
    date: ev.date,
    author: ev.location || 'İklim Adaleti Forumu',
    authorRole: 'İklim Adaleti Forumu',
    readTimeMinutes: 3,
    tags: [ev.type || 'Forum'],
    imageUrl: ev.imageUrl
  };
});

export const WORKING_GROUPS: WorkingGroup[] = [];
export const UPCOMING_EVENTS: ForumEvent[] = INITIAL_EVENTS;
