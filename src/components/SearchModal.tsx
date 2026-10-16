/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, BookOpen, ArrowRight } from 'lucide-react';
import { Article, Brochure } from '../types.ts';
import { filterContentItems } from '../utils/contentLogic.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  brochures: Brochure[];
  onSelectArticle: (article: Article) => void;
  onSelectBrochure: (brochure: Brochure) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  articles,
  brochures,
  onSelectArticle,
  onSelectBrochure
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredArticles = query.trim() ? filterContentItems(articles, query) : [];
  const filteredBrochures = query.trim()
    ? brochures.filter(
        (b) =>
          b.title.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR')) ||
          b.summary.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR'))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full p-4 sm:p-6 z-10 border border-stone-200">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sonuç bildirgesi, kömür, adil geçiş, Akbelen ara..."
            className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-96 overflow-y-auto">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-stone-400">
              Aramak istediğiniz terimi yazınız. (Örn: <span className="text-emerald-900 font-medium">bildirge</span>, <span className="text-emerald-900 font-medium">adil geçiş</span>, <span className="text-emerald-900 font-medium">hukuk</span>)
            </div>
          ) : filteredArticles.length === 0 && filteredBrochures.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              "{query}" için eşleşen içerik bulunamadı.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBrochures.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                    Broşürler ({filteredBrochures.length})
                  </span>
                  <div className="space-y-1.5">
                    {filteredBrochures.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectBrochure(b);
                        }}
                        className="w-full p-2.5 rounded-lg hover:bg-stone-50 border border-transparent hover:border-stone-200 flex items-center justify-between text-left text-xs transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-800 shrink-0" />
                          <span className="font-medium text-stone-900">{b.title}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredArticles.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                    Yazılar & Bildirgeler ({filteredArticles.length})
                  </span>
                  <div className="space-y-1.5">
                    {filteredArticles.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectArticle(a);
                        }}
                        className="w-full p-2.5 rounded-lg hover:bg-stone-50 border border-transparent hover:border-stone-200 flex items-center justify-between text-left text-xs transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-semibold mb-0.5">
                            <span>{a.category}</span>
                            <span>·</span>
                            <span className="text-stone-400">{a.author}</span>
                          </div>
                          <span className="font-medium text-stone-900 block">{a.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
