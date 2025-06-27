import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Brain, Camera } from 'lucide-react';

interface ResultsDisplayProps {
  isAI: boolean;
  confidence: number;
  label: string;
  onAnalyzeAnother: () => void;
}

export function ResultsDisplay({ isAI, confidence, label, onAnalyzeAnother }: ResultsDisplayProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceText = (score: number) => {
    if (score >= 90) return 'Very High';
    if (score >= 80) return 'High';
    if (score >= 60) return 'Moderate';
    if (score >= 40) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {isAI ? (
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Brain className="text-orange-400" size={24} />
              </div>
            ) : (
              <div className="p-3 bg-green-500/20 rounded-full">
                <Camera className="text-green-400" size={24} />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-white">
                {isAI ? 'AI Generated' : 'Real Photo'}
              </h3>
              <p className="text-white/70 text-sm">{label}</p>
            </div>
          </div>
          {isAI ? (
            <AlertTriangle className="text-orange-400 flex-shrink-0" size={20} />
          ) : (
            <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
          )}
        </div>

        {/* Confidence Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Confidence Level</span>
            <span className={`font-semibold ${getConfidenceColor(confidence)}`}>
              {confidence}% • {getConfidenceText(confidence)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                isAI ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-green-500 to-blue-500'
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-white/5 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-2 flex items-center">
            <Shield size={16} className="mr-2" />
            Analysis Details
          </h4>
          <p className="text-white/70 text-sm leading-relaxed">
            {isAI
              ? 'This image appears to be artificially generated. Common indicators include subtle inconsistencies in lighting, textures, or anatomical features that are typical of AI-generated content.'
              : 'This image appears to be a genuine photograph. The analysis detected natural characteristics typical of real camera captures, including authentic lighting, noise patterns, and optical properties.'}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onAnalyzeAnother}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          Analyze Another Image
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <p className="text-white/60 text-xs text-center">
          This tool uses AI to detect AI-generated images and may not be 100% accurate. Results should be used as guidance only.
        </p>
      </div>
    </div>
  );
}