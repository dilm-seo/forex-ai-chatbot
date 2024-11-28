import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { NewsItem } from '../types/news';
import { MessageSquare, ExternalLink, Clock, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import he from 'he';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const formattedDate = format(new Date(news.pubDate), "d MMMM yyyy 'à' HH:mm", { locale: fr });
  const decodedDescription = he.decode(news.description.replace(/<[^>]*>/g, ''));

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.toLowerCase().includes('positif')) return 'text-green-600';
    if (sentiment.toLowerCase().includes('négatif')) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment.toLowerCase().includes('positif')) return <TrendingUp className="w-4 h-4" />;
    if (sentiment.toLowerCase().includes('négatif')) return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-xl font-semibold text-gray-900 flex-1">{he.decode(news.title)}</h2>
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Clock className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 mb-4 line-clamp-3">{decodedDescription}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100"
          >
            <MessageSquare className="w-4 h-4" />
            {showAnalysis ? "Masquer l'analyse" : "Voir l'analyse"}
          </button>
        </div>

        {showAnalysis && news.analysis && (
          <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 mb-4">
              {news.analysis.sentiment && getSentimentIcon(news.analysis.sentiment)}
              <h3 className="font-semibold text-indigo-900">Analyse</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm font-medium text-indigo-800 mb-2">Devises concernées</p>
                <div className="flex flex-wrap gap-2">
                  {news.analysis.currencies.map((currency, i) => (
                    <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">
                      {currency}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm font-medium text-indigo-800 mb-2">Paires</p>
                <div className="flex flex-wrap gap-2">
                  {news.analysis.pairs.map((pair, i) => (
                    <span key={i} className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-sm">
                      {pair}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm font-medium text-indigo-800 mb-1">Sentiment</p>
                <p className={`text-sm ${getSentimentColor(news.analysis.sentiment)}`}>
                  {news.analysis.sentiment}
                </p>
              </div>

              <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm font-medium text-indigo-800 mb-1">Volatilité</p>
                <p className="text-sm text-gray-700">{news.analysis.volatility}</p>
              </div>

              <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm font-medium text-indigo-800 mb-1">Meilleur moment</p>
                <p className="text-sm text-gray-700">{news.analysis.tradingTime}</p>
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-3 shadow-sm">
              <p className="text-sm font-medium text-indigo-800 mb-2">Opportunité</p>
              <p className="text-sm text-gray-700">{news.analysis.opportunity}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-indigo-100">
              <p className="text-sm font-medium text-indigo-800 mb-2">Raisonnement</p>
              <p className="text-sm text-gray-700">{news.analysis.reasoning}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}