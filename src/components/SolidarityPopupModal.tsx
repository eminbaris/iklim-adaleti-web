import { useEffect, useState } from 'react';
import { X, Phone, MapPin, Megaphone, Copy, Check } from 'lucide-react';
import ForumLogo from './ForumLogo.tsx';

interface SolidarityPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactPerson {
  org: string;
  name: string;
  phone: string;
}

interface RegionalLine {
  region: string;
  contacts: ContactPerson[];
}

const REGIONAL_CONTACTS: RegionalLine[] = [
  {
    region: 'Akdeniz Hattı',
    contacts: [
      {
        org: 'Derelerin Kardeşliği Akdeniz Platformu',
        name: 'Nizamettin AYDIN',
        phone: '0 532 334 10 47'
      },
      {
        org: 'Burdur – Salda Gölü Koruma Derneği',
        name: 'Gazi Osman Şakar',
        phone: '0 537 967 1201'
      }
    ]
  },
  {
    region: 'Doğu Anadolu Hattı',
    contacts: [
      {
        org: 'Muş Varto Ekoloji Platformu',
        name: 'Veli Bingöl TEKİN',
        phone: '0 553 283 49 75'
      }
    ]
  },
  {
    region: 'Doğu Karadeniz Hattı',
    contacts: [
      {
        org: 'Trabzon Araklı Karadere Vadisi Yaylaları ve Doğayı Koruma Derneği',
        name: 'Şener ŞENGÜN',
        phone: '0532 337 78 95'
      },
      {
        org: 'Samsun Çevre Platformu',
        name: 'Adnan KORKMAZ',
        phone: '0 506 534 22 13'
      }
    ]
  },
  {
    region: 'Orta Karadeniz Hattı / Amasya',
    contacts: [
      {
        org: 'Taşova Çevre Platformu',
        name: 'Yusuf Yücel',
        phone: '0 553 315 60 80'
      },
      {
        org: 'Taşova Gazetesi (taşova gen.tr)',
        name: 'Ahmet Günaydın',
        phone: '0542 421 00 67'
      }
    ]
  },
  {
    region: 'Batı Karadeniz Hattı',
    contacts: [
      {
        org: 'Bolu - Gerede Çayı Temiz Aksın Platformu',
        name: 'İlhami Armağan',
        phone: '0 533 411 10 10'
      }
    ]
  },
  {
    region: 'Ege Hattı',
    contacts: [
      {
        org: 'Çiftçi - Sen',
        name: 'Ali Bülent ERDEM',
        phone: '0 505 920 50 91'
      }
    ]
  },
  {
    region: 'Marmara Hattı',
    contacts: [
      {
        org: 'İstanbul Tarım Çalışma Grubu',
        name: 'İlkay ÖZ',
        phone: '0 551 407 66 75'
      },
      {
        org: 'İstanbul Kent Çevre Doğa ve Canlı Hakları Derneği',
        name: 'Turan Altun',
        phone: '0 537 337 06 55'
      }
    ]
  },
  {
    region: 'Trakya Hattı',
    contacts: [
      {
        org: 'Marmara Ereğlisi Çevre Gönüllüleri',
        name: 'Özgür AKSUN',
        phone: '0 536 920 66 54'
      }
    ]
  },
  {
    region: 'İç Anadolu Hattı',
    contacts: [
      {
        org: 'Eskişehir Ekoloji Derneği',
        name: 'Cevat AYDEMİR',
        phone: '0 551 018 26 81'
      }
    ]
  }
];

