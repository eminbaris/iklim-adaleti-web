/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import Header from './components/Header.tsx';
import MobileDrawer from './components/MobileDrawer.tsx';
import HeroBanner from './components/HeroBanner.tsx';
import ForumlarSection from './components/ForumlarSection.tsx';
import CalismaGruplariSection from './components/CalismaGruplariSection.tsx';
import SonucBildirgesiSection from './components/SonucBildirgesiSection.tsx';
import PolitikaProgramSection from './components/PolitikaProgramSection.tsx';
import EtkinliklerSection from './components/EtkinliklerSection.tsx';
import Footer from './components/Footer.tsx';
import ArticleModal from './components/ArticleModal.tsx';
import SignDeclarationModal from './components/SignDeclarationModal.tsx';
import AdminPanelModal from './components/AdminPanelModal.tsx';

import {
  INITIAL_SIGNATORIES,
  INITIAL_EXTRA_SIGNATORIES,
  INITIAL_FORUMS,
  INITIAL_POLICIES,
  INITIAL_EVENTS
} from './data/forumData.ts';
import { Article, WorkingGroup, ForumEvent, Signatory } from './types.ts';

const STORAGE_KEY = 'iklimadaleti_verified_signatories_v1';

const SECTION_LABELS: Record<string, string> = {
  anasayfa: 'Anasayfa',
  forumlar: 'Forumlar',
  'calisma-gruplari': 'Çalışma Grupları',
  'sonuc-bildirgeleri': 'Sonuç Bildirgeleri',
  'politika-program': 'Politika / Program',
  'etkinlik-takvimi': 'Etkinlik Takvimi'
};

function resolveRouteFromLocation(): { section: string; eventSlug: string | null } {
  if (typeof window === 'undefined') {
    return { section: 'anasayfa', eventSlug: null };
  }
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash.replace(/^#/, '');

  if (path.startsWith('/etkinlikler/') || path.startsWith('/etkinlik/') || path.startsWith('/etkinlik-takvimi/')) {
    const parts = path.split('/').filter(Boolean);
    const slug = parts[1] ? decodeURIComponent(parts[1]) : null;
    return { section: 'etkinlik-takvimi', eventSlug: slug };
  }

  if (path === '/etkinlikler' || path === '/etkinlik-takvimi' || hash === 'etkinlik-takvimi' || hash === 'etkinlikler') {
    return { section: 'etkinlik-takvimi', eventSlug: null };
  }
  if (path === '/forumlar' || hash === 'forumlar') {
    return { section: 'forumlar', eventSlug: null };
  }
  if (path === '/calisma-gruplari' || hash === 'calisma-gruplari') {
    return { section: 'calisma-gruplari', eventSlug: null };
  }
  if (path === '/sonuc-bildirgeleri' || hash === 'sonuc-bildirgeleri') {
    return { section: 'sonuc-bildirgeleri', eventSlug: null };
  }
  if (path === '/politika-program' || path === '/politika' || hash === 'politika-program') {
    return { section: 'politika-program', eventSlug: null };
  }

  return { section: 'anasayfa', eventSlug: null };
}

const OBSOLETE_DUPLICATE_IDS = new Set([
  'sig-rec-alev-yilmaz',
  'sig-rec-mustafa-kolcu',
  'sig-rec-dogukan-onder'
]);

function normalizeTrKey(str: string | undefined): string {
  return String(str || '')
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/\s+/g, ' ');
}

function getSignatoryIdentityKey(sig: Signatory): string {
  const isInst =
    sig.type === 'institutional' ||
    Boolean(sig.organization && sig.organization === sig.name);
  if (isInst) {
    return `inst:${normalizeTrKey(sig.organization || sig.name)}`;
  }
  return `ind:${normalizeTrKey(sig.name)}`;
}

