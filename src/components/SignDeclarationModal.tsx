/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, CheckCircle, Building2, User, Mail, ShieldCheck, PenTool } from 'lucide-react';
import { Signatory } from '../types.ts';

interface SignDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSignatory: (signatory: Omit<Signatory, 'id' | 'date'>) => void;
  onOpenLegalModal?: (tab: 'kvkk' | 'cookies') => void;
}

const INDIVIDUAL_PROFESSION_PATTERN =
  /^(emekli|yazar|birey|bireysel|şahıs|sahis|kişi|kisi|kişisel|kisisel|vatandaş|vatandas|yurttaş|yurttas|işçi|isci|memur|öğretmen|ogretmen|eğitim|egitim|eğitimci|egitimci|akademisyen|akademi|avukat|hukuk|hukukçu|hukukcu|mimar|mimarlık|mühendis|muhendis|mühendislik|doktor|hekim|hemşire|hemsire|sağlık|saglik|sağlık emekçisi|saglik emekcisi|sağlıkçı|saglikci|öğrenci|ogrenci|gazeteci|basın|basin|medya|araştırmacı|arastirmaci|yazar ve araştırmacı|araştırmacı ve yazar|sanatçı|sanatci|sanat|müzisyen|muzisyen|oyuncu|yönetmen|yonetmen|çiftçi|ciftci|çiftlik|ciftlik|tarım|tarim|üretici|uretici|ev hanımı|ev hanimi|ev kadını|ev kadini|serbest|serbest meslek|esnaf|psikolog|sosyolog|ekonomist|siyaset bilimci|aktivist|ekolojist|yaşam savunucusu|yasam savunucusu|sendika emekçisi|kamu emekçisi|işsiz|issiz|yok|bağımsız|bagimsiz|-|\.)(\s*[\/,-]\s*.*)?$/i;

export function classifySignatoryInput(input: {
  signType: 'institutional' | 'individual';
  name: string;
  organization: string;
  city: string;
  message?: string;
}): Omit<Signatory, 'id' | 'date'> {
  const cleanName = input.name.trim();
  const cleanOrg = input.organization.trim();
  const cleanCity = input.city.trim();
  const cleanMsg = input.message?.trim() || undefined;

  if (input.signType === 'individual') {
    return {
      name: cleanName,
      organization: cleanOrg || undefined,
      city: cleanCity,
      message: cleanMsg,
      type: 'individual',
      emailVerified: true
    };
  }

  // Check if user accidentally stayed on 'institutional' tab while entering a personal profession (e.g., "Emekli", "Yazar", "Birey")
  if (cleanOrg && INDIVIDUAL_PROFESSION_PATTERN.test(cleanOrg) && cleanName) {
    const isBireyWord = /^(birey|bireysel|kişi|kisi|yok|-|\.)$/i.test(cleanOrg);
    return {
      name: cleanName,
      organization: isBireyWord ? undefined : cleanOrg,
      city: cleanCity,
      message: cleanMsg,
      type: 'individual',
      emailVerified: true
    };
  }

  return {
    name: cleanOrg || cleanName,
    organization: cleanOrg || cleanName,
    city: cleanCity,
    message: cleanMsg,
    type: 'institutional',
    emailVerified: true
  };
}

