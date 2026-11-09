/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Check,
  Download,
  ZoomIn,
  X
} from 'lucide-react';

export interface ProgramSpeakerItem {
  topic?: string;
  speaker: string;
}

export interface ProgramSession {
  time: string;
  title: string;
  isBreak?: boolean;
  subtitle?: string;
  chair?: string;
  items?: ProgramSpeakerItem[];
}

export interface ProgramDay {
  id: string;
  dateLabel: string;
  shortLabel: string;
  theme: string;
  sessions: ProgramSession[];
}

export const FORUM_PROGRAM_POSTER_URL =
  '/uploads/uluslararasi-iklim-adaleti-forumu-programi-15-17-kasim-2026.jpg?v=3';

export const FORUM_PROGRAM_DAYS: ProgramDay[] = [
  {
    id: '15-kasim',
    dateLabel: '15 KASIM 2026',
    shortLabel: '15 Kasım (1. Gün)',
    theme: 'Yaşam Alanları, Mücadeleler ve İklim Adaleti',
    sessions: [
      {
        time: '13.00–14.30',
        title: 'Büyük İklim Adaleti Yürüyüşü',
        subtitle: 'Yıkılan Antalya Müzesinden Antalya Barosuna'
      },
      {
        time: '14.30–15.00',
        title: 'Açılış ve Açılış Konuşmaları'
      },
      {
        time: '15.00–20.00',
        title: 'Halk Kürsüsü',
        chair: 'Moderasyon',
        items: [
          {
            speaker:
              'Av. Tansu Güngör, İstanbul Barosu Çevre, Kent ve İmar Hukuku Komisyonu'
          },
          {
            speaker: 'Tülin Koç, Öğrenci Veli Derneği Antalya Şube Başkanı'
          }
        ]
      }
    ]
  },
  {
    id: '16-kasim',
    dateLabel: '16 KASIM 2026',
    shortLabel: '16 Kasım (2. Gün)',
    theme: 'Ekolojinin Politik Ekonomisi ve İklim Adaleti',
    sessions: [
      {
        time: '10.00–10.30',
        title: 'Açılış ve Açılış Konuşmaları'
      },
      {
        time: '10.30–12.00',
        title:
          'I. Oturum: Kapitalist Kriz Çağında Doğanın Metalaştırılması, Büyüme ve Sermaye Birikimi',
        chair: 'Dr. Ali Yalçın Göymen, Potsdam Üniversitesi',
        items: [
          {
            speaker:
              'Prof. Dr. Markus Wissen, Berlin Ekonomi ve Hukuk Okulu (HWR Berlin)'
          },
          {
            speaker:
              'Dr. Jenny Simon, Berlin Ekonomi ve Hukuk Okulu (HWR Berlin)'
          },
          {
            speaker: 'Dr. Ali Yalçın Göymen, Potsdam Üniversitesi'
          }
        ]
      },
      {
        time: '12.00–14.30',
        title: 'II. Oturum: Ekoloji Mücadelesinde Adalet',
        subtitle:
          'Doğa ve yaşam hakkı savunuculuğunun en ağır bedelini ödeyen, yakınlarını bu haklı mücadelede kaybedenlerin sesine kulak veriyoruz.',
        chair:
          'Av. Alperen Çelik, Antalya Barosu Toplumsal Olay ve Davaları İzleme Kurulu',
        items: [
          {
            speaker:
              'Ali Şükrü Kibar, Emine Büyüknohutçu, Duygu Yıldız, Ulaş Lokumcu, Öznur Tosun'
          }
        ]
      },
      {
        time: '14.30–15.00',
        title: 'III. Oturum: İklim Krizinin Emeklilere Olumsuz Etkileri',
        chair: 'M. Ferzan Sarsılmaz, Tüm Emeklilerin Sendikası',
        items: [
          {
            speaker:
              'Zeynel Abidin Ergen, Tüm Emeklilerin Sendikası Genel Başkanı'
          }
        ]
      },
      {
        time: '15.00–15.15',
        title: 'ARA',
        isBreak: true
      },
      {
        time: '15.15–16.30',
        title: 'IV. Oturum: Küresel Afetler Çağında Adalet',
        chair: 'Av. Kemal Aytaç, TBB Yönetim Kurulu Üyesi',
        items: [
          {
            topic: 'Antakya Depremi Sonrası Yaşanan Afetler',
            speaker: 'Nilgün Karasu, Antakya Çevre Koruma Derneği'
          },
          {
            topic: 'Kentin Yıkılan Belleği: Antalya Arkeoloji Müzesi',
            speaker: 'Prof. Dr. Hilmi Uysal, Antalya Müze Çalışma Grubu'
          },
          {
            topic:
              'İklim Değişikliği, Afet Dirençli Olmayan Planlama ve Mühendislik Faaliyetlerinin Hatalarını Perdeleyebilir mi? Antalya’dan Örnekler',
            speaker: 'Prof. Dr. Nihat Dipova, Akdeniz Üniversitesi'
          }
        ]
      },
      {
        time: '16.30–18.30',
        title:
          'V. Oturum: İklim Politikalarında Kamuculuk, Bağımsızlık ve Demokrasi',
        chair: 'Prof. Dr. Nursel Şahin, Çağdaş Hekimler',
        items: [
          {
            topic:
              'Yeşil Dönüşümün Ekonomi Politiği; Enerji, Sermaye ve İklim Adaleti',
            speaker: 'Doğukan Yurttaş, TMMOB Elektrik Mühendisleri Odası'
          },
          {
            topic: 'Toprağın, Tohumun ve Üreticinin Bağımsızlığı',
            speaker: 'Dr. İlkay Öz, Araştırmacı/Siyaset Bilimci'
          },
          {
            topic:
              'İklim Felaketi Gölgesinde Türkiye’nin Sömürge Madenciliği Çıkmazı',
            speaker: 'İbrahim Gündüz, Gazeteci/Yazar'
          },
          {
            topic: 'Küresel İklim Değişikliği ve Kamuculuk',
            speaker: 'Prof. Dr. Hayri Kozanoğlu, Altınbaş Üniversitesi'
          }
        ]
      },
      {
        time: '18.30–18.45',
        title: 'ARA',
        isBreak: true
      },
      {
        time: '18.45–20.00',
        title: 'VI. Oturum: Toplumsal Cinsiyet ve İklim Adaleti',
        chair: 'Av. Nur Hilal Gündüz, TBB Çevre ve Kent Hukuku Komisyonu',
        items: [
          {
            topic: 'Ekofeminizm ya da Ekolojik Feminizm',
            speaker:
              'Av. Tuğçe Duru, Antalya Barosu Kadın Hakları ve Toplumsal Cinsiyet Eşitliği Kurulu'
          },
          {
            topic:
              'İklim Adaleti İçin Çözüm Feministlerde: Kadınların İklim Adaleti',
            speaker: 'Av. İrem Bağcı Çalışkan, Dünya Kadın Yürüyüşü'
          },
          {
            topic:
              'İklim Krizi Evin İçinde: Kadınların Görünmeyen Emeği, Derinleşen Eşitsizlik ve Şiddet',
            speaker:
              'Didem Erkıvanç Türkay, Antalya Kadın Danışma Merkezi ve Dayanışma Derneği'
          }
        ]
      }
    ]
  },
  {
    id: '17-kasim',
    dateLabel: '17 KASIM 2026',
    shortLabel: '17 Kasım (3. Gün)',
    theme: 'Müşterekler, Haklar ve Demokratik Güvenceler',
    sessions: [
      {
        time: '10.00–10.30',
        title: 'Açılış ve Açılış Konuşmaları'
      },
      {
        time: '10.30–12.30',
        title:
          'I. Oturum: Uluslararası İklim Hukuku Göstergeleri, İklim Adaleti ve Kırılgan Alanlar',
        chair: 'Prof. Dr. Ayşe Odman Boztosun, Akdeniz Üniversitesi',
        items: [
          {
            topic:
              'İklim ve Çevre Hukukunda Hakimlerin ve Avukatların Rolü; Adalet, İklim ve İnsan Hakları',
            speaker:
              'Prof. Dr. Michel Prieur, Karşılaştırmalı Çevre Hukuku Uluslararası Merkezi (CIDCE) Başkanı'
          },
          {
            topic:
              'Antalya’da 2026’da Yapılacak COP31’e Giden Süreçte COP30’un İklim Adaleti Açısından Özeti',
            speaker:
              'Dr. Julien Prieur, Uluslararası Karşılaştırmalı Çevre Hukuku Merkezi (CIDCE)'
          },
          {
            topic:
              'Çevre Hukukunun Etkinliğini Ölçmeye Yönelik Hukuki Göstergeler: İklim Eylemi İçin',
            speaker:
              'Dr. Laurent Vassallo, Uluslararası Karşılaştırmalı Çevre Hukuku Merkezi (CIDCE)'
          },
          {
            topic:
              'Devletlerin İklim Yükümlülüklerinin Etkinliğine İlişkin Hukuki Göstergeler: Deniz Taşımacılığı ve İklim Adaleti Alanındaki Zorluklar',
            speaker:
              'Lucie Brouwer, Uluslararası Karşılaştırmalı Çevre Hukuku Merkezi (CIDCE)'
          }
        ]
      },
      {
        time: '13.30–15.30',
        title: 'II. Oturum: İklim Adaleti ve Hukuki Mücadele Araçları',
        chair: 'Av. Salim Berkay Aksu, Antalya Barosu Yönetim Kurulu Üyesi',
        items: [
          {
            topic:
              'Anayasa ve İklim Sözleşmeleri Karşısında Devletin Yükümlülükleri',
            speaker:
              'Prof. Dr. İbrahim Özden Kaboğlu, Karşılaştırmalı Çevre Hukuku Uluslararası Merkezi (CIDCE) Başkan Yardımcısı, TBMM Üyesi (2018-2023), İstanbul Barosu Başkanı (2024-2026)'
          },
          {
            topic: 'Biyosferik İlişkiler ve Hukuk Devleti',
            speaker:
              'Prof. Dr. Pasquale Policastro, Szczecin Üniversitesi, Polonya'
          },
          {
            topic:
              'İklim Krizi ve Yumuşak Hukuk: Bağlayıcılık ve Dava Edilebilirlik Sorunları',
            speaker: 'Dr. Furkan Kararmaz, Akdeniz Üniversitesi'
          },
          {
            topic:
              'Temsil Olmadan Dağıtım Olmaz: Alman İklim Kararında Kuşaklar Arası Özgürlük ve Eşitlik Sorunu',
            speaker:
              'Dr. Markus Johannes Theodorus Schrijer, Araştırmacı/Siyaset Bilimci'
          }
        ]
      },
      {
        time: '15.30–15.45',
        title: 'ARA',
        isBreak: true
      },
      {
        time: '15.45–17.00',
        title:
          'III. Oturum: Ekoloji Haberciliği, Şirket Suçları ve Bilgi Hakkı: Ekoloji ve İklim Haberlerinin Görünürlüğü',
        chair: 'Özgür Gürbüz, Gazeteci',
        items: [
          {
            topic: 'Ekoloji ve İklim Haberlerinin Görünürlüğü',
            speaker: 'Pelin Cengiz, Gazeteci/Yazar'
          },
          {
            topic: 'Şirket Suçları, Kamu Kararları ve Bilgiye Erişim',
            speaker: 'Gökay Başcan, Gazeteci'
          },
          {
            topic: 'Sahadan Haber Vermek',
            speaker: 'Özer Akdemir, Gazeteci/Yazar'
          }
        ]
      },
      {
        time: '17.00–17.45',
        title:
          'IV. Oturum: Hayvan: Özne mi, Kaynak mı, Şiddetin Nesnesi mi? Türler Arası İklim Adaleti',
        chair: 'Av. Aylin Çiller Akbaş, Antalya Barosu Hayvan Hakları Kurulu',
        items: [
          {
            topic:
              'İklim Adaletinin Kör Noktası: Hayvanlar ve Kanıksanmış Eylemler',
            speaker:
              'Av. Neslihan Parmaksız Güner, Antalya Barosu Hayvan Hakları Kurulu'
          },
          {
            topic: 'Metalaşan Doğada Canlı Olmak',
            speaker: 'Doç. Dr. Mehmet Kanatlı, Hitit Üniversitesi'
          }
        ]
      },
      {
        time: '17.45–18.30',
        title:
          'V. Oturum: Endüstriyel Tarımın İklim Krizine ve Çalışanlara Etkileri ve Gıda Egemenliği',
        chair: 'Av. Duygu Kozanoğlu Türe, Antalya Barosu Yönetim Kurulu Üyesi',
        items: [
          {
            speaker:
              'Adnan Çobanoğlu, Çiftçiler Sendikası (Çiftçi-Sen) Genel Örgütlenme Sekreteri'
          },
          {
            speaker:
              'Halit Konanç, Şişli Kent Konseyi Gıda, Tarım ve Kooperatifçilik Komisyonu Başkanı'
          },
          {
            speaker: 'La Via Campesina Temsilcisi'
          }
        ]
      },
      {
        time: '18.30–19.30',
        title:
          'VI. Oturum: Şirketlerin Enerji ve Madencilik Adına Doğayı Yağması ve Bunlara Karşı Yerelde Mücadele Yürütenler',
        chair:
          'Av. Görkem Ova, İstanbul Barosu Çevre, Kent ve İmar Hukuku Komisyonu',
        items: [
          {
            speaker:
              'Ali Bülent Erdem, Çiftçiler Sendikası (Çiftçi-Sen) Genel Başkanı'
          },
          {
            speaker: 'Funda Öz Akcura, Doğa Savunucusu'
          },
          {
            speaker: 'Alev Yılmaz, Doğa Savunucusu'
          }
        ]
      },
      {
        time: '19.30–20.15',
        title: 'VII. Oturum: Gıdanın ve İklim Krizinin Halk Sağlığına Etkileri',
        chair: 'Prof. Dr. Fulya Savran, Türk Üniversiteli Kadınlar Derneği',
        items: [
          {
            speaker:
              'Dr. Hasan Sait Ersan Ter, İzmir Tabip Odası Çevre Komisyonu Üyesi'
          },
          {
            speaker: 'Dicle Dilan Salman, Halk Sağlığı Araştırmacısı'
          }
        ]
      }
    ]
  }
];

