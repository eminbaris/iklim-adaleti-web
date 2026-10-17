/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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

function getSignatoryIdentityKey(sig: Signatory): string {
  const isInst =
    sig.type === 'institutional' ||
    Boolean(sig.organization && sig.organization === sig.name);
  if (isInst) {
    return `inst:${String(sig.organization || sig.name || '').trim().toLowerCase()}`;
  }
  return `ind:${String(sig.name || '').trim().toLowerCase()}|${String(sig.city || '').trim().toLowerCase()}`;
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

  const [activeSection, setActiveSection] = useState('anasayfa');
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
        ? `E-posta doğrulandı! "${added.organization}" İmzacı Kurumlar listesine eklendi.`
        : `E-posta doğrulandı! Teşekkürler ${added.name}, imzanız listeye eklendi.`
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

  // Scroll spy to track active section among the 6 menu items
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'anasayfa',
        'forumlar',
        'calisma-gruplari',
        'sonuc-bildirgeleri',
        'politika-program',
        'etkinlik-takvimi'
      ];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-sans selection:bg-[#0B4F71] selection:text-white">
      {/* Top Bar Header with official logo & menu items */}
      <Header
        onOpenSignModal={() => setSignModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSignModal={() => setSignModalOpen(true)}
      />

      {/* Main Content Areas matching the menu sections */}
      <main className="flex-1">
        {/* 1. Anasayfa (COP31'e Doğru Görsel + Çağrı Metni + İmzacı Kurumlar + İmzala Butonu) */}
        <HeroBanner
          onOpenSignModal={() => setSignModalOpen(true)}
          signatories={signatories}
          onExploreForums={() => scrollTo('forumlar')}
          onExploreWorkingGroups={() => scrollTo('calisma-gruplari')}
          onExploreDeclarations={() => scrollTo('sonuc-bildirgeleri')}
        />

        {/* 2. Forumlar */}
        <ForumlarSection
          items={forums}
          onReadArticle={(art) => setSelectedArticle(art)}
        />

        {/* 3. Çalışma Grupları */}
        <CalismaGruplariSection
          groups={workingGroups}
          onJoinGroup={handleJoinWorkingGroup}
        />

        {/* 4. Sonuç Bildirgeleri */}
        <SonucBildirgesiSection
          declarations={declarations}
          onReadFull={(art) => setSelectedArticle(art)}
          onOpenSignModal={() => setSignModalOpen(true)}
        />

        {/* 5. Politika / Program */}
        <PolitikaProgramSection
          policies={policies}
          onReadFull={(art) => setSelectedArticle(art)}
        />

        {/* 6. Etkinlik Takvimi */}
        <EtkinliklerSection
          events={events}
          onRegisterEvent={handleRegisterEvent}
        />
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenSignModal={() => setSignModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
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
