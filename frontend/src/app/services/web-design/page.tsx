'use client';

import { motion } from 'framer-motion';
import { Card, Badge } from 'flowbite-react';
import { Code, CheckCircle, Star } from 'lucide-react';
import { useMobileDetection } from '@/lib/useMobileDetection';
import GlitchText from '@/components/ui/GlitchText';
import Typewriter from '@/components/ui/Typewriter';
import NeuralNetwork from '@/components/ui/NeuralNetwork';

export default function WebDesignServicesPage() {
  const isMobile = useMobileDetection();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NeuralNetwork />
      
      {/* Hero Section */}
      <section className="relative z-20 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 font-mono mb-6">
              <span className="text-blue-600">Web</span> <GlitchText text="Tasarımı" />
            </h1>
            <div className="text-xl text-slate-600 font-mono max-w-3xl mx-auto">
              <Typewriter 
                text="Profesyonel ve modern web siteleri tasarlıyoruz. UI/UX odaklı, responsive tasarımlar."
                speed={40}
                loop={false}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-slate-600 font-mono">
              Web tasarım hizmetlerimiz hakkında detaylı bilgi için ana hizmetler sayfasını ziyaret edin.
            </p>
            <div className="mt-8">
              <a 
                href="/services" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono font-medium rounded-lg transition-colors duration-200"
              >
                Tüm Hizmetlere Dön
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
