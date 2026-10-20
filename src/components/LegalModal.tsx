/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { X, ShieldCheck, Cookie, Lock, Mail } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'kvkk' | 'cookies';
  onClose: () => void;
}

export default function LegalModal({
  isOpen,
  initialTab = 'kvkk',
  onClose
}: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'kvkk' | 'cookies'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col z-10 border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#051C26] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <h3 className="font-serif text-lg sm:text-xl font-bold">
              KVKK Aydınlatma Metni & Çerez Politikası
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-stone-100 p-1.5 border-b border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab('kvkk')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'kvkk'
                ? 'bg-[#0B4F71] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>KVKK Aydınlatma Metni</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'cookies'
                ? 'bg-[#3E8226] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Çerez & Gizlilik Politikası</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          {activeTab === 'kvkk' ? (
            <>
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-xs leading-relaxed">
                <strong>Özet Güvence:</strong> Çağrı metnini imzalarken paylaştığınız{' '}
                <strong>e-posta adresiniz kesinlikle herkese açık olarak yayınlanmaz</strong>,
                üçüncü kişilerle, şirketlerle veya reklam ağlarıyla hiçbir koşulda paylaşılmaz.
              </div>

              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                1. Veri Sorumlusu ve Amaç
              </h4>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca,{' '}
                <strong>İklim Adaleti Forumu (iklimadaleti.org)</strong> olarak, platformumuzda
                yer alan “COP31’e Doğru İklim Adaleti Forumu Çağrı Metni” imza kampanyası ve
                forum çalışmaları kapsamında ilettiğiniz kişisel verilerinizi yalnızca
                kamuoyu dayanışmasını görünür kılmak ve forum süreçleri hakkında bilgilendirme
                yapmak amacıyla işlemekteyiz.
              </p>

              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                2. İşlenen Kişisel Veriler ve Yayınlanma Kapsamı
              </h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Kamuoyuyla Paylaşılan Bilgiler:</strong> Bireysel imzalarda{' '}
                  <em>Ad-Soyad, Meslek/Ünvan, Şehir ve varsa Dayanışma Notu</em>; kurumsal
                  imzalarda ise yalnızca <em>Kurum/Örgüt Adı ve Şehir</em> bilgisi çağrı
                  metninin altındaki imzacı listesinde yayınlanır.
                </li>
                <li>
                  <strong>Gizli Tutulan Bilgiler:</strong> <em>E-posta adresiniz</em> ve
                  kurumsal imzalarda belirtilen <em>yetkili/iletişim kişisi adı</em> yalnızca
                  imza teyidi ve forum duyuruları için güvenli olarak saklanır; sitede herkese
                  açık gösterilmez.
                </li>
              </ul>

              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                3. Verilerin Aktarımı ve Güvenliği
              </h4>
              <p>
                Toplanan veriler hiçbir ticari kuruluş, şirket veya üçüncü tarafla paylaşılmaz,
                satılmaz ve amacı dışında kullanılmaz.
              </p>

              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                4. KVKK Madde 11 Kapsamındaki Haklarınız
              </h4>
              <p>
                KVKK’nın 11. maddesi uyarınca dilediğiniz zaman imzanızın veya kişisel
                bilgilerinizin düzeltilmesini, güncellenmesini ya da tamamen silinmesini talep
                etme hakkına sahipsiniz. Taleplerinizi{' '}
                <a
                  href="mailto:iklimadaleti2026@gmail.com"
                  className="text-[#0B4F71] font-bold underline"
                >
                  iklimadaleti2026@gmail.com
                </a>{' '}
                adresine iletebilirsiniz; başvurunuz en kısa sürede yerine getirilir.
              </p>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 text-sky-950 text-xs leading-relaxed">
                <strong>Reklam ve Takip Çerezi Yoktur:</strong>{' '}
                <strong>iklimadaleti.org</strong> üzerinde kullanıcıları izleyen reklam,
                pazarlama veya profilleme çerezleri (üçüncü taraf takipçiler) kesinlikle
                kullanılmamaktadır.
              </div>

              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                1. Çerez (Cookie) ve Yerel Depolama Nedir?
              </h4>
              <p>
                Çerezler ve tarayıcı yerel depolama alanları (<code>localStorage</code>), bir
                web sitesini ziyaret ettiğinizde tarayıcınızda saklanan küçük teknik veri
                kayıtlarıdır.
              </p>

              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                2. Hangi Zorunlu Teknik Kayıtları Kullanıyoruz?
              </h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Zorunlu İşlevsel Depolama:</strong> İmza verdiğinizde imzanızın
                  sayfanızda anında görüntülenmesi ve bu çerez bilgilendirme bandını
                  kapattığınızda tercihinizin hatırlanması için tarayıcı yerel depolaması
                  kullanılır.
                </li>
                <li>
                  <strong>Güvenlik ve Hız Sınırlandırma:</strong> Sunucu güvenliğini sağlamak
                  ve spam/bot saldırılarını engellemek amacıyla yalnızca anlık güvenlik
                  kontrolleri uygulanır.
                </li>
              </ul>

              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                3. Çerezleri Nasıl Yönetebilirsiniz?
              </h4>
              <p>
                Tarayıcınızın ayarlarından dilediğiniz zaman çerezleri ve site verilerini
                temizleyebilir veya engelleyebilirsiniz. Zorunlu teknik kayıtların silinmesi
                sitenin genel erişimini engellemez.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href="mailto:iklimadaleti2026@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F71] hover:underline"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>iklimadaleti2026@gmail.com</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0B4F71] hover:bg-[#093f5a] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Anladım / Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
