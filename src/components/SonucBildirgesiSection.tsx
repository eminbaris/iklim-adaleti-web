/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock } from 'lucide-react';
import { Article } from '../types.ts';

interface SonucBildirgesiSectionProps {
  declaration?: Article;
  onReadFull?: (article: Article) => void;
  onOpenSignModal?: () => void;
}

export default function SonucBildirgesiSection(_props: SonucBildirgesiSectionProps) {
  return (
    <section id="sonuc-bildirgeleri" className="py-12 lg:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-[#FBF9F5] rounded-2xl border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F71] block mb-1">
              iklimadaleti.org · Bölüm
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Sonuç Bildirgeleri
            </h2>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-stone-200/90 text-xs sm:text-sm font-semibold text-stone-600 shadow-2xs self-start sm:self-center">
            <Clock className="w-4 h-4 text-[#D96818] shrink-0" />
            <span>İçerik güncelleniyor...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
