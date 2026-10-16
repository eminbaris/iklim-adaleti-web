/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Clock, Calendar, ArrowRight, User, Tag, FileText } from 'lucide-react';
import { Article } from '../types.ts';
import { filterContentItems, formatTurkishDate, truncateClean } from '../utils/contentLogic.ts';

interface YazilarGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function YazilarGrid({
  articles,
  onSelectArticle,
  searchQuery,
  setSearchQuery
}: YazilarGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const categories = [
    'Tümü',
    'Sonuç Bildirgesi',
    'Makale & Görüş',
    'Hukuk & Rapor',
    'Broşür & Yayın',
    'Haber & Duyuru'
  ];

  // Extract all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags))
  ).slice(0, 8);

  const filteredArticles = filterContentItems(
    articles,
    searchQuery,
    selectedCategory,
    selectedTag
  );

  return (
    <section id="yazilar" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subtitle */}
        <div className="pb-8 border-b border-stone-200 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-2">
            <span>Yayın Arşivi & Hukuk Yazıları</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>WordPress Uyumlu İçerik Havuzu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Yazılar, Hukuki Görüşler ve Raporlar
          </h2>
          <p className="mt-2 text-base text-stone-600 max-w-2xl">
            Ekoloji hukuku, adil geçiş modelleri, havza davaları ve iklim politikalarına dair güncel araştırma ve değerlendirmeler.
          </p>
        </div>

        {/* Filter Bar & Search Input (Clean interactive controls, functional buttons) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedTag('');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === category && !selectedTag
                    ? 'bg-[#025B7F] text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Inline Live Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yazılarda veya etiketlerde ara..."
              className="w-full pl-9 pr-3 py-1.5 text-xs text-stone-900 bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:border-emerald-800 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                Temizle
              </button>
            )}
          </div>
        </div>

        {/* Tag Filters Strip (Clean unboxed clickable text) */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-stone-500 mb-8 pb-4 border-b border-stone-100">
          <span className="font-medium text-stone-700 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Öne Çıkan Etiketler:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(selectedTag === tag ? '' : tag);
                setSelectedCategory('Tümü');
              }}
              className={`hover:text-emerald-900 transition-colors cursor-pointer ${
                selectedTag === tag ? 'text-emerald-900 font-bold underline' : ''
              }`}
            >
              #{tag}
            </button>
          ))}
          {selectedTag && (
            <button
              type="button"
              onClick={() => setSelectedTag('')}
              className="text-[11px] text-red-700 underline ml-2"
            >
              Etiketi Kaldır
            </button>
          )}
        </div>

        {/* Results count when filtering */}
        {(searchQuery || selectedCategory !== 'Tümü' || selectedTag) && (
          <div className="mb-6 text-xs text-stone-500 flex items-center justify-between">
            <span>
              Filtrelenen sonuç: <strong>{filteredArticles.length}</strong> yazı bulundu.
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Tümü');
                setSelectedTag('');
                setSearchQuery('');
              }}
              className="text-emerald-900 underline hover:text-emerald-950 font-medium"
            >
              Tüm Filtreleri Sıfırla
            </button>
          </div>
        )}

        {/* Articles Feed: Clean Editorial Layout (Like fevziozluer.av.tr) */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center bg-[#FBF9F5] rounded-lg border border-stone-200">
            <p className="text-stone-600 text-sm font-medium">
              Aradığınız kriterlere uygun yazı bulunamadı.
            </p>
            <p className="text-stone-400 text-xs mt-1">
              Lütfen farklı bir anahtar kelime veya kategori seçiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#FBF9F5] border border-stone-200/90 rounded-lg p-6 hover:border-emerald-800/40 transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => onSelectArticle(article)}
              >
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-emerald-900">{article.category}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {formatTurkishDate(article.date)}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {article.readTimeMinutes} dk okuma
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-950 transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {truncateClean(article.excerpt, 170)}
                  </p>
                </div>

                {/* Bottom author and action */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-xs">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-stone-900 block leading-tight">
                        {article.author}
                      </span>
                      {article.authorRole && (
                        <span className="text-[11px] text-stone-500 block leading-tight">
                          {article.authorRole}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-emerald-900 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Yazıyı Oku</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
