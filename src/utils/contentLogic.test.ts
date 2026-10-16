import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterContentItems,
  calculateReadingTime,
  formatTurkishDate,
  truncateClean,
  generateWordPressExportData
} from './contentLogic.ts';
import type { ArticleItem } from './contentLogic.ts';

const mockItems: ArticleItem[] = [
  {
    id: '1',
    slug: 'iklim-adaleti-forumu-sonuc-bildirgesi-2026',
    title: 'İklim Adaleti Forumu Sonuç Bildirgesi: Acil Eylem ve Adil Geçiş Çağrısı',
    excerpt: 'Türkiye’nin dört bir yanından gelen ekoloji savunucuları bir araya geldi.',
    content: 'Ekolojik kriz derinleşirken sermaye odaklı politikalar halkın yaşam alanlarını tehdit ediyor. Adil bir geçiş mekanizması derhal kurulmalıdır.',
    category: 'Sonuç Bildirgesi',
    tags: ['Adil Geçiş', 'Sonuç Bildirgesi', 'İklim Tazminatı'],
    author: 'İklim Adaleti Forumu Koordinasyonu',
    date: '2026-10-15',
    readTimeMinutes: 5,
    featured: true
  },
  {
    id: '2',
    slug: 'akbelen-ve-kazdaglari-hukuk-raporu',
    title: 'Akbelen ve Kazdağları Ekolojik Mücadeleleri Hukuk Raporu',
    excerpt: 'Çevre davalarında bilirkişi raporları ve yargı kararlarının analizi.',
    content: 'Mahkeme kararlarına rağmen madencilik faaliyetlerinin sürmesi anayasal çevre hakkının ihlalidir.',
    category: 'Hukuk & Rapor',
    tags: ['Ekoloji Hukuku', 'Kazdağları', 'Akbelen'],
    author: 'Hukuk Çalışma Grubu',
    date: '2026-09-20',
    readTimeMinutes: 8
  },
  {
    id: '3',
    slug: 'toplumsal-ve-adil-gecis-brosuru',
    title: 'Toplumsal ve Adil Geçiş Eylem Rehberi (Broşür)',
    excerpt: 'Emekçiler ve yerel halk için adil dönüşüm ilkeleri rehberi.',
    content: 'Kömür madenlerinin kapatılması sürecinde işçilerin güvenceli istihdamı sağlanmalı.',
    category: 'Broşür & Yayın',
    tags: ['Broşür', 'Adil Geçiş', 'Emek'],
    author: 'Adil Geçiş Çalışma Masası',
    date: '2026-08-10',
    readTimeMinutes: 4
  }
];

test('filterContentItems correctly filters by category', () => {
  const result = filterContentItems(mockItems, '', 'Sonuç Bildirgesi');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '1');
});

test('filterContentItems correctly searches in Turkish with case insensitivity', () => {
  const result = filterContentItems(mockItems, 'adil geçiş', 'Tümü');
  assert.equal(result.length, 2); // items 1 and 3
});

test('filterContentItems filters by tag', () => {
  const result = filterContentItems(mockItems, '', 'Tümü', 'Kazdağları');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '2');
});

test('calculateReadingTime handles short and long text', () => {
  assert.equal(calculateReadingTime(''), 1);
  const shortText = 'Kelime bir iki üç dört beş altı.';
  assert.equal(calculateReadingTime(shortText), 1);

  // 320 words should be 2 minutes at 160 wpm
  const words = Array(320).fill('kelime').join(' ');
  assert.equal(calculateReadingTime(words, 160), 2);
});

test('formatTurkishDate formats YYYY-MM-DD properly', () => {
  assert.equal(formatTurkishDate('2026-10-15'), '15 Ekim 2026');
  assert.equal(formatTurkishDate('2026-01-05'), '5 Ocak 2026');
});

test('truncateClean cuts on word boundary with ellipsis', () => {
  const sample = 'Türkiye iklim krizinde en kırılgan bölgelerden biridir ve acil adalet gerektirir.';
  const truncated = truncateClean(sample, 25);
  assert.ok(truncated.endsWith('…'));
  assert.ok(truncated.length <= 26);
  assert.equal(truncated, 'Türkiye iklim krizinde…');
});

test('generateWordPressExportData generates valid WP structure', () => {
  const exported = generateWordPressExportData(mockItems);
  assert.equal(exported.siteUrl, 'https://iklimadaleti.org');
  assert.equal(exported.posts.length, 3);
  assert.equal(exported.posts[0].post_type, 'bildirge');
  assert.equal(exported.posts[1].post_type, 'post');
  assert.equal(exported.posts[2].post_type, 'yayin');
});
