/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefreshCw, Calendar, Clock, MapPin, FileText } from 'lucide-react';
import { ForumEvent } from '../types.ts';
import { getYoutubeEmbedUrl } from './ArticleModal.tsx';

interface EtkinliklerSectionProps {
  events: ForumEvent[];
  onRegisterEvent: (event: ForumEvent) => void;
}

export default function EtkinliklerSection({ events }: EtkinliklerSectionProps) {
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
              Etkinlik Takvimi
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5 text-[#3E8226]" />
            <span>{events.length > 0 ? `${events.length} Etkinlik` : 'Güncelleniyor'}</span>
          </span>
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((ev) => {
              const ytEmbed = getYoutubeEmbedUrl(ev.videoUrl);
              return (
                <div
                  key={ev.id}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    {ev.imageUrl && (
                      <div className="w-full h-52 bg-stone-100 border-b border-stone-200 overflow-hidden">
                        <img
                          src={ev.imageUrl}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!ev.imageUrl && ev.videoUrl && (
                      <div className="w-full aspect-video bg-black border-b border-stone-200 overflow-hidden">
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
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#3E8226] font-bold">
                          {ev.type}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-stone-700">
                          <Calendar className="w-3.5 h-3.5 text-[#0B4F71]" />
                          {ev.date}
                        </span>
                        {ev.time && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {ev.time}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{ev.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs font-medium text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#0B4F71] shrink-0" />
                      <span>{ev.location}</span>
                    </div>
                    {ev.pdfUrl && (
                      <a
                        href={ev.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#3E8226] hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Program / PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
