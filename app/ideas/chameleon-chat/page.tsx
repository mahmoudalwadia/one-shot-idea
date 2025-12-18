'use client';

import React from 'react';
import ChameleonChat from './components/ChameleonChat';
import styles from './styles.module.css';

export default function ChameleonChatPage() {
  return (
    <div className={`${styles.chameleonChatContainer} relative w-screen h-screen sm:h-screen overflow-hidden`} style={{ height: '100dvh' }}>
      <ChameleonChat />
    </div>
  );
}
