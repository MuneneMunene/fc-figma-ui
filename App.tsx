import React, { useState } from 'react';
import { WelcomeFlow } from './components/WelcomeFlow';
import { MainApp } from './components/MainApp';

interface User {
  id: string;
  name: string;
  phone: string;
  profileImage?: string;
  prayerStreak: number;
  totalPrayers: number;
  department?: string;
}

export interface SermonNote {
  id: string;
  title: string;
  preview: string;
  content: string;
  date: string;
  author: string;
  sermonTitle: string;
}

export interface SavedNote {
  id: string;
  title: string;
  preview: string;
  content: string;
  date: string;
  type: 'sermon' | 'personal';
  sermonTitle?: string;
  author?: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([
    {
      id: '1',
      title: 'Walking in Faith - Sermon Notes',
      preview: 'Key points: Faith without works is dead, Trust in God\'s timing...',
      content: 'Faith without works is dead. Trust in God\'s timing. We must step out in faith even when we cannot see the full picture.',
      date: 'January 21, 2025',
      type: 'personal',
      sermonTitle: 'Walking in Faith'
    },
    {
      id: '2',
      title: 'Prayer Meeting Notes',
      preview: 'Prayer requests for the community, Thanksgiving for answered prayers...',
      content: 'Prayer requests for the community healing, thanksgiving for answered prayers regarding Sarah\'s mother\'s surgery.',
      date: 'January 18, 2025',
      type: 'personal'
    },
    {
      id: '3',
      title: 'Bible Study - Romans 8',
      preview: 'No condemnation for those in Christ Jesus, Living by the Spirit...',
      content: 'No condemnation for those in Christ Jesus. Living by the Spirit vs living by the flesh. The Spirit intercedes for us.',
      date: 'January 15, 2025',
      type: 'personal'
    }
  ]);

  const handleLogin = (userData: Omit<User, 'id' | 'prayerStreak' | 'totalPrayers'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      prayerStreak: 7,
      totalPrayers: 42,
    };
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleSaveNote = (note: Omit<SavedNote, 'id'>) => {
    const newNote: SavedNote = {
      ...note,
      id: Date.now().toString(),
    };
    setSavedNotes(prev => [newNote, ...prev]);
  };

  if (!isAuthenticated) {
    return <WelcomeFlow onLogin={handleLogin} />;
  }

  return (
    <MainApp 
      user={user!} 
      onLogout={handleLogout}
      savedNotes={savedNotes}
      onSaveNote={handleSaveNote}
    />
  );
}