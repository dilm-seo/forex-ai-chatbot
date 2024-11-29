import React from "react";
import { TrendingUp, Globe, Zap } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight animate-fade-in">
            Analyse Forex en Temps Réel
          </h1>
          <p className="text-xl text-indigo-200 mb-12 max-w-3xl mx-auto animate-fade-in delay-200">
            Restez informé des dernières actualités du marché des changes avec
            notre assistant IA intelligent
          </p>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300">
            Découvrir Plus
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 animate-fade-in delay-400">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
              <h3 className="text-xl font-semibold">Analyse en Direct</h3>
            </div>
            <p className="text-indigo-200">
              Suivez l'évolution des marchés avec des analyses instantanées et
              pertinentes.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Globe className="w-8 h-8 text-indigo-400" />
              <h3 className="text-xl font-semibold">Couverture Mondiale</h3>
            </div>
            <p className="text-indigo-200">
              Accédez aux actualités des marchés financiers du monde entier.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-8 h-8 text-indigo-400" />
              <h3 className="text-xl font-semibold">Assistant IA</h3>
            </div>
            <p className="text-indigo-200">
              Bénéficiez des conseils personnalisés de notre assistant alimenté
              par GPT-4.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
