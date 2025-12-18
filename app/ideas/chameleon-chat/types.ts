export enum Theme {
  Windows98 = 'win98',
  WindowsXP = 'winxp',
  iOS = 'ios',
  Pixel = 'pixel',
  Cartoon = 'cartoon',
  Cyberpunk = 'cyberpunk',
  Brutalist = 'brutalist',
  Paper = 'paper',
  Matrix = 'matrix',
  Solarpunk = 'solarpunk',
  Neumorphism = 'neumorphism',
  Blueprint = 'blueprint',
  JapaneseMinimal = 'japanese-minimal',
  Vaporwave = 'vaporwave',
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  date: Date;
}

export const THEMES: { value: Theme; label: string }[] = [
  { value: Theme.Windows98, label: 'Windows 98' },
  { value: Theme.WindowsXP, label: 'Windows XP' },
  { value: Theme.iOS, label: 'iOS' },
  { value: Theme.Pixel, label: 'Pixel / Retro' },
  { value: Theme.Cartoon, label: 'Cartoon' },
  { value: Theme.Cyberpunk, label: 'Cyberpunk' },
  { value: Theme.Brutalist, label: 'Brutalist' },
  { value: Theme.Paper, label: 'Paper / Notebook' },
  { value: Theme.Matrix, label: 'Matrix' },
  { value: Theme.Solarpunk, label: 'Solarpunk' },
  { value: Theme.Neumorphism, label: 'Neumorphism' },
  { value: Theme.Blueprint, label: 'Blueprint' },
  { value: Theme.JapaneseMinimal, label: 'Japanese Minimal' },
  { value: Theme.Vaporwave, label: 'Vaporwave' },
];
