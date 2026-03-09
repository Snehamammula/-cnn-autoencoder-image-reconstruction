import { useState } from 'react';
import { Settings2, Image as ImageIcon, BarChart3, Grid3X3 } from 'lucide-react';

export function GradioPreview() {
  const [dataset, setDataset] = useState<'Fashion MNIST' | 'FastFood'>('Fashion MNIST');
  const [activeTab, setActiveTab] = useState<'single' | 'gallery' | 'metrics'>('single');
  const [imageIndex, setImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateGallery = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 800);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xl">
      {/* Gradio Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-orange-500">🧠</span> Autoencoder Image Reconstruction Lab
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Explore how Convolutional Autoencoders compress and reconstruct images from different datasets.
        </p>
      </div>

      <div className="p-6 flex-1 overflow-auto flex flex-col gap-6">
        {/* Dataset Selector */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Dataset</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="dataset"
                checked={dataset === 'Fashion MNIST'}
                onChange={() => setDataset('Fashion MNIST')}
                className="text-orange-500 focus:ring-orange-500 w-4 h-4"
              />
              <span className="text-sm text-gray-800">Fashion MNIST</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="dataset"
                checked={dataset === 'FastFood'}
                onChange={() => setDataset('FastFood')}
                className="text-orange-500 focus:ring-orange-500 w-4 h-4"
              />
              <span className="text-sm text-gray-800">FastFood</span>
            </label>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col flex-1">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'single'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ImageIcon size={16} />
              Single Image Reconstruction
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'gallery'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Grid3X3 size={16} />
              Reconstruction Gallery
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'metrics'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 size={16} />
              Training Metrics & Latent Space
            </button>
          </div>

          <div className="py-6 flex-1 flex flex-col">
            {activeTab === 'single' && (
              <div className="flex flex-col gap-6 h-full">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Image Index</label>
                    <span className="text-sm text-gray-500 font-mono">{imageIndex}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={imageIndex}
                    onChange={(e) => setImageIndex(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 flex-1">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Original Image</span>
                    <div className="flex-1 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative min-h-[200px]">
                      {dataset === 'Fashion MNIST' ? (
                        <img 
                          src={`https://picsum.photos/seed/fashion${imageIndex}/200/200?grayscale`} 
                          alt="Original" 
                          className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                        />
                      ) : (
                        <img 
                          src={`https://picsum.photos/seed/food${imageIndex}/200/200`} 
                          alt="Original" 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Reconstructed Image</span>
                    <div className="flex-1 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative min-h-[200px]">
                      {dataset === 'Fashion MNIST' ? (
                        <img 
                          src={`https://picsum.photos/seed/fashion${imageIndex}/200/200?grayscale&blur=2`} 
                          alt="Reconstructed" 
                          className="w-full h-full object-cover opacity-70 mix-blend-multiply"
                        />
                      ) : (
                        <img 
                          src={`https://picsum.photos/seed/food${imageIndex}/200/200?blur=2`} 
                          alt="Reconstructed" 
                          className="w-full h-full object-cover opacity-90"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="flex flex-col gap-6 h-full">
                <button 
                  onClick={handleGenerateGallery}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors self-start shadow-sm"
                >
                  Generate Gallery
                </button>
                
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
                  {isGenerating ? (
                    <div className="flex items-center gap-3 text-gray-500">
                      <Settings2 className="animate-spin" size={20} />
                      <span>Generating reconstructions...</span>
                    </div>
                  ) : (
                    <div className="w-full max-w-3xl">
                      <div className="grid grid-cols-5 gap-4 mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={`orig-${i}`} className="aspect-square bg-gray-200 rounded overflow-hidden">
                            <img 
                              src={`https://picsum.photos/seed/${dataset === 'Fashion MNIST' ? 'fashion' : 'food'}${i * 10}/100/100${dataset === 'Fashion MNIST' ? '?grayscale' : ''}`} 
                              alt="Gallery Original" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={`recon-${i}`} className="aspect-square bg-gray-200 rounded overflow-hidden">
                            <img 
                              src={`https://picsum.photos/seed/${dataset === 'Fashion MNIST' ? 'fashion' : 'food'}${i * 10}/100/100${dataset === 'Fashion MNIST' ? '?grayscale&blur=2' : '?blur=2'}`} 
                              alt="Gallery Reconstructed" 
                              className="w-full h-full object-cover opacity-80"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium uppercase tracking-wider">
                        <span>Original</span>
                        <span>Reconstructed</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="grid grid-cols-2 gap-6 h-full min-h-[300px]">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="absolute top-4 left-4 text-sm font-medium text-gray-700">Training Loss</span>
                  {/* Simulated Line Chart */}
                  <div className="w-full h-48 mt-8 flex items-end justify-between px-4">
                    {[80, 40, 25, 18, 15].map((val, i) => (
                      <div key={i} className="w-full flex flex-col items-center gap-2">
                        <div className="w-2 bg-blue-500 rounded-t-sm" style={{ height: `${val}%` }}></div>
                        <span className="text-xs text-gray-400">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="absolute top-4 left-4 text-sm font-medium text-gray-700">Latent Space (PCA)</span>
                  {/* Simulated Scatter Plot */}
                  <div className="w-full h-48 mt-8 relative">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-2 h-2 rounded-full bg-orange-500 opacity-70"
                        style={{ 
                          left: `${20 + Math.random() * 60}%`, 
                          top: `${20 + Math.random() * 60}%` 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
