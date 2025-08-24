'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Building,
  Globe,
  Users
} from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';
import Typewriter from '@/components/ui/Typewriter';
import NeuralNetwork from '@/components/ui/NeuralNetwork';
import { contactApi, ContactFormData } from '@/lib/api';
import { useLoadingState } from '@/lib/useLoadingState';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { isLoading, error, isSuccess, execute } = useLoadingState();
  const { success, error: showError } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'İsim alanı zorunludur';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'İsim en az 2 karakter olmalıdır';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'İsim en fazla 50 karakter olabilir';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Konu alanı zorunludur';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Konu en az 5 karakter olmalıdır';
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Konu en fazla 100 karakter olabilir';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj alanı zorunludur';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Mesaj en fazla 1000 karakter olabilir';
    }

    // Phone validation (optional)
    if (formData.phone && formData.phone.trim() && !/^(\+90|0)?[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Geçerli bir Türk telefon numarası giriniz (örn: 05551234567)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!validateForm()) {
      return;
    }
    
    await execute(
      () => contactApi.submit(formData),
      {
        onSuccess: (result) => {
          success('Başarılı!', result.message || 'Mesajınız başarıyla gönderildi!');
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setErrors({});
        },
        onError: (error) => {
          showError('Hata!', 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        },
        retryOnError: true,
      }
    );
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'E-posta',
      value: 'info@gullapyazilim.com',
      description: '7/24 e-posta desteği'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      value: '+90 (212) 555 0123',
      description: 'Pazartesi - Cuma 09:00-18:00'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Adres',
      value: 'İstanbul, Türkiye',
      description: 'Merkez ofis'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Çalışma Saatleri',
      value: '09:00 - 18:00',
      description: 'Pazartesi - Cuma'
    }
  ];

  const companyInfo = [
    {
      icon: <Building className="w-6 h-6" />,
      title: 'Şirket',
      value: 'Güllap Yazılım',
      description: 'Yazılım geliştirme şirketi'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Website',
      value: 'gullapyazilim.com',
      description: 'Resmi web sitesi'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Ekip',
      value: '10+ Uzman',
      description: 'Deneyimli geliştirici ekibi'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NeuralNetwork />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <GlitchText 
                text="İletişime" 
                className="text-blue-600"
              />
              <span className="text-slate-800 ml-3">Geçin</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typewriter
              text="Projeleriniz için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaya hazır!"
              className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              loop={false}
            />
          </motion.div>
        </div>
      </section>

      {/* İletişim Bilgileri ve Form */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">


          {/* İki Kolonlu Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Sol Kolon: İletişim Kartları */}
            <div className="space-y-8">
              {/* İletişim Bilgileri Kartları */}
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center lg:text-left">İletişim Bilgileri</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="h-full hover:shadow-lg transition-shadow bg-white rounded-lg border border-slate-200 p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                            {info.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-800 mb-1">{info.title}</h4>
                            <p className="text-slate-700 font-medium text-sm mb-1">{info.value}</p>
                            <p className="text-xs text-slate-500">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Şirket Bilgileri Kartları */}
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center lg:text-left">Şirket Bilgileri</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {companyInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
                    >
                      <div className="h-full hover:shadow-lg transition-shadow bg-white rounded-lg border border-slate-200 p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                            {info.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-800 mb-1">{info.title}</h4>
                            <p className="text-slate-700 font-medium text-sm mb-1">{info.value}</p>
                            <p className="text-xs text-slate-500">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Kolon: İletişim Formu */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center lg:text-left mb-8"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Mesaj Gönderin</h3>
                <p className="text-slate-600">Projeleriniz hakkında bizimle iletişime geçin</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Ad Soyad *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Adınız ve soyadınız"
                          className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                            errors.name 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                          } text-slate-800`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          E-posta *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="ornek@email.com"
                          className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                            errors.email 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                          } text-slate-800`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                          Telefon (Opsiyonel)
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0555 123 45 67"
                          className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                            errors.phone 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                          } text-slate-800`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                          Konu *
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Mesaj konusu"
                          className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                            errors.subject 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                          } text-slate-800`}
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Mesaj *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Projeniz hakkında detayları yazın..."
                        className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:outline-none transition-colors resize-none ${
                          errors.message 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                        } text-slate-800`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        * Zorunlu alanlar
                      </span>
                      
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors font-medium"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Gönderiliyor...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="w-4 h-4 mr-2" />
                            Mesaj Gönder
                          </div>
                        )}
                      </button>
                    </div>
                    
                    {/* API Error Display */}
                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Projelerinizi Hayata Geçirelim
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Uzman ekibimizle tanışın ve projelerinizi birlikte geliştirelim
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-colors font-medium text-lg"
                onClick={() => window.location.href = '/services'}
              >
                Hizmetlerimizi İnceleyin
              </button>
              <button
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-colors font-medium text-lg"
                onClick={() => window.location.href = '/about'}
              >
                Hakkımızda
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
