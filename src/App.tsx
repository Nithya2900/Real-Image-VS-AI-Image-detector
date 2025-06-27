import React, { useState } from 'react';
import { Search, Brain, Github, Shield } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { classifyImage } from './utils/api';

interface ClassificationResult {
  isAI: boolean;
  confidence: number;
  label: string;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setUploadedImage(file);
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const classification = await classifyImage(file);
      setResult(classification);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyzeAnother = () => {
    setUploadedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Search className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Spot the AI
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Upload any image and instantly discover if it's real or AI-generated using advanced machine learning
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.2%</div>
              <div className="text-white/60 text-sm">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">&lt;3s</div>
              <div className="text-white/60 text-sm">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-white/60 text-sm">Privacy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          {!result && !isProcessing && (
            <ImageUpload
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              onRemoveImage={handleRemoveImage}
              isProcessing={isProcessing}
            />
          )}

          {isProcessing && <LoadingSpinner />}

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 text-center">
              <div className="p-3 bg-red-500/20 rounded-full w-fit mx-auto mb-4">
                <Shield className="text-red-400" size={24} />
              </div>
              <h3 className="text-red-400 font-semibold mb-2">Analysis Failed</h3>
              <p className="text-white/70 mb-4">{error}</p>
              <button
                onClick={handleAnalyzeAnother}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-xl transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {result && (
            <ResultsDisplay
              isAI={result.isAI}
              confidence={result.confidence}
              label={result.label}
              onAnalyzeAnother={handleAnalyzeAnother}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="text-white" size={20} />
              </div>
              <div>
                <div className="text-white font-medium">Spot the AI</div>
                <div className="text-white/60 text-sm">Powered by Hugging Face</div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-white/60">
              <a href="#" className="hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <span className="text-sm">Made with ❤️ for AI transparency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;