/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article, Brochure, Signatory, WorkingGroup, ForumEvent } from '../types.ts';

export const INITIAL_SIGNATORY_ORGANIZATIONS: string[] = [
  'Öğrenci Veli Derneği (VELİDER)',
  'Tüm Emeklilerin Sendikası',
  'Salda Gölü Koruma Derneği',
  'Uşak Ulubey Doğal Üretim ve Dayanışma Derneği (ÇEDAY)',
  'Gerede Çayı Temiz Aksın Platformu',
  'Derelerin Kardeşliği Akdeniz Platformu',
  'İkizdere Dernekler Federasyonu',
  'Uluslararası Çevre Gazetecileri Derneği',
  'Şavşat Dernekleri Federasyonu',
  'İstanbul Şavşat Derneği',
  'Samsun Çevre Platformu (SAMÇEP)',
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
  'Antalya Sanatçılar Derneği (ANSAN)',
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
  'Toroslar ve Akdeniz Kıyıları Çevre Koruma Derneği (TORAÇDER)',
  'İzmir Varto Ekoloji',
  'Haliç Dayanışması',
  'Gazipaşa Hepimiz Platformu',
  'Kaş Kadın Platformu',
  'Kaş Koruma İnisiyatifi',
  'Kaş Hayvanseverler',
  'Kaş Çevre ve Kültür Derneği',
  'Eğitim-Sen Kaş Şubesi',
  'Batı Karadeniz Çevre Gönüllüleri',
  'Akhisar Çevre Derneği',
  'Antalya Sol Feminist Hareket',
  "Ege 78'liler Sanat Ve Edebiyat Grubu",
  'Tüm Emeklilerin Sendikası Bornova Şubesi',
  'Tüm Emeklilerin Sendikası Konak Şubesi',
  'Edirne Çevre Gönülleri Derneği',
  'Keşan Görsel Sanatlar ve Kültürel Araştırmalar Derneği (ZERLANİS)',
  'Tüm Emeklilerin Sendikası İskenderun Temsilciliği',
  'Eğitim Sen- Ödemiş Temsilciliği',
  'Tüm Emeklilerin Sendikası Bozüyük',
  'Eğitim Sen - Bilecik Temsilciliği',
  'İzmir Devrimci 78’liler Derneği',
  'Karakoçan ve Yöresi Derneği',
  'Batı Antalya Çevre Platformu',
  'Kayınormanı Derneği',
  'Sakarya Tüm Emeklilerin Sendikası',
  'Fethiye Emekliler Dayanışması',
  'VELİ -DER Antalya Şubesi',
  'Artvin Çevre Platformu',
  'Artvin Kültür Yardımlaşma Derneği',
  'Munzur Koruma Kurulu (DEDEF)',
  'Giresun Doğa ve Çevre Derneği',
  'Taşova Çevre Platformu',
  'Alaçam Dürtmen Komite',
  'Ünye Çevre Platformu',
  'Fenerbahçe Kalamış Dayanışması',
  'Fatsa Doğa ve Çevre Derneği',
  'Alakır - Karacaören Doğa Kültür Derneği',
  'Döşemealtı Gönüllüleri',
  'Murgul Siyanüre Hayır Platformu',
  'Doğa İçin Sanat Derneği',
  'Sosyal Adalet Hareketi (SAHİ)',
  'Çepni Dernekleri Federasyonu'
];

