/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenLegalModal: (tab: 'kvkk' | 'cookies') => void;
}

const CONSENT_STORAGE_KEY = 'iklim_adaleti_cookie_consent_v1';

export default function CookieConsentBanner({
  onOpenLegalModal
}: CookieConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!accepted) {
        setVisible(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 pointer-events-none">
      <div className="max-w-5xl mx-auto bg-[#051C26]/95 backdrop-blur-md text-[#FBF9F5] border border-sky-800/60 rounded-2xl shadow-2xl px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 pointer-events-auto">
        <div className="flex items-start gap-3 text-xs sm:text-[13px] text-stone-200 leading-relaxed">
          <Cookie className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Çerez ve KVKK Bilgilendirmesi:</strong> Sitemizde reklam veya takip çerezi
            kullanılmamakta olup yalnızca sitenin çalışması için zorunlu teknik çerezler
            kullanılmaktadır. Çağrı metni imzalarında e-posta adresiniz gizli tutulur. Detaylar
            için{' '}
            <button
              type="button"
              onClick={() => onOpenLegalModal('kvkk')}
              className="text-sky-300 hover:text-white underline font-semibold cursor-pointer"
            >
              KVKK Aydınlatma Metni
            </button>{' '}
            ve{' '}
            <button
              type="button"
              onClick={() => onOpenLegalModal('cookies')}
              className="text-emerald-300 hover:text-white underline font-semibold cursor-pointer"
            >
              Çerez Politikası
            </button>
            ’nı inceleyebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => onOpenLegalModal('kvkk')}
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Detaylar</span>
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-[#3E8226] hover:bg-[#336B1F] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Anladım / Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
