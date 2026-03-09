/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CodeViewer } from './components/CodeViewer';
import { GradioPreview } from './components/GradioPreview';
import { Code2, LayoutTemplate } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'code' | 'preview'>('preview');

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Autoencoder Project Hub</h1>
            <p className="text-xs text-gray-500">Google Colab & Gradio Interface</p>
          </div>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveView('preview')}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeView === 'preview' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LayoutTemplate size={16} />
            UI Preview
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeView === 'code' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Code2 size={16} />
            Colab Code
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full h-[calc(100vh-73px)]">
        {activeView === 'preview' ? (
          <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GradioPreview />
          </div>
        ) : (
          <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CodeViewer />
          </div>
        )}
      </main>
    </div>
  );
}
