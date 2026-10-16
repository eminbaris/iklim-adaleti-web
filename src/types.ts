/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Sonuç Bildirgesi' | 'Makale & Görüş' | 'Broşür & Yayın' | 'Hukuk & Rapor' | 'Haber & Duyuru';
  tags: string[];
  author: string;
  authorRole?: string;
  date: string; // YYYY-MM-DD
  readTimeMinutes: number;
  featured?: boolean;
  pdfUrl?: string;
  documentNumber?: string;
  downloadCount?: number;
  signable?: boolean;
  signatureCount?: number;
  keyPoints?: string[];
}

export interface Brochure {
  id: string;
  title: string;
  subtitle: string;
  editionNumber: string;
  publishDate: string;
  pageCount: number;
  fileSize: string;
  summary: string;
  pages: { pageNum: number; heading: string; text: string }[];
  tags: string[];
  coverColor: string;
}

export interface Signatory {
  id: string;
  name: string;
  organization?: string;
  city: string;
  date: string;
  message?: string;
  type?: 'institutional' | 'individual';
  emailVerified?: boolean;
}

export interface WorkingGroup {
  id: string;
  name: string;
  title: string;
  coordinator: string;
  description: string;
  focusAreas: string[];
  meetingSchedule: string;
}

export interface ForumEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
}