interface ForumProgramiSectionProps {
  compact?: boolean;
}

export default function ForumProgramiSection({
  compact = false
}: ForumProgramiSectionProps) {
  const [selectedDayTab, setSelectedDayTab] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const shareUrl = 'https://iklimadaleti.org/program';

  const handleCopyProgramLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Uluslararası İklim Adaleti Forumu Programı (15–16–17 Kasım 2026, Antalya) — ${shareUrl}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const visibleDays =
    selectedDayTab === 'all'
      ? FORUM_PROGRAM_DAYS
      : FORUM_PROGRAM_DAYS.filter((d) => d.id === selectedDayTab);

  return (
    <section
      id="program"
      aria-labelledby="forum-program-heading"
      className={
        compact
          ? 'mb-10'
          : 'py-10 sm:py-14 bg-[#FBF9F5] border-b border-stone-200 scroll-mt-20'
      }
    >
      <div className={compact ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {/* Header Card */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* Top Badges & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-200">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F3A33] text-white uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                <span>15 – 16 – 17 Kasım 2026</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#9A4B1A]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Antalya (Antalya Barosu)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1F3A33]">
                <Users className="w-3.5 h-3.5" />
                <span>Antalya Barosu &amp; İstanbul Barosu Ev Sahipliğinde</span>
              </span>
            </div>

            {/* 1-Click Share Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `🌱 ULUSLARARASI İKLİM ADALETİ FORUMU PROGRAMI (15–16–17 Kasım 2026, Antalya) açıklandı! Tüm oturumlar ve konuşmacılar: ${shareUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/30 text-xs font-bold transition-colors"
              >
                <span>WhatsApp&apos;ta Paylaş</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `🌱 Uluslararası İklim Adaleti Forumu Programı (15–16–17 Kasım 2026, Antalya) yayında! #İklimAdaleti #COP31 #Antalya`
                )}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
              >
                <span>X (Twitter)</span>
              </a>
              <button
                type="button"
                onClick={handleCopyProgramLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-emerald-800">Link Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#0B4F71]" />
                    <span>Program Linkini Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Title */}
          <div className="py-6 text-center max-w-4xl mx-auto">
            <h2
              id="forum-program-heading"
              className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1F3A33] tracking-tight uppercase"
            >
              Uluslararası İklim Adaleti Forumu Programı
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              15 Kasım Büyük İklim Adaleti Yürüyüşü ve Halk Kürsüsü · 16–17 Kasım Uluslararası Oturumlar (Antalya)
            </p>
          </div>

          {/* Day Filter Tabs (Especially helpful on mobile phones) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-6">
            <button
              type="button"
              onClick={() => setSelectedDayTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                selectedDayTab === 'all'
                  ? 'bg-[#1F3A33] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tüm Program (3 Gün)
            </button>
            {FORUM_PROGRAM_DAYS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDayTab(d.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  selectedDayTab === d.id
                    ? 'bg-[#A64B2A] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {d.shortLabel}
              </button>
            ))}
          </div>

          {/* 3-Column Schedule Grid (1 col on mobile, 3 cols on desktop when viewing all) */}
          <div
            className={`grid grid-cols-1 ${
              selectedDayTab === 'all' ? 'lg:grid-cols-3' : 'max-w-3xl mx-auto'
            } gap-6 items-start`}
          >
            {visibleDays.map((day) => (
              <div
                key={day.id}
                className="bg-[#FAF8F4] border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs flex flex-col"
              >
                {/* Day Pill Header matching poster dark green */}
                <div className="bg-[#233D36] text-white px-5 py-4 text-center">
                  <div className="text-lg sm:text-xl font-extrabold tracking-wider">
                    {day.dateLabel}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-serif italic text-amber-200">
                    {day.theme}
                  </div>
                </div>

                {/* Sessions List */}
                <div className="p-4 sm:p-5 divide-y divide-stone-200/80 space-y-4">
                  {day.sessions.map((session, sIdx) => {
                    if (session.isBreak) {
                      return (
                        <div
                          key={sIdx}
                          className="pt-3 flex items-center justify-between text-xs font-bold text-stone-500 bg-stone-100/80 px-3 py-1.5 rounded-lg"
                        >
                          <span>{session.time}</span>
                          <span className="tracking-widest uppercase">
                            ☕ {session.title}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div key={sIdx} className={sIdx > 0 ? 'pt-4' : ''}>
                        {/* Time Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#233D36]/10 text-[#233D36] text-xs font-extrabold mb-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{session.time}</span>
                        </div>

                        {/* Session Title */}
                        <h3 className="font-serif text-base sm:text-[17px] font-bold text-stone-900 leading-snug">
                          {session.title}
                        </h3>

                        {/* Optional Subtitle / Route */}
                        {session.subtitle && (
                          <p className="mt-1 text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                            {session.subtitle}
                          </p>
                        )}

                        {/* Session Chair / Moderator */}
                        {session.chair && (
                          <div className="mt-2 text-xs sm:text-[13px] text-[#1E5631] bg-emerald-50/90 border border-emerald-200/70 rounded-lg px-2.5 py-1.5">
                            <span className="font-bold underline">
                              {session.chair === 'Moderasyon'
                                ? 'Moderasyon:'
                                : 'Oturum Başkanı:'}
                            </span>{' '}
                            {session.chair !== 'Moderasyon' && (
                              <span className="font-semibold text-stone-800">
                                {session.chair}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Speakers & Topics */}
                        {session.items && session.items.length > 0 && (
                          <ul className="mt-2.5 space-y-2">
                            {session.items.map((item, iIdx) => (
                              <li
                                key={iIdx}
                                className="text-xs sm:text-[13.5px] leading-relaxed pl-2.5 border-l-2 border-[#A64B2A]/60"
                              >
                                {item.topic && (
                                  <div className="font-bold italic text-stone-900">
                                    {item.topic}
                                  </div>
                                )}
                                <div className="text-stone-700 font-medium">
                                  {item.speaker}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Official High-Resolution Poster Preview & Download Bar */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Resmi Program Afişi (Yüksek Çözünürlüklü Görsel)
                </h3>
                <p className="text-xs text-stone-500">
                  Afişin üzerine tıklayarak tam ekran büyütebilir veya cihazınıza indirebilirsiniz.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4 text-[#0B4F71]" />
                  <span>Afişi Tam Ekran Büyüt</span>
                </button>
                <a
                  href="/uploads/uluslararasi-iklim-adaleti-forumu-programi-15-17-kasim-2026.png"
                  download="Uluslararasi-Iklim-Adaleti-Forumu-Programi-BASKI.png"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1F3A33] hover:bg-[#162924] text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Baskı İçin PNG İndir (300 DPI)</span>
                </a>
                <a
                  href="/uploads/uluslararasi-iklim-adaleti-forumu-programi-15-17-kasim-2026.pdf"
                  download="Uluslararasi-Iklim-Adaleti-Forumu-Programi-BASKI.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#A64B2A] hover:bg-[#8C3D20] text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Baskı İçin PDF İndir (A3 Yatay)</span>
                </a>
                <a
                  href={FORUM_PROGRAM_POSTER_URL}
                  download="uluslararasi-iklim-adaleti-forumu-programi-15-17-kasim-2026.jpg"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B4F71] hover:bg-[#083B54] text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>JPG İndir</span>
                </a>
              </div>
            </div>

            <div
              onClick={() => setLightboxOpen(true)}
              className="group relative rounded-xl overflow-hidden border border-stone-300 bg-stone-100 cursor-zoom-in shadow-xs"
            >
              <img
                src={FORUM_PROGRAM_POSTER_URL}
                alt="Uluslararası İklim Adaleti Forumu Programı (15-16-17 Kasım 2026, Antalya)"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-6 overflow-auto"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white/90 text-stone-900 hover:bg-white shadow-lg cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={FORUM_PROGRAM_POSTER_URL}
            alt="Uluslararası İklim Adaleti Forumu Programı Tam Ekran"
            className="max-w-full max-h-[94vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
