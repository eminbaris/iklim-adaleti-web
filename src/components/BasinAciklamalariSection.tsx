/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Megaphone,
  Calendar,
  MapPin,
  Share2,
  Check,
  Copy,
  Download,
  ArrowUpRight
} from 'lucide-react';
import { Article } from '../types.ts';

export interface PressReleaseItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  author: string;
  excerpt: string;
  images: string[];
  paragraphs: string[];
}

export const INITIAL_PRESS_RELEASES: PressReleaseItem[] = [
  {
    id: 'press-2026-10-27-antalya-kepez',
    slug: 'iscilerin-yasam-hakki-iklim-adaleti-mucadelesinin-parcasidir',
    title: 'İŞÇİLERİN YAŞAM HAKKI İKLİM ADALETİ MÜCADELESİNİN PARÇASIDIR!',
    date: '27 Ekim 2026',
    location: 'Antalya – Kepez',
    author: 'İklim Adaleti Forumu',
    excerpt:
      "26 Ekim 2026 gecesi Antalya'nın Kepez ilçesinde meydana gelen hortum sonucunda, bir inşaat şantiyesinde işçilerin barınmak için kullandığı konteynerlerin parçalanmasıyla dört işçi yaşamını yitirmiş, bir işçi yaralanmıştır. İklim adaleti, yalnızca doğanın korunması değil; emeğiyle yaşamını sürdüren insanların güvenli çalışma, barınma ve yaşama hakkının da korunması mücadelesidir.",
    images: [
      '/uploads/basin-aciklamasi-iscilerin-yasam-hakki-1.jpg',
      '/uploads/basin-aciklamasi-iscilerin-yasam-hakki-2.jpg'
    ],
    paragraphs: [
      "26 Ekim 2026 gecesi Antalya'nın Kepez ilçesinde meydana gelen hortum sonucunda, bir inşaat şantiyesinde işçilerin barınmak için kullandığı konteynerlerin parçalanmasıyla dört işçi yaşamını yitirmiş, bir işçi yaralanmıştır. Yaşamını yitiren işçilerin ailelerine ve yakınlarına başsağlığı, yaralı işçiye acil şifalar diliyoruz.",
      'Yaşanan bu acı olay, iklim adaleti ile emek mücadelesinin birbirinden ayrı düşünülemeyeceğini bir kez daha ortaya koymuştur. İklim adaleti, yalnızca doğanın korunması değil; emeğiyle yaşamını sürdüren insanların güvenli çalışma, barınma ve yaşama hakkının da korunması mücadelesidir.',
      'İklim değişikliği, aşırı hava olaylarının sıklığını ve şiddetini birçok bölgede artırarak ekolojik ve toplumsal riskleri derinleştirmektedir. Bu nedenle yaşanan afetleri yalnızca doğanın olağan işleyişiyle açıklamak mümkün değildir. İklim krizinin yarattığı ve ağırlaştırdığı tehlikeler, toplumsal eşitsizliklerden bağımsız biçimde yaşanmamaktadır. Bu tehlikeler karşısında kimin ne ölçüde korunabildiğini, insanların çalışma ve yaşam koşulları, ekonomik olanakları ve kamusal önlemler belirlemektedir.',
      "Antalya'da yaşananlar, bu eşitsizliğin somut ve acı bir örneğidir. Kentleri inşa eden işçilerin, barınmak zorunda kaldıkları konteynerlerde yaşamlarını yitirmesi, iklim adaletinin aynı zamanda bir emek, sınıf ve toplumsal eşitlik meselesi olduğunu göstermektedir. İklim krizinin sonuçlarına karşı en savunmasız bırakılanlar, çoğu zaman bu krizin ortaya çıkmasında en az sorumluluğu bulunan emekçilerdir.",
      'Doğa olaylarının meydana gelmesini her zaman önlemek mümkün olmayabilir. Ancak bu olayların ölümcül afetlere dönüşmesinde, alınmayan önlemlerin ve güvencesiz yaşam koşullarının rolü görmezden gelinemez. İşçilerin yaşam hakkının korunması mesai saatleriyle sınırlı değildir. Güvenli barınma alanlarının oluşturulması, aşırı hava olaylarına karşı koruyucu tedbirlerin alınması ve afet risklerinin gözetilmesi hem işverenlerin hem de ilgili kamu kurumlarının sorumluluğundadır.',
      'Yaşanan olayın bütün yönleriyle araştırılmasını, işçilerin barınma koşullarının ve alınan güvenlik önlemlerinin incelenmesini, olası ihmallerin ve sorumlulukların şeffaf biçimde ortaya çıkarılmasını talep ediyoruz.',
      "Antalya'nın COP31'e ev sahipliği yapmaya hazırlandığı bir dönemde yaşanan bu kayıplar, iklim politikalarının yalnızca uluslararası müzakerelerden, ekonomik hedeflerden ve teknik dönüşüm programlarından ibaret olamayacağını bir kez daha göstermektedir. Gerçek bir iklim adaleti, emekçilerin yaşam hakkını, güvenli barınmayı, insanca çalışma koşullarını ve sosyal adaleti merkeze almakla mümkündür.",
      'İklim Adaleti Forumu olarak yaşamını yitiren işçilerin aileleriyle dayanışma içerisinde olduğumuzu, olayın takipçisi olacağımızı ve emek, kent ve doğa mücadelesini ortak bir adalet zemininde büyütme kararlılığımızı kamuoyuna duyuruyoruz.'
    ]
  }
];

