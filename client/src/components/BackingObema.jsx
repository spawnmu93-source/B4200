import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ExternalLink, Check } from 'lucide-react';
import logoObemaBlue from '../assets/logo-obema-blue.svg';

export default function BackingObema() {
  const { t } = useTranslation();

  return (
    <section id="respaldo" className="py-20 sm:py-24 bg-[#FFFFFF] text-[#141619] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F4F5F7] border border-gray-200 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-md">
          {/* Subtle brand background watermark */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#1766A3]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Endorsement Brand identity with official vector logo */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-gray-300 pb-8 lg:pb-0 lg:pr-8 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1766A3]/10 text-[#1766A3] text-xs font-mono font-bold uppercase rounded mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('backing.badge')}</span>
              </div>

              {/* Official OBEMA Blue Vector Logo */}
              <div className="my-2 py-1 max-w-[240px] sm:max-w-[260px]">
                <img
                  src={logoObemaBlue}
                  alt="OBEMA S.A. Logo Oficial"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform hover:scale-105"
                />
              </div>

              <div className="mt-8 pt-2">
                <a
                  href="https://obema.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1766A3] hover:text-[#125182] uppercase tracking-wider transition-colors group font-mono"
                >
                  <span>{t('backing.button')}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Corporate Backing Narrative */}
            <div className="lg:col-span-8 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202328] uppercase font-display tracking-tight">
                {t('backing.title')}
              </h2>

              <p className="text-sm sm:text-base text-[#4F5356] leading-relaxed font-medium">
                {t('backing.text')}
              </p>

              {/* 3 Pillars of trust (Checklist) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
                  <div className="p-1 bg-[#1766A3] text-white rounded-md mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#202328] font-display">{t('backing.p1_title')}</h4>
                    <p className="text-[11px] text-[#686C6F] font-medium mt-0.5">{t('backing.p1_desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
                  <div className="p-1 bg-[#1766A3] text-white rounded-md mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#202328] font-display">{t('backing.p2_title')}</h4>
                    <p className="text-[11px] text-[#686C6F] font-medium mt-0.5">{t('backing.p2_desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-xl border border-gray-200/80 shadow-sm">
                  <div className="p-1 bg-[#1766A3] text-white rounded-md mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#202328] font-display">{t('backing.p3_title')}</h4>
                    <p className="text-[11px] text-[#686C6F] font-medium mt-0.5">{t('backing.p3_desc')}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
