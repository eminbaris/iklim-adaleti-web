/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock } from 'lucide-react';
import { ForumEvent } from '../types.ts';

interface EtkinliklerSectionProps {
  events?: ForumEvent[];
  onRegisterEvent?: (event: ForumEvent) => void;
}

export default function EtkinliklerSection(_props: EtkinliklerSectionProps) {
  return (
    <section id="etkinlik-takvimi" className="py-12 lg:py-16 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E8226] block mb-1">
              iklimadaleti.org · Bölüm
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Etkinlik Takvimi
            </h2>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-stone-200/90 text-xs sm:text-sm font-semibold text-stone-600 self-start sm:self-center">
            <Clock className="w-4 h-4 text-[#D96818] shrink-0" />
            <span>İçerik güncelleniyor...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
