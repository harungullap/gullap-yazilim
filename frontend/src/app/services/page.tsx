'use client';

import { motion } from 'framer-motion';
import { Card, Badge } from 'flowbite-react';
import { 
  Monitor, 
  Globe, 
  Smartphone, 
  CheckCircle, 
  Star,
  Clock,
  Users,
  Shield
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMobileDetection } from '@/lib/useMobileDetection';
import GlitchText from '@/components/ui/GlitchText';
import Typewriter from '@/components/ui/Typewriter';
import NeuralNetwork from '@/components/ui/NeuralNetwork';


// Lazy load components with mobile optimization
// const LazyGlitchText = lazy(() => import('@/components/ui/GlitchText'));
// const LazyTypewriter = lazy(() => import('@/components/ui/Typewriter'));



const services = [
  {
    id: 'desktop',
    title: 'Masaüstü Yazılım Geliştirme',
    icon: Monitor,
    description: 'Windows, macOS ve Linux için özel masaüstü uygulamaları geliştiriyoruz.',
    packages: [
      {
        name: 'Başlangıç Paketi',
        features: [
          'Temel özellikler',
          'Basit arayüz',
          'Temel veritabanı entegrasyonu',
          'Windows uyumluluğu',
          '1 yıl destek'
        ],
        popular: false
      },
      {
        name: 'Orta Paket',
        features: [
          'Gelişmiş özellikler',
          'Modern arayüz tasarımı',
          'Veritabanı yönetimi',
          'Çoklu platform desteği',
          'API entegrasyonu',
          '2 yıl destek',
          'Eğitim ve dokümantasyon'
        ],
        popular: true
      },
      {
        name: 'Profesyonel Paket',
        features: [
          'Kapsamlı özellikler',
          'Özel arayüz tasarımı',
          'Gelişmiş veritabanı sistemi',
          'Çoklu platform desteği',
          'API ve mikroservis mimarisi',
          'Güvenlik özellikleri',
          'Performans optimizasyonu',
          'Sınırsız destek',
          'Özel eğitim programı'
        ],
        popular: false
      }
    ]
  },
  {
    id: 'web',
    title: 'Web Yazılım Geliştirme',
    icon: Globe,
    description: 'Modern web siteleri ve web uygulamaları ile dijital varlığınızı güçlendirin.',
    packages: [
      {
        name: 'Başlangıç Paketi',
        features: [
          'Responsive tasarım',
          '5 sayfa içerik',
          'İletişim formu',
          'SEO optimizasyonu',
          '6 ay destek'
        ],
        popular: false
      },
      {
        name: 'Orta Paket',
        features: [
          'Responsive tasarım',
          '10 sayfa içerik',
          'İletişim formu',
          'Blog sistemi',
          'Admin paneli',
          'SEO optimizasyonu',
          '1 yıl destek',
          'Eğitim ve dokümantasyon'
        ],
        popular: true
      },
      {
        name: 'Profesyonel Paket',
        features: [
          'Özel tasarım',
          'Sınırsız sayfa',
          'E-ticaret entegrasyonu',
          'Gelişmiş admin paneli',
          'Çoklu dil desteği',
          'API entegrasyonu',
          'Güvenlik özellikleri',
          'Performans optimizasyonu',
          'Sınırsız destek',
          'Özel eğitim programı'
        ],
        popular: false
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobil Yazılım Geliştirme',
    icon: Smartphone,
    description: 'iOS ve Android için native ve cross-platform mobil uygulamalar geliştiriyoruz.',
    packages: [
      {
        name: 'Başlangıç Paketi',
        features: [
          'Temel özellikler',
          'Basit arayüz',
          'Temel veritabanı',
          'Push bildirimleri',
          '1 yıl destek'
        ],
        popular: false
      },
      {
        name: 'Orta Paket',
        features: [
          'Gelişmiş özellikler',
          'Modern arayüz tasarımı',
          'Veritabanı yönetimi',
          'Push bildirimleri',
          'Sosyal medya entegrasyonu',
          '2 yıl destek',
          'Eğitim ve dokümantasyon'
        ],
        popular: true
      },
      {
        name: 'Profesyonel Paket',
        features: [
          'Kapsamlı özellikler',
          'Özel arayüz tasarımı',
          'Gelişmiş veritabanı sistemi',
          'Çoklu platform desteği',
          'API entegrasyonu',
          'Güvenlik özellikleri',
          'Performans optimizasyonu',
          'Analytics entegrasyonu',
          'Sınırsız destek',
          'Özel eğitim programı'
        ],
        popular: false
      }
    ]
  }
];

const features = [
  {
    icon: CheckCircle,
    title: 'Kalite Garantisi',
    description: 'Tüm projelerimizde %100 kalite garantisi veriyoruz.'
  },
  {
    icon: Clock,
    title: 'Hızlı Teslimat',
    description: 'Projelerinizi zamanında ve bütçe dahilinde teslim ediyoruz.'
  },
  {
    icon: Users,
    title: 'Uzman Ekip',
    description: 'Deneyimli geliştirici ekibimizle projelerinizi hayata geçiriyoruz.'
  },
  {
    icon: Shield,
    title: 'Güvenlik Odaklı',
    description: 'Güvenlik standartlarına uygun kodlama yapıyoruz.'
  }
];

export default function ServicesPage() {
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
              <span className="text-blue-600">Hizmet</span>
              {isMobile ? (
                <>
                  <br />
                  <GlitchText text="Paketlerimiz" />
                </>
              ) : (
                <span className="ml-2">
                  <GlitchText text="Paketlerimiz" />
                </span>
              )}
            </h1>
            <div className="text-xl text-slate-600 font-mono max-w-3xl mx-auto">
              {isMobile ? (
                <Typewriter 
                  text="İhtiyaçlarınıza uygun yazılım çözümlerini paket halinde sunuyoruz. Başlangıç, Orta ve Profesyonel seviyelerde hizmet veriyoruz."
                  speed={40}
                  loop={false}
                />
              ) : (
                <Typewriter 
                  text="İhtiyaçlarınıza uygun yazılım çözümlerini paket halinde sunuyoruz. Başlangıç, Orta ve Profesyonel seviyelerde hizmet veriyoruz."
                  speed={50}
                  loop={false}
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, serviceIndex) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? serviceIndex * 0.1 : serviceIndex * 0.2 }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 font-mono mb-4">
                  {service.title}
                </h2>
                <div className="text-lg text-slate-600 font-mono max-w-2xl mx-auto">
                  <Typewriter 
                    text={service.description}
                    speed={isMobile ? 40 : 50}
                    loop={false}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.packages.map((pkg, pkgIndex) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? pkgIndex * 0.05 : pkgIndex * 0.1 }}
                  >
                    <Card className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                      pkg.popular 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                        : 'border-blue-200 hover:border-blue-400'
                    }`}>
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-blue-600 text-white px-4 py-2">
                            <Star className="w-4 h-4 mr-2" />
                            En Popüler
                          </Badge>
                        </div>
                      )}
                      
                      <div className="p-6 pt-8 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-slate-800 font-mono mb-4 text-center">
                          {pkg.name}
                        </h3>
                        
                        <ul className="space-y-3 mb-6 flex-grow">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600 font-mono text-sm leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono py-3 px-6 rounded-lg transition-colors duration-200 mt-auto font-semibold">
                          Teklif Al
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-20 py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-mono mb-4">
              <span className="text-blue-600">Neden</span> <GlitchText text="Bizi Seçmelisiniz?" />
            </h2>
            <div className="text-lg text-slate-600 font-mono">
              <Typewriter 
                text="Kaliteli hizmet ve müşteri memnuniyeti odaklı yaklaşımımızla fark yaratıyoruz."
                speed={isMobile ? 40 : 50}
                loop={false}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? index * 0.05 : index * 0.1 }}
                className="text-center"
              >
                <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 font-mono mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 font-mono text-sm leading-relaxed flex-grow text-center">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-2xl shadow-blue-500/30">
              <div className="p-12">
                <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
                  Projenizi Başlatmaya Hazır mısınız?
                </h2>
                <p className="text-xl font-mono mb-8 opacity-90">
                  Size en uygun paketi seçin ve projenizi hayata geçirelim
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 hover:bg-slate-100 font-mono py-4 px-8 rounded-lg transition-colors duration-200 font-semibold">
                    Ücretsiz Danışmanlık
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-mono py-4 px-8 rounded-lg transition-colors duration-200 font-semibold">
                    Teklif Al
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
