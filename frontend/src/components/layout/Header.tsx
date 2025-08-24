/**
 * Header Component
 * 
 * Bu component sitenin üst kısmında yer alan navigation bar'ı içerir.
 * Logo, menü linkleri ve mobil hamburger menü bulunur.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import Logo from '@/components/ui/Logo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hizmetlerimiz', href: '/services' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'S.S.S', href: '/faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-sm border-b border-blue-200 shadow-sm pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center pointer-events-auto">
            <Logo size="md" variant="default" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 pointer-events-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-slate-700 hover:text-blue-600 font-mono text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50 pointer-events-auto"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block pointer-events-auto">
            <Link href="/contact" className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-mono font-medium text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-blue-500/20 hover:border-blue-400/30 pointer-events-auto">
              İletişime Geç
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden pointer-events-auto">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-600 hover:text-blue-600 p-2 rounded-md transition-colors duration-200 pointer-events-auto"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-blue-200 pointer-events-auto"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6 space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-slate-600 hover:text-blue-600 py-2 text-base font-mono pointer-events-auto"
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile CTA Button */}
                <div className="pt-4">
                  <Link 
                    href="/contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-mono font-medium text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-blue-500/20 hover:border-blue-400/30 pointer-events-auto"
                  >
                    İletişime Geç
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
