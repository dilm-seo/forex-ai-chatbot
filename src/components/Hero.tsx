import React from 'react';
import { TrendingUp, Globe, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Analyse Forex en Temps Réel
          </h1>
          <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto">
            Restez informé des dernières actualités du marché des changes avec notre assistant IA intelligent
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
              <h3 className="text-xl font-semibold">Analyse en Direct</h3>
            </div>
            <p className="text-indigo-100">
              Suivez l'évolution des marchés avec des analyses instantanées et pertinentes
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Globe className="w-8 h-8 text-indigo-400" />
              <h3 className="text-xl font-semibold">Couverture Mondiale</h3>
            </div>
            <p className="text-indigo-100">
              Accédez aux actualités des marchés financiers du monde entier
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-8 h-8 text-indigo-400" />
              <h3 className="text-xl font-semibold">Assistant IA</h3>
            </div>
            <p className="text-indigo-100">
              Bénéficiez des conseils personnalisés de notre assistant alimenté par GPT-4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}