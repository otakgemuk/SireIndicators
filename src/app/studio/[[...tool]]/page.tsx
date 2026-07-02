import { redirect } from 'next/navigation';

/**
 * Sanity Studio removed 2026-07-02 — it was unused default scaffold and its
 * dependencies (sanity v5) require React 19, which broke the Next 14 build.
 * Content is managed in /data/indicators.json. To restore a studio later,
 * upgrade to Next 15 + React 19 and recover the old files from git history.
 */
export default function StudioDisabled() {
  redirect('/');
}
