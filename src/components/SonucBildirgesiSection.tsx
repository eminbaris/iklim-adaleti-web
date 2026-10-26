/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  RefreshCw,
  FileText,
  ArrowUpRight,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import { Article } from '../types.ts';
import { getYoutubeEmbedUrl } from './ArticleModal.tsx';

interface SonucBildirgesiSectionProps {
  declarations?: Article[];
  onReadFull: (article: Article) => void;
  onOpenSignModal: () => void;
}

const DECLARATION_SECTION_HEADINGS = new Set([
  'Forumun Katılımcı Yapısı ve Demokratik İşleyişi',
  'Forumun Kuruluşu ve Niteliği',
  'Sekreteryanın Kurulması ve Yapısı',
  'İklim Adaleti Tanımı ve İlkeleri',
  'Antalya Bağlamında İklim Adaletsizliği: Yerel Sorunlar ve İhlaller',
  'Forumun Amacı ve Misyonu',
  'Dayanışma ve Ulusal/Uluslararası Zemin',
  'Gelecek Planlaması ve Yol Haritası',
  'SONUÇ: Katılımcı Demokrasiyle İklim Adaleti Mücadelesine Çağrı'
]);

export function renderFormattedDeclarationParagraph(paragraph: string, idx: number) {
  const trimmed = paragraph.trim();

  if (DECLARATION_SECTION_HEADINGS.has(trimmed)) {
    return (
      <h4
        key={idx}
        className="font-serif text-lg sm:text-xl font-bold text-[#0B4F71] pt-5 pb-1.5 border-b border-stone-200"
      >
        {trimmed}
      </h4>
    );
  }

  if (trimmed === 'İklim Adaleti Forumu Sekreteryası') {
    return (
      <p
        key={idx}
        className="font-serif text-base sm:text-lg font-bold text-stone-900 pt-3 text-right"
      >
        — {trimmed}
      </p>
    );
  }

  // Numbered article (e.g. "1. Antalya İklim Adaleti Forumu...")
  const numMatch = trimmed.match(/^(\d{1,2}\.)\s+([\s\S]+)$/);
  if (numMatch) {
    return (
      <p key={idx} className="text-stone-800 leading-relaxed">
        <span className="inline-flex items-center justify-center px-2 py-0.5 mr-2 rounded-md bg-[#0B4F71]/10 text-[#0B4F71] font-bold text-xs sm:text-sm">
          Madde {numMatch[1].replace('.', '')}
        </span>
        {numMatch[2]}
      </p>
    );
  }

  // Sub-topic with colon (e.g. "Kıyıların ve Doğal Alanların Tahribatı: ...")
  const colonMatch = trimmed.match(/^([A-ZÇĞİÖŞÜ][^:]{3,55}:)\s+([\s\S]+)$/);
  if (colonMatch) {
    return (
      <div
        key={idx}
        className="pl-3.5 sm:pl-4 border-l-3 border-[#3E8226]/70 bg-stone-50/80 py-2.5 px-3 rounded-r-lg text-stone-800 leading-relaxed"
      >
        <strong className="text-stone-950 font-bold">{colonMatch[1]} </strong>
        <span>{colonMatch[2]}</span>
      </div>
    );
  }

  return (
    <p key={idx} className="text-stone-800 leading-relaxed">
      {trimmed}
    </p>
  );
}

export default function SonucBildirgesiSection({
  declarations = [],
  onReadFull
}: SonucBildirgesiSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'decl-antalya-2026-01-28': true
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="sonuc-bildirgeleri"
      aria-labelledby="declaration-heading"
      className="py-12 sm:py-16 bg-white border-b border-stone-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F71] block mb-1.5">
              Ortak Deklarasyonlar & Belgeler
            </span>
            <h2
              id="declaration-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
            >
              Sonuç Bildirgeleri
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5 text-[#0B4F71]" />
            <span>
              {declarations.length > 0 ? `${declarations.length} Bildirge` : 'Güncelleniyor'}
            </span>
          </span>
        </div>

        {declarations.length === 0 ? (
          <div className="mt-8 bg-[#FBF9F5] border border-dashed border-stone-300 rounded-xl p-8 sm:p-10 text-center">
            <p className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2">
              İçerik güncelleniyor...
            </p>
            <p className="text-sm text-stone-500 max-w-lg mx-auto">
              Gerçekleştirilen forumların sonuç bildirgeleri ve ortak karar metinleri yakında bu
              bölümde yayınlanacaktır.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {declarations.map((decl) => {
              const ytEmbed = getYoutubeEmbedUrl(decl.videoUrl);
              const isExpanded = Boolean(expandedIds[decl.id]);
              const paragraphs = Array.isArray(decl.content)
                ? decl.content
                : String(decl.content || '').split('\n\n');

              return (
                <article
                  key={decl.id}
                  className="bg-[#FBF9F5] border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6"
                >
                  {/* 1. Üst Künye Rozetleri */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4F71] text-white">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{decl.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0B4F71]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{decl.author}</span>
                    </span>
                    {decl.authorRole && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3E8226]">
                        <Users className="w-3.5 h-3.5" />
                        <span>{decl.authorRole}</span>
                      </span>
                    )}
                  </div>

                  {/* 2. Başlık, Özet ve Eylem Butonları */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                        {decl.title}
                      </h3>
                      <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                        {decl.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      {decl.pdfUrl && (
                        <a
                          href={decl.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-bold text-stone-700 hover:border-[#0B4F71]"
                        >
                          <FileText className="w-4 h-4 text-[#3E8226]" />
                          <span>PDF İndir / Görüntüle</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleExpand(decl.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#0B4F71]/30 bg-white text-[#0B4F71] text-xs sm:text-sm font-bold hover:bg-sky-50 transition-colors cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            <span>Metni Daralt</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            <span>Sayfada Tam Metni Aç</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onReadFull(decl)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B4F71] text-white text-xs sm:text-sm font-bold hover:bg-[#083B54] transition-colors cursor-pointer"
                      >
                        <span>Tam Ekran Oku / Yazdır</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 3. Ana Başlıklar Özeti (İçindekiler Şeridi) */}
                  {decl.keyPoints && decl.keyPoints.length > 0 && (
                    <div className="bg-white border border-stone-200/90 rounded-xl p-4 sm:p-5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 block mb-3">
                        Bildirge Ana Başlıkları (26 Madde)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {decl.keyPoints.map((pt, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs font-semibold text-stone-700 bg-stone-50/80 px-3 py-2 rounded-lg border border-stone-200/60"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3E8226] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Açılır/Kapanır Tam Metin Okuma Alanı */}
                  {isExpanded && paragraphs.length > 0 && (
                    <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-8 space-y-4 text-sm sm:text-base">
                      {paragraphs.map((p, idx) => renderFormattedDeclarationParagraph(p, idx))}
                    </div>
                  )}

                  {(decl.imageUrl || decl.videoUrl) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-200/70">
                      {decl.imageUrl && (
                        <div className="rounded-lg overflow-hidden border border-stone-200 bg-white max-h-72">
                          <img
                            src={decl.imageUrl}
                            alt={decl.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      {decl.videoUrl && (
                        <div className="rounded-lg overflow-hidden border border-stone-200 bg-black aspect-video">
                          {ytEmbed ? (
                            <iframe
                              src={ytEmbed}
                              title={decl.title}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          ) : (
                            <video src={decl.videoUrl} controls className="w-full h-full" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
