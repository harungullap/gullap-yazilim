'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight
} from 'lucide-react';

import Logo from '@/components/ui/Logo';

const footerLinks = {
  hizmetler: [
    { name: 'Masaüstü Yazılım', href: '/services' },
    { name: 'Web Yazılım', href: '/services' },
    { name: 'Web Tasarımı', href: '/services' },
    { name: 'Mobil Yazılım', href: '/services' }
  ],
  sirket: [
    { name: 'Hakkımızda', href: '/about' },
    { name: 'Ekibimiz', href: '/about/team' },
    { name: 'Kariyer', href: '/careers' },
    { name: 'S.S.S', href: '/faq' },
    { name: 'İletişim', href: '/contact' }
  ],
  destek: [
    { name: 'Dokümantasyon', href: '/docs' },
    { name: 'API Referansı', href: '/api-docs' },
    { name: 'Topluluk', href: '/community' },
    { name: 'Destek Merkezi', href: '/support' },
    { name: 'Durum Sayfası', href: '/status' }
  ],
  yasal: [
    { name: 'Gizlilik Politikası', href: '/privacy' },
    { name: 'Kullanım Şartları', href: '/terms' },
    { name: 'KVKK', href: '/kvkk' },
    { name: 'Çerez Politikası', href: '/cookies' }
  ]
};



export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-blue-200 relative z-20">
      {/* Main Footer Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo Section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 mb-6 lg:mb-0">
              <Link href="/" className="inline-block mb-4">
                <Logo size="lg" variant="default" />
              </Link>
              <p className="text-slate-600 font-mono text-sm leading-relaxed max-w-xs mb-6">
                <span className="text-blue-600">&lt;</span>
                Modern yazılım çözümleri ile işletmenizi dijital dünyada öne çıkarıyoruz.
                <span className="text-blue-600">/&gt;</span>
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-600 font-mono text-sm">info@gullapsoftware.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-600 font-mono text-sm">WhatsApp: 0530 952 7013</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-600 font-mono text-sm">Kocaeli, Türkiye</span>
                </div>
              </div>
            </div>

            {/* Hizmetler */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-mono mb-4 flex items-center">
                {/* <Code className="w-5 h-5 mr-2 text-blue-600" /> */}
                Hizmetler
              </h3>
              <ul className="space-y-2">
                {footerLinks.hizmetler.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-mono text-sm hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Şirket */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-mono mb-4 flex items-center">
                {/* <Terminal className="w-5 h-5 mr-2 text-blue-600" /> */}
                Şirket
              </h3>
              <ul className="space-y-2">
                {footerLinks.sirket.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-mono text-sm hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destek */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-mono mb-4 flex items-center">
                {/* <Database className="w-5 h-5 mr-2 text-blue-600" /> */}
                Destek
              </h3>
              <ul className="space-y-2">
                {footerLinks.destek.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-mono text-sm hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>


        </div>
      </section>

      {/* Bottom Footer */}
      <div className="border-t border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <p className="text-sm text-slate-500 font-mono">
                <span className="text-blue-600">©</span> {currentYear} Güllap Yazılım. 
                <span className="text-blue-600"> {'//'} </span>
                Tüm hakları saklıdır.
              </p>

              {/* Legal Links */}
              <div className="flex space-x-6 text-sm">
                {footerLinks.yasal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors duration-200 font-mono hover:underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}