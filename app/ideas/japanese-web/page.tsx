'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const getRandomVisitorCount = () => Math.floor(Math.random() * 9999) + 10000;

export default function JapaneseWebDesign() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Set initial values only on client
    const initTime = new Date();
    const initVisitorCount = getRandomVisitorCount();
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => {
      setCurrentTime(initTime);
      setVisitorCount(initVisitorCount);
    }, 0);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setVisitorCount(getRandomVisitorCount());
    }, 1000);

    // Simple one-time fix for scrolling - no polling or observers
    const html = document.documentElement;
    const body = document.body;

    // Remove any theme classes that might prevent scrolling
    body.classList.remove('theme-green', 'theme-amber', 'theme-cyan', 'theme-rose', 'theme-purple', 'theme-slate');

    // Force enable scrolling with minimal style changes
    html.style.setProperty('overflow-y', 'scroll', 'important');
    html.style.setProperty('overflow-x', 'hidden', 'important');
    html.style.setProperty('height', 'auto', 'important');

    body.style.setProperty('overflow', 'visible', 'important');
    body.style.setProperty('overflow-y', 'auto', 'important');
    body.style.setProperty('overflow-x', 'hidden', 'important');
    body.style.setProperty('height', 'auto', 'important');
    body.style.setProperty('min-height', '100vh', 'important');
    body.style.setProperty('position', 'relative', 'important');
    body.style.setProperty('touch-action', 'pan-y', 'important');
    body.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '--/--/--';
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const slugify = (text: string) => {
    const slug = text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return slug || 'section';
  };

  return (
    <div
      id="japanese-web-page"
      className="font-['M_PLUS_Rounded_1c','Noto_Sans_JP',sans-serif] bg-[#f5f5f5] text-[#222] w-full"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflowY: 'visible',
        height: 'auto'
      }}
    >
      {/* Global Animations and CRITICAL Scrolling Fix */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes heroPattern {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* CRITICAL: Force enable scrolling - override ALL theme styles */
        html {
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          height: auto !important;
          min-height: 100% !important;
          max-height: none !important;
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-y !important;
        }

        body {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
          min-height: 100vh !important;
          max-height: none !important;
          position: relative !important;
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-y !important;
        }

        /* Override terminal themes specifically - highest specificity */
        /* CRITICAL: Must override 'overflow' shorthand, not just overflow-y */
        body.theme-green,
        body.theme-amber,
        body.theme-cyan,
        body.theme-rose,
        body.theme-purple,
        body.theme-slate {
          overflow: visible !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
          min-height: 100vh !important;
          max-height: none !important;
        }

        /* Target by page ID for extra specificity */
        body:has(#japanese-web-page) {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
          min-height: 100vh !important;
        }

        /* Override any Next.js wrapper constraints */
        #__next,
        [data-nextjs-scroll-focus-boundary],
        main,
        [role="main"] {
          overflow-y: visible !important;
          height: auto !important;
          min-height: auto !important;
          max-height: none !important;
        }

        /* Ensure all parent containers allow scrolling */
        html > body > * {
          overflow-y: visible !important;
          height: auto !important;
        }
      `}} />

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-2 left-2 sm:top-5 sm:left-5 flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-white border-2 sm:border-[3px] border-[#0066cc] rounded-2xl sm:rounded-3xl text-[#0066cc] no-underline font-black text-xs sm:text-sm shadow-[0_4px_12px_rgba(0,102,204,0.3)] transition-all hover:bg-[#0066cc] hover:text-white hover:-translate-x-1 hover:shadow-[0_6px_16px_rgba(0,102,204,0.4)] active:scale-95 z-2000 touch-manipulation"
      >
        <span className="text-base sm:text-lg font-black">←</span>
        <span className="tracking-wider hidden sm:inline">戻る</span>
      </Link>

      {/* Top Banner with Marquee */}
      <div className="bg-linear-to-br from-[#e60012] to-[#ff6600] text-white py-2 overflow-hidden border-b-[3px] border-[#ffcc00] relative before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)] before:pointer-events-none">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] font-bold text-sm tracking-wide">
          <span className="pr-[100px]">🌸 Welcome to Our Website! 新しい商品が入荷しました！ Special Campaign Running Now! お得な情報満載 🌸 </span>
          <span className="pr-[100px]">🌸 Welcome to Our Website! 新しい商品が入荷しました！ Special Campaign Running Now! お得な情報満載 🌸 </span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b-2 sm:border-b-4 border-[#0066cc] shadow-[0_4px_12px_rgba(0,0,0,0.1)] sticky top-0 z-1000" style={{ touchAction: 'none' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-[30px] py-3 sm:py-5 border-b-2 border-dashed border-[#ccc] bg-linear-to-b from-white to-[#f9f9f9] gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-[15px] relative">
            <div className="bg-[#e60012] text-white px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black rounded animate-[pulse_2s_ease-in-out_infinite] shadow-[0_2px_8px_rgba(230,0,18,0.4)]">
              NEW
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="font-['Zen_Maru_Gothic',sans-serif] text-xl sm:text-[32px] font-black bg-linear-to-br from-[#0066cc] to-[#9966ff] bg-clip-text text-transparent tracking-[1px] sm:tracking-[2px]">
                デジタル東京
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold text-[#666] tracking-[1px] sm:tracking-[2px] uppercase">
                Digital Tokyo
              </span>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-[15px] w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="bg-linear-to-br from-[#e6f2ff] to-white border-2 border-[#0066cc] rounded-lg px-2 py-1.5 sm:px-4 sm:py-2.5 text-center min-w-[90px] sm:min-w-[120px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] shrink-0">
              <div className="text-[9px] sm:text-[10px] font-bold text-[#666] mb-0.5 sm:mb-1 tracking-wider">現在時刻</div>
              <div className="text-xs sm:text-base font-black font-['M_PLUS_Rounded_1c',sans-serif]">{formatTime(currentTime)}</div>
            </div>
            <div className="bg-linear-to-br from-[#e6fff2] to-white border-2 border-[#00cc66] rounded-lg px-2 py-1.5 sm:px-4 sm:py-2.5 text-center min-w-[90px] sm:min-w-[120px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] shrink-0">
              <div className="text-[9px] sm:text-[10px] font-bold text-[#666] mb-0.5 sm:mb-1 tracking-wider">今日の日付</div>
              <div className="text-xs sm:text-base font-black font-['M_PLUS_Rounded_1c',sans-serif]">{formatDate(currentTime)}</div>
            </div>
            <div className="bg-linear-to-br from-[#fff5e6] to-white border-2 border-[#ff6600] rounded-lg px-2 py-1.5 sm:px-4 sm:py-2.5 text-center min-w-[90px] sm:min-w-[120px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] shrink-0">
              <div className="text-[9px] sm:text-[10px] font-bold text-[#666] mb-0.5 sm:mb-1 tracking-wider">訪問者数</div>
              <div className="text-xs sm:text-base font-black text-[#e60012] font-['M_PLUS_Rounded_1c',sans-serif] tabular-nums">{visitorCount !== null ? visitorCount.toLocaleString() : '----'}</div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex bg-[#0066cc] p-0 gap-[1px] sm:gap-[2px] overflow-x-auto">
          {[
            { id: 'home', icon: '🏠', text: 'ホーム' },
            { id: 'products', icon: '📦', text: '商品一覧' },
            { id: 'news', icon: '📰', text: 'お知らせ' },
            { id: 'about', icon: '💼', text: '会社概要' },
            { id: 'contact', icon: '📧', text: 'お問い合わせ' },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              className={`flex-1 sm:flex-1 flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-5 py-2 sm:py-3 border-none cursor-pointer font-['Noto_Sans_JP',sans-serif] font-bold text-xs sm:text-sm transition-all relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-white/10 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100 hover:bg-[#0055aa] hover:-translate-y-0.5 active:scale-95 touch-manipulation min-w-[70px] sm:min-w-0 shrink-0 ${
                activeTab === item.id
                  ? 'bg-[#ffcc00] text-[#222] before:opacity-100'
                  : 'bg-[#0066cc] text-white'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="text-base sm:text-xl">{item.icon}</span>
              <span className="text-[10px] sm:text-xs tracking-wider">{item.text}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-[250px_1fr_300px] gap-4 sm:gap-5 p-3 sm:p-5 max-w-[1800px] mx-auto">
        {/* Left Sidebar */}
        <aside className="flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
          <div className="bg-white border-[3px] border-[#ccc] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <h3 className="font-['Zen_Maru_Gothic',sans-serif] text-base font-black mb-3 pb-2 border-b-2 border-[#0066cc] text-[#222]">カテゴリー</h3>
            <div className="flex flex-col gap-1.5">
              {['電子機器', 'ファッション', '食品', '書籍', 'スポーツ', '美容・健康', '家具', 'おもちゃ'].map((cat) => (
                <a
                  key={cat}
                  href={`#category-${encodeURIComponent(cat)}`}
                  className="px-3 py-2.5 bg-[#f5f5f5] border-2 border-transparent rounded text-[#222] no-underline font-bold text-[13px] transition-all relative overflow-hidden before:content-['▶'] before:absolute before:left-3 before:opacity-0 before:transition-all before:text-[#e60012] hover:bg-[#0066cc] hover:text-white hover:border-[#0066cc] hover:pl-7 hover:before:opacity-100 hover:before:left-2"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-br from-[#e60012] to-[#ff6600] border-[3px] border-[#ffcc00] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-[#ffcc00] before:rounded-t-lg text-white text-center">
            <div className="inline-block bg-[#ffcc00] text-[#222] px-5 py-1.5 text-lg font-black rounded-[20px] mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.3)] animate-[flash_1s_ease-in-out_infinite]">
              SALE
            </div>
            <h3 className="text-xl font-black mb-2">期間限定</h3>
            <p className="text-[28px] font-black mb-4 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">最大70%OFF</p>
            <button
              type="button"
              className="bg-white text-[#e60012] border-none px-6 py-3 text-sm font-black rounded-3xl cursor-pointer transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
            >
              今すぐチェック
            </button>
          </div>

          <div className="bg-white border-[3px] border-[#ccc] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <h3 className="font-['Zen_Maru_Gothic',sans-serif] text-base font-black mb-3 pb-2 border-b-2 border-[#0066cc] text-[#222]">ランキング</h3>
            <div className="flex flex-col gap-2">
              {[
                { rank: 1, text: '最新ガジェット', class: 'gold' },
                { rank: 2, text: 'トレンドファッション', class: 'silver' },
                { rank: 3, text: '健康サプリメント', class: 'bronze' },
                { rank: 4, text: '人気書籍', class: '' },
                { rank: 5, text: 'スマートホーム', class: '' },
              ].map((item) => (
                <div key={item.rank} className="flex items-center gap-2.5 p-2 bg-[#f5f5f5] rounded transition-all hover:bg-[#e6f2ff] hover:translate-x-1">
                  <span className={`flex items-center justify-center w-8 h-8 font-black text-xs rounded shrink-0 ${
                    item.class === 'gold' ? 'bg-linear-to-br from-[#ffd700] to-[#ffed4e] text-[#222] shadow-[0_2px_8px_rgba(255,215,0,0.5)]' :
                    item.class === 'silver' ? 'bg-linear-to-br from-[#c0c0c0] to-[#e8e8e8] text-[#222] shadow-[0_2px_8px_rgba(192,192,192,0.5)]' :
                    item.class === 'bronze' ? 'bg-linear-to-br from-[#cd7f32] to-[#e9a96a] text-white shadow-[0_2px_8px_rgba(205,127,50,0.5)]' :
                    'bg-[#666] text-white'
                  }`}>
                    {item.rank}位
                  </span>
                  <span className="text-[13px] font-bold text-[#222]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-br from-[#87ceeb] to-[#b0e0e6] border-[3px] border-[#0066cc] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <h3 className="font-['Zen_Maru_Gothic',sans-serif] text-base font-black mb-3 pb-2 border-b-2 border-[#0066cc] text-[#222]">東京の天気</h3>
            <div className="text-center">
              <div className="text-5xl mb-2">☀️</div>
              <div className="text-[32px] font-black text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]">25°C</div>
              <div className="text-sm font-bold text-white">晴れ</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">
          {/* Hero Banner */}
          <div className="bg-linear-to-br from-[#e60012] to-[#ff6600] text-white p-6 sm:p-12 rounded-xl text-center relative overflow-hidden shadow-[0_8px_24px_rgba(230,0,18,0.3)] before:content-[''] before:absolute before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%] before:bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_40px)] before:animate-[heroPattern_20s_linear_infinite]">
            <div className="absolute top-2 right-2 sm:top-5 sm:right-5 bg-[#ffcc00] text-[#222] px-3 py-1 sm:px-5 sm:py-2 text-xs sm:text-base font-black rounded-2xl sm:rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.3)] animate-[bounce_2s_ease-in-out_infinite] z-1">
              🔥 HOT
            </div>
            <h2 className="font-['Zen_Maru_Gothic',sans-serif] text-2xl sm:text-[42px] font-black mb-3 sm:mb-4 drop-shadow-[3px_3px_6px_rgba(0,0,0,0.3)] relative z-1">
              春の大セール開催中！
            </h2>
            <p className="text-lg sm:text-2xl font-bold mb-6 sm:mb-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] relative z-1">
              人気商品が最大50%OFF
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-1">
              <button
                type="button"
                className="px-6 py-3 sm:px-10 sm:py-4 text-sm sm:text-base font-black border-none rounded-lg cursor-pointer transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2)] bg-white text-[#e60012] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 touch-manipulation"
              >
                詳細を見る
              </button>
              <button
                type="button"
                className="px-6 py-3 sm:px-10 sm:py-4 text-sm sm:text-base font-black border-none rounded-lg cursor-pointer transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2)] bg-[#ffcc00] text-[#222] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 touch-manipulation"
              >
                カタログダウンロード
              </button>
            </div>
          </div>

          {/* News Section */}
          <section>
            <h2 className="font-['Zen_Maru_Gothic',sans-serif] text-xl sm:text-[28px] font-black p-3 px-4 sm:p-4 sm:px-6 bg-linear-to-br from-[#0066cc] to-[#9966ff] text-white rounded-lg flex items-center gap-2 sm:gap-3 shadow-[0_4px_12px_rgba(0,102,204,0.3)] relative overflow-hidden after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:w-[100px] after:bg-linear-to-r after:from-transparent after:to-white/10">
              <span className="text-2xl sm:text-[32px]">📢</span>
              最新ニュース
              <span className="ml-auto text-xs sm:text-sm font-bold tracking-[1px] sm:tracking-[2px] opacity-80 hidden sm:inline">NEWS</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 sm:gap-4 mt-3 sm:mt-4">
              {[
                { type: 'urgent', badge: '重要', date: '2025.11.30', title: '年末年始の営業時間について', excerpt: '誠に勝手ながら、年末年始の営業時間を変更させていただきます。' },
                { type: 'new', badge: 'NEW', date: '2025.11.28', title: '新商品のご案内', excerpt: '待望の新製品が入荷しました！限定数量となっております。' },
                { type: '', badge: 'お知らせ', date: '2025.11.25', title: '会員登録キャンペーン実施中', excerpt: '今なら新規会員登録で1000ポイントプレゼント！' },
              ].map((news) => (
                <div key={news.title} className={`bg-white border-[3px] border-[#ccc] rounded-lg p-5 transition-all relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 ${news.type === 'urgent' ? 'before:bg-[#e60012]' : news.type === 'new' ? 'before:bg-[#00cc66]' : 'before:bg-[#0066cc]'} hover:border-[#0066cc] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]`}>
                  <div className={`inline-block px-3 py-1 text-[11px] font-black rounded mb-2 text-white ${news.type === 'urgent' ? 'bg-[#e60012]' : news.type === 'new' ? 'bg-[#00cc66]' : 'bg-[#0066cc]'}`}>
                    {news.badge}
                  </div>
                  <div className="text-xs text-[#666] font-bold mb-2">{news.date}</div>
                  <h3 className="text-base font-black mb-2 text-[#222]">{news.title}</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">{news.excerpt}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Product Grid */}
          <section>
            <h2 className="font-['Zen_Maru_Gothic',sans-serif] text-xl sm:text-[28px] font-black p-3 px-4 sm:p-4 sm:px-6 bg-linear-to-br from-[#0066cc] to-[#9966ff] text-white rounded-lg flex items-center gap-2 sm:gap-3 shadow-[0_4px_12px_rgba(0,102,204,0.3)] relative overflow-hidden after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:w-[100px] after:bg-linear-to-r after:from-transparent after:to-white/10">
              <span className="text-2xl sm:text-[32px]">⭐</span>
              おすすめ商品
              <span className="ml-auto text-xs sm:text-sm font-bold tracking-[1px] sm:tracking-[2px] opacity-80 hidden sm:inline">RECOMMENDED</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-5 mt-3 sm:mt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border-[3px] border-[#ccc] rounded-xl overflow-hidden transition-all relative hover:border-[#0066cc] hover:-translate-y-2 hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-1">
                    {i === 1 && <span className="px-3.5 py-1.5 text-[11px] font-black rounded-2xl text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] bg-[#00cc66]">新着</span>}
                    {i === 2 && <span className="px-3.5 py-1.5 text-[11px] font-black rounded-2xl text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] bg-[#e60012] animate-[flash_1s_ease-in-out_infinite]">セール</span>}
                    {i === 3 && <span className="px-3.5 py-1.5 text-[11px] font-black rounded-2xl text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] bg-[#ff6600]">人気</span>}
                  </div>
                  <div className="relative pt-[100%] bg-[#f5f5f5] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#e6f2ff] to-[#f0f0f0]">
                      <span className="text-2xl font-black text-[#666]">商品{i}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-black mb-2 text-[#222] leading-snug">プレミアム商品 Type {i}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      {i === 2 && <span className="text-sm text-[#666] line-through">¥15,800</span>}
                      <span className="text-2xl font-black text-[#e60012] font-['M_PLUS_Rounded_1c',sans-serif]">¥{(9800 + i * 1000).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[#ffcc00] text-sm">★★★★☆</span>
                      <span className="text-xs text-[#666]">(128)</span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 bg-[#0066cc] text-white border-none rounded-md text-sm font-black cursor-pointer transition-all hover:bg-[#0055aa] hover:scale-[1.02]"
                    >
                      カートに入れる
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature Boxes */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 sm:gap-4">
            {[
              { icon: '🚚', title: '送料無料', text: '5,000円以上のご購入で全国送料無料' },
              { icon: '💳', title: '安心決済', text: '各種クレジットカード・電子マネー対応' },
              { icon: '📞', title: 'サポート充実', text: '平日10:00-18:00 お電話でのご相談承ります' },
              { icon: '🎁', title: 'ポイント制度', text: '購入金額の5%がポイント還元されます' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white border-[3px] border-[#ffcc00] rounded-xl p-6 text-center transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:border-[#0066cc]">
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-black mb-2 text-[#222]">{feature.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="flex flex-col gap-4 sm:gap-5 order-3">
          <div className="bg-linear-to-br from-[#e6f2ff] to-white border-[3px] border-[#0066cc] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <h3 className="font-['Zen_Maru_Gothic',sans-serif] text-base font-black mb-3 pb-2 border-b-2 border-[#0066cc] text-[#222]">会員ログイン</h3>
            <input type="text" placeholder="メールアドレス" className="w-full px-3 py-3 mb-2.5 border-2 border-[#ccc] rounded-md text-sm font-['M_PLUS_Rounded_1c','Noto_Sans_JP',sans-serif] transition-colors focus:outline-none focus:border-[#0066cc]" />
            <input type="password" placeholder="パスワード" className="w-full px-3 py-3 mb-2.5 border-2 border-[#ccc] rounded-md text-sm font-['M_PLUS_Rounded_1c','Noto_Sans_JP',sans-serif] transition-colors focus:outline-none focus:border-[#0066cc]" />
            <button
              type="button"
              className="w-full py-3 bg-[#0066cc] text-white border-none rounded-md text-sm font-black cursor-pointer transition-all mb-3 hover:bg-[#0055aa]"
            >
              ログイン
            </button>
            <div className="flex flex-col gap-1.5">
              <a
                href="/ideas/japanese-web/signup"
                className="text-xs text-[#0066cc] no-underline text-center hover:underline"
              >
                新規登録
              </a>
              <a
                href="/ideas/japanese-web/forgot-password"
                className="text-xs text-[#0066cc] no-underline text-center hover:underline"
              >
                パスワードを忘れた方
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-0 bg-white border-[3px] border-[#ccc] rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <div className="bg-linear-to-br from-[#e60012] to-[#ff6600] text-white p-8 px-4 rounded-lg text-center cursor-pointer transition-all relative overflow-hidden hover:scale-105 mt-3 mx-3">
              <div className="text-xl font-black mb-1">特別キャンペーン</div>
              <div className="text-sm font-bold">今だけ限定</div>
            </div>
            <div className="bg-linear-to-br from-[#00cc66] to-[#00ff88] text-white p-8 px-4 rounded-lg text-center cursor-pointer transition-all relative overflow-hidden hover:scale-105 mb-3 mx-3">
              <div className="text-xl font-black mb-1">会員登録</div>
              <div className="text-sm font-bold">特典満載</div>
            </div>
          </div>

          <div className="bg-white border-[3px] border-[#ccc] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <h3 className="font-['Zen_Maru_Gothic',sans-serif] text-base font-black mb-3 pb-2 border-b-2 border-[#0066cc] text-[#222]">SNS公式アカウント</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://twitter.com"
                className="py-3 px-3 border-none rounded-md text-white no-underline text-center font-black text-sm transition-all bg-[#1da1f2] hover:translate-x-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                className="py-3 px-3 border-none rounded-md text-white no-underline text-center font-black text-sm transition-all bg-linear-to-br from-[#833ab4] to-[#fd1d1d] hover:translate-x-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://line.me"
                className="py-3 px-3 border-none rounded-md text-white no-underline text-center font-black text-sm transition-all bg-[#00b900] hover:translate-x-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                target="_blank"
                rel="noreferrer"
              >
                LINE
              </a>
              <a
                href="https://youtube.com"
                className="py-3 px-3 border-none rounded-md text-white no-underline text-center font-black text-sm transition-all bg-[#ff0000] hover:translate-x-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>

          <div className="bg-white border-[3px] border-[#ccc] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <h3 className="font-['Zen_Maru_Gothic',sans-serif] text-base font-black mb-3 pb-2 border-b-2 border-[#0066cc] text-[#222]">営業カレンダー</h3>
            <div className="text-center">
              <div className="text-lg font-black mb-3 text-[#222]">12月</div>
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                  <div key={day} className="text-[11px] font-black py-1.5 px-0.5 text-[#666]">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={`day-${i + 1}`}
                    className={`text-xs font-bold py-2 px-1 bg-[#f5f5f5] rounded ${i % 7 === 0 || i % 7 === 6 ? 'bg-[#ffe6e6] text-[#e60012]' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#e60012]"></span>
                  休業日
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border-[3px] border-[#ccc] rounded-lg p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:h-1.5 before:bg-linear-to-r before:from-[#e60012] before:to-[#ffcc00] before:rounded-t-lg">
            <h3 className="font-['Zen_Maru_Gothic',sans-serif] text-base font-black mb-3 pb-2 border-b-2 border-[#0066cc] text-[#222]">お問い合わせ</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 p-2.5 bg-[#f5f5f5] rounded-md">
                <span className="text-xl">📞</span>
                <span className="text-[13px] font-bold text-[#222]">0120-xxx-xxx</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#f5f5f5] rounded-md">
                <span className="text-xl">📧</span>
                <span className="text-[13px] font-bold text-[#222]">info@example.jp</span>
              </div>
              <div className="p-3 bg-[#fff9e6] border-2 border-[#ffcc00] rounded-md text-center">
                <p className="text-xs text-[#666] leading-relaxed m-0">受付時間: 平日 10:00-18:00</p>
                <p className="text-xs text-[#666] leading-relaxed m-0">(土日祝日を除く)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white mt-6 sm:mt-10 border-t-4 sm:border-t-[6px] border-[#e60012] pb-6 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 sm:gap-8 p-6 sm:p-10 px-4 sm:px-[30px] max-w-[1800px] mx-auto">
          {[
            { title: 'ショッピングガイド', links: ['ご利用ガイド', '配送・送料について', '返品・交換について', 'お支払い方法'] },
            { title: 'サポート', links: ['よくある質問', 'お問い合わせ', 'サイトマップ', '会社概要'] },
            { title: '会員サービス', links: ['新規会員登録', 'マイページ', '購入履歴', 'ポイント確認'] },
            { title: 'インフォメーション', links: ['プライバシーポリシー', '利用規約', '特定商取引法', '採用情報'] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-base font-black mb-2 pb-2 border-b-2 border-[#ffcc00] text-[#ffcc00]">{col.title}</h4>
              <ul className="list-none flex flex-col gap-2 p-0">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`/ideas/japanese-web/${slugify(link)}`}
                      className="text-white no-underline text-[13px] transition-all pl-0 hover:text-[#ffcc00] hover:pl-2"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-black p-6 px-[30px] text-center border-t border-[#333]">
          <div className="flex justify-center gap-3 mb-4">
            {['SSL対応', '個人情報保護', 'JAPANブランド'].map((badge) => (
              <span key={badge} className="px-4 py-1.5 bg-[#0066cc] text-white text-[11px] font-black rounded-2xl">
                {badge}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#666] m-0">© 2025 Digital Tokyo. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button
        type="button"
        className="fixed bottom-4 right-4 sm:bottom-[30px] sm:right-[30px] w-12 h-12 sm:w-16 sm:h-16 bg-[#e60012] text-white border-2 sm:border-[3px] border-white rounded-full cursor-pointer flex flex-col items-center justify-center gap-0.5 shadow-[0_8px_24px_rgba(230,0,18,0.4)] transition-all z-1000 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(230,0,18,0.6)] active:scale-95 touch-manipulation"
        title="ページトップへ"
        style={{ touchAction: 'manipulation' }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <span className="text-base sm:text-xl font-black">↑</span>
        <span className="text-[9px] sm:text-[11px] font-black hidden sm:inline">TOP</span>
      </button>

    </div>
  );
}
