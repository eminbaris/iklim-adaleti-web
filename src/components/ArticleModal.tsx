/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Calendar, Clock, Share2, Printer, Check, Tag, FileText } from 'lucide-react';
import { Article } from '../types.ts';
import { formatTurkishDate } from '../utils/contentLogic.ts';
import { renderFormattedDeclarationParagraph } from './SonucBildirgesiSection.tsx';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenSignModal?: () => void;
}

export function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function ArticleModal({
  article,
  onClose,
  onOpenSignModal
}: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const shareUrl = 'https://iklimadaleti.org/sonuc-bildirgeleri';

  const handleShare = () => {
    navigator.clipboard.writeText(`${article.title} — ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const paragraphs = Array.isArray(article.content)
    ? article.content
    : String(article.content || '').split('\n\n');

  const ytEmbed = getYoutubeEmbedUrl(article.videoUrl);

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
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-[#0B4F71]">{article.category}</span>
            {article.documentNumber && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="font-mono text-[11px] text-stone-600">{article.documentNumber}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {article.pdfUrl && (
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3E8226] text-white rounded-lg text-xs font-bold hover:bg-[#31681E]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF İndir / Aç</span>
              </a>
            )}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors cursor-pointer"
              title="Yazdır / PDF Olarak Kaydet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors cursor-pointer"
              title="Bağlantıyı Paylaş"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-md cursor-pointer"
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
                {article.readTimeMinutes || 3} dakika okuma
              </span>
            </div>
          </div>

          {/* Optional Featured Photo / Image */}
          {article.imageUrl && (
            <div className="mb-6 rounded-xl overflow-hidden border border-stone-200 bg-white">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full max-h-[460px] object-contain mx-auto"
              />
            </div>
          )}

          {/* Optional Video (YouTube or uploaded MP4) */}
          {article.videoUrl && (
            <div className="mb-6 rounded-xl overflow-hidden border border-stone-200 bg-black">
              {ytEmbed ? (
                <iframe
                  src={ytEmbed}
                  title={article.title}
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={article.videoUrl}
                  controls
                  className="w-full max-h-[440px] mx-auto"
                />
              )}
            </div>
          )}

          {/* Excerpt Lead */}
          <div className="p-4 bg-white rounded-md border border-stone-200 mb-6 text-sm sm:text-base text-stone-800 italic font-serif leading-relaxed">
            "{article.excerpt}"
          </div>

          {/* Article Full Content with Editorial Paragraphs */}
          <div className="text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
            {paragraphs.map((paragraph, idx) =>
              renderFormattedDeclarationParagraph(paragraph, idx)
            )}
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
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#16423C] hover:bg-[#0F2C26] rounded shadow-xs whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                Bildirgeyi İmzala
              </button>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
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
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-stone-600">Paylaş:</span>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `🌱 ${article.title} (${article.date}) — ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-md bg-[#25D366]/15 text-[#128C7E] font-bold hover:bg-[#25D366]/25 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `🌱 ${article.title} #İklimAdaleti`
              )}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-md bg-stone-900 text-white font-bold hover:bg-stone-800 transition-colors"
            >
              X (Twitter)
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-md bg-[#1877F2]/15 text-[#1877F2] font-bold hover:bg-[#1877F2]/25 transition-colors"
            >
              Facebook
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-200/80 hover:bg-stone-300 rounded-lg font-bold text-stone-700 cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
