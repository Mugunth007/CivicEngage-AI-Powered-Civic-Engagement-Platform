import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ChatMessage, Vote, FeedbackCategory } from '../../types';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';

// As Recharts is loaded via CDN, we access it from the window object
// to prevent a ReferenceError if the script hasn't loaded yet.
declare global {
  interface Window { Recharts: any; }
}

interface FeedbackData {
  name: string;
  value: number;
}

const DashboardPage: React.FC = () => {
  const [chatHistory] = useLocalStorage<ChatMessage[]>('chatHistory', []);
  const [pollVotes] = useLocalStorage<Vote[]>('pollVotes', []);
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might use another Gemini call to categorize feedback.
    // Here, we simulate categorization based on keywords.
    const categorizeFeedback = () => {
      const categories: { [key in FeedbackCategory]: number } = {
        [FeedbackCategory.INFRASTRUCTURE]: 0,
        [FeedbackCategory.PUBLIC_SAFETY]: 0,
        [FeedbackCategory.PARKS_RECREATION]: 0,
        [FeedbackCategory.TRANSPORTATION]: 0,
        [FeedbackCategory.SUGGESTION]: 0,
        [FeedbackCategory.OTHER]: 0,
      };

      chatHistory
        .filter(msg => msg.role === 'user')
        .forEach(msg => {
          const text = msg.text.toLowerCase();
          if (text.includes('road') || text.includes('pothole') || text.includes('bridge')) {
            categories[FeedbackCategory.INFRASTRUCTURE]++;
          } else if (text.includes('police') || text.includes('safety') || text.includes('crime')) {
            categories[FeedbackCategory.PUBLIC_SAFETY]++;
          } else if (text.includes('park') || text.includes('playground')) {
            categories[FeedbackCategory.PARKS_RECREATION]++;
          } else if (text.includes('bus') || text.includes('traffic') || text.includes('bike lane')) {
            categories[FeedbackCategory.TRANSPORTATION]++;
          } else if (text.includes('idea') || text.includes('suggest')) {
            categories[FeedbackCategory.SUGGESTION]++;
          } else {
            categories[FeedbackCategory.OTHER]++;
          }
        });

      const data = Object.entries(categories).map(([name, value]) => ({ name, value }));
      setFeedbackData(data);
      setLoading(false);
    };

    categorizeFeedback();
  }, [chatHistory]);
  
  // Guard against Recharts not being loaded yet.
  if (typeof window.Recharts === 'undefined') {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Impact Dashboard</h1>
                <p className="mt-2 text-slate-600">Analytics based on community feedback and polling data.</p>
            </div>
            <Card>
                <div className="flex flex-col items-center justify-center p-8">
                    <Spinner />
                    <p className="mt-4 text-slate-500">Loading chart library...</p>
                </div>
            </Card>
        </div>
    );
  }

  // Now it's safe to destructure from window.Recharts
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

  if(loading){
      return <Spinner/>
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Impact Dashboard</h1>
        <p className="mt-2 text-slate-600">Analytics based on community feedback and polling data.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Citizen Feedback by Category</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={feedbackData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}}/>
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">Total Engagement</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-slate-100 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600">{chatHistory.filter(m => m.role === 'user').length}</div>
                    <div className="text-sm text-slate-600">Feedback Reports</div>
                </div>
                <div className="p-4 bg-slate-100 rounded-lg">
                    <div className="text-4xl font-bold text-green-600">{pollVotes.length}</div>
                    <div className="text-sm text-slate-600">Polls Voted</div>
                </div>
            </div>
            <p className="text-xs text-center mt-4 text-slate-500">All data is stored locally on your device for privacy.</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
