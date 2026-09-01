import React from 'react';
import { useTranslation } from 'react-i18next';
import modelVertical from '../assets/model-vertical.png';

export default function Presentation() {
  const { t } = useTranslation();

  return (
    <section id="quienes-somos" className="py-20 sm:py-28 bg-[#FFFFFF] text-[#141619] relative border-b border-gray-200">
      {/* Anchor for backwards compatibility */}
      <div id="presentacion" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Technical Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1 w-6 bg-[#F3A801]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#202328] uppercase">
              {t('presentation.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#202328] uppercase font-display leading-tight">
            {t('presentation.title')}
          </h2>

          <p className="text-sm sm:text-base font-bold text-[#F3A801] tracking-widest uppercase mt-2">
            {t('presentation.subtitle')}
          </p>
        </div>

        {/* 2-Column High Contrast Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptive Content */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl text-[#202328] font-medium leading-relaxed">
              {t('presentation.text')}
            </p>

            <div className="bg-[#202328] text-white p-6 sm:p-8 rounded-xl border-l-4 border-[#F3A801] shadow-xl">
              <p className="text-base sm:text-lg font-bold tracking-wide uppercase text-gray-100 font-display">
                {t('presentation.subtext')}
              </p>
            </div>
          </div>

          {/* Right Column: Visual Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#202328]">
              <img
                src={modelVertical}
                alt="Operario BASE 4.200 en terreno"
                className="w-full h-auto object-cover max-h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-[#141619]/40 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#F3A801] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#F3A801]">
                    {t('presentation.photo_badge')}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold uppercase font-display text-white tracking-wide leading-snug">
                  {t('presentation.photo_text')}
                </p>
              </div>
            </div>

            {/* Subtle technical background grid accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F3A801]/10 -z-10 rounded-2xl border border-[#F3A801]/30" />
          </div>

        </div>

      </div>
    </section>
  );
}
