'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Home, Bug } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bug className="w-10 h-10 text-orange-500" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Sayfa Yüklenirken Hata Oluştu
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            Bu sayfa yüklenirken beklenmeyen bir hata meydana geldi. 
            Sayfayı yenilemeyi deneyin.
          </p>
          
          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <details className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 text-left">
              <summary className="cursor-pointer text-orange-700 font-medium mb-2">
                Hata Detayları (Geliştirici Modu)
              </summary>
              <pre className="text-orange-800 text-sm font-mono whitespace-pre-wrap overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Tekrar Dene
          </motion.button>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Home className="w-5 h-5" />
              Ana Sayfaya Dön
            </motion.button>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm text-slate-500"
        >
          <p>
            Sorun devam ederse, lütfen{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              destek ekibimizle iletişime geçin
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