interface BasinAciklamalariSectionProps {
  onReadFull?: (article: Article) => void;
}

export default function BasinAciklamalariSection({
  onReadFull
}: BasinAciklamalariSectionProps) {
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  const handleCopyLink = (item: PressReleaseItem) => {
    const shareUrl = 'https://iklimadaleti.org/basin-aciklamalari';
    navigator.clipboard.writeText(`${item.title} — ${shareUrl}`);
    setCopiedLinkId(item.id);
    setTimeout(() => setCopiedLinkId(null), 2500);
  };

  const handleCopyFullText = (item: PressReleaseItem) => {
    const fullText = `${item.title}\n(${item.date} · ${item.author})\n\n${item.paragraphs.join(
      '\n\n'
    )}\n\n— ${item.author}\nhttps://iklimadaleti.org/basin-aciklamalari`;
    navigator.clipboard.writeText(fullText);
    setCopiedTextId(item.id);
    setTimeout(() => setCopiedTextId(null), 2500);
  };

  return (
    <section
      id="basin-aciklamalari"
      aria-labelledby="press-heading"
      className="py-12 sm:py-16 bg-white border-b border-stone-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B91C1C] block mb-1.5">
              Kamuoyu Duyuruları & Güncel Açıklamalar
            </span>
            <h2
              id="press-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
            >
              Basın Açıklamaları
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#B91C1C] text-xs font-bold">
            <Megaphone className="w-3.5 h-3.5" />
            <span>{INITIAL_PRESS_RELEASES.length} Basın Açıklaması</span>
          </span>
        </div>

        {/* Press Release Cards */}
        <div className="mt-8 space-y-10">
          {INITIAL_PRESS_RELEASES.map((item) => {
            const shareUrl = 'https://iklimadaleti.org/basin-aciklamalari';
            return (
              <article
                key={item.id}
                className="bg-[#FBF9F5] border border-stone-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col gap-6 relative overflow-hidden"
              >
                {/* Top Red Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B91C1C] via-[#D96818] to-[#0B4F71]" />

                {/* 1. Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B91C1C] text-white uppercase tracking-wide">
                      <Megaphone className="w-3.5 h-3.5" />
                      <span>Basın Açıklaması</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4F71] text-white">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0B4F71]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyFullText(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedTextId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-emerald-800">Tam Metin Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#0B4F71]" />
                          <span>Basın Metnini Kopyala</span>
                        </>
                      )}
                    </button>
                    {onReadFull && (
                      <button
                        type="button"
                        onClick={() =>
                          onReadFull({
                            id: item.id,
                            title: item.title,
                            slug: item.slug,
                            category: 'Basın Açıklaması',
                            date: '2026-10-27',
                            author: item.author,
                            authorRole: item.location,
                            excerpt: item.excerpt,
                            content: [
                              ...item.paragraphs,
                              'İklim Adaleti Forumu Sekreteryası'
                            ],
                            readTimeMinutes: 3,
                            imageUrl: item.images[0]
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B4F71] text-white text-xs font-bold hover:bg-[#083B54] transition-colors cursor-pointer"
                      >
                        <span>Tam Ekran / Yazdır</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#B91C1C] leading-tight">
                  {item.title}
                </h3>

                {/* 3. Visual Cards Side-by-Side */}
                {item.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-4 sm:p-6 rounded-xl border border-stone-200">
                    {item.images.map((imgUrl, i) => (
                      <div key={imgUrl} className="flex flex-col gap-2">
                        <a
                          href={imgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50 block"
                          title="Tam boyutta görüntülemek için tıklayın"
                        >
                          <img
                            src={imgUrl}
                            alt={`${item.title} - Görsel ${i + 1}`}
                            className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                          />
                        </a>
                        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                          <span className="font-semibold">
                            Basın Açıklaması Görseli ({i + 1} / {item.images.length})
                          </span>
                          <a
                            href={imgUrl}
                            download={`iklim-adaleti-forumu-basin-aciklamasi-${i + 1}.jpg`}
                            className="inline-flex items-center gap-1 font-bold text-[#0B4F71] hover:underline"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Görseli İndir</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Full Verbatim Text */}
                <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-8 space-y-4 text-sm sm:text-base text-stone-800 leading-relaxed">
                  {item.paragraphs.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                  <p className="font-serif text-base sm:text-lg font-bold text-[#0B4F71] pt-3 text-right">
                    — {item.author}
                  </p>
                </div>

                {/* 5. 1-Click Social Sharing Strip */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 mr-1">
                    <Share2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span>Basın Açıklamasını Paylaş:</span>
                  </span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `📢 BASIN AÇIKLAMASI: ${item.title}\n\n"${item.excerpt}"\n\nTam metin ve görseller: ${shareUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs font-bold transition-colors"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `📢 ${item.title}\n\nAntalya Kepez'de yaşamını yitiren 4 inşaat işçisinin aileleriyle dayanışma içindeyiz. İklim adaleti emek mücadelesinden ayrı düşünülemez! #İklimAdaleti #Antalya`
                    )}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold transition-colors"
                  >
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 text-xs font-bold transition-colors"
                  >
                    <span>Facebook</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyLink(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedLinkId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-800">Link Kopyalandı!</span>
                      </>
                    ) : (
                      <span>Linki Kopyala</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
