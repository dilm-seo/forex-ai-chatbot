import OpenAI from 'openai';
import { useSettingsStore } from '../store/settings';
import { NewsItem } from '../types/news';
import { estimateCost, CostEstimate } from '../utils/openai';

let newsContext: NewsItem[] = [];

export const updateNewsContext = (news: NewsItem[]) => {
  newsContext = news;
};

const formatNewsForContext = (news: NewsItem[]) => {
  return news
    .slice(0, 5)
    .map((item, index) => `
Article ${index + 1}:
Titre: ${item.title}
Date: ${item.pubDate}
Description: ${item.description}
    `.trim())
    .join('\n\n');
};

const formatResponse = (content: string): string => {
  const sections = content.split('\n').filter(line => line.trim());
  
  return `
<div class="space-y-2">
  ${sections.map(section => {
    if (section.startsWith('-') || section.startsWith('•')) {
      return `<p class="flex gap-2"><span class="text-indigo-500">•</span>${section.substring(1).trim()}</p>`;
    }
    if (section.includes(':')) {
      const [title, value] = section.split(':');
      return `<p><strong class="text-indigo-700">${title}:</strong> ${value.trim()}</p>`;
    }
    return `<p>${section}</p>`;
  }).join('')}
</div>`;
};

interface ChatResponse {
  content: string;
  costEstimate: CostEstimate;
}

export const getChatbotResponse = async (message: string): Promise<ChatResponse> => {
  const settings = useSettingsStore.getState();
  
  if (!settings.apiKey) {
    throw new Error('Clé API OpenAI non configurée');
  }

  const openai = new OpenAI({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true
  });

  const messages = [
    {
      role: 'system',
      content: `${settings.context}\n\nVous avez accès aux dernières nouvelles du marché forex. Fournissez des réponses courtes et précises.`
    },
    {
      role: 'user',
      content: `${message}\n\nBasé sur ces nouvelles:\n${formatNewsForContext(newsContext)}`
    }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: settings.model,
      messages,
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content || 'Désolé, je n\'ai pas pu analyser cette demande.';
    const formattedContent = formatResponse(content);
    
    const costEstimate = estimateCost(
      settings.model,
      messages,
      content.length
    );

    return {
      content: formattedContent,
      costEstimate
    };
  } catch (error) {
    console.error('Erreur lors de la communication avec OpenAI:', error);
    throw new Error('Erreur lors de l\'analyse. Veuillez réessayer.');
  }
};