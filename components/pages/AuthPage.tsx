
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Page } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

interface AuthPageProps {
  setCurrentPage: (page: Page) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Use email as name for mock login
      login(email, email.split('@')[0] || 'User');
    } else {
      signup(email, name);
    }
    setCurrentPage('home');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-500 text-sm mt-1">
                {isLogin ? "Sign in to continue." : "Get started by creating an account."}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600 hover:underline">
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
