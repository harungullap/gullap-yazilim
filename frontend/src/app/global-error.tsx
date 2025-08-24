'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Kritik Sistem Hatası
              </h1>
              <p className="text-lg text-slate-600 mb-4">
                Sistemde beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin veya ana sayfaya dönün.
              </p>
              {error.message && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-700 text-sm font-mono">{error.message}</p>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
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

            {/* Additional Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 text-sm text-slate-500"
            >
              <p>
                Sorun devam ederse, lütfen{' '}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  bizimle iletişime geçin
                </Link>
                .
              </p>
              {error.digest && (
                <p className="mt-2 font-mono text-xs">
                  Hata ID: {error.digest}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}
