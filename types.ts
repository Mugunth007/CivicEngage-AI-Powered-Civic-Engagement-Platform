
export type Page = 'home' | 'chatbot' | 'tracker' | 'polling' | 'dashboard' | 'auth';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  spent: number;
  status: 'planning' | 'ongoing' | 'completed' | 'on-hold';
  transactionHash: string;
}

export interface PollOption {
  id: number;
  text: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  endDate: string;
}

export interface Vote {
  pollId: string;
  optionId: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export enum FeedbackCategory {
  INFRASTRUCTURE = 'Infrastructure',
  PUBLIC_SAFETY = 'Public Safety',
  PARKS_RECREATION = 'Parks & Recreation',
  TRANSPORTATION = 'Transportation',
  SUGGESTION = 'Suggestion',
  OTHER = 'Other',
}
