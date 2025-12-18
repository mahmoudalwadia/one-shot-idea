import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Theme, Message, ChatSession, THEMES } from '../types';

// Mock Initial History
const MOCK_HISTORY: ChatSession[] = [
  { id: '1', title: 'Quantum Physics Explained', date: new Date() },
  { id: '2', title: 'React Component Patterns', date: new Date(Date.now() - 86400000) },
  { id: '3', title: 'Dinner Recipes', date: new Date(Date.now() - 172800000) },
];

const ChameleonChat: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.iOS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState<ChatSession[]>(MOCK_HISTORY);
  const [currentChatId, setCurrentChatId] = useState<string | null>('new');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hello! I am Chameleon Chat. Select a theme or start typing.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChatId]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    // Calculate delay outside of render
    // eslint-disable-next-line react-hooks/purity
    const randomDelay = Math.random() * 500;
    const delay = 600 + randomDelay;

    // If it's a "new" chat, actually create a history entry
    if (currentChatId === 'new') {
      const newId = now.toString();
      const newSession: ChatSession = {
        id: newId,
        title: inputValue.slice(0, 30) + (inputValue.length > 30 ? '...' : ''),
        date: new Date(now),
      };
      setHistory(prev => [newSession, ...prev]);
      setCurrentChatId(newId);
    }

    const userMsg: Message = {
      id: now.toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(now),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Fake bot reply
    setTimeout(() => {
      const botMsg: Message = {
        id: (now + 1).toString(),
        text: getBotResponse(userMsg.text, theme),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  const getBotResponse = (input: string, currentTheme: Theme): string => {
    const responses = [
      `Processing request in ${currentTheme} mode...`,
      `That's a fascinating perspective. Can you elaborate?`,
      `I've updated my internal parameters to match the ${currentTheme} aesthetic.`,
      `Analyzing: "${input}". Output follows.`,
      `System operating within normal parameters.`,
      `Interesting! Tell me more about that.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      text: 'New conversation started. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }]);
    setCurrentChatId('new');
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const loadChat = (id: string) => {
    // In a real app, we'd fetch messages. Here we just mock a change.
    setCurrentChatId(id);
    setMessages([
      {
        id: 'hist-1',
        text: `Restored session history for chat ${id}...`,
        sender: 'bot',
        timestamp: new Date(),
      },
      {
        id: 'hist-2',
        text: 'This is a simulated history of your previous conversation.',
        sender: 'user',
        timestamp: new Date(),
      }
    ]);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // SVG Icons
  const IconMenu = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
  const IconPlus = () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
  const IconSend = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
  const IconRobot = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

  return (
    <div className="app-shell" data-theme={theme}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop active"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={startNewChat}>
            <IconPlus />
            New Chat
          </button>
        </div>

        <div className="sidebar-list">
          <div className="sidebar-group-title">Today</div>
          {history.filter(h => new Date().getTime() - h.date.getTime() < 86400000).map(s => (
            <div
              key={s.id}
              className={`history-item ${currentChatId === s.id ? 'active' : ''}`}
              onClick={() => loadChat(s.id)}
            >
              {s.title}
            </div>
          ))}

          <div className="sidebar-group-title" style={{marginTop: 20}}>Previous 7 Days</div>
          {history.filter(h => new Date().getTime() - h.date.getTime() >= 86400000).map(s => (
            <div
              key={s.id}
              className={`history-item ${currentChatId === s.id ? 'active' : ''}`}
              onClick={() => loadChat(s.id)}
            >
              {s.title}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">U</div>
          <div>User Settings</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" onClick={() => window.innerWidth < 768 && sidebarOpen && setSidebarOpen(false)}>
        <header className="chat-header">
          <div className="header-left">
            <button
              className="mobile-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              aria-label="Toggle sidebar"
            >
              <IconMenu />
            </button>
            <div className="chat-title">
              {THEMES.find((t) => t.value === theme)?.label}
              <span className="model-badge" style={{marginLeft: 10}}>LLM-v3</span>
            </div>
          </div>

          <div className="theme-selector">
            <Link
              href="/"
              className="exit-btn"
              title="Exit to Home"
            >
              <ArrowLeft size={14} />
              <span>EXIT</span>
            </Link>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              aria-label="Select Theme"
            >
              {THEMES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="message-avatar">
                  <IconRobot />
                </div>
              )}
              <div className="message-bubble">
                {msg.text}
                <span className="message-timestamp">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="input-area-wrapper" onSubmit={handleSendMessage}>
          <div className="input-container">
            <input
              className="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message Chameleon..."
              autoFocus
            />
            <button type="submit" className="send-btn">
              <IconSend />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ChameleonChat;
