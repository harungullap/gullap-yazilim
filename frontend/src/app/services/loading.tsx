'use client';

import { motion } from 'framer-motion';
import { Monitor, Globe, Smartphone, CheckCircle, Star } from 'lucide-react';

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 rounded-full"
            animate={{
              x: [0, 100, 200, 100, 0],
              y: [0, 50, 100, 150, 200],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
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
        <div className="text-center max-w-2xl mx-auto px-6">
          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-slate-800 font-mono mb-4">
              <span className="text-blue-600">Hizmet</span> Paketlerimiz
            </h1>
            <p className="text-lg text-slate-600 font-mono">
              Yazılım çözümleriniz hazırlanıyor...
            </p>
          </motion.div>

          {/* Service Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Monitor, title: "Masaüstü Yazılım", color: "blue" },
              { icon: Globe, title: "Web Yazılım", color: "indigo" },
              { icon: Smartphone, title: "Mobil Yazılım", color: "purple" },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white/80 rounded-xl p-6 shadow-lg border border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {/* Service Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                </motion.div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-800 font-mono mb-4 text-center">
                  {service.title}
                </h3>

                {/* Loading Bars */}
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <motion.div
                      key={bar}
                      className="h-3 bg-gray-200 rounded-full overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 + bar * 0.05 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 rounded-full`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${60 + Math.random() * 40}%` }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 + bar * 0.05 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicator */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-4 text-slate-600 font-mono">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </motion.div>
              <span>Hizmet paketleri yükleniyor</span>
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
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

      {/* Floating Service Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const icons = [Monitor, Globe, Smartphone, CheckCircle, Star, Monitor];
          const IconComponent = icons[i % icons.length];
          
          return (
            <motion.div
              key={i}
              className="absolute text-blue-300/40"
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + i * 10}%`,
              }}
            >
              {IconComponent && (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, delay: i * 0.2 }}
                >
                  <IconComponent className="w-8 h-8" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
