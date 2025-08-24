'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <motion.div
          className="relative w-20 h-20 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-4 border-blue-200 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Inner Ring */}
          <motion.div
            className="absolute inset-2 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            Yükleniyor...
          </h2>
          <p className="text-slate-500">
            Sayfa hazırlanıyor, lütfen bekleyin
          </p>
        </motion.div>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center gap-1 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Neural Network Background Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-300/40 rounded-full"
              animate={{
                x: [0, 100, 200, 100, 0],
                y: [0, 50, 100, 150, 200],
                opacity: [0, 1, 0.5, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
