
import { Project, Poll } from '../types';

const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Downtown Park Renovation',
    description: 'Complete overhaul of the central park, including new playgrounds and landscaping.',
    budget: 500000,
    spent: 250000,
    status: 'ongoing',
    transactionHash: '0xabcde123...',
  },
  {
    id: 'proj-002',
    name: 'Public Library Tech Upgrade',
    description: 'New computers and high-speed internet for all public library branches.',
    budget: 150000,
    spent: 150000,
    status: 'completed',
    transactionHash: '0xfghij456...',
  },
  {
    id: 'proj-003',
    name: 'City Bike Lane Expansion',
    description: 'Adding 20 miles of protected bike lanes to major city roads.',
    budget: 1200000,
    spent: 300000,
    status: 'ongoing',
    transactionHash: '0xklmno789...',
  },
  {
    id: 'proj-004',
    name: 'Community Art Mural Program',
    description: 'Funding for local artists to create murals in public spaces.',
    budget: 75000,
    spent: 10000,
    status: 'planning',
    transactionHash: '0xpqrst101...',
  }
];

const mockPolls: Poll[] = [
    {
        id: 'poll-01',
        question: 'What should be the priority for the next city budget?',
        options: [
            { id: 1, text: 'Infrastructure & Roads' },
            { id: 2, text: 'Public Parks & Green Spaces' },
            { id: 3, text: 'Public Safety Services' },
        ],
        endDate: '2024-12-31'
    },
    {
        id: 'poll-02',
        question: 'Should the city invest in a new public transit line?',
        options: [
            { id: 1, text: 'Yes, expand the light rail' },
            { id: 2, text: 'Yes, but focus on bus routes' },
            { id: 3, text: 'No, focus on road maintenance' },
        ],
        endDate: '2024-11-30'
    }
];

// Simulate an async API call
export const getProjects = (): Promise<Project[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 800);
  });
};

export const getPolls = (): Promise<Poll[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockPolls);
      }, 500);
    });
  };