export default function SignDeclarationModal({
  isOpen,
  onClose,
  onAddSignatory,
  onOpenLegalModal
}: SignDeclarationModalProps) {
  const [signType, setSignType] = useState<'institutional' | 'individual'>('individual');
  const [step, setStep] = useState<'form' | 'success'>('form');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot hidden field

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [savedAsType, setSavedAsType] = useState<'institutional' | 'individual'>('individual');
  const [savedDisplayName, setSavedDisplayName] = useState('');

  if (!isOpen) return null;

  const resetAll = () => {
    setStep('form');
    setName('');
    setEmail('');
    setOrganization('');
    setCity('');
    setMessage('');
    setHoneypot('');
    setSubmitting(false);
    setError('');
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const handleSubmitSignature = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Bot protection honeypot check
    if (honeypot.trim() !== '') {
      return;
    }

    if (signType === 'institutional' && !organization.trim()) {
      setError('Lütfen imzacı kurum / sendika / dernek adını belirtiniz.');
      return;
    }
    if (!name.trim()) {
      setError('Lütfen ad ve soyadınızı (veya yetkili kişiyi) belirtiniz.');
      return;
    }
    if (!city.trim()) {
      setError('Lütfen şehri belirtiniz.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    setSubmitting(true);

    const classified = classifySignatoryInput({
      signType,
      name,
      organization,
      city,
      message
    });

    setSavedAsType(classified.type || 'individual');
    setSavedDisplayName(
      classified.type === 'institutional'
        ? classified.organization || classified.name
        : classified.name
    );

    // 1. Immediately add and save the signatory on client & server so ZERO signatures are ever lost
    onAddSignatory(classified);

    // 2. Also trigger background confirmation email / log via server
    try {
      await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          organization: organization.trim(),
          city: city.trim(),
          message: message.trim(),
          signType: classified.type,
          autoSave: true
        })
      });
    } catch {
      // Ignore email notification error since signature is already saved via /api/signatories
    } finally {
      setSubmitting(false);
      setStep('success');
      setTimeout(() => {
        handleClose();
      }, 2800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 border border-stone-200">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-md focus-visible:outline-2 focus-visible:outline-[#0B4F71]"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS SCREEN */}
        {step === 'success' && (
          <div className="py-8 text-center">
            <CheckCircle className="w-14 h-14 text-[#3E8226] mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              İmzanız Başarıyla Eklendi!
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              {savedAsType === 'institutional' ? (
                <>
                  <strong>{savedDisplayName}</strong> çağrı metninin altındaki{' '}
                  <strong>İmzacı Kurumlar</strong> listesine başarıyla eklendi.
                </>
              ) : (
                <>
                  Sayın <strong>{savedDisplayName}</strong>, imzanız çağrı metninin altındaki{' '}
                  <strong>Bireysel İmzacılar</strong> listesine başarıyla eklendi.
                </>
              )}
            </p>
          </div>
        )}

        {/* SIGNATURE FORM */}
        {step === 'form' && (
          <div>
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0B4F71]">
                <ShieldCheck className="w-4 h-4 text-[#3E8226]" />
                <span>COP31’e Doğru İklim Adaleti Forumu</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Çağrı Metnini İmzala
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Lütfen aşağıdan <strong>Bireysel İmza</strong> veya <strong>İmzacı Kurum / Örgüt</strong> seçeneğini belirleyerek bilgilerinizi giriniz. İmzanız anında çağrı metninin altındaki listeye eklenecektir.
              </p>
            </div>

            {/* Sign Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-100 rounded-xl mb-5 border border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setSignType('individual');
                  setError('');
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  signType === 'individual'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Bireysel İmza (Kişi)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSignType('institutional');
                  setError('');
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  signType === 'institutional'
                    ? 'bg-[#3E8226] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>İmzacı Kurum / Örgüt</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitSignature} className="space-y-4">
              {/* Hidden Honeypot input against automated spam bots */}
              <input
                type="text"
                name="website_url_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {signType === 'institutional' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Kurum / Sendika / Meslek Örgütü / Dernek / Platform Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => {
                      setOrganization(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Örn: Ekoloji Derneği, Sendika, Meslek Odası..."
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {signType === 'institutional' ? 'Yetkili / İletişim Kişisi Ad Soyad *' : 'Adınız ve Soyadınız *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Adınız ve Soyadınız"
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Şehir *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Örn: Antalya, İstanbul, İzmir..."
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              </div>

              {signType === 'individual' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Meslek / Ünvan / Kurum (İsteğe bağlı)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Örn: Emekli, Öğretmen, İşçi, Akademisyen, Avukat..."
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  E-posta Adresi *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="ornek@eposta.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Dayanışma Notu (İsteğe bağlı)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Çağrıya ilişkin mesajınız..."
                  className="w-full px-3.5 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors resize-none"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600 leading-relaxed">
                🔒 <strong>E-posta adresiniz kesinlikle herkese açık yayınlanmaz</strong> ve üçüncü kişilerle paylaşılmaz. Bilgileriniz{' '}
                {onOpenLegalModal ? (
                  <button
                    type="button"
                    onClick={() => onOpenLegalModal('kvkk')}
                    className="text-[#0B4F71] font-semibold underline cursor-pointer"
                  >
                    KVKK Aydınlatma Metni
                  </button>
                ) : (
                  <span className="font-semibold text-[#0B4F71]">KVKK Aydınlatma Metni</span>
                )}{' '}
                kapsamında korunmaktadır.
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 px-4 text-xs sm:text-sm font-extrabold text-white bg-[#3E8226] hover:bg-[#31681E] disabled:opacity-60 rounded-lg transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <PenTool className="w-4 h-4 text-emerald-100" />
                  <span>{submitting ? 'İmzanız Kaydediliyor...' : 'Çağrı Metnini İmzala ve Kaydet'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
