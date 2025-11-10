import React from 'react';
import { Page } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

// FIX: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; buttonText: string; onClick: () => void; }> = ({ icon, title, description, buttonText, onClick }) => (
    <Card className="flex flex-col text-center items-center">
        <div className="mb-4 text-blue-600">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 flex-grow">{description}</p>
        <Button onClick={onClick}>{buttonText}</Button>
    </Card>
);

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Shape Your Community's Future
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Your voice matters. Use our platform to share feedback, track public initiatives, and vote on community polls. Let's build a better city, together.
        </p>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
            title="AI-Powered Feedback"
            description="Report issues or share ideas through our intelligent chatbot. It's fast, easy, and ensures your voice is heard."
            buttonText="Give Feedback"
            onClick={() => setCurrentPage('chatbot')}
        />
        <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>}
            title="Transparent Tracking"
            description="Monitor the progress and budget of public projects. See exactly where public funds are going, all on a secure ledger."
            buttonText="Track Projects"
            onClick={() => setCurrentPage('tracker')}
        />
        <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Community Polling"
            description="Participate in local decision-making. Cast your vote on important community topics and see real-time results."
            buttonText="View Polls"
            onClick={() => setCurrentPage('polling')}
        />
      </div>
    </div>
  );
};

export default HomePage;