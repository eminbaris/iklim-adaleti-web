/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Download, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Brochure } from '../types.ts';

interface BrosurlerSectionProps {
  brochures: Brochure[];
  onOpenBrochure: (brochure: Brochure) => void;
  onDownloadBrochure: (brochure: Brochure) => void;
}

export default function BrosurlerSection({
  brochures,
  onOpenBrochure,
  onDownloadBrochure
}: BrosurlerSectionProps) {
  return (
    <section id="brosurler" className="py-16 lg:py-24 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-2">
              <span>Basılı & Dijital Materyaller</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Açık Erişim</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>iklimadaleti.org</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Broşürler ve Eylem Kılavuzları
            </h2>
            <p className="mt-2 text-base text-stone-600 max-w-2xl">
              Mahallelerde, fabrikalarda, köylerde ve üniversitelerde dağıtılmak üzere hazırlanan basıma hazır eylem rehberlerimiz ve raporlarımız.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Tüm materyaller Creative Commons lisansıyla serbestçe çoğaltılabilir.
          </div>
        </div>

        {/* Brochure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brochures.map((brochure) => (
            <div
              key={brochure.id}
              className="bg-white border border-stone-300/80 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Top: Booklet Cover Graphic (Handcrafted Editorial Layout) */}
              <div
                className="p-6 relative text-white transition-transform duration-300 overflow-hidden"
                style={{ backgroundColor: brochure.coverColor || '#16423C' }}
              >
                {/* Decorative spine line */}
                <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-black/20" />
                
                {/* Minimalist leaf/scale watermark */}
                <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                  <svg className="w-40 h-40" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="45" />
                  </svg>
                </div>

                <div className="relative pl-3">
                  <div className="text-[11px] font-mono tracking-widest uppercase text-emerald-200/90 mb-3">
                    {brochure.editionNumber}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight mb-2 group-hover:text-amber-200 transition-colors">
                    {brochure.title}
                  </h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed font-sans line-clamp-2">
                    {brochure.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/80">
                    <span>{brochure.pageCount} Sayfa</span>
                    <span>{brochure.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Summary Prose */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {brochure.summary}
                  </p>

                  {/* Clean unboxed tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 mb-4">
                    {brochure.tags.map((tag, idx) => (
                      <span key={tag} className="flex items-center gap-1.5">
                        {idx > 0 && <span aria-hidden="true" className="text-stone-300">·</span>}
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-stone-200 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure(brochure)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#025B7F]" />
                    <span>Sayfaları İncele</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDownloadBrochure(brochure)}
                    className="py-2 px-3.5 text-xs font-bold text-white bg-[#025B7F] hover:bg-[#034560] rounded transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    title={`${brochure.title} PDF dosyasını indir`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">İndir</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Action Callout for printed distribution */}
        <div className="mt-12 p-6 bg-white border border-stone-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Şehrinizde veya kurumunuzda basılı broşür dağıtmak ister misiniz?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Yüksek çözünürlüklü matbaa baskı kalıplarını (CMYK PDF) ücretsiz temin edebilirsiniz.
              </p>
            </div>
          </div>

          <a
            href="mailto:iletisim@iklimadaleti.org?subject=Basili%20Brosur%20Talep"
            className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Matbaa Kalıbı Talep Et
          </a>
        </div>

      </div>
    </section>
  );
}