const INITIAL_ORGANIZATION_CITIES: Record<string, string> = {
  'Tüm Emeklilerin Sendikası': 'İzmir',
  'Antalya Sanatçılar Derneği (ANSAN)': 'Antalya',
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
  'Murgul Siyanüre Hayır Platformu': 'Artvin'
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
  id: `init-org-${idx + 1}`,
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

export const INITIAL_DECLARATIONS: Article[] = [
  {
    "id": "decl-samsun-2026-10-17",
    "slug": "samsun-iklim-adaleti-forumu-sonuc-bildirgesi-17-10-2026",
    "title": "COP31’e Doğru Yerellerin İklim Adaleti Forumu – Samsun Sonuç Bildirgesi",
    "documentNumber": "17.10.2026 · Samsun",
    "date": "17 Ekim 2026",
    "author": "Samsun Çevre Platformu (SAMÇEP) · EMO Samsun Şubesi",
    "authorRole": "İkizdere, Alaçam Dürtmentepe, Ordu, Ünye, Giresun, Taşova, Gümüşhacıköy, Sinop ve Samsun Yerel Mücadeleleri",
    "category": "Sonuç Bildirgesi",
    "readTimeMinutes": 8,
    "tags": [
      "Samsun İklim Adaleti Forumu",
      "Karadeniz",
      "Sonuç Bildirgesi",
      "17 Ekim 2026",
      "SAMÇEP",
      "COP31"
    ],
    "keyPoints": [
      "1. İklim adaleti sağlanmalıdır",
      "2. Doğal varlıklar sermayenin talanına açılmamalıdır",
      "3. Enerji dönüşümü ekolojik ve toplumsal adalet temelinde yürütülmelidir",
      "4. Su, toprak ve gıda güvenliği korunmalıdır",
      "5. Yerel halkın karar süreçlerine katılımı güvence altına alınmalıdır",
      "6. İklim politikaları emekçilerin ve kırılgan kesimlerin haklarını korumalıdır",
      "7. Afetlere karşı bilimsel ve kamusal politikalar uygulanmalıdır",
      "8. COP31 süreci halkların ve yerellerin sesiyle şekillenmelidir",
      "9. Yerel mücadeleler arasında dayanışma büyütülmelidir",
      "10. Karadeniz’den Antalya’ya: İklim adaleti için dayanışmayı büyütüyoruz!"
    ],
    "excerpt": "DOĞAMIZI, TOPRAĞIMIZI, EMEĞİMİZİ, GELECEĞİMİZİ VE TÜM CANLILARIN YAŞAM HAKKINI SAVUNUYORUZ! 17 Ekim 2026 tarihinde Samsun Çevre Platformu’nun çağrısıyla İkizdere’den Alaçam Dürtmentepe’ye, Ordu’dan Ünye’ye, Giresun’dan Taşova’ya, Gümüşhacıköy’den Sinop’a ve Samsun’a uzanan yerel mücadele alanlarının katılımıyla düzenlenen forumun sonuç bildirgesidir.",
    "content": [
      "DOĞAMIZI, TOPRAĞIMIZI, EMEĞİMİZİ, GELECEĞİMİZİ VE TÜM CANLILARIN YAŞAM HAKKINI SAVUNUYORUZ! MÜCADELE ARKADAŞLARIMIZIN ANISI ÖNÜNDE SAYGIYLA EĞİLİYORUZ.",
      "2024’te hayvanlara yönelik yasa değişikliği, 2025’te İklim Kanunu ve maden düzenlemesi, 2026’da Milli Parklar Kanunu değişikliği... Kısa aralıklarla yaşamın farklı alanlarını etkileyen düzenlemeler çıkarıldı. Hayvanların yaşam hakkını, toprağı, suyu, ormanları ve emeği savunanların mücadelesi birbirinden ayrı düşünülemez. Yaşamı bir bütün olarak savunuyoruz!",
      "Doğayı, yaşam alanlarını, derelerini, ormanlarını, topraklarını ve halkın yaşam hakkını savunurken yaşamını yitiren, çevre mücadelesinin bedelini canıyla ödeyen tüm mücadele arkadaşlarımızı saygı, sevgi ve minnetle anıyoruz. Onların doğaya, yaşama ve geleceğimize sahip çıkmak için verdikleri mücadeleyi unutmayacağımızı; bıraktıkları dayanışma ve mücadele mirasını yaşatacağımızı bir kez daha ilan ediyoruz. Aramızdan koparılan arkadaşlarımızın anısı, doğayı ve yaşamı savunma kararlılığımızın bir parçası olmaya devam edecektir. Onların uğruna mücadele ettiği değerleri korumak, yaşam alanlarımıza sahip çıkmak ve ekolojik yıkıma karşı mücadeleyi büyütmek hepimizin ortak sorumluluğudur.",
      "Bizler; farklı kentlerde, köylerde ve yaşam alanlarında doğayı, toprağı, emeği ve tüm canlıların yaşam hakkını savunmak için mücadele eden çevre örgütleri, platformlar, dayanışma ağları ve yaşam savunucuları olarak, 17 Ekim 2026 tarihinde Samsun Çevre Platformu’nun çağrısıyla, Samsun Elektrik Mühendisleri Odası’nda düzenlenen COP31’e Doğru Yerellerin İklim Adaleti Forumu’nda bir araya geldik.",
      "İkizdere’den Alaçam Dürtmentepe’ye, Ordu’dan Ünye’ye, Giresun’dan Taşova’ya, Gümüşhacıköy’den Sinop’a ve Samsun’a uzanan yerel mücadele alanlarının katılımıyla, deneyimlerimizi ve yerellerde yürütülen mücadeleyi paylaştık. Doğanın, yaşam alanlarının ve canlıların karşı karşıya olduğu tehditleri, iklim krizinin etkilerini ve bu tehditlere karşı ortak mücadele olanaklarını değerlendirdik. Bir kez daha gördük ki doğanın tahribatı, iklim krizi ve ekolojik yıkım birbirinden bağımsız sorunlar değildir. Doğal varlıkların sınırsız bir ekonomik büyüme anlayışıyla metalaştırılması; ormanları, meraları, tarım alanlarını, su kaynaklarını ve yaşam alanlarını tehdit etmektedir. Bu süreçten en fazla etkilenenler ise çoğu zaman karar mekanizmalarına katılamayan köylüler, çiftçiler, emekçiler ve yerel halklardır. İklim krizinin sorumluluğunu en az taşıyan toplum kesimlerinin bedel ödemek zorunda bırakılmasını kabul etmiyoruz. İklim politikalarının sermayenin çıkarlarına değil, halkın ihtiyaçlarına, bilimsel verilere, ekolojik sınırlara ve toplumsal adalete dayanması gerektiğini savunuyoruz. Bu anlayışla aşağıdaki taleplerimizi kamuoyuyla paylaşıyoruz.",
      "1. İklim adaleti sağlanmalıdır: İklim krizi yalnızca çevresel değil, aynı zamanda ekonomik, toplumsal ve siyasal bir adalet sorunudur. İklim politikaları hazırlanırken tarihsel sorumluluklar, ülkelerin ve şirketlerin emisyonları, toplumların kırılganlıkları ve eşitsizlikler dikkate alınmalıdır. Krizin maliyeti emekçilere, yoksullara, çiftçilere ve gelecek kuşaklara yüklenmemelidir.",
      "2. Doğal varlıklar sermayenin talanına açılmamalıdır: Ormanlarımız, dağlarımız, meralarımız, kıyılarımız, tarım alanlarımız ve su havzalarımız yalnızca ekonomik kazanç sağlayan kaynaklar değildir. Bunlar yaşamın devamlılığının temelidir. Doğal varlıkları geri dönüşü olmayan biçimde tahrip eden, ekokırım projelerine karşı çıkıyor; kamu yararının, ekolojik bütünlüğün ve yaşam hakkının esas alınmasını istiyoruz. Doğal yaşam döngüsü yaban hayatıyla birlikte bir bütündür! İhaleyle satışa sunulan, para karşılığında öldürttürülen her can yaşamın ve doğanın bir parçasıdır!",
      "3. Enerji dönüşümü ekolojik ve toplumsal adalet temelinde yürütülmelidir: İklim kriziyle mücadele, fosil yakıtlara bağımlılığın azaltılmasını ve enerji sisteminin dönüştürülmesini gerektirmektedir. Ancak yenilenebilir enerji yatırımları da doğaya, tarıma ve yerel topluluklara zarar vermeyecek biçimde planlanmalıdır. Enerji yatırımlarında yer seçimi, çevresel etkiler, doğal yaşam, tarımsal üretim ve halkın katılımı birlikte değerlendirilmelidir. Enerji politikaları birkaç şirketin kazancına değil, kamusal yarara ve toplumun enerjiye erişim hakkına hizmet etmelidir.",
      "4. Su, toprak ve gıda güvenliği korunmalıdır: Su kaynaklarının kirletilmesine, aşırı tüketilmesine ve yaşam hakkını tehdit edecek biçimde ticarileştirilmesine karşıyız. Verimli tarım topraklarının, meraların ve ormanların korunmasını; çiftçilerin desteklenmesini ve yerel gıda üretiminin güçlendirilmesini savunuyoruz. İklim krizine karşı mücadele, suyun ve gıdanın herkes için erişilebilir olmasını güvence altına almalıdır.",
      "5. Yerel halkın karar süreçlerine katılımı güvence altına alınmalıdır: Bir bölgede yaşayan insanların yaşam alanlarını doğrudan etkileyen projeler hakkında söz ve karar hakkı bulunmalıdır. Çevresel etki değerlendirmesi süreçleri şeffaf, bilimsel, bağımsız ve katılımcı yürütülmelidir. Halkın bilgi edinme, itiraz etme ve örgütlenme hakkı korunmalı; yerel mücadeleler baskı altına alınmamalıdır. Hiçbir yatırım kararı, o bölgede yaşayan insanların yaşam hakkı ve geleceği yok sayılarak alınmamalıdır.",
      "6. İklim politikaları emekçilerin ve kırılgan kesimlerin haklarını korumalıdır: İklim krizinin etkileri toplumun tüm kesimlerini aynı ölçüde etkilememektedir. Düşük gelirli kesimler, tarımla geçinenler, açık alanlarda çalışan emekçiler ve afetlere karşı kırılgan topluluklar daha ağır sonuçlarla karşılaşmaktadır. Adil bir dönüşüm politikası; çalışanların haklarını, istihdam güvencesini, insanca yaşam koşullarını ve temel hizmetlere erişimi korumalıdır. İklim politikaları toplumsal eşitsizlikleri derinleştirmemeli, azaltmalıdır.",
      "7. Afetlere karşı bilimsel ve kamusal politikalar uygulanmalıdır: İklim değişikliğiyle ilişkili aşırı hava olayları, seller, kuraklık ve orman yangınları karşısında bilimsel temelli risk azaltma ve uyum politikaları geliştirilmelidir. Kentler ve kırsal yerleşimler afetlere karşı dayanıklı hâle getirilmeli; su, enerji ve iletişim altyapılarının güvenliği sağlanmalıdır. Afetler yalnızca müdahale aşamasında değil, önleme, hazırlık, planlama ve iyileştirme süreçleriyle birlikte ele alınmalıdır.",
      "8. COP31 süreci halkların ve yerellerin sesiyle şekillenmelidir: İklim zirvelerinin başarısı yalnızca diplomatik açıklamalarla veya verilen sözlerle ölçülemez. Alınan kararların uygulanması, emisyonların azaltılması, doğal varlıkların korunması ve iklim krizinden etkilenen toplulukların yaşam koşullarının iyileştirilmesi esas alınmalıdır. COP31 sürecinde yerel toplulukların, bilim insanlarının, meslek örgütlerinin, emekçilerin ve çevre hareketlerinin görüşleri dikkate alınmalıdır. İklim politikaları, uygulamada karşılığı olmayan vaatlerden ibaret kalmamalıdır.",
      "9. Yerel mücadeleler arasında dayanışma büyütülmelidir: Farklı kentlerde yürütülen çevre mücadeleleri aynı ortak sorunun parçalarıdır. Yerel deneyimlerin paylaşılması, bilgi ve belge alışverişinin geliştirilmesi, ortak etkinliklerin düzenlenmesi ve mücadeleler arasında dayanışma ağlarının güçlendirilmesi büyük önem taşımaktadır. Hiçbir yerel mücadele yalnız değildir. Bir bölgede doğanın, suyun, ormanın veya tarım alanlarının savunulması, hepimizin geleceğinin savunulmasıdır.",
      "10. KARADENİZ’DEN ANTALYA’YA: İKLİM ADALETİ İÇİN DAYANIŞMAYI BÜYÜTÜYORUZ! Samsun’da bir araya gelen Karadeniz’in doğa ve yaşam hakkı savunucuları olarak, yerel mücadelelerimizi ortaklaştırmak ve iklim adaleti mücadelesini büyütmek konusunda kararlıyız. Bu doğrultuda, 15–16–17 Kasım 2026 tarihlerinde Antalya’da gerçekleştirilecek İklim Adaleti Forumu’na Karadeniz’den güçlü ve ortak bir katılım sağlamak amacıyla gerekli organizasyon çalışmaları yürütülecektir. Karadeniz’in dört bir yanında doğamızı, derelerimizi, ormanlarımızı, dağlarımızı, tarım alanlarımızı ve yaşam alanlarımızı savunan mücadelelerin sesini Antalya’ya taşıyacağız. Yerellerde biriken deneyimlerimizi, taleplerimizi ve ortak mücadele irademizi ülke genelindeki iklim adaleti hareketiyle buluşturmak için dayanışmamızı güçlendireceğiz. Antalya buluşmasını yalnızca bir toplantı değil, yerel mücadelelerin birbirinden güç aldığı, ortak sözün büyüdüğü ve dayanışmanın somutlaştığı bir mücadele zemini olarak görüyoruz. Karadeniz’den Antalya’ya uzanan bu dayanışma köprüsünü birlikte kuracak; doğamızı, yaşam alanlarımızı ve geleceğimizi savunmak için ortak mücadelemizi büyüteceğiz. Karadeniz’in sesi Antalya’da yankılanacak! Yerellerin mücadelesi birleşecek, iklim adaleti için dayanışma büyüyecek!",
      "SON SÖZÜMÜZ",
      "Bizler, doğayı yalnızca insanın kullanımına sunulmuş bir kaynak olarak görmüyoruz. Doğanın, bütün canlıların yaşamının ve gelecek kuşakların ortak varlığı olduğuna inanıyoruz. İklim adaleti olmadan çevresel adaletin, çevresel adalet olmadan toplumsal adaletin sağlanamayacağını biliyoruz. Doğayı ve yaşam alanlarını korumak için yürütülen yerel mücadelelerin yan yana gelmesi, ortaklaşması ve dayanışmayla güçlenmesi gerektiğini bir kez daha vurguluyoruz. Toprağımıza, havamıza, suyumuza, ormanlarımıza, meralarımıza ve yaşam alanlarımıza sahip çıkıyoruz. İklim adaleti istiyoruz! Ekolojik yıkıma karşı mücadeleyi büyütüyoruz! Yerellerin sözünü ve dayanışmasını güçlendiriyoruz!",
      "Bu bildirgeyi, 15–16–17 Kasım 2026 tarihlerinde Antalya’da gerçekleştirilecek İklim Adaleti Forumu sürecine taşımak üzere kamuoyunun bilgisine sunuyoruz.",
      "COP31’E DOĞRU YERELLERİN İKLİM ADALETİ FORUMU - SAMSUN"
    ]
  },
  {
    "id": "decl-izmir-2026-06-10",
    "slug": "izmir-iklim-adaleti-forumu-toplanti-raporu-10-06-2026",
    "title": "İzmir İklim Adaleti Forumu Toplantı Raporu ve Sonuç Metni",
    "documentNumber": "10.06.2026 · İzmir",
    "date": "10 Haziran 2026",
    "author": "İzmir İklim Adaleti Forumu Sekretaryası · İzmir Tabip Odası Salonu",
    "authorRole": "Çiftçi-Sen · Tarım-Sen · Ekoloji Platformları · Meslek Odaları · Sendikalar ve DKÖ’ler",
    "category": "Sonuç Bildirgesi",
    "readTimeMinutes": 9,
    "tags": [
      "İzmir İklim Adaleti Forumu",
      "Sonuç Bildirgesi",
      "Toplantı Raporu",
      "10 Haziran 2026",
      "Enerji Demokrasisi",
      "Gıda Egemenliği",
      "COP31"
    ],
    "keyPoints": [
      "Aşağıdan Yukarıya Taban Örgütlenmesi ve Resmi COP Eleştirisi",
      "HES, JES, RES ve GES Projelerinin Ekolojik Yıkımı ve Enerji Demokrasisi",
      "Savaşlara ve Emperyalist İşgallere Karşı Barış Mücadelesi",
      "İklim Krizi, Çevre Kirliliği ve Koruyucu Halk Sağlığı",
      "Endüstriyel Tarıma Karşı Agro-Ekoloji ve Gıda Egemenliği",
      "BM Köylü Hakları Deklarasyonu’nun Kabulü Çağrısı",
      "Aliağa Gemi Sökümü, Çöp İthalatı ve Kent Hakkı Mücadelesi",
      "Enternasyonalist Dayanışma ve İzmir Sekretaryasının Oluşturulması"
    ],
    "excerpt": "İzmir İklim Adaleti Forumu olarak 10 Haziran 2026 günü İzmir Tabip Odası toplantı salonunda Çiftçi-Sen, Tarım-Sen, ekoloji platformları, meslek odaları, sendikalar, demokratik kitle örgütleri ve yurttaşların katılımıyla gerçekleştirilen ilk buluşmanın sonuç raporu ve sekretarya kararıdır.",
    "content": [
      "İzmir İklim Adaleti Forumu olarak 10 Haziran 2026 günü İzmir Tabip Odası toplantı salonunda ilk buluşmamızı gerçekleştirdik. Buluşmamızda Çiftçi-Sen ve Tarım-Sen temsilcilerinin açılış konuşmalarından sonra toplantı gündemine ilişkin farklı kurum, kuruluş temsilcileri ve kişisel olarak katkı koymak isteyenler söz aldı.",
      "Forum, başından itibaren yerelden başlayarak aşağıdan yukarıya doğru örgütlenme hedefiyle hareket etmeye çalışmaktadır. Resmi COP Zirveleri tıpkı DTÖ, Dünya Bankası, IMF ve NATO gibi, emperyalist politikaların aparatlarıdır. Resmi COP’larda devlet ve sermaye temsilcileri bir araya gelerek sözde “iklim krizini” tartışmakta, “iklim krizine çözüm” adı altında aslında sermayenin ihtiyacına uygun çözümler üretmektedirler. İklim Krizi’nin gerçek mağdurlarını sürece katmadan tepeden inme kararlar almakta, aldıkları kararlarla da iklim krizini daha da derinleştirmektedirler.",
      "İklim krizinin gerçek mağdurları olarak krize karşı gerçekçi çözümleri savunup mücadeleyi örgütlerken de tepeden inme yaklaşımlarla değil, tabandan örgütlenen, ihtiyaçlara kulak veren buluşmaların gerçekliğine inandık. Bu anlayışla yola çıktık. Çünkü nasıl bir düzen istiyorsak ona uygun örgütlenip ve mücadele etmenin doğru ve gerekli olduğuna inanıyoruz.",
      "Biz İklim Adaleti’nin gerçekleşebilmesi için krizin gerçek mağdurlarının söz, yetki, karar süreçlerinde olduğu bir örgütlenme anlayışını savunuyor ve inanıyoruz.",
      "Bunların doğrultusunda forumda çevre ve ekoloji mücadelesi veren platformların temsilcileri, yurttaşlar, meslek odaları, sendika, demokratik kitle örgütleri ve siyasi parti temsilcileri bir araya gelerek İklim Krizi’nin nedenlerini, yarattığı olumsuz sonuçları ve çözüm önerilerini tartıştık.",
      "Doğanın Metalaştırılması ve Enerji Politikaları: Aynı zamanda, 21. Yüzyılda, sermayenin sermaye birikimini çoğaltmak için enerjiyi, su kaynaklarını ve gıdayı kontrol etme isteğinin sonucu olarak doğayı metalaştırdığı, meraların, otlakların, akarsuların, ekili arazilerin, ormanların sermayenin ihtiyacını karşılayabilmek için madenciliğe, “yenilenebilir enerji”, “temiz enerji” propagandasıyla yeni enerji sistemlerine açıldığı dillendirilmiş ve COP toplantılarında alınan kararlarla da yeni enerji sistemlerini uygulamaya koyan ülkelere ve şirketlere “karbon salmıyorlar” gerekçesiyle uluslararası maddi teşvikler sunulduğu, bu politikalara ve sermaye yatırımlarına karşı mücadele edilmesinin önemi vurgulanmış ve bölgemizden ve ülkemizden örnekler verilmiştir.",
      "HES’lerin Yarattığı Tahribat: Yine forumda dile getirilen konulardan birisi de; Karadeniz Bölgesi başta olmak üzere HES’lerin yarattığı tahribattır. HES’ler nedeniyle çiftçilerin/köylülerin ve tüm canlıların suya erişimlerinin kısıtlanmasından kaynaklı olarak ekolojik dengenin bozulduğu, bitkisel üretim için yararlı böcekler yerine zararlı böceklerin popülasyonlarının arttığıdır.",
      "JES’lerin Su ve Toprak Varlıklarına Zararları: Bölgemizdeki JES’lerin verdiği zararlar konuşulmuş, atmosfere saldıkları zararlı gazlarla sera gazı oluşumuna katkı sundukları ve yeraltına deşarj edilirken saldıkları kimyasallarla da yeraltı ve yerüstü su kaynaklarını bitkisel üretim ve canlılar için zararlı hale getirdikleri, her geçen gün de bu zararların arttığı dile getirilmiştir.",
      "RES, GES, Nadir Toprak Elementleri ve Enerji Demokrasisi: Rüzgar ve Güneş enerji santrallerinin de ekolojik dengeye zarar verdiği, karbon salmamasının “temiz” olduğu anlamı taşımadığı, her şeyden önce bu enerji santrallerinin kurulabilmesi/çalışabilmesi için yoğun bir şekilde “nadir toprak elementlerine” ihtiyaç olduğu dillendirilmiş ve bu elementlerin çıkartılması sürecinin en az “siyanürlü liç” yöntemiyle altın çıkartmak kadar toprağı, havayı, su kaynaklarını ve canlıları zehirlediği dillendirilmiştir. Çünkü bu elementler binlerce dönüm tarım arazisinden, binlerce ton kimyasal kullanılarak ayrıştırılmaktadır. Bu kullanılmış kimyasallar ve kimyasal havuzları suyu, toprağı, havayı olumsuz etkilemekte iklim krizinin asli unsuru haline gelmektedir. Ülkemiz de bu nadir toprak elementlerinin bulunduğu ve Türkiye’nin bu konuda sermayenin talan girişimlerinin başlatıldığı bir ülke olduğu belirtilmiştir. Ayrıca bu elektrik santrallerinin kurulduğu arazilerin ormanlık bölge veya tarım arazisi olduğu ve arazilerine el konulan çiftçilerin/köylülerin yurtlarını terk etmek zorunda kaldıkları, bir anlamıyla İklim göçerlerinin ortaya çıkmaya başladığı belirtilerek sermayenin ihtiyacına uygun enerji politikalarına karşı çıkılması, “Enerjide Adalet ve Enerji Demokrasisi” istenmesi gerektiği, bunun için de sadece COP31 Toplantılarına kadar değil, bu politikalardan vazgeçilmesini sağlayana kadar birlikte mücadeleyi örmek zorunda olduğumuz konuşulmuştur.",
      "Savaşlar, İşgaller ve Barış Mücadelesi: Emperyalizmin enerji, su ve gıda politikalarını uygulatmak için sürdürdüğü işgaller ve savaşlar da İklim krizine yol açan en önemli nedenlerden birisidir. Bombalar, silahlar, uçaklar gerek üretim aşamasında gerekse de kullanıldıkları zaman canlı yaşamını, oksijen salımı yapan bitkileri yok ederek ekolojik yapıları darmadağın etmektedir. Savaş sırasında atmosfere salınan gazlar, yanan binalar, yakılan ağaçların saldığı karbondioksit vb. gazlar da sera gazını çoğaltmakta iklim krizini tetiklemektedir. Bütün yönleriyle bu savaşlara karşı durmanın ve Barış için mücadele etmenin de iklim krizine çözüm için mücadelenin bir parçası olduğu dillendirilmiştir.",
      "İklim Krizi ve Koruyucu Halk Sağlığı: Forumda iklim krizinin etkileri aynı şekilde bir halk sağlığı sorunu olarak da ele alınmış, İklim Krizine yol açan politika ve sermaye yatırımlarının Halk Sağlığını da olumsuz etkilediği, ekolojik dengeyi bozan, toprağı, suyu, havayı kirleten, iklim krizine yol açan sermaye yatırımlarının insanları farklı boyutlarda hasta ettiği, kanser vakalarını arttırdığı örneklendirilerek konuşulmuş, Koruyucu Sağlık Hizmeti açısından da; gerek enerji politikalarının gerekse de gıda politikalarının değiştirilmesi gerektiği bunun için de birlikteliklerin ve mücadelenin büyütülmesi gerektiği dillendirilmiştir.",
      "Endüstriyel Tarım Kıskacına Karşı Agro-Ekoloji ve Gıda Egemenliği: Ülkelere dayatılmış olan endüstriyel tarım sisteminin iklim krizinin en önemli nedenlerinden birisi olduğu, kullanılan kimyasalların toprağın karbon emme özelliğini ortadan kaldırdığı gibi bu kimyasalların üretim, depolanma ve kullanım sürecinde yoğun enerji tüketimine neden olduğu dillendirilerek; “yerelde üretip, yerelde tüketme, mevsiminde üretip mevsiminde tüketme” anlayışı yerine şirket gıda sisteminin işlenmiş, dondurulmuş gıda oluşturma, mevsim dışı ürünler üretme ve ihracat yapma politikalarının teşvik edildiği, endüstriyel tarım ve gıda sisteminin küresel sera gazı üretiminde %44’ten fazla bir paya sahip olduğunun kanıtlandığı konuşularak Tarımsal üretimi kendi doğal döngüsüne döndürecek politikalar tartışılmadan iklim krizinin ekolojik ve sosyal problemlerinin çözülebileceğinden bahsedilemeyeceği, yerküreyi soğutma potansiyeline sahip olan geleneksel, agro-ekolojik tarım modeline dönülmesi gerektiği, her halkın kendi kültürüne uygun gıdayı üretme ve tüketme hakkını sağlayan Gıda Egemenliği mücadelesinin üreticiler ve tüketicilerle birlikte büyütülmesi gerektiği, bunun aynı zamanda herkesin Sağlıklı Gıdaya Erişim Hakkını ve halk sağlığını ve tüm gezegenin sağlığını korumak anlamı taşıdığı konuşulmuştur.",
      "BM Köylü Hakları Deklarasyonu: Forum’da Çiftçi-Sen’in bileşeni olduğu 81 ülkeden 200 milyona yakın üyesi olan La Via Campesina’nın (Çiftçi/Köylü Yolu) hazırladığı ve 2018 yılında BM Genel Kurulu’nda kabul edilen kısa adı “Köylü Hakları Deklarasyonu” olan “Köylüler ve Kırsalda Çalışan Diğer İnsanların Hakları Deklarasyonu”na atıfta bulunulmuş, BM Genel Kurulu’nda Deklarasyon onaylanırken TC Devleti Temsilcisi’nin “Çekimser Oy” kullandığı, yani bir anlamıyla Deklarasyonu kabul etmediği, bu nedenle de İç Hukuk Düzenlemesi yapmadığı, TBMM’deki muhalefet partilerinin de bu konuda sessiz kaldığı, çiftçilerin/köylülerin temiz suya, temiz toprağa, temiz havaya, sağlıklı tohuma erişim hakkını kolaylaştıracak ve ekolojik yıkımın bir anlamıyla durdurulmasına yardımcı olacak olan bu Deklarasyonun kabulü için adım atmadığı dillendirildi ve TBMM’de bulunan muhalefet partilerinin eğer iklim krizinin gerçekçi çözümünü istiyorlarsa bu Deklarasyonun Kabulü için TBMM’ye taşımaları gerektiği dillendirilmiştir. Çünkü bu Deklarasyon Suyun, Toprağın, Havanın temiz tutulması için devletlere yükümlülükler yüklemektedir.",
      "Kent Hakkı, Aliağa Gemi Sökümü ve Çöp İthalatı: Forumda kentlerdeki çevre ve doğa katliamları da dillendirilmiştir. Yerel yönetimlerin de çoğu kez bu konuda sessiz kaldığı gerek imar planlarıyla gerekse de “Enerjide Yeşil Dönüşüm” adı altında kent ve kentli haklarına zarar verdiği bu konuda da mücadele yürütülmesi gerektiğinin altı çizilmiştir. Yereldeki önemli problemlerden birisinin İzmir’in dünyanın ve Avrupa’nın çöplüğü haline gelmesi olduğu, asbestli gemilerin Aliağa’da söküme getirildiği, çöpten elektrik enerjisi üretmek için Avrupa’dan çöp ithal edildiği vb. sorunlar da dile getirilmiştir. Bu konuda da birlikte mücadele etmenin önemi vurgulanmıştır.",
      "Bu konulardaki mücadelenin farklı fon kullanımlarıyla değil Sözün, Yetkinin, Kararın bir bütün olarak işçi sınıfının tüm bileşenlerinde, köylülerde, kentlilerde ve emekçilerde olduğu örgütlenmelerle büyüyebileceği ve sonuç alınabileceği konusunda hemfikir olunmuştur.",
      "Enternasyonalist Dayanışma ve COP31 Alternatif İklim Zirvesi: İklim Krizinin küresel bir sorun olduğu bu yönüyle de mücadelenin ve dayanışmanın İklim Krizinin gerçek mağdurlarıyla enternasyonalist bir dayanışma içinde yürütülmesi gerektiği vurgulanmıştır. Bu yönüyle COP31 Alternatif İklim Zirvesi’nin dünyadaki “İklim Adaleti” talebi içinde bulunan ve “Yeşil Boyama” mantığıyla hareket etmeyen işçi sınıfı örgütleriyle, tarım işçisi ve çiftçi örgütleriyle, çoban ve göçerlerle, ekolojistlerle, toprağına, suyuna, havasına, gıdasına sahip çıkan bütün hareketlerle buluşmasını hedefleyen, ülkemizin gündemini dünya gündemine taşımaya çalışırken başka coğrafyalardaki mücadele deneyimlerinin birbirinden birçok şey öğrenebileceği çalıştayları örgütlemek üzere hareket edilmesi ve yerelden küresele uzanan bir tarzda örgütlenmesi ve uzun vadeli bir mücadelenin hazırlığı anlamı taşıması gerektiği vurgulanmıştır.",
      "Bütün bu sürecin gerek İzmir düzeyinde, gerekse de bölge ve ülke düzeyinde örgütlenmesine yardımcı olmak amacıyla bir sekretarya oluşturulması ve bu sekretaryanın daha sonradan katılmak isteyenlere açık olması karara bağlanmıştır.",
      "İzmir İklim Adaleti Forumu Sekretarya Üyeleri: Dicle Dilan Salman, Seda Nur Parmaksız, İsmail Hakkı Ortaköy, Veli Bingöltekin, Umut Kocagöz, Adnan Çobanoğlu"
    ]
  },
  {
    "id": "decl-antalya-2026-01-28",
    "slug": "antalya-iklim-adaleti-forumu-sonuc-bildirgesi-28-01-2026",
    "title": "Antalya İklim Adaleti Forumu Sonuç Bildirgesi",
    "documentNumber": "28.01.2026 · Antalya",
    "date": "28 Ocak 2026",
    "author": "İklim Adaleti Forumu Sekreteryası · Antalya Barosu Ev Sahipliği",
    "authorRole": "17 Dernek ve İnisiyatif · 5 Sendika · 5 Meslek Odası · 5 Siyasi Parti · Kent Konseyi",
    "category": "Sonuç Bildirgesi",
    "readTimeMinutes": 12,
    "tags": [
      "Antalya İklim Adaleti Forumu",
      "Sonuç Bildirgesi",
      "28 Ocak 2026",
      "Antalya Barosu",
      "COP31",
      "İklim Adaleti"
    ],
    "keyPoints": [
      "Forumun Katılımcı Yapısı ve Demokratik İşleyişi (Madde 1–3)",
      "Forumun Kuruluşu ve Niteliği (Madde 4–6)",
      "Sekreteryanın Kurulması ve Yapısı (Madde 7–9)",
      "İklim Adaleti Tanımı ve İlkeleri (Madde 10–14)",
      "Antalya Bağlamında İklim Adaletsizliği: Yerel Sorunlar ve İhlaller (Madde 16)",
      "Forumun Amacı ve Misyonu (Madde 17)",
      "Dayanışma ve Ulusal/Uluslararası Zemin (Madde 18–22)",
      "Gelecek Planlaması, Yol Haritası ve Sonuç Çağrısı (Madde 23–26)"
    ],
    "excerpt": "Antalya İklim Adaleti Forumu 28.01.2026 tarihinde Antalya Barosunun çağrısı ve ev sahipliği ile 17 dernek ve inisiyatif, 5 siyasi parti, 5 sendika, 5 meslek odası, Kent Konseyi ve yerel yönetim temsilcileri ile toplanmış; 27 katılımcının söz aldığı doğrudan demokratik forum sürecinin ardından ortak iradeyi yansıtan bu Sonuç Bildirgesi kolektif yazım süreciyle kamuoyuna sunulmuştur.",
    "content": [
      "Antalya İklim Adaleti Forumu 28.01.2026 tarihinde Antalya Barosunun çağrısı ve ev sahipliği ile 17 dernek ve insiyatif, 5 siyasi parti, 5 sendika, 5 meslek odası, Kent Konseyi ve bir kısım yerel yönetim temsilcileri ile toplanmıştır. Toplantının ilk bölümünde Antalya Barosu Başkanı Av. Ali Çağdaş Bozaner açılış konuşması gerçekleştirmiştir. Akabinde Antalya Barosu Çevre ve İmar İzleme Kurulu Başkanı Av. Duygu Kozanoğlu ve oturum başkanlığını üstlenen Antalya Barosu Toplumsal Olay ve Davaları İzleme Kurulu Başkanı Av. Salim Berkay Aksu toplantı gündemine giriş niteliğinde konuşmalar yapmışlardır.",
      "Açılış ve toplantı gündemine giriş konuşmalarının ardından Türkiye Barolar Birliği adına TBB Çevre ve Kent Hukuku Komisyonu Sekreteri Av. Fevzi Özlüer “İklim Krizi, Devlet, Sermaye ve İklim Adaleti- Antalya COP31 Yolunda (Demokratik Bir Çıkış Arayışı)” konulu sunum gerçekleştirmiştir. Sunumun ardından toplantıda hazır bulunanların söz alacağı forum kısmına geçilmiştir.",
      "Farklı kurum, kuruluş temsilcileri ve hazır bulunan yurttaşlardan 27 kişi söz alarak sürece ilişkin katkı, öneri ve değerlendirmelerde bulunmuştur. Katkı ve değerlendirmelere ilişkin toplantı notları hazırlanarak katılımcıların mail adresine gönderilmek ve sürecin devamına ilişkin zemin oluşturmak amacıyla kayıt altına alınmıştır. Sonuç Bildirgesi; Forum’un iklim adaleti perspektifini en genel haliyle yansıtmak ve kamuoyunu sürece ilişkin bilgilendirmek amacıyla hazırlanmıştır.",
      "Bu metin, Antalya’da iklim adaleti mücadelesini inşa etmek için bir araya gelen İklim Adaleti katılımcıların ortak iradesini yansıtabilmek amacıyla ve forum sırasında ortaya konan görüşler ve alınan kararlar doğrultusunda kolektif bir yazım süreciyle hazırlanmıştır. Bu anlamda Antalya İklim Adaleti Forumu, merkezi veya hazır reçetelere değil, doğrudan katılımcı, yerel ve yatay organizayon süreçlerine ve tabanın demokratik iradesine dayanmaktadır.",
      "Aşağıdaki metinle forumun bileşimi, temel ilkeleri, Antalya özelindeki tespitler, genel itibariyle mücadele başlıkları ve gelecek planlamasına dair sonuçlar kamuoyunun bilgisine sunulmuştur.",
      "Forumun Katılımcı Yapısı ve Demokratik İşleyişi",
      "1. Antalya İklim Adaleti Forumu, geniş katılımlı ve çeşitli bir bileşimle gerçekleştirilmiştir. Antalya Barosu’nun çağrısıyla düzenlenen bu forumda, çevre ve iklim mücadelesi veren birçok sivil toplum örgütü, meslek odası, sendika, platform, demokratik kitle örgütü ve siyasi parti temsilcileri ile akademisyenler, hukukçular ve yurttaşlar bir araya gelmiştir. Kadınlardan gençlere, işçilerden çiftçilere, çeşitli toplumsal kesimlerden bireyler aynı çatı altında söz hakkı kullanmıştır. Bu çeşitli yapı, iklim adaleti mücadelesinin toplumun her kesimini ilgilendirdiğinin ve ancak birleşik bir dayanışmayla başarıya ulaşabileceğinin temel ölçütü olarak kabul edilmiştir.",
      "2. Forum, doğrudan demokrasi ilkesiyle işletilmiş; tüm katılımcılara serbestçe söz alma imkanı tanınmıştır. Herkesin görüş ve deneyimlerini eşit biçimde dile getirebilmesi için konuşmalar, bir kolaylaştırıcı niteliğinde olan oturum başkanının eşliğinde, belirli bir sırayla ve süreye riayet edilerek yapılmıştır. Hiçbir hiyerarşik düzene veya merkezi otoriteye dayanmadan, tabanın sesini ön plana çıkaran bu yöntem sayesinde forum gerçek anlamda bir halk kürsüsü işlevi görmüştür. Söz alma yöntemleri, isteyen her katılımcının kendi deneyim ve önerilerini sunabileceği şekilde düzenlenmiş; böylece taban örgütlenmesinin ve katılımcı söz hakkının en geniş biçimde hayata geçmesi sağlanmıştır. Forum boyunca gerek kent merkezinden gerekse ilçelerden veya şehir dışından gelen katılımcılar, kendi yaşam alanlarında karşılaştıkları ekolojik ve toplumsal sorunları dile getirerek ortak çözüm arayışına katkıda bulunmuştur.",
      "3. Alınan kararlar da katılımcı ve şeffaf süreçlerle belirlenmiştir. Bu yönüyle Antalya İklim Adaleti Forumu, klasik kapalı kapılar ardında karar alma yöntemlerinden tamamen farklı, doğrudan katılımın ve kolektif aklın hakim olduğu bir demokratik sürecin örneğini ortaya koymuştur.",
      "Forumun Kuruluşu ve Niteliği",
      "4. Antalya İklim Adaleti Forumu, herhangi bir merkezi yapının uzantısı olmayan, tamamen yerel insiyatiflerle ve yatay örgütlenme esaslarına göre kurulmuş özerk bir platformdur. Forum, ne merkezi idarenin ne de belirli bir siyasi yapının güdümündedir, yerelden kurulan ve aşağıdan yukarıya örgütlenen bir kamusal tartışma zemini olarak şekillenmiştir. Bu niteliğiyle, iklim krizine karşı mücadelede tepeden inme yaklaşımlara alternatif oluşturan bağımsız bir yurttaş inisiyatifi niteliğindedir. Antalya Barosu öncülüğünde başlatılan süreç, hiçbir üst yapının yerel uzantısı değildir; aksine kentte yıllardır süren ekoloji ve kent mücadelesi birikimine dayanan ve tamamen katılımcı iradeyle yaşam bulan bir forumdur.",
      "5. Forumumuz, geçmişten günümüze uzanan katılımcı halk forumları geleneğinin güncel bir tezahürü olarak değerlendirilebilir niteliktedir. Çeşitli mücadele deneyimlerinin ışığında, yatay örgütlenme biçimini benimsemiş olan Antalya İklim Adaleti Forumu’nda hiyerarşik karar alma yapılarına yer yoktur. Forum, farklı görüş ve arka planlardan gelen insanların eşit söz hakkıyla buluştuğu, ortak akıl geliştirdiği bir meclis hüviyetindedir. Bu yönüyle, katılımcı forum geleneğini Antalya ölçeğinde canlandırarak, yurttaşların kendi geleceklerine dair kararları bizzat tartışıp şekillendirdiği bir zemin yaratılmıştır.",
      "6. Özellikle vurgulanmalıdır ki Antalya İklim Adaleti Forumu, Birleşmiş Milletler İklim Değişikliği Konferansı (COP31) gibi uluslararası zirvelerin yalnızca devletler arası müzakerelerle sınırlı kalmaması gerektiği anlayışından beslenmektedir. Forum, Antalya’da Kasım 2026’da gerçekleşecek olan COP31 sürecine halkın doğrudan katılımını esas alan, yerel dinamikleri ulusal ve küresel gündeme taşımayı hedefleyen, aynı zamanda bütünsel olanla bağını da yitirmeyen bir yaklaşım getirmektedir. Bu anlamda iklim adaletinin yerel, ulusal ve uluslararası başlıkları bir bütün halinde kabul edilmektedir. Kısaca, Antalya’da kurulan bu forum, iklim adaleti konusunun taraf devletlerin veya bürokrasinin tekeline bırakılamayacağını, emeğin, doğanın ve kentlerin söz sahibi olacağı özerk bir kamusal alan yaratılması gerektiğini, bunun şeffaflık ilkesinin de doğal sonucu olduğunu ortaya koymaktadır.",
      "Sekreteryanın Kurulması ve Yapısı",
      "7. Forumun önemli çıktılarından biri, Antalya İklim Adaleti Forumu Sekreteryasının kurulma kararıdır. Forum sonunda alınan karar uyarınca, Antalya’daki çevre, iklim ve kent mücadelelerini bir araya getirerek koordinasyonu sağlayacak geniş katılımlı bir sekreterya oluşturulacaktır. Bu sekreterya, forumun sürdürülmesi ve alınan kararların hayata geçirilmesi noktasında temel kolaylaştırıcı yapıyı oluşturacaktır. Yapısı yatay ve katılımcı olan sekreterya, tek tip bir hiyerarşik yönetim modeli yerine kolektif sorumluluk anlayışıyla hareket edecektir. Bu anlamda sekreterya statik ve hiyerarşik olmak yerine açık, esnek ve genişleyen bir yapıda kurgulanacaktır.",
      "8. Sekreterya, herkese açık ve kapsayıcı bir yapıda tasarlanmıştır. Forumda veya sonrasında iklim adaleti mücadelesine katkı sunmak isteyen tüm kurumlar, sivil toplum temsilcileri veya bireyler sekreteryada yer alabilir. Forumda bulunamamış ancak bu ortak çabaya katılmak isteyen örgütlerin de sonradan sekreteryaya dahil olabilmeleri için kapılar açıktır. Böylece Antalya İklim Adaleti Forumu Sekreteryası, mümkün olan en geniş toplumsal temsiliyeti sağlamayı ve ortak mücadele zemininin koordinasyon merkezi olmayı hedeflemektedir. Barolar, sendikalar, meslek odaları, üniversiteler, çevre platformları, mahalle insiyatifleri ve ilgili tüm kesimlerin sekreterya çalışmalarına katılımı teşvik edilmektedir. Bu anlamda forumun temel ilkelerine uyumluluk, sürece katkı sunabilmek ve kolaylaştırıcılık fonksiyonunu yerine getirebilme fonksiyonları ana kriterler olarak ortaya çıkmıştır. Sekreterya bu esaslara göre ve gelen talepler doğrultusunda bir değerlendirme yapılarak teşekkül edecektir.",
      "9. Sekreteryanın görevleri, forum kararlarının takibini yapmak, iletişim ve bilgi akışını sağlamak, etkinlik ve kampanyaları organize etmek, yerel sorunlarla ilgili veri ve raporları derlemek ve tüm bunları şeffaf biçimde topluma duyurmaktır. Sekreterya, Antalya genelindeki ekoloji ve kent mücadelelerini ortak paydada buluşturacak bir koordinasyon ağı işlevi görecektir. Tüm süreçler olabildiğince şeffaf yürütülecek; toplantı tutanakları, kararlar ve planlar kamuoyuyla paylaşılacaktır. Ayrıca sekreterya, önemli kararları forum bileşenlerinin onayına sunarak katılımcı demokrasi ilkesine bağlı kalacaktır. Herkesin söz ve karar sahibi olabileceği bu yapı sayesinde, Antalya’daki iklim adaleti mücadelesi kalıcı ve kurumsal bir kimlik kazanacaktır.",
      "İklim Adaleti Tanımı ve İlkeleri",
      "10. Antalya İklim Adaleti Forumu, iklim adaleti kavramını merkeze almakta ve bu kavramı kapsamlı bir toplumsal adalet anlayışıyla tanımlamaktadır. İklim krizi, yalnızca çevresel bir sorun değil; aynı zamanda toplumsal eşitsizlikleri derinleştiren, kırılgan kesimleri orantısız biçimde etkileyen bir adalet sorunudur. Forum katılımcılarının ortak anlayışına göre iklim adaleti, iklim değişikliğinin yarattığı yük ve zararların adil olmayan dağılımına karşı çıkmak ve en az sorumluluğu olanların en çok zarar görmesini engellemek anlamına gelmektedir. Bu çerçevede, iklim adaleti mücadelesi insan hakları merkezli olmak zorundadır; çünkü iklim kriziyle mücadele, temel insan haklarının (sağlıklı bir çevrede yaşama hakkı, suya ve gıdaya erişim hakkı, barınma hakkı vb.) korunmasıyla doğrudan bağlantılıdır.",
      "11. Forumda yapılan tartışmalarda vurgulandığı üzere, iklim krizi toplumun tüm kesimlerini eşit etkilememektedir. Yoksullar, işçiler, kadınlar, çocuklar, yaşlılar, göçmenler, engelliler, dezavantajlı ve yoksun bırakılmış gruplar iklim değişikliğinin etkilerine karşı en savunmasız olanları oluşturmaktadır. İklim adaleti tanımı, tam da bu kesimlerin haklarını ve ihtiyaçlarını merkeze almaktadır. Bu anlamda sosyal adalet ile iklim adaleti birbirinden ayrı düşünülemeyecek niteliktedir. İklim adaleti, mevcut ekonomik ve toplumsal düzenin ürettiği eşitsizliklerin ortadan kaldırılması amacıyla toplumsal cinsiyet eşitsizliği dahil her türlü ayrımcılığa karşı duyarlı bir yaklaşımı içermektedir. Bu nedenle forum, iklim politikalarının oluşturulmasında ve uygulanmasında kırılgan toplumsal grupların korunmasını, karar süreçlerine dahil edilmesini ve seslerinin duyulmasını temel bir ilke olarak benimsemiştir.",
      "12. İklim adaleti anlayışımız, doğal ve kentsel çevrenin haklarının da gözetilmesini gerektirmektedir. Bu bakış açısına göre, kentlerimiz insan haklarına dayalı ve yaşanabilir mekanlar olmalı; doğa ise yalnızca korunacak bir kaynak değil, aynı zamanda kendi değerine sahip bir varlık olarak kabul edilmelidir. İklim adaleti, bir yandan emeğin güvencesini ve adil geçim hakkını savunurken, diğer yandan sağlıklı ve temiz bir çevrede yaşama hakkını tüm canlılar için güvence altına almayı hedeflemektedir. Bu kapsayıcı tanım uyarınca, insan haklarına dayalı kentler inşa etmek ve dayanıklı topluluklar oluşturmak iklim adaletinin ayrılmaz parçasını ifade etmektedir.",
      "13. İnsan haklarına dayalı kent vizyonu, şehir plancılığından altyapıya kadar tüm kentsel politikaların iklim krizinin etkilerini azaltacak ve sosyal eşitsizlikleri giderecek şekilde planlanmasını gerektirmektedir. Dayanıklı topluluklar ise iklim değişikliğinin yol açtığı afet ve zorluklara karşı birlikte hareket edebilen, dayanışma pratikleri güçlü, uyum kapasitesi yüksek topluluklar niteliğindedir. Forum, Antalya’yı ve tüm yerel topluluklarımızı iklim krizine karşı dayanıklı hale getirmek amacıyla, sosyal adaleti iklim eyleminin temeline koyan bir mücadele hattı benimsemiştir.",
      "14. Bu anlamda Antalya İklim Adaleti Forumu’nun iklim adaleti tanımı; emeğin güvencesini, toplumsal eşitliği, kent ve doğa haklarını, kuşaklar arası adaleti ve küresel adalet ilkelerini bütüncül biçimde ele almayı zorunlu kılmaktadır. İklim adaleti, yalnızca karbon salımlarını azaltma meselesi değil, aynı zamanda ekonomik ve toplumsal yapının adil dönüşümü meselesidir. Bu ilkesel duruş doğrultusunda forumumuz, iklim krizine karşı mücadeleyi tüm ezilenlerin ve doğanın hak mücadelesi olarak görmektedir.",
      "Antalya Bağlamında İklim Adaletsizliği: Yerel Sorunlar ve İhlaller",
      "16. Antalya İklim Adaleti Forumu, küresel iklim krizinin Antalya özelindeki yansımalarına dikkat çekmiştir. Antalya, doğal güzellikleri ve biyolojik çeşitliliği ile ünlü bir kent olmakla birlikte, ne yazık ki yıllardır ekolojik yıkım ve hak ihlalleri ile anılmaktadır. Forum sırasında katılımcılar, Antalya’da yaşanan somut çevre tahribatı örneklerini ve bunların yarattığı adaletsizlikleri dile getirmişlerdir. Bu örnekler, iklim adaleti mücadelesinin yerel ölçekte ne denli elzem olduğunu gözler önüne sermektedir:",
      "Kıyıların ve Doğal Alanların Tahribatı: Antalya’nın kıyıları ve sahil şeridi, turizm ve rant uğruna yoğun bir betonlaşmaya ve yapılaşmaya maruz kalmaktadır. Kentsel dönüşüm adı altında sahillerin betonla kaplanması, halkın kıyı alanlarına erişim hakkını kısıtladığı gibi, deniz ekosistemlerine de zarar vermektedir. Ayrıca, kentin bazı bölgelerinde doğal sit alanları ve korunan bölgeler imara açılmakta, kent ve doğa hakları ihlal edilmektedir. Forum, Antalya’nın bir turizm vitrini olarak sunulmasının ardında, doğanın sermayenin rant alanı haline getirildiği uygulamalara karşı uyarıda bulunmuştur. Kentimizin vitrin değil, ekolojik yıkımın tanığı haline gelmesine yol açan bu politikalara karşı birlikte mücadele etmek gerektiği vurgulanmıştır.",
      "Tarım Alanları ve Su Varlıkları: Antalya, verimli tarım ovalarıyla Türkiye’nin önemli gıda üretim merkezlerinden biridir. Ancak kontrolsüz kentleşme ve endüstriyel projeler, tarım alanlarının yok edilmesine ve küçülmesine yol açmaktadır. Kırsal bölgelerde son yıllarda artan mermer ve taş ocakları faaliyetleri hem ormanlara hem de tarım arazilerine zarar vermekte, su havzalarını kirletmektedir. İklim krizinin şiddetlendirdiği kuraklık tehlikesine rağmen, göllerimiz ve yeraltı su kaynaklarımız plansız kullanım nedeniyle tükenme riskiyle karşı karşıyadır. Örneğin, kuruyan göller ve azalan su rezervleri, bölgede hem ekosistemleri tahrip etmekte hem de çiftçilerin suya erişimini kısıtlamaktadır. Forum, su hakkının iklim adaletinin temel bir parçası olduğunu belirterek, Antalya’da su varlıklarının korunmasını ve gıda güvenliğinin sağlanmasını talep etmektedir.",
      "Ormanlar ve Ekosistemler: Antalya, aynı zamanda ormanlık alanları ve zengin biyolojik çeşitliliğiyle tanınmaktadır. Ancak son yıllarda ormanlar, gerek iklim değişikliğinin etkisiyle artan büyük orman yangınları, gerekse maden ve enerji projeleri nedeniyle ciddi tehdit altındadır. Özellikle yaz aylarında yaşanan geniş çaplı yangınlar hem orman ekosistemlerini yok etmekte hem de bu alanlara bağımlı yaşayan köylüleri göçe zorlamaktadır. Bu durum bir mülksüzleştirme ve yerinden edilmenin somut bir örneğini meydana getirmektedir. Yangında yok olan ormanlık alanların yapılaşmaya açılması ise ormanların korunmasına ilişkin en temel anayasal hükümleri göz ardı etmektedir. Bunun yanı sıra, ormanlık alanların madencilik faaliyetlerine açılması ve HES (Hidroelektrik Santral) projeleri için tahrip edilmesi, doğa talanının endişe verici boyutlara ulaştığını göstermektedir. Forumda, ormanların ve müşterek doğal varlıkların savunulması gerektiği güçlü bir biçimde ifade edilmiştir. Kent yaşamı kadar kırsal alanların da iklim adaleti perspektifiyle korunması, Antalya’nın geleceği için hayati görülmektedir.",
      "Kentleşme ve Rant Politikaları: Antalya’da plansız ve rant odaklı kentleşme politikaları, kent hakkını ihlal eden örneklerle doludur. Son dönemde kent merkezinde tarihi ve kamusal önemi olan alanların (örneğin bir müzenin) yıkılarak yerine rant getirecek projelerin yapılması, dere yataklarına riskli inşaatlar gerçekleştirilmesi gibi uygulamalar çevresel tahribatı derinleştirmektedir. Doğal ve beşeri müşterekleri ortadan kaldıran bu tür projeler, ekolojik risklerin yanı sıra deprem ve sel gibi afetlere karşı kenti savunmasız bırakmakta, halkın tamamen dışlandığı ve şeffaf olmayan bir düzlemde ele alındığı için demokratik meşruiyetten de yoksun kalmaktadır. Forum, rant ve betonlaşmaya karşı mücadeleyi iklim adaletinin ayrılmaz bir parçası olarak tanımlamıştır. Antalya’nın kamusal alanlarının, parklarının, derelerinin ve yeşil alanlarının sermaye birikimine feda edilmesine karşı çıkılmakta; kentsel planlamanın insan ve doğa odaklı, şeffaf ve katılımcı bir anlayışla yeniden ele alınması talep edilmektedir.",
      "Göç ve İklim Sürgünleri: İklim krizi, dünya genelinde olduğu gibi Türkiye’de de göç hareketlerini tetikleyen bir faktör olarak ortaya çıkmaktadır. Antalya, bir yandan iklim değişikliği nedeniyle tarım yapamaz hale gelen ya da doğal afetler sonucu yerinden olan insanların göç rotasında bulunan bir kenttir. Diğer yandan, Antalya’nın kendi kırsal nüfusu da ekolojik yıkımlar sebebiyle yer değiştirmek zorunda kalabilmektedir (örneğin orman yangınları sonrası köy boşalmaları gibi). Forum, bu durumu “iklim sürgünleri” olgusu olarak ele almış ve iklim adaletinin, yerinden edilen toplulukların haklarını savunmayı da içermesi gerektiğini vurgulamıştır. Göçmenlerin ve mültecilerin iklim krizinden orantısız etkilenmesi, barınma ve yaşama koşullarının kırılgan olması da dile getirilmiş; Antalya’nın iklim adaletine duyarlı bir kent olarak tüm sakinlerine sahip çıkması gerektiği ifade edilmiştir.",
      "Yukarıdaki sınırlandırıcı değil örnekseme biçiminde ele alınan örnekler, Antalya’nın iklim adaleti mücadelesine özgü yerel öncelikleri ortaya koymaktadır. Bu bağlamda forum, Antalya’da kent ve doğa haklarının korunması, ekolojik yıkıma yol açan uygulamaların durdurulması ve iklim krizine karşı toplumun tüm kesimlerinin adil ve etkili şekilde korunması için yetkililere çağrıda bulunmaktadır. Antalya, sadece uluslararası bir diplomasi vitrini değil; aynı zamanda çözüm bekleyen somut çevre sorunlarının yaşandığı bir kenttir. İklim adaleti perspektifiyle, yereldeki yıkım örneklerine dur demek ve hak ihlallerini gidermek, forumun öncelikli hedeflerindendir.",
      "Forumun Amacı ve Misyonu",
      "17. Antalya İklim Adaleti Forumu, ortaya çıkış amacı ve misyonu itibariyle çok boyutlu bir hak mücadelesi platformudur. Forumun temel amacı, iklim kriziyle bağlantılı tüm adaletsizlik alanlarında kolektif çözümler üretmek ve kentin geleceğine sahip çıkmaktır. Bu kapsamda forum, kendine aşağıdaki misyon ve hedefleri belirlemiştir:",
      "Kent Hakkının Savunulması: Forum, her Antalya sakininin sağlıklı, güvenli, sürdürülebilir ve yaşanabilir bir kente sahip olma hakkını savunmaktadır. Kent hakkı, şehirde yaşayan herkesin kent yönetimine katılımını, kentsel kaynaklardan adil biçimde yararlanmasını ve kentsel mekanların rant uğruna feda edilmemesini gerektirir. Antalya’nın hızlı büyüme ve turizm baskısı altında şekillenen kentleşme politikalarına karşı, insan odaklı ve iklim dostu bir kentsel gelişim vizyonu forumun temel hedeflerindendir.",
      "Emek Hakkı ve Adil Geçim: İklim adaleti, emek adaletinden ayrı düşünülemez. Forum, iklim politikalarının ve dönüşüm projelerinin emekçilerin haklarını gözeterek planlanmasını savunmaktadır. “Yeşil dönüşüm” söylemi altında ortaya konan projelerde işçi haklarının ve küçük üreticilerin korunması forumun önceliğidir. İklim krizinin yarattığı ekonomik yükün emekçiler üzerine yıkılmasına, işçilerin güvencesizliğe itilmesine karşı durulacaktır. Emek hakkı, iklim adaleti mücadelesinin temel taşlarından birini fade etmektedir; çünkü iklim kriziyle başa çıkarken kimsenin geçim kaynaklarından mahrum bırakılmaması, adil bir geçiş sürecinin sağlanması şarttır.",
      "Ekolojik Haklar ve Doğa Koruma: Forumun misyonu, ekolojik hakları koruyarak insan ve diğer canlıların yaşam alanlarını savunmaktır. Doğanın hakları kavramı, ormanların, nehirlerin, denizlerin ve tüm ekosistemlerin kendi doğal döngülerini sürdürebilme hakkını içerir. Antalya özelinde, denizin, ormanın, tarım toprağının hakları; yani tahrip edilmeden var olma ve gelecek kuşaklara aktarılma hakkı savunulacaktır. Bu kapsamda forum, doğal alanların ticarileştirilmesine, müşterek varlıkların talanına karşı durmayı varoluşsal görevi kabul etmektedir. Ekolojik hakların savunusu, aynı zamanda insan topluluklarının sağlıklı ve dengeli bir çevrede yaşama hakkının korunması demektir.",
      "Yeni Kamusal Alanlar ve Kolektif Yaşam: Forum, yeni kamusal alanlar yaratmayı ve mevcut kamusal alanları korumayı hedeflemektedir. İklim adaleti mücadelesi sadece politik değil aynı zamanda toplumsal ve kültürel bir dönüşümü de içermektedir. Bu nedenle parklar, meydanlar, kütüphaneler, kültür merkezleri gibi kamusal mekanların genişletilmesi, insanların bir araya gelip tartışabileceği, kolektif bilinç geliştirebileceği ortamların desteklenmesi önemlidir. Forum, mahalle toplantıları, semt buluşmaları, açık hava etkinlikleri gibi yollarla, yurttaş katılımını artıracak ve ortak yaşam kültürünü güçlendirecek adımlar atacaktır. Kamusal alanların demokratikleştirilmesi, iklim adaleti için halkın söz ve karar süreçlerine etkin katılımının fiziki zemininin yaratılması anlamına gelmektedir.",
      "Kültürel Dönüşüm ve Farkındalık: İklim kriziyle mücadele, teknik çözümlerin ötesinde bir kültürel dönüşümü gerektirir. Forum, toplumda iklim bilincinin yaygınlaşmasını, doğayla uyumlu yaşam kültürünün benimsenmesini ve tüketim alışkanlıklarının gözden geçirilmesini sağlayacak farkındalık çalışmalarını misyonunun bir parçası sayar. Bu doğrultuda eğitim programları, atölyeler, paneller, sanat etkinlikleri düzenlenerek iklim krizine dair toplumsal duyarlılığın artırılması hedeflenecektir. Antalya’nın yerel kültüründe doğaya ve emeğe saygıyı öne çıkaran değerlerin görünür kılınması, iklim mücadelesinin toplumsal sahiplenilmesini güçlendirecektir. Kültürel dönüşüm, iklim adaletinin kalıcı olması için gelecek kuşaklara bırakacağımız en önemli miraslardan biridir.",
      "Katılımcı Siyaset: Forumun misyonlarından biri de katılımcı demokrasiyi hayata geçiren bir siyaset anlayışını teşvik etmektir. İklim adaleti, yönetim mekanizmalarının da demokratikleşmesini zorunlu kılar. Bu kapsamda forum, yerel yönetimlerin iklim ve çevre konularında halkın katılımına açık politikalar geliştirmesini talep eder. Kent konseyleri, mahalle meclisleri gibi yerel karar organlarının güçlendirilmesi, belediyelerin şeffaflık ve hesap verebilirlik ilkeleriyle hareket etmesi için etkili bir unsur olacaktır. Forum, aynı zamanda merkezi yönetimin iklim politikalarında toplumsal taleplere kulak vermesi gerektiğini savunur. Katılımcı siyaset, sadece seçimden seçime oy vermeye indirgenmeyen; her düzeyde yurttaşların karar süreçlerine dahil olduğu bir yönetişim modelini hedefler. Antalya’da iklim ve kent politikalarının belirlenmesinde forumun çıktılarının ve halkın sesinin dikkate alınması için çaba gösterilecektir.",
      "Toplumsal Cinsiyet Eşitliği: İklim adaleti mücadelesi, toplumsal cinsiyet adaletini de içermek zorundadır. Kadınlar, iklim krizinin etkilerini farklı ve ağır yaşayan bir kesimdir; aynı zamanda ekoloji mücadelesinin ön saflarında yer almaktadır. Forum, iklim politikalarında toplumsal cinsiyet perspektifinin olmasını, kadınların karar süreçlerinde etkin rol almasını ve iklim krizinin derinleştirdiği toplumsal cinsiyet eşitsizliklerine karşı özel politikalar geliştirilmesini savunur. Kadın emeğinin ve bilgisinin görünür kılındığı bir yaklaşım mücadelenin parçası olacaktır.",
      "Hayvan Hakları: İklim ve ekolojik kriz, hayvanların yaşam alanlarını daraltmakta ve hak ihlallerine yol açmaktadır. Forum, tüm canlıların yaşam hakkını savunur ve hayvanların yaşam koşullarını iyileştirmek, türlerin yok oluşunu engellemek için mücadeleyi önemli görür. İklim adaleti, insan olmayan canlıların da hakkını koruyan bütüncül bir yaklaşımı gerektirir. Bu kapsamda, vahşi yaşamın korunması, sokak hayvanlarının refahı, endüstriyel hayvancılığın ekolojik etkileri gibi konular forumun gündeminde olacaktır.",
      "Su ve Gıda Hakkı: İklim krizinin en somut etkilerinden biri su kaynaklarının azalması ve gıda güvencesinin tehlikeye girmesidir. Forum, su hakkının vazgeçilmez bir insan hakkı olduğunu, suyun metalaştırılmasına karşı kamusal bir kaynak olarak korunması gerektiğini vurgular. Aynı şekilde, herkesin yeterli ve sağlıklı gıdaya erişim hakkı vardır; bu da iklim adaletiyle doğrudan ilişkilidir. Tarımsal üretimin iklim dostu yöntemlerle sürdürülmesi, küçük çiftçilerin desteklenmesi, yerel tohumların ve geleneksel tarım bilgelerinin korunması bu başlık altında ele alınacaktır. Susuzluk ve gıda krizi riskine karşı kentsel ve kırsal dayanışma ağları kurulacak, gıda egemenliği ilkesi savunulacaktır.",
      "Engelli Hakları ve Kapsayıcılık: İklim değişikliği, engelli bireyler için de özgün zorluklar yaratmaktadır (örneğin afet durumlarında erişilebilirlik sorunları, sağlık hizmetlerine erişim güçlükleri vb.). Forum, iklim adaleti mücadelesinin engelli haklarına duyarlı olmasını, afet planlarından kentsel tasarıma kadar her alanda engelli bireylerin ihtiyaçlarının gözetilmesini talep eder. İklim politikalarında “kimseyi geride bırakmama” ilkesiyle hareket edilmesi, kırılgan grupların (engelliler, kronik hastalar vb.) korunması için özel önlemler alınması gerektiği forumca dile getirilmiştir. Mücadelemiz, toplumsal hayatın her alanında erişilebilirlik ve kapsayıcılık sağlanmadıkça adaletin tesis edilemeyeceği bilinciyle sürdürülecektir.",
      "Dolayısıyla Antalya İklim Adaleti Forumu; kent hakkı, emek hakkı, ekolojik haklar gibi temel hakları savunmakta, yeni kamusal alanlar ve kültürel dönüşüm yoluyla toplumu iklim mücadelesine seferber etmeyi amaçlamakta ve katılımcı siyaset anlayışıyla bir söz ve pratik ortaya koymayı hedeflemektedir. Bu misyon, Antalya özelinden yola çıkarak ülke geneline ve küresel düzleme örnek teşkil edebilecek bir adalet mücadelesi modeli ortaya koyma arzusunu da barındırmaktadır.",
      "Dayanışma ve Ulusal/Uluslararası Zemin",
      "18. İklim krizi küresel bir sorun olduğu kadar, çözümü de küresel dayanışmayı gerektirmektedir. Antalya İklim Adaleti Forumu, yerel mücadeleyi küresel iklim adaleti mücadelesinin bağımsız bir parçası olarak görmekte ve bu zeminde uluslararası dayanışmayı büyütmeyi amaçlamaktadır. Bu doğrultuda, forumumuz dünyanın dört bir yanındaki iklim adaleti hareketleriyle, çevre mücadeleleriyle ve halk inisiyatifleriyle ilişki kurmaya önem verecektir. Küresel iklim adaleti ağlarına Antalya’dan aktif katılım sağlanacak; bilgi ve deneyim paylaşımı yapılacaktır. Amacımız, Antalya’nın yerel sorunlarını dünya gündemine taşırken, başka coğrafyalardaki başarılı mücadele deneyimlerinden de öğrenmektir. İklim krizinin sınır tanımadığı gerçeğinden hareketle, yerelden küresele uzanan bir mücadele hattı kurulması gerektiğine inanıyoruz.",
      "19. Önümüzdeki süreçte Antalya, 2026 yılında Birleşmiş Milletler İklim Değişikliği Taraflar Konferansına (COP31) ev sahipliği yapacaktır. Forumumuz, nihai amacı salt bu olmamakla birlikte COP31 resmi müzakere sürecinin ötesinde, halkın katılımına dayalı alternatif süreçlerin örgütlenmesi hedefini de taşımaktadır. Bu çerçevede, COP31 öncesinde ve sırasında halk temelli yan etkinlikler, zirveler ve forumlar düzenlenmesi düşünülmektedir. Antalya İklim Adaleti Forumu, COP31’i halkın kürsüsüne dönüştürme amacı gütmektedir. Yani yalnızca devlet liderlerinin ve bürokratların konuştuğu kapalı kapılar ardındaki oturumları beklemek yerine, dünyanın dört bir yanından gelen aktivistlerin, yerel halkın, gençlerin ve dezavantajlı grupların söz alabileceği açık buluşmalar organize edilecektir. Bu sayede Antalya, COP31 sürecinde iklim adaletinin gerçek anlamda tartışıldığı, halkın sesinin duyulduğu uluslararası bir arena haline gelebilecektir.",
      "20. Dayanışma perspektifi yalnızca uluslararası düzeyle sınırlı olmayıp ulusal ölçekte de iklim adaleti mücadelesinin yaygınlaşmasını amaçlamaktadır. Forum, Türkiye’nin farklı şehirlerinde ve bölgelerinde benzer sorunlar için mücadele eden platformlarla dayanışma içinde olacaktır. Başka illerde kurulmuş veya kurulacak iklim adaleti forumları, ekoloji meclisleri ve çevre platformlarıyla iletişim ağları oluşturulacaktır. İklim krizi karşısında ülke genelinde ortak bir tavır geliştirmek, yerel mücadeleleri birleştirmek ve merkezi otoritelere güçlü bir toplumsal mesaj vermek için ulusallaşma yönünde adımlar atılacaktır. Antalya’da ortaya çıkan bu forum deneyiminin, Türkiye’nin diğer kentlerinde de örnek alınması ve çoğalması teşvik edilecektir. İklim adaleti talebinin bir şehirle sınıı kalmayıp tüm toplum için kolektif bir talep haline gelmesi önem teşkil etmektedir.",
      "21. Uluslararası alanda ise, forumumuz iklim adaletinin evrensel ilkelerini savunarak küresel müzakere süreçlerinde halkın taleplerini duyurmayı görev bilecektir. COP31’e giden süreçte ortak kampanyalar ve toplantılarla bu paylaşımın yapılması hedeflenmektedir. Ayrıca Akdeniz coğrafyasında benzer çevresel sorunları yaşayan kentlerle (örneğin orman yangınları, su krizi gibi konularda) ikili veya çoklu dayanışma ilişkileri kurulacaktır. Antalya, bir Akdeniz kenti olarak, iklim krizinin bu bölgedeki etkilerine karşı bölgesel dayanışma ağlarında aktif rol oynayacaktır.",
      "22. Bu anlamda Antalya İklim Adaleti Forumu kendini ne yalnızca yerel bir girişim olarak görmekte, ne de yalnızca ulusal bir platformla sınırlamaktadır. Hedefimiz, yerel mücadelemizi ulusal ve uluslararası boyutla birleştirerek çok ölçekli bir iklim adaleti hareketinin parçası olmaktır. Bu dayanışmacı yaklaşım sayesinde, bir yandan Antalya’nın sözünü küresel iklim mücadelesine katacak, diğer yandan dünyadaki iyi örnekleri Antalya’ya taşıyacağız. İklim krizine karşı küresel dayanışma ruhu, forumumuzun temel prensiplerinden biridir.",
      "Gelecek Planlaması ve Yol Haritası",
      "23. Antalya İklim Adaleti Forumu, bir tek toplantıyla sınırlı kalmayıp sürekliliği olan bir harekete dönüşmeyi hedeflemektedir. Bu doğrultuda, forumda geleceğe yönelik somut planlar ve öneriler geliştirilmiştir. Gelecek planlamamız, Antalya’nın her köşesine yayılan ve tabana dayalı bir örgütlenme modeli inşa etmeyi, aynı zamanda belirli bir eylem planı çerçevesinde adım adım ilerlemeyi öngörmektedir:",
      "Forumların İlçelere Yayılması: Antalya merkeziyle sınırlı kalmamak adına, kentin farklı ilçelerinde de iklim adaleti forumlarının düzenlenmesi kararlaştırılmıştır. Her bir ilçede, o bölgenin özgün çevre sorunlarını ve toplumsal ihtiyaçlarını gündeme taşıyacak yerel forumlar/çalıştaylar yapılacaktır. Örneğin, kıyı ilçelerinde turizm ve kıyı tahribatı, iç kesimlerde tarım ve su sorunları, yaylalarda orman ve mera sorunları gibi konular, ilgili ilçelerdeki halk buluşmalarında tartışılacaktır. Bu ilçe forumlarından çıkan tespit ve öneriler, Antalya genelinin iklim adaleti programına katkı sunacaktır. Böylece, yerelden genele örgütlenen bir ağ yapısı kurulacaktır.",
      "Mahallelerde Çalışma Grupları: Forum, en küçük yerel birimler olan mahallelerde dahi örgütlenmeyi önüne koymaktadır. Her mahallede, gönüllü mahalle sakinlerinden oluşan iklim adaleti çalışma grupları teşkil edilmesi planlanmaktadır. Bu gruplar, bulundukları mahallede hem farkındalık yaratma (komşulara iklim krizi ve alınabilecek önlemler konusunda bilgi aktarma, atık ayrıştırma, enerji tasarrufu uygulamalarını teşvik etme gibi) hem de yerel sorunları tespit edip üst forumlara iletme görevini üstlenecektir. Mahalle düzeyinde başlayacak bu örgütlenme, halkın yaşadığı yerde söz sahibi olmasını sağlayacak ve iklim adaleti bilincini tabana yayacaktır. Ayrıca mahalle çalışma grupları, acil durumlarda (örneğin sel, yangın gibi afetlerde) mahalle dayanışmasını organize ederek dayanıklı topluluklar oluşturmanın çekirdeğini teşkil edecektir.",
      "Açık Toplantılar ve Kitle Katılımı: Forum sürecinin şeffaf ve herkesin katılımına açık olması temel ilkemizdir. Bu nedenle, düzenli aralıklarla açık forumlar ve genel toplantılar yapılmaya devam edilecektir. Bu toplantılar, alınan yolun değerlendirilmesi, yeni önerilerin sunulması ve görev paylaşımının yapılması için fırsat olacaktır. Hiçbir katılımcının dışlanmadığı, isteyen herkesin katkı sunabildiği bu açık toplantılar sayesinde hareketimizin meşruiyeti ve dinamizmi korunacaktır. Ayrıca, ilerleyen aylarda daha geniş kitlelerin dahil olmasını sağlamak için mahalle bazında forum tanıtım etkinlikleri, gençlik buluşmaları, öğrenci forumları gibi çeşitli yöntemlere başvurulacaktır. Kitleselleşme, forumun kalıcı ve etkili olabilmesi için vazgeçilmez bir unsurdur.",
      "Eylem Planı ve Program İnşası: Forumda ortaya konan fikirler, eleştiriler ve öneriler doğrultusunda, bir İklim Adaleti Eylem Planı hazırlanmasına başlanmıştır. Bu eylem planı, kısa, orta ve uzun vadeli hedefler ile bunlara ulaşmak için yapılacak somut faaliyetleri içerecektir. Bu eylem planı, komisyon çalışmaları temelinde şekillenen tüm bileşenlerin katkısıyla oluşturulan yaşayan bir belge olacaktır ve ilerlemeye göre güncellenecektir. Bununla birlikte, forumun uzun erimli vizyonunu yansıtan bir İklim Adaleti Programı da inşa edilmektedir. Bu program, Antalya için iklim adaleti perspektifiyle önerilen politikaların, taleplerin ve ilkelerin bütüncül bir belgesi olacaktır. Kent hakkından enerji politikalarına, tarımdan turizme kadar farklı alanlarda nasıl bir dönüşüm öngördüğümüzü ortaya koyan bu program, Antalya’dan inşa edilen iklim adaleti manifestosu niteliğinde olacaktır.",
      "İkinci Buluşma ve Devamlılık: 28.01.2026 tarihinde gerçekleşen ilk forum toplantısı, bir başlangıç niteliğindedir. Forum katılımcıları, bir sonraki geniş katılımlı buluşmayı en kısa sürede hayata geçirmek konusunda fikir birliğine varmışlardır. Bir sonraki toplantının, çok daha geniş kesimlere yayılarak tam katılım esasına göre yapılması hedeflenmektedir. Bu ikinci buluşmaya kadar geçen sürede sekreterya ve çalışma grupları aktif faaliyet yürüterek kolaylaştırma görevini devam ettirecektir. Devamlılığı olan, kendini yenileyebilen bir forum süreci amaçlanmaktadır. Yıl içerisinde belirli periyotlarla toplanacak forum genel kurulları sayesinde kararlar gözden geçirilecek, stratejiler güncellenecek ve ihtiyaç duyulan yeni inisiyatifler başlatılacaktır. Böylece Antalya İklim Adaleti Forumu, geçici bir etkinlik olmanın ötesinde kalıcı bir örgütlenme ve karar mekanizması hüviyetine kavuşacaktır.",
      "SONUÇ: Katılımcı Demokrasiyle İklim Adaleti Mücadelesine Çağrı",
      "24. Bu sonuç bildirgesi, Antalya İklim Adaleti Forumu’nun ortak akıl ve iradesinin bir ürünüdür. Metnin hazırlanış sürecinde, forum bileşenlerinin tamamı doğrudan veya dolaylı olarak katkı sunmuş; görüş ve önerilerini paylaşmıştır. Kolektif yazım süreci, forumun benimsediği demokratik ve katılımcı kültürün bir yansımasıdır. Hiçbir merkezi otoritenin veya dar bir kurulun dikte ettiği “hazır reçetelere” dayanmadan, aksine tabandan gelen fikirlerle şekillenen bu bildirge, mücadelemizin yol haritasını ve ilkelerini ortaya koymaktadır. Bu yaklaşım, iklim krizi gibi karmaşık bir soruna karşı dayanışma içinde, ortak akılla hareket etmenin önemine inancımızın ifadesidir.",
      "25. Antalya İklim Adaleti Forumu, merkeziyetçi ve tepeden inme yöntemlere karşı taban demokrasisini savunur. Kentimizi ve gezegenimizi ilgilendiren böylesi hayati bir konuda kararlar birkaç kurum veya kişinin değil, bizatihi o kentte yaşayanların ve o gezegende nefes alanların katılımıyla alınmalıdır. Forum boyunca defalarca dile getirilen “kararları kapalı kapılar ardında birkaç kişi değil, halkın kendisi almalıdır” düşüncesi, sonuç bildirgemizin temel perspektifini ifade etmektedir. Bu nedenle, forumumuz her türlü eleştiri, öneri ve katkıya açıktır. Bildirgede ortaya konan ilke ve hedefler zamanla gelişebilir, yeni fikirlerle zenginleşebilir. Önemli olan, ortak hedefimizin iklim adaletini sağlamak ve daha yaşanabilir bir Antalya ve dünya yaratmak olduğudur. Bu ortak hedef doğrultusunda yöntemlerimizi de demokratik katılım ile sürekli gözden geçirmeye ve iyileştirmeye hazırız.",
      "26. Sonuç bildirgemiz aynı zamanda geniş kitlelere yönelik bir çağrı niteliği taşımaktadır. Antalya’da yaşayan herkesi –işçileri, çiftçileri, gençleri, kadınları, esnafları, emeklileri, öğrencileri, engellileri, yerli halkları, göçmenleri– kısacası bu kentin ve gezegenin geleceğinden endişe duyan tüm birey ve kesimleri iklim adaleti mücadelesine katılmaya davet ediyoruz. Bu çağrı, sadece Antalya ile de sınırlı değildir: Ülkemizin ve dünyanın dört bir yanında iklim için adalet arayan tüm kardeşlerimize dayanışma elimizi uzatıyoruz. Mücadelemiz küreseldir, çünkü gezegen hepimizin ortak evidir.",
      "Şimdi dayanışma zamanıdır, şimdi harekete geçme zamanıdır.",
      "Antalya İklim Adaleti Forumu, tüm duyarlı kesimleri omuz omuza vermeye, kentimizi ve dünyamızı iklim adaletine kavuşturmak için birlikte yürümeye çağırmaktadır.",
      "Geleceğimizi hep birlikte kazanabiliriz – adil, özgür ve temiz bir gelecek ellerimizde şekillensin!",
      "İklim Adaleti Forumu Sekreteryası"
    ]
  }
];
