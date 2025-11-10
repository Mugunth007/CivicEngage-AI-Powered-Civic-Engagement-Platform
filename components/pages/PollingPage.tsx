
import React, { useState, useEffect } from 'react';
import { getPolls } from '../../services/blockchainService';
import { Poll, Vote } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const PollingPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useLocalStorage<Vote[]>('pollVotes', []);

  useEffect(() => {
    const fetchPolls = async () => {
      setIsLoading(true);
      const data = await getPolls();
      setPolls(data);
      setIsLoading(false);
    };
    fetchPolls();
  }, []);

  const handleVote = (pollId: string, optionId: number) => {
    if (votes.some(v => v.pollId === pollId)) return; // Already voted
    setVotes([...votes, { pollId, optionId }]);
  };

  const getVoteForPoll = (pollId: string): Vote | undefined => {
    return votes.find(v => v.pollId === pollId);
  };
  
  // For demonstration, mock results after voting
  const mockResults: {[key: string]: number[]} = {
    'poll-01': [120, 180, 95],
    'poll-02': [250, 150, 50],
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Community Polling</h1>
        <p className="mt-2 text-slate-600">Make your voice heard by voting on important local issues.</p>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          {polls.map(poll => {
            const userVote = getVoteForPoll(poll.id);
            const pollResults = mockResults[poll.id] || poll.options.map(() => Math.floor(Math.random() * 100));
            const totalVotes = pollResults.reduce((sum, count) => sum + count, 0);

            return (
              <Card key={poll.id}>
                <h3 className="text-lg font-semibold text-slate-800">{poll.question}</h3>
                <p className="text-sm text-slate-500 mb-4">Ends: {new Date(poll.endDate).toLocaleDateString()}</p>
                
                <div className="space-y-3">
                  {poll.options.map((option, index) => {
                    if (userVote) {
                        const voteCount = pollResults[index];
                        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                      return (
                        <div key={option.id} className="w-full">
                            <div className="flex justify-between mb-1 text-sm font-medium text-slate-700">
                                <span>{option.text}</span>
                                <span>{percentage.toFixed(1)}% ({voteCount})</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-4">
                                <div 
                                    className={`h-4 rounded-full transition-all duration-500 ${userVote.optionId === option.id ? 'bg-blue-600' : 'bg-slate-400'}`}
                                    style={{ width: `${percentage}%`}}
                                ></div>
                            </div>
                        </div>
                      )
                    }
                    return (
                        <button
                          key={option.id}
                          onClick={() => handleVote(poll.id, option.id)}
                          className="w-full text-left p-3 border border-slate-300 rounded-lg hover:bg-slate-100 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                          {option.text}
                        </button>
                    )
                  })}
                </div>
                {userVote && <p className="text-center mt-4 text-sm text-blue-700 font-semibold">Thank you for voting!</p>}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PollingPage;
