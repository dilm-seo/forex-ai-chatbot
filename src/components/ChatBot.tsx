import React, { useState } from 'react';
import { MessageCircle, Send, Loader2, X } from 'lucide-react';
import { getChatbotResponse } from '../services/chatbot';
import { useSettingsStore } from '../store/settings';
import { CostEstimate } from '../utils/openai';

const PRESET_QUESTIONS = [
  "Quel est le sentiment général du marché actuellement ?",
  "Fournis moi un signal (paire, sens, confiance)",
  "Identifiez les paires de devises les plus volatiles",
  "Quelles sont les meilleures opportunités de trading ?",
  "Analysez l'impact des dernières nouvelles sur EUR/USD",
  "Résumez les événements majeurs et leur impact",
  "Quelle est la tendance principale du marché ?",
  "Y a-t-il des niveaux techniques importants à surveiller ?"
];

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  costEstimate?: CostEstimate;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey } = useSettingsStore();

  const sendMessage = async (text: string) => {
    if (!apiKey) {
      setMessages(prev => [...prev, 
        { text, isUser: true, timestamp: new Date() },
        { text: "Veuillez configurer votre clé API OpenAI dans les paramètres.", isUser: false, timestamp: new Date() }
      ]);
      setInput('');
      return;
    }

    setMessages(prev => [...prev, { text, isUser: true, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(text);
      setMessages(prev => [...prev, { 
        text: response.content, 
        isUser: false, 
        timestamp: new Date(),
        costEstimate: response.costEstimate
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Désolé, une erreur est survenue. Veuillez réessayer.", 
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-white" />
              <h3 className="text-white font-semibold">Assistant Forex</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl p-3 max-w-[80%] ${
                  msg.isUser 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white' 
                    : 'bg-gray-100'
                }`}>
                  {msg.isUser ? (
                    <p className="text-sm">{msg.text}</p>
                  ) : (
                    <div>
                      <div className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text }} />
                      {msg.costEstimate && (
                        <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                          Coût estimé: {msg.costEstimate.totalCost.toFixed(4)}€
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mb-4 max-h-24 overflow-y-auto">
              {PRESET_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  disabled={isLoading}
                  className="text-xs bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 px-3 py-1.5 rounded-full hover:from-indigo-100 hover:to-violet-100 disabled:opacity-50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                disabled={isLoading}
                className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                onKeyPress={(e) => e.key === 'Enter' && input && sendMessage(input)}
              />
              <button
                onClick={() => input && sendMessage(input)}
                disabled={isLoading || !input}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2 rounded-xl hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 rounded-full shadow-lg hover:from-indigo-700 hover:to-violet-700 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
