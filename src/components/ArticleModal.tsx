/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Calendar, Clock, Share2, Printer, Check, Tag } from 'lucide-react';
import { Article } from '../types.ts';
import { formatTurkishDate } from '../utils/contentLogic.ts';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenSignModal?: () => void;
}

export default function ArticleModal({
  article,
  onClose,
  onOpenSignModal
}: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`https://iklimadaleti.org#${article.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] rounded-xl shadow-2xl max-w-3xl w-full p-6 sm:p-10 z-10 border border-stone-300 max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-emerald-900">{article.category}</span>
            {article.documentNumber && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="font-mono text-[11px] text-stone-600">{article.documentNumber}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
              title="Yazdır / PDF Olarak Kaydet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
              title="Bağlantıyı Paylaş"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Share2 className="w-4 h-4" />}
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

        {/* Scrollable Article Body */}
        <div className="py-6 overflow-y-auto flex-1 pr-1 sm:pr-3">
          {/* Article Header */}
          <div className="mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-4">
              {article.title}
            </h2>

            {/* Author and Date byline */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pb-4 border-b border-stone-200">
              <span className="font-medium text-stone-900">
                {article.author} {article.authorRole ? `(${article.authorRole})` : ''}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {formatTurkishDate(article.date)}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {article.readTimeMinutes} dakika okuma
              </span>
            </div>
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 bg-white rounded-md border border-stone-200 mb-6 text-sm sm:text-base text-stone-800 italic font-serif leading-relaxed">
            "{article.excerpt}"
          </div>

          {/* Article Full Content with Editorial Paragraphs */}
          <div className="text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
            {article.content.split('\n\n').map((paragraph, idx) => {
              // Opening paragraph gets drop-cap
              if (idx === 0) {
                return (
                  <p key={idx} className="editorial-drop-cap">
                    {paragraph}
                  </p>
                );
              }

              // Heading lines
              if (paragraph.startsWith('TEMEL TALEPLERİMİZ') || paragraph.startsWith('Önerdiğimiz') || paragraph.startsWith('Bizler')) {
                return (
                  <h4 key={idx} className="font-serif text-lg font-bold text-stone-900 pt-3">
                    {paragraph}
                  </h4>
                );
              }

              return (
                <p key={idx}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Signable CTA if it is the declaration */}
          {article.signable && onOpenSignModal && (
            <div className="mt-8 p-6 bg-emerald-50/80 border border-emerald-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-base font-bold text-emerald-950">
                  Bu Bildirgeyi İmzalamak İster Misiniz?
                </h4>
                <p className="text-xs text-emerald-900 mt-0.5">
                  Toplumsal adalet ve ekolojik haklar için imzanızı ekleyin.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSignModal();
                }}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#16423C] hover:bg-[#0F2C26] rounded shadow-xs whitespace-nowrap self-start sm:self-auto"
              >
                Bildirgeyi İmzala
              </button>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Etiketler:
            </span>
            {article.tags.map((t) => (
              <span key={t} className="text-xs text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>iklimadaleti.org · Resmi Yayın Arşivi</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-stone-200/80 hover:bg-stone-300 rounded font-medium text-stone-700"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
}
