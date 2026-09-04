import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import logoVerticalWhite from '../assets/logo-vertical-compact-white.svg';

export default function ContactFooter({ onOpenAdmin }) {
  const { t } = useTranslation();

  const whatsappUrl = "https://wa.me/5493804670111?text=Hola,%20deseo%20realizar%20una%20consulta%20técnica%20sobre%20BASE%204.200";

  return (
    <>
      <footer id="contacto" className="bg-[#141619] text-white pt-20 pb-12 border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-16 border-b border-gray-800 items-center">
            
            {/* Column 1 (Left): Prominent Vertical Logo Showcase */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-[#191B1F]/80 p-6 sm:p-7 rounded-2xl border border-gray-800 shadow-2xl">
              
              {/* Highlighted Vertical Logo */}
              <div className="bg-[#202328] p-5 sm:p-6 rounded-2xl border border-gray-700/90 shrink-0 shadow-2xl flex items-center justify-center group hover:border-[#F3A801]/40 transition-colors">
                <img 
                  src={logoVerticalWhite} 
                  alt="BASE 4.200 Logo Oficial" 
                  className="h-48 sm:h-56 md:h-60 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-105"
                />
              </div>

              {/* Descriptive Content */}
              <div className="space-y-4 text-center sm:text-left flex-1 py-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#202328] border border-gray-700 rounded text-xs font-mono text-[#F3A801] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#F3A801] animate-pulse" />
                  <span>UNIDAD ESPECIALIZADA OBEMA</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {t('contact.banner_text')}
                </p>

                <div className="pt-2">
                  <a
                    href="https://www.base4200.com.ar"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F3A801] hover:text-[#DE9900] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3A801]" />
                    <span>www.base4200.com.ar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 (Middle): Direct Contact Details */}
            <div className="lg:col-span-3 space-y-5 sm:pl-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#F3A801] font-mono border-b border-gray-800 pb-2">
                {t('contact.title')}
              </h4>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Oficina */}
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-[#F3A801] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white uppercase text-xs">{t('contact.hq_title')}</p>
                    <p className="text-gray-400 mt-0.5 text-xs">{t('contact.hq_address')}</p>
                  </div>
                </div>

                {/* Telefono */}
                <div className="flex items-start gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-[#F3A801] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white uppercase text-xs">{t('contact.phone_label')}</p>
                    <a href="tel:+54380154670111" className="text-gray-400 hover:text-white transition-colors block mt-0.5 font-mono text-xs">
                      +54 (0380) 154670111
                    </a>
                  </div>
                </div>

                {/* Email - mariana.rojo@obema.com */}
                <div className="flex items-start gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-[#F3A801] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white uppercase text-xs">{t('contact.email_label')}</p>
                    <a href="mailto:mariana.rojo@obema.com" className="text-gray-400 hover:text-[#F3A801] transition-colors block mt-0.5 text-xs font-mono">
                      mariana.rojo@obema.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3 (Right): Fast Action & WhatsApp */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#F3A801] font-mono border-b border-gray-800 pb-2">
                {t('contact.ops_title')}
              </h4>

              <p className="text-xs text-gray-300 leading-relaxed">
                {t('contact.ops_desc')}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase px-5 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 tracking-wider font-mono"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('contact.whatsapp_btn')}</span>
              </a>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>
              © {new Date().getFullYear()} {t('contact.rights')}
            </p>

            <div className="flex items-center gap-6 font-medium">
              <a href="#quienes-somos" className="hover:text-gray-300 transition-colors">
                {t('nav.about')}
              </a>
              <a href="#soluciones" className="hover:text-gray-300 transition-colors">
                {t('nav.solutions')}
              </a>
              <a href="#respaldo" className="hover:text-gray-300 transition-colors">
                {t('nav.backing')}
              </a>
              <a href="#configurador" className="hover:text-gray-300 transition-colors">
                {t('nav.configure_cta')}
              </a>
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#F3A801] transition-colors underline"
              >
                {t('contact.link_admin')}
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Discrete Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}
