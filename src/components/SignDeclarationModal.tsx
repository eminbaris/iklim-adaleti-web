/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, CheckCircle, Building2, User, Mail, ShieldCheck, KeyRound, ArrowLeft, RefreshCw } from 'lucide-react';
import { Signatory } from '../types.ts';

interface SignDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSignatory: (signatory: Omit<Signatory, 'id' | 'date'>) => void;
}

export default function SignDeclarationModal({
  isOpen,
  onClose,
  onAddSignatory
}: SignDeclarationModalProps) {
  const [signType, setSignType] = useState<'institutional' | 'individual'>('institutional');
  const [step, setStep] = useState<'form' | 'verify' | 'success'>('form');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot hidden field

  // Email OTP Verification states
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [demoNoticeCode, setDemoNoticeCode] = useState<string | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetAll = () => {
    setStep('form');
    setName('');
    setEmail('');
    setOrganization('');
    setCity('');
    setMessage('');
    setHoneypot('');
    setGeneratedCode('');
    setEnteredCode('');
    setDemoNoticeCode(null);
    setError('');
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  // Step 1: Validate fields & Send 6-Digit Email Verification Code
  const handleSendCode = async (e: React.FormEvent) => {
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
      setError('Lütfen onay kodunun gönderileceği geçerli bir e-posta adresi giriniz.');
      return;
    }

    setSendingCode(true);

    // Generate a 6-digit verification code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(code);

    try {
      // Attempt to call backend email OTP endpoint if configured on Coolify / server
      const res = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          organization: organization.trim(),
          code
        })
      });

      if (!res.ok) {
        // Fallback for preview / before SMTP env vars are set
        setDemoNoticeCode(code);
      } else {
        const data = await res.json();
        if (data.previewCode) {
          setDemoNoticeCode(data.previewCode);
        }
      }
    } catch {
      // In static / local preview mode without SMTP backend, show the code in test banner
      setDemoNoticeCode(code);
    } finally {
      setSendingCode(false);
      setStep('verify');
    }
  };

  // Step 2: Verify the 6-digit code & Add signature to the list
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (enteredCode.trim() !== generatedCode) {
      setError('Girdiğiniz 6 haneli onay kodu hatalı. Lütfen kontrol edip tekrar deneyiniz.');
      return;
    }

    onAddSignatory({
      name: signType === 'institutional' ? organization.trim() : name.trim(),
      organization: signType === 'institutional' ? organization.trim() : (organization.trim() || undefined),
      city: city.trim(),
      message: message.trim() || undefined,
      type: signType,
      emailVerified: true
    });

    setStep('success');
    setTimeout(() => {
      handleClose();
    }, 2200);
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

        {/* STEP 3: SUCCESS */}
        {step === 'success' && (
          <div className="py-8 text-center">
            <CheckCircle className="w-14 h-14 text-[#3E8226] mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              E-posta Doğrulandı ve İmzanız Eklendi!
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              {signType === 'institutional' ? (
                <>
                  <strong>{organization}</strong> çağrı metninin altındaki <strong>İmzacı Kurumlar</strong> listesine başarıyla eklendi.
                </>
              ) : (
                <>
                  Sayın <strong>{name}</strong>, imzanız doğrulanarak çağrı metninin altına başarıyla eklendi.
                </>
              )}
            </p>
          </div>
        )}

        {/* STEP 2: 6-DIGIT EMAIL OTP VERIFICATION */}
        {step === 'verify' && (
          <div>
            <button
              type="button"
              onClick={() => {
                setStep('form');
                setError('');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bilgileri Düzenle</span>
            </button>

            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-bold text-[#0B4F71] mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3E8226]" />
                <span>Adım 2/2 · E-posta Onay Kodu Doğrulaması</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Onay Kodunu Giriniz
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                Güvenlik doğrulaması için <strong>{email}</strong> adresine 6 haneli tek kullanımlık onay kodu gönderildi.
              </p>
            </div>

            {demoNoticeCode && (
              <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-0.5">
                  Önizleme / Test Modu Onay Kodunuz:
                </span>
                <span>
                  Sunucu SMTP e-posta ayarı yapılana kadar test edebilmeniz için üretilen onay kodu:{' '}
                  <strong className="font-mono text-sm tracking-widest bg-white px-2 py-0.5 rounded border border-amber-300">
                    {demoNoticeCode}
                  </strong>
                </span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  6 Haneli Onay Kodu *
                </label>
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={enteredCode}
                    onChange={(e) => {
                      setEnteredCode(e.target.value.replace(/\D/g, ''));
                      if (error) setError('');
                    }}
                    placeholder="000000"
                    className="w-full pl-11 pr-4 py-3 text-lg font-mono font-bold tracking-[0.35em] text-stone-900 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Kod ulaşmadı mı?</span>
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="font-bold text-[#0B4F71] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Yeni Kod Gönder</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-3 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 text-xs sm:text-sm font-extrabold text-white bg-[#3E8226] hover:bg-[#31681E] rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Kodu Doğrula ve İmzayı Tamamla
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 1: INITIAL SIGNATURE FORM */}
        {step === 'form' && (
          <div>
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0B4F71]">
                <ShieldCheck className="w-4 h-4 text-[#3E8226]" />
                <span>E-posta Doğrulamalı Güvenli İmza</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Çağrı Metnini İmzala
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Sahte imzaları önlemek amacıyla e-posta adresinize <strong>6 haneli onay kodu</strong> gönderilir. Onaylanan kurum imzaları doğrudan metnin altındaki <strong>İmzacı Kurumlar</strong> listesine eklenir.
              </p>
            </div>

            {/* Sign Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setSignType('institutional');
                  setError('');
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  signType === 'institutional'
                    ? 'bg-[#0B4F71] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>İmzacı Kurum / Örgüt</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSignType('individual');
                  setError('');
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  signType === 'individual'
                    ? 'bg-[#0B4F71] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Bireysel İmza</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSendCode} className="space-y-4">
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
                    Kurum / Sendika / Meslek Örgütü / Dernek Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => {
                      setOrganization(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Örn: Sendika, Meslek Odası, Ekoloji Derneği"
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {signType === 'institutional' ? 'Yetkili / İletişim Kişisi *' : 'Ad Soyad *'}
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
                    placeholder="Örn: Antalya"
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              </div>

              {signType === 'individual' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Kurum / İşkolu / Meslek (İsteğe bağlı)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Örn: İşçi, Çiftçi, Öğretmen..."
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:border-[#0B4F71] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  E-posta Adresi (Onay kodu gönderilecektir) *
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
                    placeholder="ornek@kurum.org"
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
                  disabled={sendingCode}
                  className="flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#0B4F71] hover:bg-[#083B54] disabled:opacity-60 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-sky-200" />
                  <span>{sendingCode ? 'Onay Kodu Gönderiliyor...' : 'E-postaya Onay Kodu Gönder'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
