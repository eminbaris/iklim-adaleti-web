/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Article } from '../types.ts';

export type ArticleItem = Article;

/**
 * Filter items by keyword (in title, excerpt, content, tags, author) and category
 */
export function filterContentItems(
  items: ArticleItem[],
  query: string,
  category: string = 'Tümü',
  selectedTag: string = ''
): ArticleItem[] {
  const cleanQuery = query.trim().toLocaleLowerCase('tr-TR');
  
  return items.filter((item) => {
    // Category match
    if (category !== 'Tümü' && item.category !== category) {
      return false;
    }

    // Tag match
    if (selectedTag && !item.tags.some(t => t.toLocaleLowerCase('tr-TR') === selectedTag.toLocaleLowerCase('tr-TR'))) {
      return false;
    }

    // Keyword match
    if (!cleanQuery) return true;

    const inTitle = item.title.toLocaleLowerCase('tr-TR').includes(cleanQuery);
    const inExcerpt = item.excerpt.toLocaleLowerCase('tr-TR').includes(cleanQuery);
    const inAuthor = item.author.toLocaleLowerCase('tr-TR').includes(cleanQuery);
    const inTags = item.tags.some(t => t.toLocaleLowerCase('tr-TR').includes(cleanQuery));

    return inTitle || inExcerpt || inAuthor || inTags;
  });
}

/**
 * Calculate reading time in minutes (Turkish average 160 wpm for technical/legal texts)
 */
export function calculateReadingTime(text: string, wpm = 160): number {
  if (!text) return 1;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wpm));
}

/**
 * Format date in Turkish format (e.g. 14 Ekim 2026)
 */
export function formatTurkishDate(dateString: string): string {
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
      ];

      if (monthIndex >= 0 && monthIndex < 12 && !isNaN(day) && !isNaN(year)) {
        return `${day} ${months[monthIndex]} ${year}`;
      }
    }
    return dateString;
  } catch {
    return dateString;
  }
}

/**
 * Truncate text cleanly without cutting words
 */
export function truncateClean(text: string, maxLen = 140): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '…';
}

/**
 * Generate WordPress compatible export schema
 */
export function generateWordPressExportData(items: ArticleItem[]) {
  return {
    generator: 'WordPress/6.4.3',
    siteTitle: 'İklim Adaleti Forumu',
    siteUrl: 'https://iklimadaleti.org',
    exportDate: new Date().toISOString(),
    posts: items.map(item => ({
      post_id: item.id,
      post_title: item.title,
      post_name: item.slug,
      post_type: item.category === 'Sonuç Bildirgesi' ? 'bildirge' : (item.category === 'Broşür & Yayın' ? 'yayin' : 'post'),
      post_status: 'publish',
      post_date: item.date,
      post_author: item.author,
      post_excerpt: item.excerpt,
      post_content: item.content,
      categories: [item.category],
      tags: item.tags,
      meta: {
        _iklim_doc_number: item.documentNumber || '',
        _iklim_pdf_url: item.pdfUrl || '',
        _iklim_signable: item.signable ? '1' : '0'
      }
    }))
  };
}
