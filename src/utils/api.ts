import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { RSSFeed, NewsItem } from '../types';
import { useSettingsStore } from '../store/settings';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RSS_FEEDS = [
    'https://www.forexlive.com/feed/news/',
    'https://www.forexlive.com/feed/centralbank/'
];

// Function to fetch and log the RSS feeds
async function fetchRSSFeeds() {
    for (const url of RSS_FEEDS) {
        try {
            const response = await fetch(CORS_PROXY + encodeURIComponent(url));
            if (response.ok) {
                const data = await response.text();
                console.log(`


export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`);
    const parser = new XMLParser({ ignoreAttributes: false });
    const feed: RSSFeed = parser.parse(response.data);
    return feed.rss.channel.item;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const analyzeNews = async (newsItem: NewsItem) => {
  const settings = useSettingsStore.getState();
  const openai = new OpenAI({ apiKey: settings.apiKey });
  
  try {
    const response = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        { role: 'system', content: settings.context },
        { role: 'user', content: `${settings.prompt}\n\nArticle:\n${newsItem.title}\n${newsItem.description}` }
      ],
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing news:', error);
    throw error;
  }
};
