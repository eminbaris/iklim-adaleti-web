/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefreshCw, Users } from 'lucide-react';
import { WorkingGroup } from '../types.ts';

interface CalismaGruplariSectionProps {
  groups: WorkingGroup[];
  onJoinGroup: (group: WorkingGroup) => void;
}

export default function CalismaGruplariSection({ groups }: CalismaGruplariSectionProps) {
  return (
    <section
      id="calisma-gruplari"
      aria-labelledby="groups-heading"
      className="py-12 sm:py-16 bg-[#FBF9F5] border-b border-stone-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E8226] block mb-1.5">
              Ortak Mücadele & Komisyonlar
            </span>
            <h2
              id="groups-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
            >
              Çalışma Grupları
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5 text-[#3E8226]" />
            <span>{groups.length > 0 ? `${groups.length} Çalışma Grubu` : 'Güncelleniyor'}</span>
          </span>
        </div>

        {groups.length === 0 ? (
          <div className="mt-8 bg-white border border-dashed border-stone-300 rounded-xl p-8 sm:p-10 text-center">
            <p className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2">
              İçerik güncelleniyor...
            </p>
            <p className="text-sm text-stone-500 max-w-lg mx-auto">
              İklim Adaleti Forumu çalışma grupları ve komisyonlarına ilişkin detaylar yakında eklenecektir.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g) => (
              <div
                key={g.id}
                className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#3E8226] mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{g.name}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{g.description}</p>
                </div>
                {g.coordinator && (
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
                    <span className="font-semibold text-stone-700">Koordinasyon / İletişim:</span>{' '}
                    {g.coordinator}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
