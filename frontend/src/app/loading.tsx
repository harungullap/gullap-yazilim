'use client';

import { motion } from 'framer-motion';
import { Terminal, Cpu, Code, Zap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 rounded-full"
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

      {/* Main Loading Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Logo/Icon Animation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-24 h-24 mx-auto">
              {/* Terminal Icon with Glow */}
              <motion.div
                className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl">
                <Terminal className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-slate-800 font-mono mb-3">
              <span className="text-blue-600">Güllap</span> Yazılım
            </h1>
            <h2 className="text-xl font-semibold text-slate-700 mb-2 font-mono">
              Sistem Başlatılıyor
            </h2>
            <p className="text-slate-600 font-mono">
              Yazılım çözümleriniz hazırlanıyor...
            </p>
          </motion.div>

          {/* Main Loading Animation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-32 h-32 mx-auto">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 border-4 border-blue-200 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-3 border-4 border-blue-400 border-t-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute inset-6 border-4 border-blue-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center Icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Cpu className="w-6 h-6 text-blue-600" />
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Loading Steps */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="space-y-3">
              {[
                { icon: Code, text: "Kod Derleniyor", delay: 0.2 },
                { icon: Zap, text: "Performans Optimize Ediliyor", delay: 0.4 },
                { icon: Cpu, text: "Sistem Başlatılıyor", delay: 0.6 },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-3 text-slate-600 font-mono"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + step.delay }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, delay: step.delay }}
                  >
                    <step.icon className="w-4 h-4 text-blue-500" />
                  </motion.div>
                  <span className="text-sm">{step.text}</span>
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: step.delay }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
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
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const icons = [Code, Cpu, Zap, Terminal];
          const IconComponent = icons[i % icons.length];
          
          return (
            <motion.div
              key={i}
              className="absolute text-blue-300/40"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + i * 8}%`,
              }}
            >
              {IconComponent && (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, delay: i * 0.3 }}
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
