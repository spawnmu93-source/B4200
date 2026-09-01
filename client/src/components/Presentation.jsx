import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layers, Cpu, CheckCircle2 } from 'lucide-react';
import modelVertical from '../assets/model-vertical.png';

export default function Presentation() {
  const { t } = useTranslation();

  return (
    <section id="presentacion" className="py-20 sm:py-28 bg-[#FFFFFF] text-[#141619] relative border-b border-gray-200">
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
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl text-[#202328] font-medium leading-relaxed">
              {t('presentation.text')}
            </p>

            <div className="bg-[#202328] text-white p-6 sm:p-8 rounded-lg border-l-4 border-[#F3A801] shadow-lg">
              <p className="text-base sm:text-lg font-bold tracking-wide uppercase text-gray-100">
                {t('presentation.subtext')}
              </p>
            </div>

            {/* Operational Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#F4F5F7] border border-gray-200 rounded">
                <div className="flex items-center gap-3 mb-2 text-[#202328]">
                  <Layers className="w-5 h-5 text-[#F3A801]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">{t('presentation.infra_title')}</h3>
                </div>
                <p className="text-xs text-[#686C6F] leading-relaxed">
                  {t('presentation.infra_desc')}
                </p>
              </div>

              <div className="p-4 bg-[#F4F5F7] border border-gray-200 rounded">
                <div className="flex items-center gap-3 mb-2 text-[#202328]">
                  <Cpu className="w-5 h-5 text-[#F3A801]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">{t('presentation.services_title')}</h3>
                </div>
                <p className="text-xs text-[#686C6F] leading-relaxed">
                  {t('presentation.services_desc')}
                </p>
              </div>
            </div>

            {/* Technical Verification List */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-semibold text-[#202328]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F3A801]" />
                <span>{t('presentation.pill_1')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F3A801]" />
                <span>{t('presentation.pill_2')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F3A801]" />
                <span>{t('presentation.pill_3')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-[#202328]">
              <img
                src={modelVertical}
                alt="Operario BASE 4.200 en terreno"
                className="w-full h-auto object-cover max-h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#F3A801] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-gray-300">
                    {t('presentation.photo_badge')}
                  </span>
                </div>
                <p className="text-base font-bold uppercase font-display text-white">
                  {t('presentation.photo_text')}
                </p>
              </div>
            </div>

            {/* Subtle technical background grid accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F3A801]/10 -z-10 rounded border border-[#F3A801]/30" />
          </div>

        </div>

      </div>
    </section>
  );
}
