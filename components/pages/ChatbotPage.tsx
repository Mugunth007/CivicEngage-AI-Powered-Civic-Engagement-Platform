
import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chatHistory', []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      text: input,
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const modelResponse = await getChatbotResponse(newMessages);
      const modelMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'model',
        text: modelResponse,
      };
      setMessages([...newMessages, modelMessage]);
    } catch (error) {
        const errorMessage: ChatMessage = {
            id: `msg_${Date.now() + 1}`,
            role: 'model',
            text: 'Sorry, I encountered an error. Please try again.',
        };
        setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Citizen Feedback Chatbot</h1>
            <p className="mt-2 text-slate-600">Have a suggestion, complaint, or idea? Let our AI assistant help you.</p>
        </div>
        <Card className="flex flex-col h-[60vh]">
            <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4">
            {messages.map((msg, index) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                    className={`max-w-sm px-4 py-2 rounded-2xl ${
                    msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-lg'
                        : 'bg-slate-100 text-slate-800 rounded-bl-lg'
                    }`}
                >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-800">
                        <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
            </div>
            <div className="mt-6 flex items-center space-x-2 border-t border-slate-200 pt-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-grow w-full px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
            />
            <Button onClick={handleSend} isLoading={isLoading} className="rounded-full !p-2 h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </Button>
            </div>
        </Card>
    </div>
  );
};

export default ChatbotPage;
