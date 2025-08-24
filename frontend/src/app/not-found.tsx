'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search, Mail, Zap } from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';
import Typewriter from '@/components/ui/Typewriter';

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Countdown timer for auto-redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRedirecting(true);
      window.location.href = '/';
    }
  }, [countdown]);

  // Neural network animation particles
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);
  }, []);

  const quickActions = [
    {
      icon: <Home className="w-6 h-6" />,
      title: 'Ana Sayfa',
      description: 'Anasayfaya geri dön',
      href: '/',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Hizmetler',
      description: 'Yazılım hizmetlerimizi keşfet',
      href: '/services',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'İletişim',
      description: 'Bizimle iletişime geç',
      href: '/contact',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [particle.x, particle.x + particle.vx * 100, particle.x],
              y: [particle.y, particle.y + particle.vy * 100, particle.y],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Neural Network Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          {particles.slice(0, 10).map((particle, i) => (
            <motion.line
              key={i}
              x1={particle.x}
              y1={particle.y}
              x2={particles[(i + 1) % particles.length]?.x || 0}
              y2={particles[(i + 1) % particles.length]?.y || 0}
              stroke="url(#gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <GlitchText 
              text="404" 
              className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
            />
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              <Typewriter 
                text="Sayfa Bulunamadı"
                speed={100}
                loop={false}
              />
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanılamıyor olabilir. 
              Ana sayfaya dönebilir veya aşağıdaki seçenekleri kullanabilirsiniz.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{action.title}</h3>
                  <p className="text-slate-600 text-sm">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Auto-redirect Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 inline-block"
          >
            <div className="flex items-center gap-3 text-blue-700">
              <Zap className="w-5 h-5" />
              <span className="text-sm">
                {isRedirecting ? (
                  'Ana sayfaya yönlendiriliyorsunuz...'
                ) : (
                  <>
                    <span className="font-medium">{countdown}</span> saniye sonra ana sayfaya yönlendirileceksiniz
                  </>
                )}
              </span>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Ana Sayfaya Dön
              </motion.button>
            </Link>
          </motion.div>

          {/* Fun Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            <div className="text-slate-600">
              <div className="text-2xl font-bold text-blue-600">404</div>
              <div className="text-sm">Hata Kodu</div>
            </div>
            <div className="text-slate-600">
              <div className="text-2xl font-bold text-green-600">0.1%</div>
              <div className="text-sm">Kayıp Sayfa Oranı</div>
            </div>
            <div className="text-slate-600">
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm">Çözüm Seçeneği</div>
            </div>
            <div className="text-slate-600">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm">Yardım Garantisi</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
