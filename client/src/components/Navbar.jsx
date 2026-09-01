import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Wrench } from 'lucide-react';
import logoHorizontalWhite from '../assets/logo-horizontal-white.svg';

export default function Navbar({ onOpenAdmin }) {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('base4200_lang', lng);
  };

  const navLinks = [
    { href: '#soluciones', label: t('nav.solutions') },
    { href: '#respaldo', label: t('nav.backing') },
    { href: '#aliados', label: t('nav.partners') },
    { href: '#contacto', label: t('nav.contact') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#141619]/95 backdrop-blur-md border-b border-[#202328] py-3 shadow-xl' 
        : 'bg-gradient-to-b from-[#141619]/95 via-[#141619]/70 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with White BASE text for high contrast */}
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src={logoHorizontalWhite} 
            alt="BASE 4.200 by OBEMA" 
            className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-[#F3A801] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F3A801] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Language Switcher */}
          <div className="flex items-center bg-[#202328] border border-gray-700/80 rounded-md px-2 py-1 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-[#F3A801] mr-1.5" />
            <button
              onClick={() => changeLanguage('es')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                i18n.language.startsWith('es') 
                  ? 'bg-[#F3A801] text-[#141619] font-bold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ES
            </button>
            <span className="text-gray-600 mx-0.5">/</span>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                i18n.language.startsWith('en') 
                  ? 'bg-[#F3A801] text-[#141619] font-bold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* CTA Button */}
          <a
            href="#configurador"
            className="bg-[#F3A801] hover:bg-[#DE9900] text-[#141619] font-bold text-xs uppercase px-5 py-2.5 rounded shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 tracking-wider"
          >
            <span>{t('nav.configure_cta')}</span>
            <span className="text-sm">→</span>
          </a>

          {/* Quick Admin Access icon */}
          <button
            onClick={onOpenAdmin}
            title={t('contact.link_admin')}
            className="text-gray-500 hover:text-[#F3A801] transition-colors p-1.5 rounded hover:bg-[#202328]"
          >
            <Wrench className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center bg-[#202328] border border-gray-700 rounded px-2 py-1 text-xs font-semibold mr-1">
            <button
              onClick={() => changeLanguage('es')}
              className={`px-1 rounded ${i18n.language.startsWith('es') ? 'bg-[#F3A801] text-[#141619] font-bold' : 'text-gray-400'}`}
            >
              ES
            </button>
            <span className="text-gray-600">/</span>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-1 rounded ${i18n.language.startsWith('en') ? 'bg-[#F3A801] text-[#141619] font-bold' : 'text-gray-400'}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white p-2 rounded-lg bg-[#202328] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141619] border-b border-[#202328] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-[#F3A801] hover:bg-[#202328] rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-800">
            <a
              href="#configurador"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#F3A801] hover:bg-[#DE9900] text-[#141619] font-bold text-sm uppercase py-3 rounded shadow transition-colors tracking-wider"
            >
              {t('nav.configure_cta')} →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
