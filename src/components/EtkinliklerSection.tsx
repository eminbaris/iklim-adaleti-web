/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RefreshCw, Calendar, Clock, MapPin, FileText, X, ZoomIn, Share2, Check, ArrowLeft, ExternalLink } from 'lucide-react';
import { ForumEvent } from '../types.ts';
import { getYoutubeEmbedUrl } from './ArticleModal.tsx';

export function toEventSlug(text: string): string {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/i̇/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface EtkinliklerSectionProps {
  events: ForumEvent[];
  onRegisterEvent: (event: ForumEvent) => void;
  selectedEventSlug?: string | null;
  onSelectEventSlug?: (slug: string | null) => void;
}

function parseTurkishEventDate(dateStr: string, timeStr?: string): number {
  if (!dateStr) return Number.MAX_SAFE_INTEGER;
  const clean = dateStr.trim();

  // 1. DD.MM.YYYY or DD/MM/YYYY
  const dmyMatch = clean.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const month = Number(dmyMatch[2]) - 1;
    const year = Number(dmyMatch[3]);
    const [hh = 0, mm = 0] = (timeStr || '').split(/[:.]/).map(Number);
    return new Date(year, month, day, hh || 0, mm || 0).getTime();
  }

  // 2. YYYY-MM-DD
  const ymdMatch = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (ymdMatch) {
    const year = Number(ymdMatch[1]);
    const month = Number(ymdMatch[2]) - 1;
    const day = Number(ymdMatch[3]);
    const [hh = 0, mm = 0] = (timeStr || '').split(/[:.]/).map(Number);
    return new Date(year, month, day, hh || 0, mm || 0).getTime();
  }

  // 3. Turkish month names (e.g., "17 Ekim 2026")
  const months: Record<string, number> = {
    ocak: 0,
    şubat: 1,
    subat: 1,
    mart: 2,
    nisan: 3,
    mayıs: 4,
    mayis: 4,
    haziran: 5,
    temmuz: 6,
    ağustos: 7,
    agustos: 7,
    eylül: 8,
    eylul: 8,
    ekim: 9,
    kasım: 10,
    kasim: 10,
    aralık: 11,
    aralik: 11
  };
  const trMatch = clean.toLowerCase().match(/(\d{1,2})\s+([a-zçğıöşü]+)\s*(\d{4})?/);
  if (trMatch) {
    const day = Number(trMatch[1]);
    const month = months[trMatch[2]];
    const year = trMatch[3] ? Number(trMatch[3]) : 2026;
    if (month !== undefined) {
      return new Date(year, month, day).getTime();
    }
  }

  const parsed = Date.parse(clean);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

export default function EtkinliklerSection({
  events,
  selectedEventSlug,
  onSelectEventSlug
}: EtkinliklerSectionProps) {
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sortedEvents = [...events].sort(
    (a, b) => parseTurkishEventDate(a.date, a.time) - parseTurkishEventDate(b.date, b.time)
  );

  const matchedSingleEvent = selectedEventSlug
    ? sortedEvents.find(
        (ev) =>
          toEventSlug(ev.title) === selectedEventSlug ||
          ev.id.toLowerCase() === selectedEventSlug.toLowerCase()
      )
    : null;

  const displayedEvents = matchedSingleEvent ? [matchedSingleEvent] : sortedEvents;

  const handleCopyEventLink = (ev: ForumEvent) => {
    const slug = toEventSlug(ev.title);
    const url = `${window.location.origin}/etkinlikler/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(ev.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section
      id="etkinlik-takvimi"
      aria-labelledby="events-heading"
      className="py-12 sm:py-16 bg-[#FBF9F5] border-b border-stone-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E8226] block mb-1.5">
              Buluşmalar & Program
            </span>
            <h2
              id="events-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
            >
              {matchedSingleEvent ? matchedSingleEvent.title : 'Etkinlik Takvimi'}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {matchedSingleEvent && onSelectEventSlug && (
              <button
                type="button"
                onClick={() => onSelectEventSlug(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B4F71] hover:bg-[#083B54] text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tüm Etkinlik Takvimini Gör ({events.length})</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-semibold">
              <RefreshCw className="w-3.5 h-3.5 text-[#3E8226]" />
              <span>{events.length > 0 ? `${events.length} Etkinlik` : 'Güncelleniyor'}</span>
            </span>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="mt-8 bg-white border border-dashed border-stone-300 rounded-xl p-8 sm:p-10 text-center">
            <p className="font-serif text-lg sm:text-xl font-bold text-stone-800 mb-2">
              İçerik güncelleniyor...
            </p>
            <p className="text-sm text-stone-500 max-w-lg mx-auto">
              İklim Adaleti Forumu etkinlik takvimi ve buluşma tarihleri netleştikçe bu bölümde paylaşılacaktır.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {displayedEvents.map((ev) => {
              const ytEmbed = getYoutubeEmbedUrl(ev.videoUrl);
              const slug = toEventSlug(ev.title);
              return (
                <div
                  key={ev.id}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row"
                >
                  {/* Sol / Üst Kısım: Afiş Görseli (Hiçbir yeri kesilmeden tam boy görünür) */}
                  {ev.imageUrl && (
                    <div className="md:w-80 lg:w-96 shrink-0 bg-[#FBF9F5] border-b md:border-b-0 md:border-r border-stone-200 p-4 flex items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setPreviewImage({ url: ev.imageUrl!, title: ev.title })}
                        className="w-full flex flex-col items-center cursor-pointer"
                        title="Afişi tam ekran büyütmek için tıklayın"
                      >
                        <img
                          src={ev.imageUrl}
                          alt={ev.title}
                          className="w-full h-auto max-h-[460px] object-contain rounded-lg shadow-xs"
                        />
                        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B4F71] opacity-80 group-hover:opacity-100">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Afişi Büyüt</span>
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Sağ / Alt Kısım: Etkinlik Bilgileri ve Açıklama */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs text-stone-600 mb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3E8226] font-bold">
                            {ev.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-bold text-[#0B4F71] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                            <Calendar className="w-3.5 h-3.5" />
                            {ev.date}
                          </span>
                          {ev.time && (
                            <span className="inline-flex items-center gap-1 font-semibold bg-stone-100 px-3 py-1 rounded-full text-stone-700">
                              <Clock className="w-3.5 h-3.5 text-[#0B4F71]" />
                              {ev.time}
                            </span>
                          )}
                        </div>

                        {/* Doğrudan Etkinlik Linkini Paylaş / Tek Sayfada Aç */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyEventLink(ev)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
                            title="Sadece bu etkinliğin doğrudan paylaşım linkini kopyala"
                          >
                            {copiedId === ev.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#3E8226]" />
                                <span className="text-[#3E8226]">Link Kopyalandı!</span>
                              </>
                            ) : (
                              <>
                                <Share2 className="w-3.5 h-3.5 text-[#0B4F71]" />
                                <span>Etkinlik Linkini Paylaş</span>
                              </>
                            )}
                          </button>
                          {!matchedSingleEvent && onSelectEventSlug && (
                            <a
                              href={`/etkinlikler/${slug}`}
                              onClick={(e) => {
                                e.preventDefault();
                                onSelectEventSlug(slug);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0B4F71] font-bold text-xs transition-colors"
                              title="Bu etkinliği tek başına ayrı sayfada aç"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Tek Sayfa</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-4 leading-snug">
                        {!matchedSingleEvent && onSelectEventSlug ? (
                          <a
                            href={`/etkinlikler/${slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              onSelectEventSlug(slug);
                            }}
                            className="hover:text-[#0B4F71] transition-colors"
                          >
                            {ev.title}
                          </a>
                        ) : (
                          ev.title
                        )}
                      </h3>

                      <p className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line mb-6">
                        {ev.description}
                      </p>

                      {ev.videoUrl && (
                        <div className="mb-6 rounded-xl overflow-hidden border border-stone-200 bg-black aspect-video max-w-xl">
                          {ytEmbed ? (
                            <iframe
                              src={ytEmbed}
                              title={ev.title}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          ) : (
                            <video src={ev.videoUrl} controls className="w-full h-full" />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-stone-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#0B4F71] shrink-0" />
                        <span>{ev.location}</span>
                      </div>
                      {ev.pdfUrl && (
                        <a
                          href={ev.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200 font-bold text-[#3E8226] hover:bg-emerald-100"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Program / PDF İndir</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tam Ekran Afiş Büyütme (Lightbox) */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="mb-3 self-end inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-stone-900 text-xs font-bold shadow-md cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Kapat</span>
            </button>
            <img
              src={previewImage.url}
              alt={previewImage.title}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}
