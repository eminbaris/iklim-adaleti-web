/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Instagram, FileText, Users, Calendar, ArrowRight, ExternalLink, PenTool } from 'lucide-react';
import ForumLogo from './ForumLogo.tsx';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignModal: () => void;
  activeSection?: string;
  onNavigate?: (sectionId: string, path: string) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onOpenSignModal,
  activeSection,
  onNavigate
}: MobileDrawerProps) {
  if (!isOpen) return null;

  const links = [
    { id: 'anasayfa', label: 'Anasayfa', href: '/', icon: ArrowRight },
    { id: 'forumlar', label: 'Forumlar', href: '/forumlar', icon: Users },
    { id: 'calisma-gruplari', label: 'Çalışma Grupları', href: '/calisma-gruplari', icon: Users },
    { id: 'sonuc-bildirgeleri', label: 'Sonuç Bildirgeleri', href: '/sonuc-bildirgeleri', icon: FileText },
    { id: 'politika-program', label: 'Politika / Program', href: '/politika-program', icon: FileText },
    { id: 'etkinlik-takvimi', label: 'Etkinlik Takvimi', href: '/etkinlikler', icon: Calendar }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FBF9F5] shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div className="p-5">
          {/* Top header of drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <ForumLogo className="h-12 w-auto" variant="full" />
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-md focus-visible:outline-2 focus-visible:outline-[#0B4F71]"
              aria-label="Menüyü Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-5 flex flex-col gap-1.5" aria-label="Mobil Menü">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate(link.id, link.href);
                    }
                    onClose();
                  }}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-[#0B4F71] text-white'
                      : 'text-stone-800 hover:bg-stone-200/60'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-200' : 'text-[#0B4F71]'}`} />
                    <span>{link.label}</span>
                  </span>
                  <span className={`text-xs ${isActive ? 'text-sky-200' : 'text-stone-400'}`}>→</span>
                </a>
              );
            })}
          </nav>

          {/* Primary Sign CTA inside Mobile Menu */}
          <div className="mt-6 pt-5 border-t border-stone-200/80">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSignModal();
              }}
              className="w-full py-3 px-4 rounded-lg text-sm font-bold text-white bg-[#0B4F71] hover:bg-[#083B54] transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4 text-sky-200" />
              <span>Çağrı Metnini İmzala</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-stone-200 bg-stone-100/70">
          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/iklimadaletiforumu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-pink-700 transition-colors py-1.5"
            >
              <span className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>@iklimadaletiforumu</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>

            <p className="text-[11px] text-stone-500 pt-2 border-t border-stone-200/60">
              iklimadaleti.org · İklim Adaleti Forumu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
