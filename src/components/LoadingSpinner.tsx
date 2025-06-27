import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin">
          <Brain className="text-white" size={32} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-semibold mb-2 flex items-center justify-center">
          <Sparkles className="mr-2" size={16} />
          Analyzing Image...
        </h3>
        <p className="text-white/70 text-sm">
          AI is examining your image for authenticity
        </p>
      </div>
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}