'use client';

import { useState } from 'react';

interface CopyScriptButtonProps {
  scriptPath: string;
  indicatorName: string;
}

export default function CopyScriptButton({ scriptPath, indicatorName }: CopyScriptButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const response = await fetch(`/api/get-script?path=${encodeURIComponent(scriptPath)}`);
      if (!response.ok) throw new Error('Failed to fetch script');
      
      const { content } = await response.json();
      await navigator.clipboard.writeText(content);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy ${indicatorName} Pine Script`}
      className="rounded bg-[#E8C46A] px-6 py-3 font-mono text-sm font-semibold tracking-wide text-[#0B0F19] transition-all hover:bg-[#F5EDD8] disabled:opacity-50"
      disabled={copied}
    >
      {copied ? '✓ COPIED' : 'COPY SCRIPT'}
    </button>
  );
}
