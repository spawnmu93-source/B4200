import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown, Mountain, Compass, ShieldCheck } from 'lucide-react';
import heroBg from '../assets/hero-bg-horizontal.png';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#141619] overflow-hidden pt-20">
      {/* High-resolution Background with Multi-layer Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="BASE 4.200 High Altitude Remote Camp"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Technical overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-[#141619]/75 to-[#141619]/80" />
        <div className="absolute inset-0 bg-[#202328]/40 mix-blend-multiply" />
        <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center sm:text-left flex flex-col justify-center">
        
        {/* Technical Badge with Chevrons */}
        <div className="inline-flex items-center gap-3 self-center sm:self-start bg-[#202328]/90 border border-gray-700/80 px-3.5 py-1.5 rounded text-xs font-mono tracking-widest text-gray-300 uppercase backdrop-blur-sm mb-6 shadow-md">
          <div className="chevron-indicator">
            <span />
            <span />
            <span />
          </div>
          <span className="font-semibold text-white">{t('hero.elevation_badge')}</span>
        </div>

        {/* Main Claim */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1] mb-4">
          {t('hero.claim')}
        </h1>

        {/* Conceptual Signature */}
        <div className="border-l-0 sm:border-l-4 sm:border-[#F3A801] sm:pl-4 mb-6">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F3A801] uppercase tracking-wide">
            {t('hero.tagline')}
          </p>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mt-2 font-normal">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 pt-2">
          <a
            href="#configurador"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#F3A801] hover:bg-[#DE9900] text-[#141619] font-bold text-xs sm:text-sm uppercase px-8 py-4 rounded shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 tracking-wider"
          >
            <span>{t('hero.cta')}</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#soluciones"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#202328]/80 hover:bg-[#202328] border border-gray-700 text-white font-semibold text-xs sm:text-sm uppercase px-6 py-4 rounded transition-colors backdrop-blur-sm tracking-wider"
          >
            <span>{t('hero.solutions_btn')}</span>
          </a>
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 sm:mt-16 pt-8 border-t border-gray-800/80 max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#202328] border border-gray-700 rounded text-[#F3A801]">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-gray-400">{t('hero.context_title')}</p>
              <p className="text-sm font-semibold text-white">{t('hero.context_desc')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#202328] border border-gray-700 rounded text-[#F3A801]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-gray-400">{t('hero.model_title')}</p>
              <p className="text-sm font-semibold text-white">{t('hero.model_desc')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#202328] border border-gray-700 rounded text-[#F3A801]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-gray-400">{t('hero.backing_title')}</p>
              <p className="text-sm font-semibold text-white">{t('hero.backing_desc')}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <a href="#presentacion" aria-label="Scroll down">
          <ChevronDown className="w-6 h-6 text-[#F3A801] animate-bounce" />
        </a>
      </div>
    </section>
  );
}
