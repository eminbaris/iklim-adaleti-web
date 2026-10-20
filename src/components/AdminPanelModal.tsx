/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Save,
  Building2,
  FileText,
  Users,
  Calendar,
  BookOpen,
  KeyRound,
  CheckCircle,
  UserPlus,
  Upload,
  Image as ImageIcon,
  Video,
  ArrowLeft
} from 'lucide-react';
import { Article, WorkingGroup, ForumEvent, Signatory } from '../types.ts';

interface AdminUser {
  id: string;
  username: string;
  name: string;
  role?: string;
}

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  forums: Article[];
  workingGroups: WorkingGroup[];
  declarations: Article[];
  policies: Article[];
  events: ForumEvent[];
  allSignatories: Signatory[];
  extraSignatories: Signatory[];
  removedSignatoryIds: string[];
  onSaveCms: (payload: {
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
  }) => Promise<boolean>;
}

type AdminTab = 'forums' | 'groups' | 'declarations' | 'policies' | 'events' | 'signatories' | 'users';

export default function AdminPanelModal({
  isOpen,
  onClose,
  forums,
  workingGroups,
  declarations,
  policies,
  events,
  allSignatories,
  extraSignatories,
  removedSignatoryIds,
  onSaveCms
}: AdminPanelModalProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [currentUserDisplay, setCurrentUserDisplay] = useState('Ana Yönetici');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('events');
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Form states for adding a Forum / Article
  const [fTitle, setFTitle] = useState('');
  const [fCategory, setFCategory] = useState<Article['category']>('Forum');
  const [fDate, setFDate] = useState(new Date().toISOString().split('T')[0]);
  const [fAuthor, setFAuthor] = useState('İklim Adaleti Forumu');
  const [fExcerpt, setFExcerpt] = useState('');
  const [fContent, setFContent] = useState('');
  const [fImageUrl, setFImageUrl] = useState('');
  const [fVideoUrl, setFVideoUrl] = useState('');
  const [fPdfUrl, setFPdfUrl] = useState('');

  // Form states for adding a Working Group
  const [gName, setGName] = useState('');
  const [gDesc, setGDesc] = useState('');
  const [gCoord, setGCoord] = useState('');
  const [gImageUrl, setGImageUrl] = useState('');
  const [gVideoUrl, setGVideoUrl] = useState('');
  const [gPdfUrl, setGPdfUrl] = useState('');

  // Form states for adding a Declaration (Sonuç Bildirgesi)
  const [dTitle, setDTitle] = useState('');
  const [dDate, setDDate] = useState(new Date().toISOString().split('T')[0]);
  const [dAuthor, setDAuthor] = useState('İklim Adaleti Forumu');
  const [dExcerpt, setDExcerpt] = useState('');
  const [dContent, setDContent] = useState('');
  const [dImageUrl, setDImageUrl] = useState('');
  const [dVideoUrl, setDVideoUrl] = useState('');
  const [dPdfUrl, setDPdfUrl] = useState('');

  // Form states for adding a Policy / Program (Politika / Program)
  const [pTitle, setPTitle] = useState('');
  const [pDate, setPDate] = useState(new Date().toISOString().split('T')[0]);
  const [pAuthor, setPAuthor] = useState('İklim Adaleti Forumu');
  const [pExcerpt, setPExcerpt] = useState('');
  const [pContent, setPContent] = useState('');
  const [pImageUrl, setPImageUrl] = useState('');
  const [pVideoUrl, setPVideoUrl] = useState('');
  const [pPdfUrl, setPPdfUrl] = useState('');

  // Form states for adding an Event
  const [eTitle, setETitle] = useState('');
  const [eDate, setEDate] = useState('');
  const [eTime, setETime] = useState('');
  const [eLocation, setELocation] = useState('');
  const [eType, setEType] = useState<ForumEvent['type']>('Forum');
  const [eDesc, setEDesc] = useState('');
  const [eImageUrl, setEImageUrl] = useState('');
  const [eVideoUrl, setEVideoUrl] = useState('');
  const [ePdfUrl, setEPdfUrl] = useState('');

  // Form states for adding an Institutional or Individual Signatory manually
  const [sType, setSType] = useState<'institutional' | 'individual'>('institutional');
  const [sName, setSName] = useState('');
  const [sOrg, setSOrg] = useState('');
  const [sCity, setSCity] = useState('');

  // Form states for adding a new User & changing master password
  const [uName, setUName] = useState('');
  const [uUsername, setUUsername] = useState('');
  const [uPass, setUPass] = useState('');
  const [newPass, setNewPass] = useState('');

  if (!isOpen) return null;

  const notify = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3500);
  };

  // Upload helper: converts file to base64 and sends to /api/admin/upload
  const handleFileUpload = (
    file: File | undefined,
    fieldKey: string,
    onUrlReady: (url: string) => void
  ) => {
    if (!file) return;
    setUploadingField(fieldKey);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || '');
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
            filename: file.name,
            dataUrl
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            onUrlReady(data.url);
            notify(`"${file.name}" başarıyla yüklendi!`);
          }
        } else {
          // Fallback to dataUrl in local preview
          onUrlReady(dataUrl);
          notify(`"${file.name}" eklendi!`);
        }
      } catch {
        onUrlReady(dataUrl);
        notify(`"${file.name}" eklendi!`);
      } finally {
        setUploadingField(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const cleanUser = username.trim() || 'admin';
    const cleanPass = password.trim();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });
      if (res.ok) {
        const data = await res.json();
        setUsername(cleanUser);
        setPassword(cleanPass);
        setAuthenticated(true);
        if (data.user?.name) setCurrentUserDisplay(data.user.name);
        if (Array.isArray(data.users)) setAdminUsers(data.users);
      } else {
        const errData = await res.json().catch(() => ({}));
        setLoginError(errData.error || 'Kullanıcı adı veya şifre hatalı.');
      }
    } catch {
      setLoginError('Sunucu bağlantısı kurulamadı. Lütfen tekrar deneyin.');
    }
  };

  const [editingForumId, setEditingForumId] = useState<string | null>(null);

  const triggerSave = async (overrides: Partial<{
    forums: Article[];
    workingGroups: WorkingGroup[];
    declarations: Article[];
    policies: Article[];
    events: ForumEvent[];
    signatories: Signatory[];
    removedSignatoryIds: string[];
    newAdminPass?: string;
    newUser?: { username: string; name: string; password: string };
    deleteUserId?: string;
    deleteItemKey?: string | string[];
  }>) => {
    setSaving(true);
    const ok = await onSaveCms({
      username,
      password,
      ...overrides
    });
    setSaving(false);
    if (ok) {
      if (overrides.newAdminPass) {
        setPassword(overrides.newAdminPass);
        setNewPass('');
      }
      if (overrides.newUser) {
        setAdminUsers((prev) => [
          ...prev,
          {
            id: `usr-${Date.now()}`,
            username: overrides.newUser!.username,
            name: overrides.newUser!.name,
            role: 'editor'
          }
        ]);
        setUName('');
        setUUsername('');
        setUPass('');
      }
      if (overrides.deleteUserId) {
        setAdminUsers((prev) => prev.filter((u) => u.id !== overrides.deleteUserId));
      }
      notify('Değişiklikler kaydedildi ve sitede yayınlandı!');
    }
  };

  // Add or Update Forum Item
  const handleAddForum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fTitle.trim()) return;
    const summaryText = fExcerpt.trim() || fContent.trim().split('\n')[0] || fTitle.trim();
    const fullText = fContent.trim() || summaryText;
    const forumId = editingForumId || `forum-${Date.now()}`;
    const baseId = forumId.replace(/^(forum-|ev-)/, '');
    const item: Article = {
      id: forumId,
      slug: forumId,
      title: fTitle.trim(),
      excerpt: summaryText,
      content: fullText.split(/\n\s*\n/),
      category: fCategory,
      date: fDate || new Date().toISOString().split('T')[0],
      author: fAuthor.trim() || 'İklim Adaleti Forumu',
      authorRole: 'İklim Adaleti Forumu',
      readTimeMinutes: 3,
      tags: [fCategory || 'Forum'],
      imageUrl: fImageUrl.trim() || undefined,
      videoUrl: fVideoUrl.trim() || undefined,
      pdfUrl: fPdfUrl.trim() || undefined
    };
    const nextForums = editingForumId
      ? forums.map((f) => (f.id === editingForumId ? item : f))
      : [item, ...forums];

    const matchingEventIdx = events.findIndex(
      (ev) =>
        ev.id.replace(/^(ev-|forum-)/, '') === baseId ||
        ev.title.toLowerCase() === item.title.toLowerCase()
    );
    const syncedEvent: ForumEvent = {
      id: matchingEventIdx >= 0 ? events[matchingEventIdx].id : `ev-${baseId}`,
      title: item.title,
      date: item.date,
      time: matchingEventIdx >= 0 ? events[matchingEventIdx].time : '',
      location: item.author || 'Türkiye',
      type: item.category || 'Forum',
      description: fullText,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl,
      pdfUrl: item.pdfUrl
    };
    const nextEvents =
      matchingEventIdx >= 0
        ? events.map((ev, idx) => (idx === matchingEventIdx ? syncedEvent : ev))
        : [...events, syncedEvent];

    await triggerSave({ forums: nextForums, events: nextEvents });
    setEditingForumId(null);
    setFTitle('');
    setFExcerpt('');
    setFContent('');
    setFImageUrl('');
    setFVideoUrl('');
    setFPdfUrl('');
  };

  // Add Working Group
  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gName.trim()) return;
    const item: WorkingGroup = {
      id: `wg-${Date.now()}`,
      name: gName.trim(),
      slug: `wg-${Date.now()}`,
      description: gDesc.trim() || gName.trim(),
      iconName: 'Users',
      memberCount: 0,
      coordinator: gCoord.trim(),
      topics: [],
      imageUrl: gImageUrl.trim() || undefined,
      videoUrl: gVideoUrl.trim() || undefined,
      pdfUrl: gPdfUrl.trim() || undefined
    };
    const next = [...workingGroups, item];
    await triggerSave({ workingGroups: next });
    setGName('');
    setGDesc('');
    setGCoord('');
    setGImageUrl('');
    setGVideoUrl('');
    setGPdfUrl('');
  };

  // Add Declaration
  const handleAddDeclaration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dTitle.trim()) return;
    const summaryText = dExcerpt.trim() || dContent.trim().split('\n')[0] || dTitle.trim();
    const fullText = dContent.trim() || summaryText;
    const item: Article = {
      id: `decl-${Date.now()}`,
      slug: `decl-${Date.now()}`,
      title: dTitle.trim(),
      excerpt: summaryText,
      content: fullText.split(/\n\s*\n/),
      category: 'Sonuç Bildirgesi',
      date: dDate || new Date().toISOString().split('T')[0],
      author: dAuthor.trim() || 'İklim Adaleti Forumu',
      authorRole: 'Sonuç Bildirgesi',
      readTimeMinutes: 5,
      tags: ['Sonuç Bildirgesi'],
      imageUrl: dImageUrl.trim() || undefined,
      videoUrl: dVideoUrl.trim() || undefined,
      pdfUrl: dPdfUrl.trim() || undefined
    };
    const next = [item, ...declarations];
    await triggerSave({ declarations: next });
    setDTitle('');
    setDExcerpt('');
    setDContent('');
    setDImageUrl('');
    setDVideoUrl('');
    setDPdfUrl('');
  };

  // Add Policy / Program Document
  const handleAddPolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle.trim()) return;
    const summaryText = pExcerpt.trim() || pContent.trim().split('\n')[0] || pTitle.trim();
    const fullText = pContent.trim() || summaryText;
    const item: Article = {
      id: `pol-${Date.now()}`,
      slug: `pol-${Date.now()}`,
      title: pTitle.trim(),
      excerpt: summaryText,
      content: fullText.split(/\n\s*\n/),
      category: 'Politika & Program',
      date: pDate || new Date().toISOString().split('T')[0],
      author: pAuthor.trim() || 'İklim Adaleti Forumu',
      authorRole: 'Politika / Program',
      readTimeMinutes: 10,
      tags: ['Politika / Program'],
      imageUrl: pImageUrl.trim() || undefined,
      videoUrl: pVideoUrl.trim() || undefined,
      pdfUrl: pPdfUrl.trim() || undefined
    };
    const next = [item, ...policies];
    await triggerSave({ policies: next });
    setPTitle('');
    setPExcerpt('');
    setPContent('');
    setPImageUrl('');
    setPVideoUrl('');
    setPPdfUrl('');
  };

  // Add or Update Event
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eTitle.trim()) return;
    const evId = editingEventId || `ev-${Date.now()}`;
    const baseId = evId.replace(/^(ev-|forum-)/, '');
    const item: ForumEvent = {
      id: evId,
      title: eTitle.trim(),
      date: eDate.trim() || new Date().toLocaleDateString('tr-TR'),
      time: eTime.trim(),
      location: eLocation.trim() || 'Türkiye',
      type: eType,
      description: eDesc.trim(),
      imageUrl: eImageUrl.trim() || undefined,
      videoUrl: eVideoUrl.trim() || undefined,
      pdfUrl: ePdfUrl.trim() || undefined
    };
    const nextEvents = editingEventId
      ? events.map((ev) => (ev.id === editingEventId ? item : ev))
      : [...events, item];

    const matchingForumIdx = forums.findIndex(
      (f) =>
        f.id.replace(/^(ev-|forum-)/, '') === baseId ||
        f.title.toLowerCase() === item.title.toLowerCase()
    );
    const paragraphs = (item.description || item.title).split(/\n\s*\n/);
    const syncedForum: Article = {
      id: matchingForumIdx >= 0 ? forums[matchingForumIdx].id : `forum-${baseId}`,
      slug: matchingForumIdx >= 0 ? forums[matchingForumIdx].slug : `forum-${baseId}`,
      title: item.title,
      excerpt: paragraphs.slice(0, 2).join('\n\n') || item.title,
      content: paragraphs,
      category: item.type || 'Forum',
      date: item.date,
      author: item.location || 'İklim Adaleti Forumu',
      authorRole: 'İklim Adaleti Forumu',
      readTimeMinutes: 3,
      tags: [item.type || 'Forum'],
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl,
      pdfUrl: item.pdfUrl
    };
    const nextForums =
      matchingForumIdx >= 0
        ? forums.map((f, idx) => (idx === matchingForumIdx ? syncedForum : f))
        : [syncedForum, ...forums];

    await triggerSave({ events: nextEvents, forums: nextForums });
    setEditingEventId(null);
    setETitle('');
    setEDate('');
    setETime('');
    setELocation('');
    setEDesc('');
    setEImageUrl('');
    setEVideoUrl('');
    setEPdfUrl('');
  };

  // Add Institutional or Individual Signatory manually
  const handleAddManualSignatory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sType === 'institutional' && !sOrg.trim()) return;
    if (sType === 'individual' && !sName.trim()) return;
    const cleanOrg = sOrg.trim();
    const cleanName = sName.trim();
    const cleanCity = sCity.trim();
    const targetName = sType === 'institutional' ? cleanOrg : cleanName;
    const targetLower = targetName.toLowerCase();

    const item: Signatory = {
      id: `sig-admin-${Date.now()}`,
      name: targetName,
      organization: sType === 'institutional' ? cleanOrg : (cleanOrg || undefined),
      city: cleanCity,
      date: new Date().toISOString().split('T')[0],
      type: sType,
      emailVerified: true
    };
    const nextRemoved = removedSignatoryIds.filter(
      (r) =>
        r.toLowerCase() !== targetLower &&
        r.toLowerCase() !== `inst:${targetLower}` &&
        !r.toLowerCase().startsWith(`ind:${targetLower}|`)
    );
    const next = [...extraSignatories, item];
    await triggerSave({ signatories: next, removedSignatoryIds: nextRemoved });
    setSName('');
    setSOrg('');
    setSCity('');
  };

  // Delete Signatory
  const handleRemoveSignatory = async (sig: Signatory) => {
    const nameLower = String(sig.organization || sig.name || '').trim().toLowerCase();
    const instKey = `inst:${nameLower}`;
    const indKey = `ind:${String(sig.name || '').trim().toLowerCase()}|${String(sig.city || '').trim().toLowerCase()}`;
    const nextRemoved = [
      ...new Set([
        ...removedSignatoryIds,
        sig.id,
        nameLower,
        sig.type === 'institutional' ? instKey : indKey
      ])
    ];
    const nextExtra = extraSignatories.filter(
      (s) =>
        s.id !== sig.id &&
        String(s.organization || s.name || '').trim().toLowerCase() !== nameLower
    );
    await triggerSave({
      signatories: nextExtra,
      removedSignatoryIds: nextRemoved
    });
  };

  // Add New Editor User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uUsername.trim() || uPass.trim().length < 4) return;
    await triggerSave({
      newUser: {
        username: uUsername.trim(),
        name: uName.trim() || uUsername.trim(),
        password: uPass.trim()
      }
    });
  };

  // Reusable Media Upload Box for Photo, Video, and PDF
  const renderMediaInputs = (
    prefix: string,
    imageUrl: string,
    setImageUrl: (v: string) => void,
    videoUrl: string,
    setVideoUrl: (v: string) => void,
    pdfUrl: string,
    setPdfUrl: (v: string) => void
  ) => (
    <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
      <p className="text-xs font-bold text-[#0B4F71] uppercase tracking-wider">
        Medya & Dosya Ekle (Fotoğraf, Video veya PDF — İsteğe Bağlı)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Fotoğraf / Görsel */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-stone-700">
            Fotoğraf / Afiş Görseli
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Görsel linki veya aşağıdan yükle"
            className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
          />
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0B4F71] rounded-lg text-xs font-bold cursor-pointer w-full justify-center">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>
              {uploadingField === `${prefix}-img`
                ? 'Yükleniyor...'
                : 'Bilgisayardan Fotoğraf Seç'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleFileUpload(e.target.files?.[0], `${prefix}-img`, setImageUrl)
              }
            />
          </label>
        </div>

        {/* 2. Video / YouTube */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-stone-700">
            Video (YouTube Linki veya MP4)
          </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="YouTube linki veya video yükle"
            className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
          />
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 rounded-lg text-xs font-bold cursor-pointer w-full justify-center">
            <Video className="w-3.5 h-3.5" />
            <span>
              {uploadingField === `${prefix}-vid`
                ? 'Yükleniyor...'
                : 'Bilgisayardan Video Seç'}
            </span>
            <input
              type="file"
              accept="video/mp4,video/webm,video/*"
              className="hidden"
              onChange={(e) =>
                handleFileUpload(e.target.files?.[0], `${prefix}-vid`, setVideoUrl)
              }
            />
          </label>
        </div>

        {/* 3. PDF / Doküman */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-stone-700">
            PDF / Broşür / Rapor Dosyası
          </label>
          <input
            type="text"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            placeholder="PDF linki veya aşağıdan yükle"
            className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
          />
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#3E8226] rounded-lg text-xs font-bold cursor-pointer w-full justify-center">
            <Upload className="w-3.5 h-3.5" />
            <span>
              {uploadingField === `${prefix}-pdf`
                ? 'Yükleniyor...'
                : 'Bilgisayardan PDF Seç'}
            </span>
            <input
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) =>
                handleFileUpload(e.target.files?.[0], `${prefix}-pdf`, setPdfUrl)
              }
            />
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col z-10 border border-stone-200 overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#0B4F71] text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-sky-200 shrink-0" />
            <div>
              <h2 className="font-serif text-base sm:text-xl font-bold leading-tight">
                iklimadaleti.org · İçerik Yönetim Paneli
              </h2>
              <p className="text-[11px] text-sky-200">
                {authenticated
                  ? `Aktif Kullanıcı: ${currentUserDisplay}`
                  : 'Yazı, Forum, Çalışma Grubu, Sonuç Bildirgesi, Etkinlik ve Kullanıcı Yönetimi'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#0B4F71] hover:bg-sky-50 text-xs font-bold cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Siteye Dön</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-sky-100 hover:bg-white/10 cursor-pointer"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!authenticated ? (
          <div className="p-8 max-w-md mx-auto w-full">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2 text-center">
              Yönetici / Editör Girişi
            </h3>
            <p className="text-xs text-stone-600 mb-6 text-center">
              Sitedeki içerikleri düzenlemek ve yeni yazı eklemek için kullanıcı adı ve şifrenizi giriniz.
            </p>
            {loginError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Örn: admin"
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-[#0B4F71]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Şifre
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-xs font-semibold text-[#0B4F71] hover:underline cursor-pointer"
                  >
                    {showPassword ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi giriniz..."
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-[#0B4F71]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0B4F71] hover:bg-[#083B54] text-white font-bold text-sm rounded-lg cursor-pointer transition-colors"
              >
                Panele Giriş Yap
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs - Wrapped cleanly with NO scrollbar covering buttons */}
            <div className="px-5 py-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('forums')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'forums'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>1. Forumlar & Yazılar ({forums.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('groups')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'groups'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>2. Çalışma Grupları ({workingGroups.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('declarations')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'declarations'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>3. Sonuç Bildirgeleri ({declarations.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('policies')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'policies'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>4. Politika / Program ({policies.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'events'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>5. Etkinlik Takvimi ({events.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signatories')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'signatories'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>6. İmzacı Kurumlar ({allSignatories.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'users'
                    ? 'bg-[#0B4F71] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>7. Kullanıcılar & Şifre</span>
              </button>
            </div>

            {statusMsg && (
              <div className="mx-6 mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#3E8226] flex items-center gap-2 shrink-0">
                <CheckCircle className="w-4 h-4" />
                <span>{statusMsg}</span>
              </div>
            )}

            {/* Tab Content Area */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: FORUMLAR & YAZILAR */}
              {activeTab === 'forums' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddForum}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      Yeni Forum / Panel / Basın Açıklaması / Duyuru Ekle
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Başlık *
                        </label>
                        <input
                          type="text"
                          required
                          value={fTitle}
                          onChange={(e) => setFTitle(e.target.value)}
                          placeholder="Örn: 1. Marmara Bölgesi İklim Adaleti Forumu"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Kategori
                        </label>
                        <select
                          value={fCategory}
                          onChange={(e) => setFCategory(e.target.value as Article['category'])}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        >
                          <option value="Forum">Forum</option>
                          <option value="Panel">Panel</option>
                          <option value="Basın Açıklaması">Basın Açıklaması</option>
                          <option value="Toplantı">Toplantı</option>
                          <option value="Atölye & Çalıştay">Atölye & Çalıştay</option>
                          <option value="Söyleşi & Seminer">Söyleşi & Seminer</option>
                          <option value="Eylem & Buluşma">Eylem & Buluşma</option>
                          <option value="Duyuru & Çağrı">Duyuru & Çağrı</option>
                          <option value="Rapor & Belge">Rapor & Belge</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Tarih
                        </label>
                        <input
                          type="text"
                          value={fDate}
                          onChange={(e) => setFDate(e.target.value)}
                          placeholder="2026-10-20"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Yazar / Kurum
                        </label>
                        <input
                          type="text"
                          value={fAuthor}
                          onChange={(e) => setFAuthor(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                    </div>

                    {renderMediaInputs(
                      'forum',
                      fImageUrl,
                      setFImageUrl,
                      fVideoUrl,
                      setFVideoUrl,
                      fPdfUrl,
                      setFPdfUrl
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Kısa Özet (Kartta görünecek metin) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={fExcerpt}
                        onChange={(e) => setFExcerpt(e.target.value)}
                        placeholder="Kısa açıklama..."
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tam Metin (Paragraflar arasında boş satır bırakabilirsiniz)
                      </label>
                      <textarea
                        rows={5}
                        value={fContent}
                        onChange={(e) => setFContent(e.target.value)}
                        placeholder="Yazının tam metni..."
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3E8226] hover:bg-[#31681E] text-white text-xs font-bold rounded-lg cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>
                          {editingForumId
                            ? 'İçeriği Güncelle ve Yayınla'
                            : 'Forumlar Bölümüne Ekle ve Yayınla'}
                        </span>
                      </button>
                      {editingForumId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingForumId(null);
                            setFTitle('');
                            setFExcerpt('');
                            setFContent('');
                            setFImageUrl('');
                            setFVideoUrl('');
                            setFPdfUrl('');
                          }}
                          className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Düzenlemeyi İptal Et
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Mevcut Forum / Yazı İçerikleri ({forums.length})
                    </h4>
                    {forums.length === 0 ? (
                      <p className="text-xs text-stone-500 italic">
                        Henüz içerik eklenmedi (Sitede "İçerik güncelleniyor..." olarak görünür).
                      </p>
                    ) : (
                      forums.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="text-sm font-bold text-stone-900">{item.title}</p>
                            <p className="text-xs text-stone-500">
                              {item.category} · {item.date}
                              {item.imageUrl ? ' · [Fotoğraflı]' : ''}
                              {item.videoUrl ? ' · [Videolu]' : ''}
                              {item.pdfUrl ? ' · [PDF]' : ''}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingForumId(item.id);
                                setFTitle(item.title);
                                setFCategory(item.category || 'Forum');
                                setFDate(item.date || '');
                                setFAuthor(item.author || 'İklim Adaleti Forumu');
                                setFExcerpt(item.excerpt || '');
                                setFContent(
                                  Array.isArray(item.content)
                                    ? item.content.join('\n\n')
                                    : String(item.content || '')
                                );
                                setFImageUrl(item.imageUrl || '');
                                setFVideoUrl(item.videoUrl || '');
                                setFPdfUrl(item.pdfUrl || '');
                              }}
                              className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0B4F71] text-xs font-bold rounded-lg cursor-pointer"
                            >
                              Düzenle
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                triggerSave({
                                  forums: forums.filter((f) => f.id !== item.id),
                                  events: events.filter(
                                    (ev) => ev.title.toLowerCase() !== item.title.toLowerCase()
                                  ),
                                  deleteItemKey: [item.id, item.title]
                                })
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ÇALIŞMA GRUPLARI */}
              {activeTab === 'groups' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddGroup}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      Yeni Çalışma Grubu Ekle
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Çalışma Grubu Adı *
                        </label>
                        <input
                          type="text"
                          required
                          value={gName}
                          onChange={(e) => setGName(e.target.value)}
                          placeholder="Örn: Su ve Gıda Egemenliği Çalışma Grubu"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Koordinasyon / İletişim (İsteğe bağlı)
                        </label>
                        <input
                          type="text"
                          value={gCoord}
                          onChange={(e) => setGCoord(e.target.value)}
                          placeholder="Örn: iklimadaleti2026@gmail.com"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                    </div>

                    {renderMediaInputs(
                      'group',
                      gImageUrl,
                      setGImageUrl,
                      gVideoUrl,
                      setGVideoUrl,
                      gPdfUrl,
                      setGPdfUrl
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Açıklama *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={gDesc}
                        onChange={(e) => setGDesc(e.target.value)}
                        placeholder="Çalışma grubunun amacı ve kapsamı..."
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3E8226] hover:bg-[#31681E] text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Çalışma Grubu Ekle ve Yayınla</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Mevcut Çalışma Grupları ({workingGroups.length})
                    </h4>
                    {workingGroups.map((g) => (
                      <div
                        key={g.id}
                        className="p-3 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-bold text-stone-900">{g.name}</p>
                          <p className="text-xs text-stone-500">{g.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            triggerSave({
                              workingGroups: workingGroups.filter((item) => item.id !== g.id),
                              deleteItemKey: [g.id, g.name]
                            })
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SONUÇ BİLDİRGELERİ */}
              {activeTab === 'declarations' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddDeclaration}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      Yeni Sonuç Bildirgesi Ekle
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Bildirge Başlığı *
                        </label>
                        <input
                          type="text"
                          required
                          value={dTitle}
                          onChange={(e) => setDTitle(e.target.value)}
                          placeholder="Örn: İklim Adaleti Forumu Sonuç Bildirgesi"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Tarih
                        </label>
                        <input
                          type="text"
                          value={dDate}
                          onChange={(e) => setDDate(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Hazırlayan / Forum Adı
                      </label>
                      <input
                        type="text"
                        value={dAuthor}
                        onChange={(e) => setDAuthor(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    {renderMediaInputs(
                      'decl',
                      dImageUrl,
                      setDImageUrl,
                      dVideoUrl,
                      setDVideoUrl,
                      dPdfUrl,
                      setDPdfUrl
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Kısa Özet *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={dExcerpt}
                        onChange={(e) => setDExcerpt(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Bildirge Tam Metni
                      </label>
                      <textarea
                        rows={6}
                        value={dContent}
                        onChange={(e) => setDContent(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3E8226] hover:bg-[#31681E] text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Sonuç Bildirgesi Ekle ve Yayınla</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Mevcut Sonuç Bildirgeleri ({declarations.length})
                    </h4>
                    {declarations.map((d) => (
                      <div
                        key={d.id}
                        className="p-3 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-bold text-stone-900">{d.title}</p>
                          <p className="text-xs text-stone-500">{d.date}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            triggerSave({
                              declarations: declarations.filter((item) => item.id !== d.id),
                              deleteItemKey: [d.id, d.title]
                            })
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: POLİTİKA / PROGRAM */}
              {activeTab === 'policies' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddPolicy}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      Politika / Program Belgesi veya PDF Ekle
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Başlık *
                        </label>
                        <input
                          type="text"
                          required
                          value={pTitle}
                          onChange={(e) => setPTitle(e.target.value)}
                          placeholder="Örn: İklim Adaleti Politika ve Eylem Programı"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Tarih
                        </label>
                        <input
                          type="text"
                          value={pDate}
                          onChange={(e) => setPDate(e.target.value)}
                          placeholder="Örn: Ekim 2026"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Kısa Açıklama / Özet *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={pExcerpt}
                        onChange={(e) => setPExcerpt(e.target.value)}
                        placeholder="Politika / Program belgesi hakkında kısa açıklama..."
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    {/* Öne Çıkan PDF Yükleme Alanı */}
                    <div className="p-4 bg-emerald-50/70 border-2 border-emerald-200 rounded-xl space-y-2.5">
                      <label className="block text-xs font-bold text-[#3E8226] uppercase tracking-wider">
                        Uzun PDF Belgesi Yükle (Sayfada Doğrudan Okunabilir ve İndirilebilir)
                      </label>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <input
                          type="text"
                          value={pPdfUrl}
                          onChange={(e) => setPPdfUrl(e.target.value)}
                          placeholder="PDF dosya adresi veya sağdaki butondan bilgisayarınızdan seçin..."
                          className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                        />
                        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3E8226] hover:bg-[#31681E] text-white rounded-lg text-xs font-bold cursor-pointer justify-center shrink-0 shadow-xs">
                          <Upload className="w-4 h-4" />
                          <span>
                            {uploadingField === 'policy-pdf'
                              ? 'PDF Yükleniyor...'
                              : 'Bilgisayardan PDF Dosyası Seç'}
                          </span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e.target.files?.[0], 'policy-pdf', setPPdfUrl)
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {renderMediaInputs(
                      'policy',
                      pImageUrl,
                      setPImageUrl,
                      pVideoUrl,
                      setPVideoUrl,
                      pPdfUrl,
                      setPPdfUrl
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Ek Metin (İsteğe Bağlı — PDF dışında sayfa içinde yazı da göstermek isterseniz)
                      </label>
                      <textarea
                        rows={4}
                        value={pContent}
                        onChange={(e) => setPContent(e.target.value)}
                        placeholder="İsteğe bağlı ek açıklama veya tam metin..."
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3E8226] hover:bg-[#31681E] text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Politika / Program Bölümüne Ekle ve Yayınla</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Mevcut Politika / Program Belgeleri ({policies.length})
                    </h4>
                    {policies.length === 0 ? (
                      <p className="text-xs text-stone-500 italic">
                        Henüz Politika / Program belgesi eklenmedi.
                      </p>
                    ) : (
                      policies.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="text-sm font-bold text-stone-900">{p.title}</p>
                            <p className="text-xs text-stone-500">
                              {p.date}
                              {p.pdfUrl ? ` · PDF: ${p.pdfUrl}` : ''}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              triggerSave({
                                policies: policies.filter((item) => item.id !== p.id),
                                deleteItemKey: [p.id, p.title]
                              })
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: ETKİNLİK TAKVİMİ */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddEvent}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      Yeni Etkinlik Ekle
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Etkinlik Başlığı *
                        </label>
                        <input
                          type="text"
                          required
                          value={eTitle}
                          onChange={(e) => setETitle(e.target.value)}
                          placeholder="Örn: Antalya COP31 Hazırlık Forumu"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Kategori / Tür
                        </label>
                        <select
                          value={eType}
                          onChange={(e) => setEType(e.target.value as ForumEvent['type'])}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        >
                          <option value="Forum">Forum</option>
                          <option value="Panel">Panel</option>
                          <option value="Basın Açıklaması">Basın Açıklaması</option>
                          <option value="Toplantı">Toplantı</option>
                          <option value="Atölye & Çalıştay">Atölye & Çalıştay</option>
                          <option value="Söyleşi & Seminer">Söyleşi & Seminer</option>
                          <option value="Eylem & Buluşma">Eylem & Buluşma</option>
                          <option value="Basın Toplantısı">Basın Toplantısı</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Tarih *
                        </label>
                        <input
                          type="text"
                          required
                          value={eDate}
                          onChange={(e) => setEDate(e.target.value)}
                          placeholder="Örn: 15 Kasım 2026"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Saat
                        </label>
                        <input
                          type="text"
                          value={eTime}
                          onChange={(e) => setETime(e.target.value)}
                          placeholder="Örn: 14:00"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Konum / Şehir *
                        </label>
                        <input
                          type="text"
                          required
                          value={eLocation}
                          onChange={(e) => setELocation(e.target.value)}
                          placeholder="Örn: Antalya / Çevrimiçi"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                    </div>

                    {renderMediaInputs(
                      'event',
                      eImageUrl,
                      setEImageUrl,
                      eVideoUrl,
                      setEVideoUrl,
                      ePdfUrl,
                      setEPdfUrl
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Açıklama
                      </label>
                      <textarea
                        rows={2}
                        value={eDesc}
                        onChange={(e) => setEDesc(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3E8226] hover:bg-[#31681E] text-white text-xs font-bold rounded-lg cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>
                          {editingEventId
                            ? 'Etkinliği Güncelle ve Yayınla'
                            : 'Etkinlik Ekle ve Yayınla'}
                        </span>
                      </button>
                      {editingEventId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingEventId(null);
                            setETitle('');
                            setEDate('');
                            setETime('');
                            setELocation('');
                            setEDesc('');
                            setEImageUrl('');
                            setEVideoUrl('');
                            setEPdfUrl('');
                          }}
                          className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Düzenlemeyi İptal Et
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Mevcut Etkinlikler ({events.length})
                    </h4>
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-3 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-bold text-stone-900">{ev.title}</p>
                          <p className="text-xs text-stone-500">
                            {ev.type} · {ev.date} · {ev.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingEventId(ev.id);
                              setETitle(ev.title);
                              setEDate(ev.date);
                              setETime(ev.time || '');
                              setELocation(ev.location);
                              setEType(ev.type);
                              setEDesc(ev.description || '');
                              setEImageUrl(ev.imageUrl || '');
                              setEVideoUrl(ev.videoUrl || '');
                              setEPdfUrl(ev.pdfUrl || '');
                            }}
                            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0B4F71] text-xs font-bold rounded-lg cursor-pointer"
                          >
                            Düzenle
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              triggerSave({
                                events: events.filter((item) => item.id !== ev.id),
                                forums: forums.filter(
                                  (f) => f.title.toLowerCase() !== ev.title.toLowerCase()
                                ),
                                deleteItemKey: [ev.id, ev.title]
                              })
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: İMZACI KURUMLAR & BİREYLER */}
              {activeTab === 'signatories' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddManualSignatory}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        Doğrudan Yeni İmzacı Ekle (Kurum veya Birey)
                      </h4>
                      <div className="inline-flex rounded-lg bg-stone-200/80 p-1">
                        <button
                          type="button"
                          onClick={() => setSType('institutional')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md cursor-pointer transition-colors ${
                            sType === 'institutional'
                              ? 'bg-[#0B4F71] text-white'
                              : 'text-stone-700 hover:text-stone-900'
                          }`}
                        >
                          Kurumsal İmza
                        </button>
                        <button
                          type="button"
                          onClick={() => setSType('individual')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md cursor-pointer transition-colors ${
                            sType === 'individual'
                              ? 'bg-[#3E8226] text-white'
                              : 'text-stone-700 hover:text-stone-900'
                          }`}
                        >
                          Bireysel İmza
                        </button>
                      </div>
                    </div>

                    {sType === 'institutional' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Kurum / Sendika / Dernek / Platform Adı *
                          </label>
                          <input
                            type="text"
                            required
                            value={sOrg}
                            onChange={(e) => setSOrg(e.target.value)}
                            placeholder="Örn: Ekoloji Birliği"
                            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Şehir (İsteğe bağlı)
                          </label>
                          <input
                            type="text"
                            value={sCity}
                            onChange={(e) => setSCity(e.target.value)}
                            placeholder="Örn: İzmir"
                            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Ad Soyad *
                          </label>
                          <input
                            type="text"
                            required
                            value={sName}
                            onChange={(e) => setSName(e.target.value)}
                            placeholder="Örn: Barış Keskinkılıç"
                            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Meslek / Ünvan (İsteğe bağlı)
                          </label>
                          <input
                            type="text"
                            value={sOrg}
                            onChange={(e) => setSOrg(e.target.value)}
                            placeholder="Örn: Emekli, Akademisyen, Yazar"
                            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Şehir (İsteğe bağlı)
                          </label>
                          <input
                            type="text"
                            value={sCity}
                            onChange={(e) => setSCity(e.target.value)}
                            placeholder="Örn: İstanbul"
                            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0B4F71] hover:bg-[#083B54] text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {sType === 'institutional'
                          ? 'İmzacı Kurum Listesine Ekle'
                          : 'Bireysel İmzacı Listesine Ekle'}
                      </span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Tüm İmzalar ({allSignatories.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allSignatories.map((sig, idx) => (
                        <div
                          key={sig.id}
                          className="p-2.5 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-2"
                        >
                          <span className="text-xs font-semibold text-stone-800">
                            {idx + 1}.{' '}
                            {sig.type === 'individual'
                              ? `${sig.name}${sig.organization ? ` - ${sig.organization}` : ''}${sig.city ? ` (${sig.city} · Bireysel)` : ' (Bireysel)'}`
                              : `${sig.organization || sig.name}${sig.city ? ` (${sig.city})` : ''}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSignatory(sig)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                            title="İmzayı Kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: KULLANICILAR & ŞİFRE YÖNETİMİ */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  {/* Yeni Editör / Kullanıcı Ekleme */}
                  <form
                    onSubmit={handleAddUser}
                    className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-[#0B4F71]" />
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        Yeni Kullanıcı / Editör Hesabı Aç
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600">
                      Farklı ekip arkadaşlarınızın siteye yazı, etkinlik veya bildirge girebilmesi için her birine ayrı kullanıcı adı ve şifre tanımlayabilirsiniz.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Ad Soyad / Görev *
                        </label>
                        <input
                          type="text"
                          required
                          value={uName}
                          onChange={(e) => setUName(e.target.value)}
                          placeholder="Örn: Ayşe Yılmaz"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Kullanıcı Adı *
                        </label>
                        <input
                          type="text"
                          required
                          value={uUsername}
                          onChange={(e) => setUUsername(e.target.value)}
                          placeholder="Örn: ayse"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Şifre (En az 4 karakter) *
                        </label>
                        <input
                          type="text"
                          required
                          value={uPass}
                          onChange={(e) => setUPass(e.target.value)}
                          placeholder="Örn: iklim1234"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3E8226] hover:bg-[#31681E] text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Kullanıcıyı Oluştur</span>
                    </button>
                  </form>

                  {/* Mevcut Kullanıcılar Listesi */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Yetkili Kullanıcılar ({adminUsers.length + 1})
                    </h4>
                    <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-stone-900">
                          Ana Yönetici (Kullanıcı adı: <span className="font-mono">admin</span>)
                        </p>
                        <p className="text-xs text-stone-500">Tam Yetkili Kurucu Hesap</p>
                      </div>
                    </div>
                    {adminUsers.map((u) => (
                      <div
                        key={u.id}
                        className="p-3 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-bold text-stone-900">
                            {u.name} (Kullanıcı adı: <span className="font-mono">{u.username}</span>)
                          </p>
                          <p className="text-xs text-stone-500">İçerik Editörü</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => triggerSave({ deleteUserId: u.id })}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Kullanıcıyı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Ana Yönetici Şifresi Değiştirme */}
                  <div className="max-w-md space-y-4 bg-stone-50 border border-stone-200 rounded-xl p-5">
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      Ana Yönetici (admin) Şifresini Değiştir
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Yeni Ana Şifre (En az 4 karakter)
                      </label>
                      <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Yeni ana yönetici şifresi..."
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={saving || newPass.trim().length < 4}
                      onClick={() => triggerSave({ newAdminPass: newPass.trim() })}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0B4F71] hover:bg-[#083B54] disabled:opacity-50 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Ana Şifreyi Güncelle</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
