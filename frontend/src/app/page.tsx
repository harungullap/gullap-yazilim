'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Globe, 
  Shield, 
  Zap, 
  Users,
  Terminal,
  Cpu
} from 'lucide-react';
import { Button, Card, Badge } from 'flowbite-react';
import { Suspense, lazy } from 'react';
import Typewriter from '@/components/ui/Typewriter';
import { SequentialTypewriter } from '@/components/ui/Typewriter';
import GlitchText from '@/components/ui/GlitchText';
import LazyWrapper from '@/components/ui/LazyWrapper';
import NeuralNetwork from '@/components/ui/NeuralNetwork';

// Lazy load components
const LazyTypewriter = lazy(() => import('@/components/ui/Typewriter'));
const LazyGlitchText = lazy(() => import('@/components/ui/GlitchText'));

const services = [
  {
    name: 'Masaüstü Yazılım',
    description: 'Windows, macOS ve Linux platformları için özel masaüstü uygulamaları geliştiriyoruz.',
    icon: Cpu,
    link: '/services/desktop',
    code: 'Masaüstü Uygulama'
  },
  {
    name: 'Web Yazılım',
    description: 'Modern web teknolojileri ile responsive, hızlı ve kullanıcı dostu web uygulamaları.',
    icon: Globe,
    link: '/services/web',
    code: 'Web Uygulaması'
  },
  {
    name: 'Web Tasarımı',
    description: 'Profesyonel ve modern web siteleri tasarlıyoruz. UI/UX odaklı, responsive tasarımlar.',
    icon: Code,
    link: '/services/web-design',
    code: 'Web Tasarımı'
  },
  {
    name: 'Mobil Yazılım',
    description: 'iOS ve Android platformları için native ve cross-platform mobil uygulamalar.',
    icon: Smartphone,
    link: '/services/mobile',
    code: 'Mobil Uygulama'
  }
];

