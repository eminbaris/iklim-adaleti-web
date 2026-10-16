/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefreshCw, Calendar, FileText, ArrowUpRight } from 'lucide-react';
import { Article } from '../types.ts';

interface ForumlarSectionProps {
  items?: Article[];
  onReadArticle?: (article: Article) => void;
}

export default function ForumlarSection({ items = [], onReadArticle }: ForumlarSectionProps) {
  return (
    <section
      id="forumlar"
      aria-labelledby="forumlar-heading"
      className="py-12 sm:py-16 bg-white border-b border-stone-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F71] block mb-1.5">
              Bölgesel ve Tematik Buluşmalar
            </span>
            <h2
              id="forumlar-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
            >
              Forumlar
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5 text-[#0B4F71]" />
            <span>{items.length > 0 ? `${items.length} İçerik` : 'Güncelleniyor'}</span>
          </span>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 bg-[#FBF9F5] border border-dashed border-stone-300 rounded-xl p-8 sm:p-10 text-center">
            <p className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2">
              İçerik güncelleniyor...
            </p>
            <p className="text-sm text-stone-500 max-w-lg mx-auto">
              Bölgesel ve tematik İklim Adaleti Forumları'na ilişkin duyuru ve program bilgileri yakında bu bölümde yer alacaktır.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-[#FBF9F5] border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-[#0B4F71]/40 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-[#0B4F71] font-bold">
                      {item.category || 'Forum'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-4">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-500">{item.author}</span>
                  <div className="flex items-center gap-2">
                    {item.pdfUrl && (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#3E8226] hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF / Bağlantı</span>
                      </a>
                    )}
                    {onReadArticle && (
                      <button
                        type="button"
                        onClick={() => onReadArticle(item)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0B4F71] hover:underline cursor-pointer"
                      >
                        <span>Detayları Oku</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
