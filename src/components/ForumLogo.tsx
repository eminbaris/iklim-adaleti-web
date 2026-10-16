/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ForumLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'cop31';
}

export default function ForumLogo({
  className = 'h-16 w-auto',
  variant = 'full'
}: ForumLogoProps) {
  if (variant === 'cop31') {
    return (
      <img
        src="/cop31-logo.png"
        alt="COP31'e Doğru İklim Adaleti Forumu"
        className={`object-contain select-none ${className}`}
        draggable={false}
      />
    );
  }

  return (
    <img
      src="/logo.png"
      alt="İklim Adaleti Forumu - Başka bir dünyayı birlikte kuralım!"
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