const features = [
  {
    name: 'Hızlı Geliştirme',
    description: 'Modern araçlar ve metodolojiler ile projelerinizi hızlıca tamamlıyoruz.',
    icon: Zap,
    badge: 'Hızlı'
  },
  {
    name: 'Güvenli Kod',
    description: 'En iyi güvenlik uygulamaları ile güvenli ve güvenilir yazılımlar geliştiriyoruz.',
    icon: Shield,
    badge: 'Güvenli'
  },
  {
    name: 'Uzman Ekip',
    description: 'Deneyimli geliştiriciler ve tasarımcılardan oluşan profesyonel ekibimizle çalışıyoruz.',
    icon: Users,
    badge: 'Uzman'
  }
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NeuralNetwork />
      
      {/* Hero Section - İki Kolonlu Layout */}
      <section className="relative z-20 min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Sol Kolon: Hero Content */}
            <div className="text-center lg:text-left flex flex-col justify-start min-h-[400px] lg:min-h-[600px] pt-20 sm:pt-24 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4 h-12 flex items-center"
              >
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 font-mono px-4 py-1.5 text-xs min-w-[360px] sm:min-w-[400px] lg:min-w-[570px] justify-start">
                  <Terminal className="w-4 h-4 mr-2" />
                  Sistem Başlatılıyor
                  <span className="ml-1 text-blue-500">...</span>
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 font-mono mb-4 leading-tight">
                  <span className="text-blue-600">{'>'}</span> <GlitchText text="Güllap Yazılım" />
                </h1>
                <div className="text-xl md:text-2xl text-slate-600 font-mono">
                  <LazyWrapper>
                    <Typewriter 
                      text="// Modern yazılım çözümleri geliştiriyoruz" 
                      speed={80}
                      delay={1500}
                      loop={true}
                      loopDelay={4000}
                    />
                  </LazyWrapper>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 font-mono mb-12 sm:mb-16 max-w-4xl lg:max-w-none leading-relaxed"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-3 sm:p-4 md:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500 font-mono">main.js</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <span className="text-slate-400 select-none text-xs sm:text-sm">1</span>&nbsp;&nbsp;
                    <span className="text-purple-600 text-xs sm:text-sm">const</span> <span className="text-blue-600 text-xs sm:text-sm">Çözüm</span> = () {'=>'} {'{'}
                    <br />
                    <span className="text-slate-400 select-none text-xs sm:text-sm">2</span>&nbsp;&nbsp;
                    <span className="ml-2 sm:ml-4 text-slate-600 text-xs sm:text-sm">// Modern teknolojilerle güçlü yazılımlar</span>
                    <br />
                    <span className="text-slate-400 select-none text-xs sm:text-sm">3</span>&nbsp;&nbsp;
                    <span className="ml-2 sm:ml-4 text-purple-600 text-xs sm:text-sm">const</span> <span className="text-slate-800 text-xs sm:text-sm">teknolojiler</span> = [
                    <br />
                    <span className="text-slate-400 select-none text-xs sm:text-sm">4</span>&nbsp;&nbsp;
                    <span className="ml-4 sm:ml-8 text-green-600 text-xs sm:text-sm">'masaüstü'</span>, <span className="text-green-600 text-xs sm:text-sm">'web'</span>, <span className="text-green-600 text-xs sm:text-sm">'mobil'</span>
                    <br />
                    <span className="text-slate-400 select-none text-xs sm:text-sm">5</span>&nbsp;&nbsp;
                    <span className="ml-2 sm:ml-4 text-xs sm:text-sm">];</span>
                    <br />
                    <span className="text-slate-400 select-none text-xs sm:text-sm">6</span>&nbsp;&nbsp;
                    <span className="ml-2 sm:ml-4 text-purple-600 text-xs sm:text-sm">return</span> <span className="text-slate-800 text-xs sm:text-sm">teknolojiler</span>.<span className="text-blue-600 text-xs sm:text-sm">join</span>(<span className="text-green-600 text-xs sm:text-sm">' + '</span>);
                    <br />
                    <span className="text-slate-400 select-none text-xs sm:text-sm">7</span>&nbsp;&nbsp;
                    <span className="text-xs sm:text-sm">{'}'}</span>;
                    <br />
                    <br />
                    <span className="text-slate-400 select-none text-xs sm:text-sm">8</span>&nbsp;&nbsp;
                    <span className="text-slate-600 text-xs sm:text-sm">// Çıktı: "masaüstü + web + mobil"</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mt-8"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg shadow-blue-500/25 hover:shadow-blue-600/30 transition-all duration-300">
                  <Link href="/contact" className="inline-flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    Teklif Al
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-mono font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300">
                  <Link href="/services">
                    Hizmetleri Gör
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Sağ Kolon: Hizmet Kategorileri */}
            <div className="text-center lg:text-left flex flex-col justify-start min-h-[400px] lg:min-h-[600px] pt-20 sm:pt-24 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-4 h-12 flex items-center"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 font-mono">
                  <span className="text-blue-600">Hizmet</span><GlitchText text="lerimiz" />
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <div className="text-base text-slate-600 font-mono">
                  <LazyWrapper as="span">
                    <Typewriter 
                      text="// Dijital çözümlerimiz ile işletmenizi geleceğe taşıyoruz" 
                      speed={60}
                      delay={500}
                      loop={true}
                      loopDelay={5000}
                    />
                  </LazyWrapper>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-full min-h-[220px] sm:min-h-[260px]">
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                            <service.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <code className="text-xs text-blue-600 font-mono bg-blue-100 px-2 py-1 rounded">
                            {service.code}
                          </code>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-800 font-mono mb-3 leading-tight">
                          {service.name}
                        </h3>
                        
                        <p className="text-slate-600 font-mono text-sm mb-5 leading-relaxed flex-grow">
                          {service.description}
                        </p>
                        
                        <Link 
                          href={service.link} 
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-mono font-bold transition-colors duration-200 text-xs mt-auto group"
                        >
                          <Code className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
                          Detayları Gör
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="relative z-20 py-20 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-mono mb-4">
              <span className="text-blue-600">Neden</span> <GlitchText text="Bizi Seçmelisiniz?" />
            </h2>
            <div className="text-lg text-slate-600 font-mono max-w-2xl mx-auto">
              <LazyWrapper as="span">
                <Typewriter 
                  text="// Avantajlarımız ile fark yaratıyoruz" 
                  speed={60}
                  delay={500}
                  loop={true}
                  loopDelay={5000}
                />
              </LazyWrapper>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group h-[280px]">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-300 font-mono">
                      {feature.badge}
                    </Badge>
                    
                    <h3 className="text-lg font-bold text-slate-800 font-mono mb-3">
                      {feature.name}
                    </h3>
                    
                    <p className="text-slate-600 font-mono text-sm leading-relaxed flex-grow min-h-[80px] flex items-center">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-mono mb-4">
              <span className="text-blue-600">Rakamlarla</span> <GlitchText text="Başarılarımız" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="p-6">
                  <div className="text-5xl font-bold text-blue-600 font-mono mb-2">150+</div>
                  <p className="text-slate-600 font-mono">Tamamlanan Proje</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="p-6">
                  <div className="text-5xl font-bold text-blue-600 font-mono mb-2">98%</div>
                  <p className="text-slate-600 font-mono">Müşteri Memnuniyeti</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="p-6">
                  <div className="text-5xl font-bold text-blue-600 font-mono mb-2">24/7</div>
                  <p className="text-slate-600 font-mono">Teknik Destek</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-20 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl p-8 sm:p-12 max-w-4xl mx-auto shadow-xl min-h-[400px] flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 font-mono mb-6">
                <span className="text-blue-600">Projenizi</span> <GlitchText text="Başlatmaya Hazır mısınız?" />
              </h2>
              <div className="text-base sm:text-lg text-slate-600 font-mono mb-8 leading-relaxed space-y-2 min-h-[120px] flex flex-col justify-center">
                <LazyWrapper>
                  <SequentialTypewriter 
                    texts={[
                      "// Projenizi hayata geçirmek için hazır mısınız?",
                      "// Hemen iletişime geçin ve çözümünüzü alalım."
                    ]}
                    speed={60}
                    delay={500}
                    loop={true}
                    loopDelay={6000}
                  />
                </LazyWrapper>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-xl shadow-blue-500/30 hover:shadow-blue-600/40 transition-all duration-300 mb-6">
                <Link href="/contact" className="inline-flex items-center">
                  <Terminal className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Projeyi Başlat
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}