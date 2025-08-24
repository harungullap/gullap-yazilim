'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from 'flowbite-react';
import { 
  ChevronDown, 
  Search, 
  Code, 
  Clock, 
  DollarSign, 
  Shield, 
  Users,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';
import Typewriter from '@/components/ui/Typewriter';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Yazılım Geliştirme Süreci
  {
    id: 'dev-process-1',
    question: 'Yazılım geliştirme süreci nasıl işliyor?',
    answer: 'Projelerimizde Agile metodolojisi kullanıyoruz. İlk olarak ihtiyaç analizi yapıyor, sonra tasarım, geliştirme, test ve deployment aşamalarını takip ediyoruz. Her aşamada müşteri geri bildirimi alarak projeyi şekillendiriyoruz.',
    category: 'development'
  },
  {
    id: 'dev-process-2',
    question: 'Proje süresi ne kadar sürer?',
    answer: 'Proje süresi projenin kapsamına göre değişir. Basit web siteleri 2-4 hafta, karmaşık web uygulamaları 2-4 ay, mobil uygulamalar 3-6 ay sürebilir. Detaylı süre analizi için ücretsiz danışmanlık veriyoruz.',
    category: 'development'
  },
  {
    id: 'dev-process-3',
    question: 'Hangi teknolojileri kullanıyorsunuz?',
    answer: 'Modern ve güncel teknolojiler kullanıyoruz: React, Next.js, Node.js, Python, .NET, Flutter, React Native. Proje ihtiyaçlarına göre en uygun teknoloji stack\'ini seçiyoruz.',
    category: 'development'
  },
  {
    id: 'dev-process-4',
    question: 'Kod kalitesi nasıl sağlanıyor?',
    answer: 'Kod kalitesi için code review, unit testing, integration testing ve automated testing kullanıyoruz. Ayrıca coding standards ve best practices uygulayarak sürdürülebilir kod yazıyoruz.',
    category: 'development'
  },

  // Proje Yönetimi
  {
    id: 'project-mgmt-1',
    question: 'Proje yönetimi nasıl yapılıyor?',
    answer: 'Proje yönetiminde Jira, Trello gibi araçlar kullanıyoruz. Düzenli toplantılar, progress raporları ve milestone takibi ile projeleri şeffaf bir şekilde yönetiyoruz.',
    category: 'project-management'
  },
  {
    id: 'project-mgmt-2',
    question: 'Müşteri ile iletişim nasıl sağlanıyor?',
    answer: 'Haftalık progress raporları, aylık toplantılar ve gerektiğinde anlık iletişim için WhatsApp, email ve video konferans araçları kullanıyoruz.',
    category: 'project-management'
  },
  {
    id: 'project-mgmt-3',
    question: 'Proje değişiklikleri nasıl yönetiliyor?',
    answer: 'Change request süreci ile değişiklikleri yönetiyoruz. Küçük değişiklikler ücretsiz, büyük değişiklikler için ek süre ve maliyet analizi yapıyoruz.',
    category: 'project-management'
  },

  // Teknik Destek
  {
    id: 'support-1',
    question: 'Teknik destek hizmeti nasıl?',
    answer: 'Proje tesliminden sonra 1 yıl ücretsiz teknik destek veriyoruz. Acil durumlar için 24/7 destek, normal durumlar için iş günleri içinde 8 saat yanıt süresi garantisi veriyoruz.',
    category: 'support'
  },
  {
    id: 'support-2',
    question: 'Bakım ve güncelleme hizmeti var mı?',
    answer: 'Evet, bakım ve güncelleme hizmeti sunuyoruz. Güvenlik güncellemeleri, performans iyileştirmeleri ve yeni özellik ekleme konularında destek veriyoruz.',
    category: 'support'
  },
  {
    id: 'support-3',
    question: 'Eğitim ve dokümantasyon sağlıyor musunuz?',
    answer: 'Evet, proje tesliminde kullanıcı eğitimi ve teknik dokümantasyon sağlıyoruz. Video eğitimler, kullanım kılavuzları ve API dokümantasyonu hazırlıyoruz.',
    category: 'support'
  },

  // Fiyatlandırma
  {
    id: 'pricing-1',
    question: 'Fiyatlandırma nasıl belirleniyor?',
    answer: 'Fiyatlandırma proje kapsamı, karmaşıklığı, süresi ve kullanılan teknolojilere göre belirleniyor. Detaylı analiz sonrası net fiyat teklifi veriyoruz.',
    category: 'pricing'
  },
  {
    id: 'pricing-2',
    question: 'Ödeme planı nasıl?',
    answer: 'Proje başlangıcında %30, geliştirme aşamasında %40, teslimde %30 ödeme planı uyguluyoruz. Büyük projeler için özel ödeme planları da sunuyoruz.',
    category: 'pricing'
  },
  {
    id: 'pricing-3',
    question: 'Gizli maliyetler var mı?',
    answer: 'Hayır, tüm maliyetler önceden belirtiliyor. Hosting, domain, SSL gibi ek maliyetler varsa önceden bilgilendiriyoruz. Şeffaf fiyatlandırma politikası uyguluyoruz.',
    category: 'pricing'
  },

  // Güvenlik ve Kalite
  {
    id: 'security-1',
    question: 'Güvenlik standartları nasıl?',
    answer: 'OWASP güvenlik standartlarına uygun geliştirme yapıyoruz. SQL injection, XSS, CSRF gibi güvenlik açıklarını önliyoruz. Güvenlik testleri ve penetration testing yapıyoruz.',
    category: 'security'
  },
  {
    id: 'security-2',
    question: 'Veri güvenliği nasıl sağlanıyor?',
    answer: 'Veri şifreleme, güvenli API endpoints, role-based access control ve düzenli güvenlik güncellemeleri ile veri güvenliğini sağlıyoruz.',
    category: 'security'
  },
  {
    id: 'security-3',
    question: 'GDPR uyumluluğu sağlanıyor mu?',
    answer: 'Evet, GDPR ve KVKK uyumluluğu için gerekli önlemleri alıyoruz. Veri işleme, saklama ve silme konularında yasal gerekliliklere uygun çözümler sunuyoruz.',
    category: 'security'
  }
];

