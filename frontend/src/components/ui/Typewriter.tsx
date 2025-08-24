'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  loopDelay?: number;
}

interface SequentialTypewriterProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
  loopDelay?: number;
}

export default function Typewriter({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = '',
  onComplete,
  loop = true,
  loopDelay = 3000
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (!isDeleting && currentIndex < text.length) {
      // Yazma modu
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isDeleting && currentIndex >= text.length) {
      // Yazma tamamlandı
      if (loop) {
        // Sadece loop=true ise silme moduna geç
        setTimeout(() => {
          setIsDeleting(true);
        }, loopDelay);
      }
      // loop=false ise hiçbir şey yapma, yazı kalsın
    } else if (isDeleting && currentIndex > 0) {
      // Silme modu
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, speed / 2); // Silme hızlı olsun

      return () => clearTimeout(timer);
    } else if (isDeleting && currentIndex <= 0) {
      // Silme tamamlandı, yazma moduna geç
      setIsDeleting(false);
      setCurrentIndex(0);
      setDisplayText('');
    }

    // Yazma tamamlandığında callback
    if (onComplete && !isDeleting && currentIndex >= text.length) {
      onComplete();
    }
  }, [currentIndex, text, speed, isTyping, isDeleting, onComplete, loopDelay, loop]);

  return (
    <span className={className}>
      {displayText}
      <span 
        className="text-blue-600 font-bold"
        style={{
          animation: 'blink 1s infinite'
        }}
      >|</span>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

// Sıralı yazma ve silme için özel bileşen
export function SequentialTypewriter({ 
  texts, 
  speed = 100, 
  delay = 0, 
  className = '',
  loop = true,
  loopDelay = 3000
}: SequentialTypewriterProps) {
  const [displayTexts, setDisplayTexts] = useState<string[]>(['', '']);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');
  const [deletingTextIndex, setDeletingTextIndex] = useState(0);
  const [isWaitingForNextLine, setIsWaitingForNextLine] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (phase === 'typing') {
      const currentText = texts[currentTextIndex];
      
      if (currentCharIndex < currentText.length) {
        // Yazma modu
        const timer = setTimeout(() => {
          const newDisplayTexts = [...displayTexts];
          newDisplayTexts[currentTextIndex] = currentText.slice(0, currentCharIndex + 1);
          setDisplayTexts(newDisplayTexts);
          setCurrentCharIndex(currentCharIndex + 1);
        }, speed);

        return () => clearTimeout(timer);
      } else {
        // Yazma tamamlandı
        if (currentTextIndex < texts.length - 1) {
          // 2 saniye bekle, sonra alt satıra geç
          setIsWaitingForNextLine(true);
          setTimeout(() => {
            setIsWaitingForNextLine(false);
            setCurrentTextIndex(currentTextIndex + 1);
            setCurrentCharIndex(0);
            // Alt satırda 2 saniye daha bekle
            setTimeout(() => {
              // Şimdi yazmaya başla
            }, 2000);
          }, 2000);
        } else {
          // Tüm metinler yazıldı, bekleme moduna geç
          if (loop) {
            setPhase('waiting');
            setTimeout(() => {
              setPhase('deleting');
              setDeletingTextIndex(texts.length - 1); // Sondan başla
              setCurrentCharIndex(texts[texts.length - 1].length); // Son metnin uzunluğu
            }, loopDelay);
          } else {
            // loop=false ise yazı kalsın, hiçbir şey yapma
            setIsTyping(false);
          }
        }
      }
    } else if (phase === 'deleting') {
      // Silme modu - sondan başa doğru sil
      if (currentCharIndex > 0) {
        const timer = setTimeout(() => {
          const newDisplayTexts = [...displayTexts];
          newDisplayTexts[deletingTextIndex] = texts[deletingTextIndex].slice(0, currentCharIndex - 1);
          setDisplayTexts(newDisplayTexts);
          setCurrentCharIndex(currentCharIndex - 1);
        }, speed / 2);

        return () => clearTimeout(timer);
      } else {
        // Mevcut metin silindi, önceki metne geç
        if (deletingTextIndex > 0) {
          setDeletingTextIndex(deletingTextIndex - 1);
          setCurrentCharIndex(texts[deletingTextIndex - 1].length);
        } else {
          // Tüm metinler silindi, yazma moduna geç
          setTimeout(() => {
            setPhase('typing');
            setCurrentTextIndex(0);
            setCurrentCharIndex(0);
            setDisplayTexts(['', '']);
            
            if (!loop) {
              setIsTyping(false);
            }
          }, 1000); // 1 saniye bekle
        }
      }
    }
  }, [currentCharIndex, texts, currentTextIndex, speed, isTyping, phase, displayTexts, loop, loopDelay, deletingTextIndex]);

  return (
    <div className={className}>
      {displayTexts.map((text, index) => (
        <div key={index} className="mb-2">
          {text}
          {index === currentTextIndex && phase === 'typing' && !isWaitingForNextLine && (
            <span 
              className="text-blue-600 font-bold"
              style={{
                animation: 'blink 1s infinite'
              }}
            >|</span>
          )}
          {index === deletingTextIndex && phase === 'deleting' && (
            <span 
              className="text-blue-600 font-bold"
              style={{
                animation: 'blink 1s infinite'
              }}
            >|</span>
          )}
        </div>
      ))}
      {phase === 'waiting' && (
        <span 
          className="text-blue-600 font-bold"
          style={{
            animation: 'blink 1s infinite'
          }}
        >|</span>
      )}
      {isWaitingForNextLine && (
        <span 
          className="text-blue-600 font-bold"
          style={{
            animation: 'blink 1s infinite'
          }}
        >|</span>
      )}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}