'use client';

import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchChars?: string;
  glitchSpeed?: number;
  glitchDuration?: number;
}

export default function GlitchText({ 
  text, 
  className = '',
  glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?',
  glitchSpeed = 50,
  glitchDuration = 100
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState<'random' | 'shift' | 'noise'>('random');

  const startGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    const glitchTypes: Array<'random' | 'shift' | 'noise'> = ['random', 'shift', 'noise'];
    const currentGlitchType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    setGlitchType(currentGlitchType);
    
    let iterations = 0;
    const maxIterations = 5;

    const glitchInterval = setInterval(() => {
      if (currentGlitchType === 'random') {
        // Rastgele karakter değiştirme
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iterations * (text.length / maxIterations)) {
                return text[index];
              }
              
              if (Math.random() < 0.6) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              
              return char;
            })
            .join('')
        );
      } else if (currentGlitchType === 'shift') {
        // Karakter kaydırma
        const shiftedText = text.split('');
        for (let i = 0; i < iterations; i++) {
          const randomIndex = Math.floor(Math.random() * text.length);
          const temp = shiftedText[randomIndex];
          shiftedText[randomIndex] = shiftedText[(randomIndex + 1) % text.length];
          shiftedText[(randomIndex + 1) % text.length] = temp;
        }
        setDisplayText(shiftedText.join(''));
      } else if (currentGlitchType === 'noise') {
        // Gürültü efekti
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (Math.random() < 0.7) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            })
            .join('')
        );
      }

      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(glitchInterval);
        setDisplayText(text);
        setTimeout(() => setIsGlitching(false), glitchDuration);
      }
    }, glitchSpeed);
  };

  useEffect(() => {
    const randomDelay = Math.random() * 2000 + 1000; // 1-3 saniye arası
    const timer = setTimeout(() => {
      startGlitch();
    }, randomDelay);

    const interval = setInterval(() => {
      if (Math.random() < 0.4) { // %40 şans
        startGlitch();
      }
    }, 4000); // Her 4 saniyede bir kontrol et

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <span 
      className={`${className} ${isGlitching ? 'text-shadow-glitch' : ''}`}
      style={{
        textShadow: isGlitching 
          ? glitchType === 'random'
            ? '2px 0 #ff0000, -2px 0 #00ffff, 0 2px #ffff00, 0 -2px #ff00ff'
            : glitchType === 'shift'
            ? '3px 0 #ff0000, -3px 0 #00ffff, 0 3px #ffff00, 0 -3px #ff00ff'
            : '1px 0 #ff0000, -1px 0 #00ffff, 0 1px #ffff00, 0 -1px #ff00ff'
          : 'none',
        animation: isGlitching 
          ? glitchType === 'random'
            ? 'glitch-random 0.3s ease-in-out'
            : glitchType === 'shift'
            ? 'glitch-shift 0.4s ease-in-out'
            : 'glitch-noise 0.2s ease-in-out'
          : 'none',
        transform: isGlitching && glitchType === 'shift' ? 'skew(-2deg)' : 'none',
        filter: isGlitching && glitchType === 'noise' ? 'contrast(150%) brightness(120%)' : 'none'
      }}
    >
      {displayText}
      <style jsx>{`
        @keyframes glitch-random {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-shift {
          0%, 100% { transform: skew(0deg); }
          25% { transform: skew(-3deg); }
          50% { transform: skew(3deg); }
          75% { transform: skew(-1deg); }
        }
        
        @keyframes glitch-noise {
          0%, 100% { filter: contrast(100%) brightness(100%); }
          50% { filter: contrast(200%) brightness(150%); }
        }
      `}</style>
    </span>
  );
}