export default function SolidarityPopupModal({ isOpen, onClose }: SolidarityPopupModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const contactsText = REGIONAL_CONTACTS.map(
      (r) =>
        `${r.region}\n` +
        r.contacts
          .map((c) => `${c.org}\nAd Soyadı: ${c.name}\nTel: ${c.phone}`)
          .join('\n')
    ).join('\n\n');

    const fullText = `BASINA VE KAMUOYUNA

COP31’E DOĞRU: YERELLERİN ANTALYA BULUŞMASI İÇİN DAYANIŞMA ÇAĞRISI!

Yaşamı ve emeği savunan demokratik kitle örgütlerine, meslek odalarına, sendikalara, barolara, siyasi partilere, yerel yönetimlere ve tüm yaşam savunucularına çağrımızdır!

Kasım ayında Antalya'da düzenlenecek COP31 İklim Zirvesi'nde devletler ve küresel şirketler iklim krizini konuşacak. Oysa Türkiye'nin dört bir yanında ormanlar yok ediliyor, tarım toprakları talan ediliyor, su kaynakları kurutuluyor, tüm canlıların yaşamı tehdit ediliyor. Milyonlarca emekçi düşük ücretler, güvencesizlik, iş cinayetleri ve yoksullukla mücadele ederken çiftçiler üretimden koparılıyor. Yaşam alanlarını savunanlar ise baskılarla karşılaşıyor, ağır bedeller ödüyor.

İklim krizinin bedelini ödeyenlerin de söyleyecek sözü var!

15-16-17 Kasım 2026 tarihlerinde Türkiye'nin dört bir yanından yaşam savunucuları, mücadelelerini ve taleplerini ortaklaştırmak için İklim Adaleti Forumu'nda, Antalya'da buluşacak.

Bağımsız, gönüllü emek ve dayanışmayla örgütlenen forumun kurumsal bütçesi veya hazır mali kaynağı bulunmuyor. Uzak şehirlerden gelecek yaşam savunucularının ulaşım, konaklama ve temel ihtiyaçlarını karşılayabilmeleri için dayanışmaya ihtiyaç var.

Tüm kurumları ve yaşam savunucularını imkânlarını paylaşmaya çağırıyoruz!

Bir otobüs bileti, bir araç, bir gece konaklama, bir öğün yemek, teknik destek, gönüllü emek veya duyuru katkısı... Her destek, bir yerelin daha sesini Antalya'ya taşıması demektir.

Bu buluşma yalnızca üç günlük bir etkinlik değil; farklı coğrafyalarda yürütülen mücadeleler arasında kalıcı dayanışma bağları kurmanın da bir adımıdır. Toprağını, suyunu, ormanını, emeğini ve tüm canlıların yaşam hakkını savunmak için yollara düşenleri yalnız bırakmayalım!

Dayanışmayı büyütelim, yerellerin sesini Antalya'da buluşturalım!

DAYANIŞMA YAŞATIR!
İKLİM ADALETİ FORUMU

DAYANIŞMA İÇİN İLETİŞİM BİLGİLERİ

${contactsText}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/65 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="solidarity-popup-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 4-color brand stripe */}
        <div className="h-1.5 w-full flex shrink-0">
          <div className="flex-1 bg-[#0BA39C]" />
          <div className="flex-1 bg-[#D96818]" />
          <div className="flex-1 bg-[#3E8226]" />
          <div className="flex-1 bg-[#0B4F71]" />
        </div>

        {/* Sticky Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#FAF7F2] border-b border-stone-200/90 shrink-0">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#D96818]">
            <Megaphone className="w-4 h-4" />
            <span>Basına ve Kamuoyuna Duyuru</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Duyuruyu kapat"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-200/80 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Kapat</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-stone-800 text-[15px] sm:text-[16px] leading-relaxed">
          {/* Logo */}
          <div className="flex justify-center pb-3 border-b border-stone-200/70">
            <ForumLogo
              variant="cop31"
              className="w-full max-w-[210px] sm:max-w-[240px] h-auto mx-auto"
            />
          </div>

          {/* Headline */}
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-stone-500">
              BASINA VE KAMUOYUNA
            </p>
            <h2
              id="solidarity-popup-title"
              className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#0B4F71] leading-snug"
            >
              COP31’E DOĞRU: YERELLERİN ANTALYA BULUŞMASI İÇİN DAYANIŞMA ÇAĞRISI!
            </h2>
          </div>

          {/* Main Call Paragraphs */}
          <div className="space-y-3.5 text-stone-800">
            <p className="font-bold text-stone-900">
              Yaşamı ve emeği savunan demokratik kitle örgütlerine, meslek odalarına, sendikalara, barolara, siyasi partilere, yerel yönetimlere ve tüm yaşam savunucularına çağrımızdır!
            </p>

            <p>
              Kasım ayında Antalya&apos;da düzenlenecek COP31 İklim Zirvesi&apos;nde devletler ve küresel şirketler iklim krizini konuşacak. Oysa Türkiye&apos;nin dört bir yanında ormanlar yok ediliyor, tarım toprakları talan ediliyor, su kaynakları kurutuluyor, tüm canlıların yaşamı tehdit ediliyor. Milyonlarca emekçi düşük ücretler, güvencesizlik, iş cinayetleri ve yoksullukla mücadele ederken çiftçiler üretimden koparılıyor. Yaşam alanlarını savunanlar ise baskılarla karşılaşıyor, ağır bedeller ödüyor.
            </p>

            <p className="font-bold text-[#0B4F71]">
              İklim krizinin bedelini ödeyenlerin de söyleyecek sözü var!
            </p>

            <p>
              <strong>15-16-17 Kasım 2026</strong> tarihlerinde Türkiye&apos;nin dört bir yanından yaşam savunucuları, mücadelelerini ve taleplerini ortaklaştırmak için İklim Adaleti Forumu&apos;nda, Antalya&apos;da buluşacak.
            </p>

            <p>
              Bağımsız, gönüllü emek ve dayanışmayla örgütlenen forumun kurumsal bütçesi veya hazır mali kaynağı bulunmuyor. Uzak şehirlerden gelecek yaşam savunucularının ulaşım, konaklama ve temel ihtiyaçlarını karşılayabilmeleri için dayanışmaya ihtiyaç var.
            </p>

            <div className="p-4 rounded-xl bg-amber-50/80 border border-[#D96818]/30 space-y-2">
              <p className="font-extrabold text-[#D96818]">
                Tüm kurumları ve yaşam savunucularını imkânlarını paylaşmaya çağırıyoruz!
              </p>
              <p className="text-sm sm:text-[15px] text-stone-800">
                Bir otobüs bileti, bir araç, bir gece konaklama, bir öğün yemek, teknik destek, gönüllü emek veya duyuru katkısı... Her destek, bir yerelin daha sesini Antalya&apos;ya taşıması demektir.
              </p>
            </div>

            <p>
              Bu buluşma yalnızca üç günlük bir etkinlik değil; farklı coğrafyalarda yürütülen mücadeleler arasında kalıcı dayanışma bağları kurmanın da bir adımıdır. Toprağını, suyunu, ormanını, emeğini ve tüm canlıların yaşam hakkını savunmak için yollara düşenleri yalnız bırakmayalım!
            </p>

            <p className="font-bold text-stone-900">
              Dayanışmayı büyütelim, yerellerin sesini Antalya&apos;da buluşturalım!
            </p>

            <div className="pt-1 pb-2 border-l-4 border-[#3E8226] pl-3.5">
              <p className="font-extrabold text-[#3E8226] text-base sm:text-lg tracking-wide">
                DAYANIŞMA YAŞATIR!
              </p>
              <p className="font-extrabold text-[#0B4F71] text-sm sm:text-base">
                İKLİM ADALETİ FORUMU
              </p>
            </div>
          </div>

          {/* Regional Contact Information */}
          <div className="pt-4 border-t border-stone-200 space-y-4">
            <h3 className="text-base sm:text-lg font-extrabold text-[#0B4F71] uppercase tracking-wide flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D96818]" />
              <span>DAYANIŞMA İÇİN İLETİŞİM BİLGİLERİ</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REGIONAL_CONTACTS.map((line) => (
                <div
                  key={line.region}
                  className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200/90 space-y-2.5"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0B4F71] bg-sky-100/80 px-2.5 py-1 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-[#D96818]" />
                    <span>{line.region}</span>
                  </div>

                  <div className="space-y-2.5">
                    {line.contacts.map((c, idx) => {
                      const cleanTel = c.phone.replace(/\s+/g, '');
                      return (
                        <div
                          key={idx}
                          className="text-xs sm:text-sm space-y-0.5 pt-1 border-t border-stone-200/60 first:border-t-0 first:pt-0"
                        >
                          <p className="font-bold text-stone-900 leading-snug">{c.org}</p>
                          <p className="text-stone-700">
                            <span className="font-semibold">Ad Soyadı:</span> {c.name}
                          </p>
                          <p className="text-stone-800 font-semibold">
                            <span>Tel: </span>
                            <a
                              href={`tel:${cleanTel}`}
                              className="text-[#0B4F71] hover:text-[#D96818] underline decoration-dotted"
                            >
                              {c.phone}
                            </a>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#FAF7F2] border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-stone-100 text-[#0B4F71] border border-stone-300 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#3E8226]" />
                <span className="text-[#3E8226]">Çağrı Metni Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Çağrı Metnini Kopyala</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#0B4F71] hover:bg-[#093e59] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
