/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefreshCw, FileText, ArrowUpRight } from 'lucide-react';
import { Article } from '../types.ts';

interface SonucBildirgesiSectionProps {
  declarations?: Article[];
  onReadFull: (article: Article) => void;
  onOpenSignModal: () => void;
}

export default function SonucBildirgesiSection({
  declarations = [],
  onReadFull
}: SonucBildirgesiSectionProps) {
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
            <span>{declarations.length > 0 ? `${declarations.length} Bildirge` : 'Güncelleniyor'}</span>
          </span>
        </div>

        {declarations.length === 0 ? (
          <div className="mt-8 bg-[#FBF9F5] border border-dashed border-stone-300 rounded-xl p-8 sm:p-10 text-center">
            <p className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2">
              İçerik güncelleniyor...
            </p>
            <p className="text-sm text-stone-500 max-w-lg mx-auto">
              Gerçekleştirilen forumların sonuç bildirgeleri ve ortak karar metinleri yakında bu bölümde yayınlanacaktır.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {declarations.map((decl) => (
              <div
                key={decl.id}
                className="bg-[#FBF9F5] border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B4F71]">
                    <span>{decl.date}</span>
                    <span>·</span>
                    <span>{decl.author}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    {decl.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{decl.excerpt}</p>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                  {decl.pdfUrl && (
                    <a
                      href={decl.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-xs font-bold text-stone-700 hover:border-[#0B4F71]"
                    >
                      <FileText className="w-4 h-4 text-[#3E8226]" />
                      <span>PDF İndir</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onReadFull(decl)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0B4F71] text-white text-xs font-bold hover:bg-[#083B54] cursor-pointer"
                  >
                    <span>Tam Metni Oku</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
