import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 blur-sm opacity-50" />
        <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
      </div>
      <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
        ForexAI
      </span>
    </div>
  );
}