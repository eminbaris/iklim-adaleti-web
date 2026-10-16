/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Code, Download, Check, FileCode, Layers, Database } from 'lucide-react';
import { Article, Brochure } from '../types.ts';
import { generateWordPressExportData } from '../utils/contentLogic.ts';

interface WordPressExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  brochures: Brochure[];
}

export default function WordPressExportModal({
  isOpen,
  onClose,
  articles,
  brochures
}: WordPressExportModalProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const exportData = generateWordPressExportData(articles);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'iklimadaleti-wordpress-export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const phpSnippet = `// functions.php - iklimadaleti.org WordPress Custom Post Types
function iklim_register_post_types() {
    register_post_type('bildirge', array(
        'labels' => array('name' => 'Sonuç Bildirgeleri', 'singular_name' => 'Bildirge'),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'excerpt', 'custom-fields'),
        'menu_icon' => 'dashicons-media-document',
        'show_in_rest' => true
    ));

    register_post_type('yayin', array(
        'labels' => array('name' => 'Broşürler & Yayınlar', 'singular_name' => 'Broşür'),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail'),
        'menu_icon' => 'dashicons-book-alt',
        'show_in_rest' => true
    ));
}
add_action('init', 'iklim_register_post_types');`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(phpSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-xl font-bold text-stone-900">
              WordPress Tabanı & CMS Mimarisi
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-md"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm text-stone-700">
          <p className="leading-relaxed">
            <strong>iklimadaleti.org</strong> arayüzü ve veri yapısı, standart modern WordPress (Classic/Block/Gutenberg/REST API) mimarisiyle %100 uyumlu olacak şekilde şemalandırılmıştır.
          </p>

          {/* Architecture Mapping Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-stone-50 border border-stone-200 rounded">
              <span className="text-[11px] font-mono text-emerald-900 uppercase font-bold block mb-1">
                Post Type: bildirge
              </span>
              <p className="text-xs text-stone-600">
                Resmi sonuç bildirgeleri, maddeler, karar numaraları ve imza sayaçları.
              </p>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded">
              <span className="text-[11px] font-mono text-emerald-900 uppercase font-bold block mb-1">
                Post Type: yayin
              </span>
              <p className="text-xs text-stone-600">
                Basılı broşürler, PDF linkleri, sayfa sayısı ve eylem kılavuzları.
              </p>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded">
              <span className="text-[11px] font-mono text-emerald-900 uppercase font-bold block mb-1">
                Post Type: post
              </span>
              <p className="text-xs text-stone-600">
                Hukuki makaleler, görüş yazıları, havza davaları ve duyurular.
              </p>
            </div>
          </div>

          {/* WordPress PHP Code Snippet */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-stone-800 flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5" /> functions.php CPT Tanımları:
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-xs text-emerald-900 hover:underline flex items-center gap-1 font-medium"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{copiedCode ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>
            </div>
            <pre className="p-3 bg-stone-900 text-emerald-300 text-[11px] font-mono rounded overflow-x-auto leading-relaxed">
              {phpSnippet}
            </pre>
          </div>

          {/* Export Action */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-emerald-950 text-xs sm:text-sm">
                Tüm İçeriği WordPress JSON Olarak Dışa Aktar
              </h4>
              <p className="text-[11px] text-emerald-900 mt-0.5">
                {articles.length} makale, bildirge ve broşür verisini tek tıkla indirin.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportJSON}
              className="py-2 px-3.5 text-xs font-bold text-white bg-[#025B7F] hover:bg-[#034560] rounded inline-flex items-center gap-1.5 shadow-xs whitespace-nowrap self-start sm:self-auto"
            >
              {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? 'İndirildi!' : 'WP JSON İndir'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