function mergeAndDeduplicateSignatories(
  lists: Signatory[][],
  removedIds: string[]
): Signatory[] {
  const removedSet = new Set(removedIds.map((r) => String(r).trim().toLowerCase()));
  const map = new Map<string, Signatory>();

  for (const list of lists) {
    for (const sig of list) {
      if (!sig || (!sig.name && !sig.organization)) continue;
      const idKey = String(sig.id || '').trim().toLowerCase();
      if (OBSOLETE_DUPLICATE_IDS.has(idKey)) continue;
      const nameKey = String(sig.organization || sig.name || '').trim().toLowerCase();
      const identityKey = getSignatoryIdentityKey(sig);
      if (
        removedSet.has(idKey) ||
        removedSet.has(nameKey) ||
        removedSet.has(identityKey)
      ) {
        continue;
      }
      const existing = map.get(identityKey);
      if (!existing) {
        map.set(identityKey, sig);
      } else {
        map.set(identityKey, {
          ...existing,
          ...sig,
          id: existing.id || sig.id,
          city: sig.city || existing.city,
          message: sig.message || existing.message,
          organization: sig.organization || existing.organization
        });
      }
    }
  }

  return Array.from(map.values());
}

export default function App() {
  const [forums, setForums] = useState<Article[]>(INITIAL_FORUMS);
  const [workingGroups, setWorkingGroups] = useState<WorkingGroup[]>([]);
  const [declarations, setDeclarations] = useState<Article[]>([]);
  const [policies, setPolicies] = useState<Article[]>(INITIAL_POLICIES);
  const [events, setEvents] = useState<ForumEvent[]>(INITIAL_EVENTS);
  const [removedSignatoryIds, setRemovedSignatoryIds] = useState<string[]>([]);
  const [extraSignatories, setExtraSignatories] = useState<Signatory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Signatory[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return mergeAndDeduplicateSignatories([INITIAL_EXTRA_SIGNATORIES, parsed], []);
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_EXTRA_SIGNATORIES;
  });

  // Modals & UI States
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        window.location.pathname === '/admin' ||
        window.location.pathname === '/yonetim' ||
        window.location.hash === '#admin'
      );
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [activeSection, setActiveSection] = useState<string>(() => resolveRouteFromLocation().section);
  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(
    () => resolveRouteFromLocation().eventSlug
  );
  const [copiedPageLink, setCopiedPageLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load CMS data & server-persisted signatories on mount and when admin modal opens/closes
  useEffect(() => {
    fetch('/api/cms', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        const removed: string[] = Array.isArray(data.removedSignatoryIds)
          ? data.removedSignatoryIds
          : [];
        setRemovedSignatoryIds(removed);
        if (Array.isArray(data.forums) && data.forums.length > 0) setForums(data.forums);
        if (Array.isArray(data.workingGroups)) setWorkingGroups(data.workingGroups);
        if (Array.isArray(data.declarations)) setDeclarations(data.declarations);
        if (Array.isArray(data.policies) && data.policies.length > 0) setPolicies(data.policies);
        if (Array.isArray(data.events) && data.events.length > 0) setEvents(data.events);
        if (Array.isArray(data.signatories)) {
          setExtraSignatories((prev) =>
            mergeAndDeduplicateSignatories(
              [INITIAL_EXTRA_SIGNATORIES, prev, data.signatories],
              removed
            )
          );
        }
      })
      .catch(() => {
        // ignore in offline/static mode
      });
  }, [adminModalOpen]);

  // Combined, deduplicated signatories list (45 institutional + verified individuals/institutions - removed)
  const signatories: Signatory[] = mergeAndDeduplicateSignatories(
    [INITIAL_SIGNATORIES, extraSignatories],
    removedSignatoryIds
  );

  const handleJoinWorkingGroup = (group: WorkingGroup) => {
    setSignModalOpen(true);
    showToast(`"${group.name}" için imzanızı ve iletişim bilginizi ekleyebilirsiniz.`);
  };

  const handleRegisterEvent = (_event: ForumEvent) => {
    setSignModalOpen(true);
  };

  const handleAddSignatory = (newSignatory: Omit<Signatory, 'id' | 'date'>) => {
    const added: Signatory = {
      id: `sig-${Date.now()}`,
      name: newSignatory.name,
      organization: newSignatory.organization,
      city: newSignatory.city,
      message: newSignatory.message,
      date: new Date().toISOString().split('T')[0],
      type: newSignatory.type || (newSignatory.organization ? 'institutional' : 'individual'),
      emailVerified: true
    };
    setExtraSignatories((prev) => {
      const updated = mergeAndDeduplicateSignatories(
        [prev, [added]],
        removedSignatoryIds
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });

    // Also persist on the server so all visitors see the new signature
    fetch('/api/signatories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSignatory)
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.signatories)) {
          setExtraSignatories((prev) =>
            mergeAndDeduplicateSignatories(
              [INITIAL_EXTRA_SIGNATORIES, prev, data.signatories],
              removedSignatoryIds
            )
          );
        }
      })
      .catch(() => {
        // ignore offline
      });

    showToast(
      added.type === 'institutional' && added.organization
        ? `"${added.organization}" İmzacı Kurumlar listesine başarıyla eklendi.`
        : `Teşekkürler ${added.name}, imzanız listeye başarıyla eklendi.`
    );
  };

  const handleSaveCms = async (payload: {
    username?: string;
    password: string;
    forums?: Article[];
    workingGroups?: WorkingGroup[];
    declarations?: Article[];
    policies?: Article[];
    events?: ForumEvent[];
    signatories?: Signatory[];
    removedSignatoryIds?: string[];
    newAdminPass?: string;
    newUser?: { username: string; name: string; password: string };
    deleteUserId?: string;
    deleteItemKey?: string | string[];
  }) => {
    const nextRemoved = payload.removedSignatoryIds ?? removedSignatoryIds;
    if (payload.removedSignatoryIds !== undefined) {
      setRemovedSignatoryIds(payload.removedSignatoryIds);
    }
    if (payload.forums !== undefined) setForums(payload.forums);
    if (payload.workingGroups !== undefined) setWorkingGroups(payload.workingGroups);
    if (payload.declarations !== undefined) setDeclarations(payload.declarations);
    if (payload.policies !== undefined) setPolicies(payload.policies);
    if (payload.events !== undefined) setEvents(payload.events);
    if (payload.signatories !== undefined) {
      setExtraSignatories(
        mergeAndDeduplicateSignatories([payload.signatories], nextRemoved)
      );
    }

    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        const srvRemoved: string[] = Array.isArray(data.removedSignatoryIds)
          ? data.removedSignatoryIds
          : nextRemoved;
        setRemovedSignatoryIds(srvRemoved);
        if (Array.isArray(data.forums)) setForums(data.forums);
        if (Array.isArray(data.workingGroups)) setWorkingGroups(data.workingGroups);
        if (Array.isArray(data.declarations)) setDeclarations(data.declarations);
        if (Array.isArray(data.policies)) setPolicies(data.policies);
        if (Array.isArray(data.events)) setEvents(data.events);
        if (Array.isArray(data.signatories)) {
          const mergedSigs = mergeAndDeduplicateSignatories(
            [INITIAL_EXTRA_SIGNATORIES, data.signatories],
            srvRemoved
          );
          setExtraSignatories(mergedSigs);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedSigs));
          } catch {
            // ignore storage errors
          }
        }
        return true;
      }
      return false;
    } catch {
      return true;
    }
  };

  // Listen to browser Back/Forward buttons and hash changes
  useEffect(() => {
    const syncFromUrl = () => {
      const route = resolveRouteFromLocation();
      setActiveSection(route.section);
      setSelectedEventSlug(route.eventSlug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  // Update browser tab title dynamically for SEO & usability
  useEffect(() => {
    const baseTitle = 'COP31’e Doğru İklim Adaleti Forumu – iklimadaleti.org';
    if (activeSection === 'etkinlik-takvimi' && selectedEventSlug) {
      const matched = events.find((ev) => {
        const slug = String(ev.title || ev.id)
          .toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return slug === selectedEventSlug || ev.id === selectedEventSlug;
      });
      if (matched) {
        document.title = `${matched.title} (${matched.date}) | İklim Adaleti Forumu`;
        return;
      }
    }
    if (activeSection !== 'anasayfa' && SECTION_LABELS[activeSection]) {
      document.title = `${SECTION_LABELS[activeSection]} | ${baseTitle}`;
    } else {
      document.title = `${baseTitle} | Zamanımızı, Yaşamımızı, Geleceğimizi İstiyoruz`;
    }
  }, [activeSection, selectedEventSlug, events]);

  const handleNavigate = (sectionId: string, path: string) => {
    setActiveSection(sectionId);
    setSelectedEventSlug(null);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEventSlug = (slug: string | null) => {
    setSelectedEventSlug(slug);
    setActiveSection('etkinlik-takvimi');
    if (typeof window !== 'undefined') {
      const nextPath = slug ? `/etkinlikler/${slug}` : '/etkinlikler';
      window.history.pushState({}, '', nextPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyCurrentPageUrl = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedPageLink(true);
      setTimeout(() => setCopiedPageLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-sans selection:bg-[#0B4F71] selection:text-white">
      {/* Top Bar Header with official logo & menu items */}
      <Header
        onOpenSignModal={() => setSignModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSignModal={() => setSignModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Subpage Breadcrumb & Share Bar when viewing an independent page */}
      {activeSection !== 'anasayfa' && (
        <div className="bg-white border-b border-stone-200/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600">
              <button
                type="button"
                onClick={() => handleNavigate('anasayfa', '/')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#0B4F71] font-bold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anasayfaya Dön</span>
              </button>
              <span className="text-stone-300">/</span>
              <span className="text-stone-900 font-bold">
                {SECTION_LABELS[activeSection] || 'Sayfa'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCurrentPageUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0B4F71] text-xs font-bold transition-colors cursor-pointer"
              title="Bu sayfanın doğrudan bağlantısını kopyala"
            >
              {copiedPageLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3E8226]" />
                  <span className="text-[#3E8226]">Sayfa Linki Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bu Sayfanın Linkini Paylaş</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area: renders ONLY the selected page cleanly */}
      <main className="flex-1">
        {/* 1. Anasayfa (COP31'e Doğru Görsel + Çağrı Metni + İmzacı Kurumlar + İmzala Butonu) */}
        {activeSection === 'anasayfa' && (
          <HeroBanner
            onOpenSignModal={() => setSignModalOpen(true)}
            signatories={signatories}
            onExploreForums={() => handleNavigate('forumlar', '/forumlar')}
            onExploreWorkingGroups={() => handleNavigate('calisma-gruplari', '/calisma-gruplari')}
            onExploreDeclarations={() => handleNavigate('sonuc-bildirgeleri', '/sonuc-bildirgeleri')}
            onExplorePolicies={() => handleNavigate('politika-program', '/politika-program')}
            onExploreEvents={() => handleNavigate('etkinlik-takvimi', '/etkinlikler')}
          />
        )}

        {/* 2. Forumlar */}
        {activeSection === 'forumlar' && (
          <ForumlarSection
            items={forums}
            onReadArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {/* 3. Çalışma Grupları */}
        {activeSection === 'calisma-gruplari' && (
          <CalismaGruplariSection
            groups={workingGroups}
            onJoinGroup={handleJoinWorkingGroup}
          />
        )}

        {/* 4. Sonuç Bildirgeleri */}
        {activeSection === 'sonuc-bildirgeleri' && (
          <SonucBildirgesiSection
            declarations={declarations}
            onReadFull={(art) => setSelectedArticle(art)}
            onOpenSignModal={() => setSignModalOpen(true)}
          />
        )}

        {/* 5. Politika / Program */}
        {activeSection === 'politika-program' && (
          <PolitikaProgramSection
            policies={policies}
            onReadFull={(art) => setSelectedArticle(art)}
          />
        )}

        {/* 6. Etkinlik Takvimi */}
        {activeSection === 'etkinlik-takvimi' && (
          <EtkinliklerSection
            events={events}
            onRegisterEvent={handleRegisterEvent}
            selectedEventSlug={selectedEventSlug}
            onSelectEventSlug={handleSelectEventSlug}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenSignModal={() => setSignModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Modals */}
      <SignDeclarationModal
        isOpen={signModalOpen}
        onClose={() => setSignModalOpen(false)}
        onAddSignatory={handleAddSignatory}
      />

      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          if (window.location.pathname === '/admin' || window.location.pathname === '/yonetim') {
            window.history.replaceState({}, '', '/');
          }
        }}
        forums={forums}
        workingGroups={workingGroups}
        declarations={declarations}
        policies={policies}
        events={events}
        allSignatories={signatories}
        extraSignatories={extraSignatories}
        removedSignatoryIds={removedSignatoryIds}
        onSaveCms={handleSaveCms}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenSignModal={() => setSignModalOpen(true)}
      />

      {/* Transient Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#0B4F71] text-white text-xs sm:text-sm px-4 py-3 rounded-lg shadow-xl border border-sky-600/60 max-w-sm flex items-center justify-between gap-3"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-sky-200 hover:text-white text-xs ml-2 underline cursor-pointer"
          >
            Kapat
          </button>
        </div>
      )}
    </div>
  );
}
