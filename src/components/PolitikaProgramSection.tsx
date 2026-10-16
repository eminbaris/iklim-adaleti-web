/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefreshCw, FileText, Download, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Article } from '../types.ts';
import { getYoutubeEmbedUrl } from './ArticleModal.tsx';

interface PolitikaProgramSectionProps {
  policies?: Article[];
  onReadFull: (article: Article) => void;
}

export default function PolitikaProgramSection({
  policies = [],
  onReadFull
}: PolitikaProgramSectionProps) {
  return (
    <section
      id="politika-program"
      aria-labelledby="policy-heading"
      className="py-12 sm:py-16 bg-[#FBF9F5] border-b border-stone-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E8226] block mb-1.5">
              Temel İlkeler & Yol Haritası
            </span>
            <h2
              id="policy-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
            >
              Politika / Program
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5 text-[#3E8226]" />
            <span>{policies.length > 0 ? `${policies.length} Belge` : 'Güncelleniyor'}</span>
          </span>
        </div>

        {policies.length === 0 ? (
          <div className="mt-8 bg-white border border-dashed border-stone-300 rounded-xl p-8 sm:p-10 text-center">
            <p className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2">
              İçerik güncelleniyor...
            </p>
            <p className="text-sm text-stone-500 max-w-lg mx-auto">
              İklim Adaleti Forumu politika metinleri, program belgeleri ve kapsamlı raporlar bu bölümde yer alacaktır.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {policies.map((doc) => {
              const ytEmbed = getYoutubeEmbedUrl(doc.videoUrl);
              return (
                <div
                  key={doc.id}
                  className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0B4F71]">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#3E8226]">
                          Politika / Program
                        </span>
                        {doc.date && (
                          <>
                            <span>·</span>
                            <span>{doc.date}</span>
                          </>
                        )}
                        {doc.author && (
                          <>
                            <span>·</span>
                            <span>{doc.author}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
                        {doc.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      {doc.pdfUrl && (
                        <>
                          <a
                            href={doc.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3E8226] hover:bg-[#31681E] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>PDF’yi Tam Ekran Aç</span>
                          </a>
                          <a
                            href={doc.pdfUrl}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-bold transition-colors"
                          >
                            <Download className="w-4 h-4 text-[#0B4F71]" />
                            <span>PDF İndir</span>
                          </a>
                        </>
                      )}
                      {doc.content &&
                        Array.isArray(doc.content) &&
                        doc.content.join('').trim() !== doc.excerpt.trim() && (
                          <button
                            type="button"
                            onClick={() => onReadFull(doc)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B4F71] text-white text-xs sm:text-sm font-bold hover:bg-[#083B54] cursor-pointer"
                          >
                            <span>Detayları Oku</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Gömülü PDF Okuyucu (Uzun PDF'lerin doğrudan sayfa içinde okunabilmesi için) */}
                  {doc.pdfUrl && (
                    <div className="pt-4 border-t border-stone-200/80 space-y-3">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-stone-700">
                          <FileText className="w-4 h-4 text-[#3E8226]" />
                          <span>Belge Önizleme (Sayfa içinde kaydırarak okuyabilir veya yukarıdan indirebilirsiniz)</span>
                        </span>
                      </div>
                      <div className="w-full h-[560px] sm:h-[680px] rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
                        <iframe
                          src={doc.pdfUrl}
                          title={doc.title}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {(doc.imageUrl || doc.videoUrl) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-200/70">
                      {doc.imageUrl && (
                        <div className="rounded-lg overflow-hidden border border-stone-200 bg-[#FBF9F5] p-3 flex items-center justify-center">
                          <img
                            src={doc.imageUrl}
                            alt={doc.title}
                            className="w-full h-auto max-h-[420px] object-contain rounded-lg"
                          />
                        </div>
                      )}
                      {doc.videoUrl && (
                        <div className="rounded-lg overflow-hidden border border-stone-200 bg-black aspect-video">
                          {ytEmbed ? (
                            <iframe
                              src={ytEmbed}
                              title={doc.title}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          ) : (
                            <video src={doc.videoUrl} controls className="w-full h-full" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
