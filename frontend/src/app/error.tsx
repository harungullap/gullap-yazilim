'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Home, Bug, AlertTriangle, Shield, Zap, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-300/30 rounded-full"
            animate={{
              x: [0, 100, 200, 100, 0],
              y: [0, 50, 100, 150, 200],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Error Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Error Icon with Glow Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Main Icon Container */}
              <div className="relative bg-gradient-to-br from-red-500 to-orange-600 rounded-full p-8 shadow-2xl border-4 border-white/20">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 font-mono mb-4">
              <span className="text-red-600">Hata</span> Oluştu!
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-4 font-mono">
              Sayfa Yüklenirken Beklenmeyen Bir Durum
            </h2>
            <p className="text-lg text-slate-600 font-mono max-w-2xl mx-auto">
              Sistemimizde geçici bir sorun oluştu. Bu durum genellikle geçicidir ve 
              hızlıca çözülür. Lütfen sayfayı yenilemeyi deneyin.
            </p>
          </motion.div>

          {/* Error Status */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-full px-6 py-3">
              <motion.div
                animate={{ pulse: true }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              </motion.div>
              <span className="text-red-700 font-mono text-sm">
                Hata Kodu: {error.digest || 'UNKNOWN'}
              </span>
            </div>
          </motion.div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <details className="bg-red-50/80 border border-red-200 rounded-xl p-6 text-left backdrop-blur-sm">
                <summary className="cursor-pointer text-red-700 font-medium mb-4 flex items-center gap-2 font-mono">
                  <Bug className="w-5 h-5" />
                  Hata Detayları (Geliştirici Modu)
                </summary>
                <div className="bg-white/50 rounded-lg p-4 border border-red-100">
                  <pre className="text-red-800 text-sm font-mono whitespace-pre-wrap overflow-auto max-h-40">
                    {error.message}
                    {error.stack && `\n\n${error.stack}`}
                  </pre>
                </div>
              </details>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl font-mono"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              Tekrar Dene
            </motion.button>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 hover:bg-white text-slate-700 border-2 border-blue-200 hover:border-blue-300 px-8 py-4 rounded-xl font-medium flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm font-mono"
              >
                <Home className="w-5 h-5" />
                Ana Sayfaya Dön
              </motion.button>
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-8"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 font-mono">
                Yardıma mı ihtiyacınız var?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Güvenlik kontrolü</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Hızlı çözüm</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <span>Teknik destek</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-sm text-slate-500 font-mono"
          >
            <p>
              Sorun devam ederse, lütfen{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                destek ekibimizle iletişime geçin
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Error Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const icons = [AlertTriangle, Bug, Shield, Zap, Terminal, AlertTriangle, Bug, Shield];
          const IconComponent = icons[i % icons.length];
          
          return (
            <motion.div
              key={i}
              className="absolute text-red-300/40"
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + i * 8}%`,
              }}
            >
              {IconComponent && (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, delay: i * 0.2 }}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
