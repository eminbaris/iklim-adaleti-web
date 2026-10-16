/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X, Instagram, PenTool } from 'lucide-react';
import ForumLogo from './ForumLogo.tsx';

interface HeaderProps {
  onOpenSignModal: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
}

export default function Header({
  onOpenSignModal,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection
}: HeaderProps) {
  const navLinks = [
    { label: 'Anasayfa', href: '#anasayfa' },
    { label: 'Forumlar', href: '#forumlar' },
    { label: 'Çalışma Grupları', href: '#calisma-gruplari' },
    { label: 'Sonuç Bildirgeleri', href: '#sonuc-bildirgeleri' },
    { label: 'Etkinlik Takvimi', href: '#etkinlik-takvimi' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/90 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 min-h-[84px] sm:min-h-[96px] lg:min-h-[104px] flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Official Logo Lockup */}
        <a
          href="#anasayfa"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#0B4F71] rounded-sm py-0.5 transition-opacity hover:opacity-95"
          aria-label="İklim Adaleti Forumu Anasayfa"
        >
          <ForumLogo
            className="h-13 sm:h-16 lg:h-[72px] w-auto shrink-0"
            variant="full"
          />
        </a>

        {/* Navigation Links (Anasayfa - Forumlar - Çalışma Grupları - Sonuç Bildirgeleri - Etkinlik Takvimi) */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-semibold text-stone-700"
          aria-label="Ana Menü"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap shrink-0 transition-colors py-1.5 border-b-2 ${
                  isActive
                    ? 'text-[#0B4F71] font-bold border-[#0B4F71]'
                    : 'border-transparent hover:text-[#0B4F71] hover:border-[#0B4F71]/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Instagram link */}
          <a
            href="https://www.instagram.com/iklimadaletiforumu"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-pink-700 bg-white hover:bg-stone-50 border border-stone-200/90 rounded-lg transition-colors"
            title="Instagram: @iklimadaletiforumu"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span className="hidden xl:inline">@iklimadaletiforumu</span>
          </a>

          {/* Primary Sign CTA in Header */}
          <button
            type="button"
            onClick={onOpenSignModal}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#0B4F71] hover:bg-[#083B54] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5 text-sky-200" />
            <span>İmzala</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#0B4F71]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-stone-900" /> : <Menu className="w-6 h-6 text-stone-900" />}
          </button>
        </div>

      </div>
    </header>
  );
}