const categories = [
  { id: 'all', name: 'Tümü', icon: Search, count: faqData.length },
  { id: 'development', name: 'Geliştirme Süreci', icon: Code, count: faqData.filter(f => f.category === 'development').length },
  { id: 'project-management', name: 'Proje Yönetimi', icon: Clock, count: faqData.filter(f => f.category === 'project-management').length },
  { id: 'support', name: 'Teknik Destek', icon: Users, count: faqData.filter(f => f.category === 'support').length },
  { id: 'pricing', name: 'Fiyatlandırma', icon: DollarSign, count: faqData.filter(f => f.category === 'pricing').length },
  { id: 'security', name: 'Güvenlik & Kalite', icon: Shield, count: faqData.filter(f => f.category === 'security').length }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

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
              <span className="text-blue-600">Sıkça</span> <GlitchText text="Sorulan Sorular" />
            </h1>
            <p className="text-xl text-slate-600 font-mono max-w-3xl mx-auto">
              <Typewriter 
                text="Yazılım geliştirme sürecimiz, proje yönetimi ve hizmetlerimiz hakkında merak edilen soruları yanıtlıyoruz."
                speed={50}
                loop={false}
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Categories Section */}
      <section className="relative z-10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Sorularınızı arayın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono bg-white text-slate-800 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left flex items-center justify-between p-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 font-mono pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
                        openItems.includes(faq.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-slate-600 font-mono leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 font-mono mb-2">
                Sonuç Bulunamadı
              </h3>
              <p className="text-slate-500 font-mono">
                Arama kriterlerinize uygun soru bulunamadı. Farklı anahtar kelimeler deneyin veya kategorileri değiştirin.
              </p>
            </motion.div>
          )}
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
                  Hala Sorunuz mu Var?
                </h2>
                <p className="text-xl font-mono mb-8 opacity-90">
                  Uzman ekibimiz size yardımcı olmaya hazır
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 hover:bg-slate-100 font-mono py-4 px-8 rounded-lg transition-colors duration-200 font-semibold">
                    İletişime Geç
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-mono py-4 px-8 rounded-lg transition-colors duration-200 font-semibold">
                    Ücretsiz Danışmanlık
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
