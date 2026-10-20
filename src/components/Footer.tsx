/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, Mail, ArrowUp, PenTool, Lock } from 'lucide-react';
import ForumLogo from './ForumLogo.tsx';

interface FooterProps {
  onOpenSignModal: () => void;
  onOpenAdminModal?: () => void;
  onNavigate?: (sectionId: string, path: string) => void;
  onOpenLegalModal?: (tab: 'kvkk' | 'cookies') => void;
}

export default function Footer({
  onOpenSignModal,
  onOpenAdminModal,
  onNavigate,
  onOpenLegalModal
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051C26] text-[#FBF9F5] border-t border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-white/10">
          
          {/* Col 1: Identity & Description (5 cols) */}
          <div className="lg:col-span-5">
            <div className="mb-4 bg-[#FBF9F5] px-4 py-3 rounded-xl inline-block shadow-sm">
              <ForumLogo className="h-14 sm:h-16 w-auto" variant="full" />
            </div>

            <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed max-w-sm mb-6">
              <strong>iklimadaleti.org</strong> — COP31’e Doğru İklim Adaleti Forumu. Zamanımızı, yaşamımızı, geleceğimizi istiyoruz; başka bir dünyayı birlikte kuralım!
            </p>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/iklimadaletiforumu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-stone-200 transition-colors"
                title="Instagram: @iklimadaletiforumu"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@iklimadaletiforumu</span>
              </a>

              <a
                href="mailto:iletisim@iklimadaleti.org"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-stone-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-stone-300" />
                <span>iletisim@iklimadaleti.org</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-sky-400 mb-4">
              Menü
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 font-medium">
              {[
                { id: 'anasayfa', label: 'Anasayfa', href: '/' },
                { id: 'forumlar', label: 'Forumlar', href: '/forumlar' },
                { id: 'calisma-gruplari', label: 'Çalışma Grupları', href: '/calisma-gruplari' },
                { id: 'sonuc-bildirgeleri', label: 'Sonuç Bildirgeleri', href: '/sonuc-bildirgeleri' },
                { id: 'politika-program', label: 'Politika / Program', href: '/politika-program' },
                { id: 'etkinlik-takvimi', label: 'Etkinlik Takvimi', href: '/etkinlikler' }
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(link.id, link.href);
                      }
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Call to Action (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-emerald-400 mb-3">
                15–16–17 Kasım’da Antalya’da Buluşuyoruz!
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-5">
                COP31 Şirketlerin Değil, Emeğin ve Halklarındır! Çağrı metnini imzalayarak dayanışmayı büyütün.
              </p>

              <button
                type="button"
                onClick={onOpenSignModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B4F71] hover:bg-[#0D628C] text-xs sm:text-sm font-bold text-white transition-colors shadow-sm cursor-pointer"
              >
                <PenTool className="w-4 h-4 text-sky-200" />
                <span>Çağrı Metnini İmzala</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                type="button"
                onClick={scrollToTop}
                className="text-xs text-stone-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Yukarı Çık</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              © {new Date().getFullYear()} iklimadaleti.org · İklim Adaleti Forumu
            </p>
            {onOpenLegalModal && (
              <div className="flex items-center gap-3 text-[11px] text-stone-400">
                <span className="text-stone-600 hidden sm:inline">·</span>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('kvkk')}
                  className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                >
                  KVKK Aydınlatma Metni
                </button>
                <span className="text-stone-600">·</span>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('cookies')}
                  className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Çerez ve Gizlilik Politikası
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[11px]">
              Başka bir dünyayı birlikte kuralım!
            </p>
            {onOpenAdminModal && (
              <button
                type="button"
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-300 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Yönetici Girişi</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
