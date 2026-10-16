/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, BookOpen, Share2, Check } from 'lucide-react';
import { Brochure } from '../types.ts';

interface BrochureModalProps {
  brochure: Brochure | null;
  onClose: () => void;
  onDownload: (brochure: Brochure) => void;
}

export default function BrochureModal({
  brochure,
  onClose,
  onDownload
}: BrochureModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!brochure) return null;

  const totalPages = brochure.pages.length;
  const activePage = brochure.pages[currentPage];

  const handleShare = () => {
    navigator.clipboard.writeText(`https://iklimadaleti.org#brosur-${brochure.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] rounded-xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 z-10 border border-stone-300 flex flex-col max-h-[90vh]">
        
        {/* Top bar of modal */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-emerald-900 uppercase">
              {brochure.editionNumber} · {brochure.fileSize}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              {brochure.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
              title="Bağlantıyı Paylaş"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-md focus-visible:outline-2 focus-visible:outline-emerald-800"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Booklet Simulated Reading Area */}
        <div className="py-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-stone-200/90 shadow-sm min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-100 mb-6">
                <span>İklim Adaleti Forumu Yayınları</span>
                <span>Sayfa {currentPage + 1} / {totalPages}</span>
              </div>

              <h4 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                {activePage.heading}
              </h4>

              <div className="prose text-stone-700 text-sm sm:text-base leading-relaxed">
                <p className="editorial-drop-cap font-sans">
                  {activePage.text}
                </p>
              </div>
            </div>

            {/* Page navigation controls */}
            <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed rounded flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Önceki Sayfa</span>
              </button>

              <div className="flex items-center gap-1">
                {brochure.pages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentPage ? 'bg-emerald-900 w-5' : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Sayfa ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed rounded flex items-center gap-1"
              >
                <span>Sonraki Sayfa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-stone-500">
            Lisans: CC-BY-NC 4.0 · Çoğaltılabilir ve dağıtılabilir.
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDownload(brochure)}
              className="py-2.5 px-4 text-xs font-bold text-white bg-[#025B7F] hover:bg-[#034560] rounded flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Broşürü PDF Olarak İndir ({brochure.fileSize})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
