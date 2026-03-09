import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { COLAB_CODE } from '../constants';

export function CodeViewer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(COLAB_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-white/10">
        <div className="flex items-center gap-2 text-gray-300">
          <Terminal size={18} />
          <span className="font-mono text-sm font-medium">autoencoder_lab.ipynb</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-[13px] leading-relaxed font-mono text-gray-300">
          <code>{COLAB_CODE}</code>
        </pre>
      </div>
    </div>
  );
}
