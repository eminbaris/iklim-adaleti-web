/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  PenTool,
  Share2,
  Download,
  Check,
  Printer,
  Calendar,
  MapPin,
  ShieldCheck,
  Building2,
  UserCheck
} from 'lucide-react';
import ForumLogo from './ForumLogo.tsx';
import { Signatory } from '../types.ts';
import { CALL_TEXT_FULL } from '../data/forumData.ts';

interface HeroBannerProps {
  onOpenSignModal: () => void;
  signatories: Signatory[];
  onExploreForums: () => void;
  onExploreWorkingGroups: () => void;
  onExploreDeclarations: () => void;
}

export default function HeroBanner({
  onOpenSignModal,
  signatories,
  onExploreForums,
  onExploreWorkingGroups,
  onExploreDeclarations
}: HeroBannerProps) {
  const [copied, setCopied] = useState(false);

  // Separate institutional signatories from individual signatories
  const institutionalSignatories = signatories.filter(
    (s) => s.type === 'institutional' || Boolean(s.organization && s.organization === s.name)
  );
  const individualSignatories = signatories.filter(
    (s) => s.type === 'individual' || (!s.type && s.organization !== s.name)
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadDeclaration = () => {
    const blob = new Blob([CALL_TEXT_FULL], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cop31e-dogru-iklim-adaleti-forumu-cagri-metni.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="anasayfa"
      className="relative border-b border-stone-200/90 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#FBF9F5]"
    >
      {/* Subtle archival background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0B4F71 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-14 relative">
        
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-2xs text-xs font-bold text-[#0B4F71]">
            <span>iklimadaleti.org</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-[#3E8226]">COP31’e Doğru Çağrı Metni</span>
          </div>

          <div className="inline-flex items-center gap-3 text-xs font-semibold text-stone-600">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D96818]" />
              <span>15–16–17 Kasım 2026</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0B4F71]" />
              <span>Antalya</span>
            </span>
          </div>
        </div>

        {/* Main Editorial Document Sheet - Aligned max-w-7xl with sections below */}
        <article className="bg-white rounded-2xl shadow-sm border border-stone-200/90 p-6 sm:p-8 md:p-10 lg:p-12 mb-6 relative overflow-hidden">
          {/* Top Accent Stripe matching the 4 logo colors */}
          <div className="absolute top-0 left-0 right-0 h-1.5 flex">
            <div className="flex-1 bg-[#0BA39C]" />
            <div className="flex-1 bg-[#D96818]" />
            <div className="flex-1 bg-[#3E8226]" />
            <div className="flex-1 bg-[#0B4F71]" />
          </div>

          {/* 1. EXACT VISUAL HEADER FROM PAGE 1 OF THE CALL TEXT ("COP31'e DOĞRU - İKLİM ADALETİ FORUMU") */}
          <div className="flex flex-col items-center justify-center pt-2 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-stone-200/80">
            <ForumLogo
              variant="cop31"
              className="w-full max-w-[290px] sm:max-w-[360px] md:max-w-[400px] h-auto mx-auto"
            />
          </div>

          {/* 2. VERBATIM CALL TEXT (ÇAĞRI METNİ) */}
          <div className="space-y-8 text-stone-800 text-[16px] sm:text-[17.5px] leading-[1.8]">
            
            {/* Main Headline & Lead */}
            <header className="space-y-4">
              <h1 className="font-sans text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#0B4F71] tracking-tight leading-snug uppercase">
                ZAMANIMIZI, YAŞAMIMIZI, GELECEĞİMİZİ İSTİYORUZ!
              </h1>
              <p className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                COP31 Şirketlerin Değil, Emeğin ve Halklarındır!
              </p>
            </header>

            <div className="space-y-5">
              <p>
                Kasım ayında COP31 için devletler, şirketler ve uzmanlar Antalya&apos;da bir araya gelerek enerjinin, tarımın, sanayinin ve kentlerin geleceğini tartışacak.
              </p>

              <p className="font-medium text-stone-900">
                Peki işçiler, çiftçiler, emekliler, işsizler, bakım emeği verenler ve gençler nerede? Dünyayı emeğiyle var edenler, neden kendi gelecekleri üzerinde söz ve karar sahibi olamıyor?
              </p>

              <p>
                İklim krizi yalnızca uzmanların çözeceği teknik bir sorun değildir; üretimin, emeğin, mülkiyetin ve toplumsal kaynakların nasıl örgütleneceğine dair siyasal bir meseledir. Kararların kimler tarafından ve hangi çıkarlar doğrultusunda alındığı asıl belirleyicidir. Bu nedenle yalnızca sonuçlara katlanmak değil, politikaların belirlenmesinde ve uygulanmasında doğrudan söz ve karar sahibi olmak istiyoruz.
              </p>
            </div>

            {/* Section: ZAMAN DA BİR SINIF MESELESİDİR! */}
            <div className="space-y-4 pt-2">
              <h2 className="font-sans text-lg sm:text-xl font-extrabold text-[#0B4F71] tracking-wide uppercase border-l-4 border-[#D96818] pl-3.5 py-0.5">
                ZAMAN DA BİR SINIF MESELESİDİR!
              </h2>
              <p>
                Diplomatların ve şirket temsilcilerinin toplantılara katılacak zamanı ve bütçesi varken; vardiyadaki işçinin, tarladaki çiftçinin, kuryenin, öğretmenin ve sağlık emekçisinin aynı imkânı yoktur. Bir yönetici için toplantıya katılmak mesaisinin bir parçasıyken; bir emekçi için ücretinden, yıllık izninden veya iş güvencesinden vazgeçmek demektir.
              </p>
              <p>
                Zaman; dinlenmenin, örgütlenmenin, itiraz etmenin ve geleceğimiz hakkında karar verebilmenin maddi koşuludur. Zamanımızı talep etmek, yalnızca takvimden bir gün istemek değil; çalışma saatlerinin kısaltılmasından dinlenme hakkına, yaşamın ritmini sermayenin çarklarından kurtarma kavgasıdır. Zamanı üzerinde söz sahibi olamayanın yaşamı üzerindeki karar hakkı da sınırlıdır.
              </p>
            </div>

            {/* Section: BİZ SEYİRCİ DEĞİL, KARAR SAHİBİYİZ! */}
            <div className="space-y-4 pt-2">
              <h2 className="font-sans text-lg sm:text-xl font-extrabold text-[#0B4F71] tracking-wide uppercase border-l-4 border-[#3E8226] pl-3.5 py-0.5">
                BİZ SEYİRCİ DEĞİL, KARAR SAHİBİYİZ!
              </h2>
              <p>
                Bir işçiyi panele çağırmak ya da bir köylüye sembolik söz hakkı vermek gerçek katılım değildir. Şirketler neyin üretileceğine, hangi kaynakların tüketileceğine karar verirken emekçilerin yalnızca sonuçları dinlemesini kabul etmiyoruz.
              </p>
              <p>
                Biz yalnızca söz hakkı değil; örgütlenme, itiraz, karar ve denetim hakkı talep ediyoruz. Enerji, tarım, sanayi ve kent politikalarında doğrudan etkilenenlerin belirleyici olduğu, kararların şeffaf ve kamusal biçimde alındığı demokratik mekanizmalar istiyoruz.
              </p>
            </div>

            {/* Section: ADİL DÖNÜŞÜM YETMEZ; DEMOKRATİK DÖNÜŞÜM GEREKİR! */}
            <div className="space-y-4 pt-2">
              <h2 className="font-sans text-lg sm:text-xl font-extrabold text-[#0B4F71] tracking-wide uppercase border-l-4 border-[#0BA39C] pl-3.5 py-0.5">
                ADİL DÖNÜŞÜM YETMEZ; DEMOKRATİK DÖNÜŞÜM GEREKİR!
              </h2>
              <p>
                İşçiden uyum sağlaması, çiftçiden üretimini dönüştürmesi, yurttaştan tüketimini kısması istenirken şirketlerin kâr odaklı mülkiyet ve karar gücü dokunulmaz bırakılamaz. &ldquo;Yeşil dönüşüm&rdquo; adı altında doğanın ve emeğin yeni sömürü pazarlarına dönüştürülmesini, dönüşümün yeni maden sahaları, mülksüzleştirmeler ve işsizlik pahasına yapılmasını reddediyoruz.
              </p>
              <p className="font-semibold text-stone-900 bg-stone-50 border border-stone-200/80 rounded-xl p-4 sm:p-5">
                Asıl soru şudur: Ne üretilecek, nasıl üretilecek, kimin için üretilecek ve kimin denetiminde olacak?
              </p>
              <p>
                Üretimin toplumsal ihtiyaçlar ve ekolojik sınırlar gözetilerek yeniden örgütlenmesini; şirketlerin kâr hırsına terk edilen enerjinin, toprağın, suyun ve tüm ortak varlıklarımızın üzerinde kamusal mülkiyeti ve tabandan toplumsal denetimi savunuyoruz.
              </p>
            </div>

            {/* Section: TARİHSEL SERMAYE MERKEZLERİNİN EKOLOJİK BORCU PARAYLA ÖLÇÜLEMEZ! */}
            <div className="space-y-4 pt-2">
              <h2 className="font-sans text-lg sm:text-xl font-extrabold text-[#0B4F71] tracking-wide uppercase border-l-4 border-[#D96818] pl-3.5 py-0.5">
                TARİHSEL SERMAYE MERKEZLERİNİN EKOLOJİK BORCU PARAYLA ÖLÇÜLEMEZ!
              </h2>
              <p>
                Sanayileşmenin servetini biriktirenlerle ekolojik yıkımın bedelini ödeyenler aynı değildir. Emperyalist merkezlerin tarihsel sorumluluğu karbon piyasalarına veya finansman paketlerine indirgenemez. Ekolojik yıkımın bedelini ödeyen halklar, kaynakların nasıl yönetileceği konusunda doğrudan karar sahibi olmalıdır.
              </p>
            </div>

            {/* Section: COP31 GÜNLERİNDE ÜCRETLİ İZİN VE FİİLİ KATILIM HAKKIMIZI TALEP EDİYORUZ! */}
            <div className="space-y-4 pt-2 bg-[#FBF9F5] border border-stone-200/90 rounded-2xl p-5 sm:p-7">
              <h2 className="font-sans text-lg sm:text-xl font-extrabold text-[#0B4F71] tracking-wide uppercase">
                COP31 GÜNLERİNDE ÜCRETLİ İZİN VE FİİLİ KATILIM HAKKIMIZI TALEP EDİYORUZ!
              </h2>
              <p className="font-semibold text-stone-900">
                Emekçilerin ve gençlerin tartışmalara eşit koşullarda katılabilmesi için 9–20 Kasım 2026 tarihleri arasında:
              </p>
              <ul className="space-y-3.5 text-[15.5px] sm:text-[16.5px]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#0B4F71] mt-2.5 shrink-0" />
                  <span>
                    Etkinliklere katılmak isteyen kamu çalışanlarına idari, özel sektör çalışanlarına ücretli izin hakkı tanınmalıdır. Sendikaları ve meslek örgütlerini bu hakkı toplu sözleşmelerle ve fiili eylemlilikle güvenceye almaya çağırıyoruz.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#3E8226] mt-2.5 shrink-0" />
                  <span>
                    Katılım izinleri yıllık ücretten, primden veya iş güvencesinden düşülmemeli; sendikalı-sendikasız tüm çalışanlar için yasal koruma sağlanmalıdır.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D96818] mt-2.5 shrink-0" />
                  <span>
                    Antalya&apos;daki kamusal etkinlikler için ücretsiz toplu ulaşım, düşük gelirlilere konaklama ve bağımlı yakını olanlara kamusal bakım desteği sağlanmalıdır.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#0BA39C] mt-2.5 shrink-0" />
                  <span>
                    Emek, kadın, gençlik ve yaşam alanı örgütlerinin müzakere süreçlerine doğrudan ve bağımsız temsille katılımı tanınmalıdır.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#0B4F71] mt-2.5 shrink-0" />
                  <span>
                    Yatırım planları ile ekolojik etki raporları şeffaf bir şekilde kamusal erişime açılmalı, toplumsal denetim hakkı engellenmemelidir.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section: 15–16–17 KASIM'DA ANTALYA'DA BULUŞUYORUZ! */}
            <div className="space-y-4 pt-2">
              <h2 className="font-sans text-lg sm:text-xl font-extrabold text-[#3E8226] tracking-wide uppercase border-l-4 border-[#3E8226] pl-3.5 py-0.5">
                15–16–17 KASIM&apos;DA ANTALYA&apos;DA BULUŞUYORUZ!
              </h2>
              <p className="font-semibold text-stone-900">
                İklim Adaleti Forumu olarak 15–17 Kasım tarihlerinde Antalya&apos;da buluşuyoruz.
              </p>
              <p>
                Talan edilen meraların, kurutulan nehirlerin, yakılan ormanların ve toprağını savunan köylülerin sesiyle orada olacağız. Antalya&apos;nın yalnızca şirketlerin ve kapalı kapı diplomasisinin vitrini olmasına izin vermeyeceğiz. Ücretimizden ve işimizden taviz vermeden, kendi örgütlerimiz ve meşru taleplerimizle toplanacağız.
              </p>
              <p>
                Çünkü dünyanın geleceğini belirlemek ayrıcalıklı bir azınlığın tekeli değil; yaşamı her gün yeniden üretenlerin ellerindedir.
              </p>
            </div>

            {/* Final Slogans */}
            <div className="pt-6 pb-2 border-t border-stone-200/80 space-y-2.5 font-sans font-extrabold text-base sm:text-lg md:text-xl text-[#0B4F71] tracking-tight">
              <p>ZAMAN HAKKIMIZI İSTİYORUZ!</p>
              <p>SÖZ, ÖRGÜTLENME VE KARAR HAKKIMIZI İSTİYORUZ!</p>
              <p>ÜRETİM VE YAŞAM ÜZERİNDE TOPLUMSAL DENETİM İSTİYORUZ!</p>
              <p className="pt-3 text-stone-900 text-lg sm:text-xl">İKLİM ADALETİ FORUMU</p>
            </div>

            {/* İMZACI KURUMLAR Section */}
            <div className="pt-8 border-t-2 border-stone-200/90">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <h3 className="font-sans text-base sm:text-lg font-extrabold uppercase tracking-wider text-[#0B4F71] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#3E8226]" />
                  <span>İMZACI KURUMLAR ({institutionalSignatories.length})</span>
                </h3>
                <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3E8226]" />
                  <span>E-posta onaylı kurumsal imzalar anında listeye eklenir</span>
                </span>
              </div>

              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2 text-xs sm:text-sm text-stone-800">
                {institutionalSignatories.map((sig, index) => (
                  <li
                    key={sig.id}
                    className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-[#FBF9F5] border border-stone-200/80 hover:border-[#0B4F71]/30 transition-colors"
                  >
                    <span className="font-mono text-xs font-bold text-[#0B4F71] min-w-[24px] pt-0.5">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <span className="font-bold text-stone-900 leading-snug block">
                        {sig.organization || sig.name}
                      </span>
                      {sig.city && (
                        <span className="text-[11px] text-stone-500">
                          {sig.city}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              {/* Individual Signatories (if any added) */}
              {individualSignatories.length > 0 && (
                <div className="mt-8 pt-6 border-t border-stone-200/80">
                  <h4 className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-wider text-stone-800 flex items-center gap-2 mb-4">
                    <UserCheck className="w-4 h-4 text-[#0B4F71]" />
                    <span>BİREYSEL İMZACILAR ({individualSignatories.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {individualSignatories.map((sig) => (
                      <div
                        key={sig.id}
                        className="px-3 py-2 rounded-lg bg-stone-50 border border-stone-200/80 text-xs"
                      >
                        <span className="font-bold text-stone-900">{sig.name}</span>
                        {sig.organization && (
                          <span className="text-stone-600"> · {sig.organization}</span>
                        )}
                        {sig.city && (
                          <span className="text-stone-500"> ({sig.city})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 3. SIGN BUTTON & ACTIONS DIRECTLY UNDERNEATH THE CALL TEXT */}
          <div className="mt-10 pt-8 border-t-2 border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* PRIMARY 'İMZALA' BUTTON */}
              <button
                type="button"
                onClick={onOpenSignModal}
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-extrabold text-white bg-[#0B4F71] hover:bg-[#083B54] active:scale-[0.99] rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0B4F71]"
              >
                <PenTool className="w-5 h-5 text-sky-200" />
                <span>Çağrı Metnini İmzala</span>
              </button>

              {/* Download text */}
              <button
                type="button"
                onClick={handleDownloadDeclaration}
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                title="Çağrı Metnini İndir (.txt)"
              >
                <Download className="w-4 h-4 text-stone-500" />
                <span>Metni İndir</span>
              </button>

              {/* Print */}
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                title="Çağrı Metnini Yazdır"
              >
                <Printer className="w-4 h-4 text-stone-500" />
                <span>Yazdır</span>
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                title="Bağlantıyı Paylaş"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-stone-500" />
                    <span>Paylaş</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-stone-500 text-left sm:text-right">
              <span className="font-semibold text-stone-700 flex items-center sm:justify-end gap-1">
                <ShieldCheck className="w-4 h-4 text-[#3E8226]" />
                <span>E-posta Onay Kodlu Güvenli İmza</span>
              </span>
              <span>Onaylanan kurum imzaları metnin altına otomatik eklenir</span>
            </div>
          </div>

        </article>

        {/* Quick Navigation Bar Below Call Text */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-stone-600">
          <span className="text-stone-400">Diğer Bölümler:</span>
          <button
            type="button"
            onClick={onExploreForums}
            className="hover:text-[#0B4F71] underline underline-offset-4 cursor-pointer"
          >
            Forumlar
          </button>
          <span className="text-stone-300">·</span>
          <button
            type="button"
            onClick={onExploreWorkingGroups}
            className="hover:text-[#0B4F71] underline underline-offset-4 cursor-pointer"
          >
            Çalışma Grupları
          </button>
          <span className="text-stone-300">·</span>
          <button
            type="button"
            onClick={onExploreDeclarations}
            className="hover:text-[#0B4F71] underline underline-offset-4 cursor-pointer"
          >
            Sonuç Bildirgeleri
          </button>
        </div>

      </div>
    </section>
  );
}
