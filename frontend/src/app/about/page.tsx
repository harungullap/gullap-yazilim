'use client';

import { motion } from 'framer-motion';
import { Card } from 'flowbite-react';
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb,
  Code,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';
import Typewriter from '@/components/ui/Typewriter';

const values = [
  {
    icon: Target,
    title: 'Misyonumuz',
    description: 'Müşterilerimizin dijital dönüşüm süreçlerinde güvenilir partner olmak ve yenilikçi yazılım çözümleri ile işlerini büyütmelerine yardımcı olmak.'
  },
  {
    icon: Lightbulb,
    title: 'Vizyonumuz',
    description: 'Teknoloji dünyasında öncü olmak, sürdürülebilir ve ölçeklenebilir yazılım çözümleri ile global pazarda tanınan bir marka haline gelmek.'
  },
  {
    icon: Award,
    title: 'Değerlerimiz',
    description: 'Kalite, güvenilirlik, yenilikçilik ve müşteri memnuniyeti odaklı yaklaşımımızla her projede mükemmellik hedefliyoruz.'
  }
];

const expertise = [
  {
    icon: Code,
    title: 'Modern Teknolojiler',
    description: 'React, Node.js, Python, .NET gibi güncel teknolojileri kullanarak geleceğe uyumlu çözümler geliştiriyoruz.'
  },
  {
    icon: Globe,
    title: 'Cross-Platform',
    description: 'Web, mobil ve masaüstü platformlarında tutarlı ve kaliteli deneyimler sunuyoruz.'
  },
  {
    icon: Shield,
    title: 'Güvenlik Odaklı',
    description: 'Her projede güvenlik standartlarını ön planda tutarak güvenilir çözümler üretiyoruz.'
  },
  {
    icon: Zap,
    title: 'Hızlı Geliştirme',
    description: 'Agile metodolojiler ile hızlı ve esnek geliştirme süreçleri yönetiyoruz.'
  }
];

const team = [
  {
    name: 'Harun Güllap',
    role: 'Kurucu & Baş Geliştirici',
    description: '10+ yıl yazılım geliştirme deneyimi ile projelerin teknik liderliğini üstleniyor.',
    skills: ['Full-Stack Development', 'System Architecture', 'Project Management']
  },
  {
    name: 'Geliştirici Ekibi',
    role: 'Uzman Yazılımcılar',
    description: 'Deneyimli ve yetenekli geliştiricilerden oluşan ekibimiz ile kaliteli çözümler üretiyoruz.',
    skills: ['Frontend Development', 'Backend Development', 'Mobile Development']
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 font-mono mb-6">
              <span className="text-blue-600">Hakkımızda</span> <GlitchText text="Güllap Yazılım" />
            </h1>
            <p className="text-xl text-slate-600 font-mono max-w-3xl mx-auto">
              <Typewriter 
                text="2014 yılından bu yana teknoloji dünyasında yenilikçi yazılım çözümleri geliştiriyoruz. Müşteri memnuniyeti ve kalite odaklı yaklaşımımızla fark yaratıyoruz."
                speed={50}
                loop={false}
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-mono mb-4">
              <span className="text-blue-600">Şirket</span> <GlitchText text="Hikayemiz" />
            </h2>
            <p className="text-lg text-slate-600 font-mono max-w-4xl mx-auto">
              <Typewriter 
                text="Güllap Yazılım, teknoloji tutkusu ve yenilikçi yaklaşım ile kuruldu. 10 yılı aşkın deneyimimizde, yüzlerce başarılı projeye imza attık ve müşterilerimizin güvenini kazandık."
                speed={50}
                loop={false}
              />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-full">
                  <div className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <value.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 font-mono mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 font-mono text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 border border-blue-200 rounded-2xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 font-mono mb-4">
                Neden Güllap Yazılım?
              </h3>
              <p className="text-slate-600 font-mono">
                <Typewriter 
                  text="Deneyimli ekibimiz, modern teknolojiler ve müşteri odaklı yaklaşımımızla projelerinizi hayata geçiriyoruz."
                  speed={50}
                  loop={false}
                />
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 font-mono mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 font-mono text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-mono mb-4">
              <span className="text-blue-600">Ekibimiz</span> <GlitchText text="Hakkında" />
            </h2>
            <p className="text-lg text-slate-600 font-mono">
              <Typewriter 
                text="Deneyimli ve yetenekli ekibimiz ile projelerinizi başarıyla tamamlıyoruz."
                speed={50}
                loop={false}
              />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-full">
                  <div className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 font-mono mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-mono font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-600 font-mono text-sm mb-4">
                      {member.description}
                    </p>
                    <div className="space-y-2">
                      {member.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-slate-600 font-mono text-sm">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-2xl shadow-blue-500/30">
              <div className="p-12">
                <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
                  Projenizi Hayata Geçirmek İster misiniz?
                </h2>
                <p className="text-xl font-mono mb-8 opacity-90">
                  Deneyimli ekibimiz ile projelerinizi başarıyla tamamlayalım
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 hover:bg-slate-100 font-mono py-4 px-8 rounded-lg transition-colors duration-200 font-semibold">
                    Ücretsiz Danışmanlık
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-mono py-4 px-8 rounded-lg transition-colors duration-200 font-semibold">
                    İletişime Geç
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
