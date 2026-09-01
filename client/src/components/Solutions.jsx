import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Utensils, 
  Sparkles, 
  Zap, 
  Droplets, 
  Wifi, 
  Trash2, 
  Truck, 
  HeartPulse, 
  ShieldCheck, 
  Activity,
  ArrowRight
} from 'lucide-react';

export default function Solutions() {
  const { t } = useTranslation();

  const primaryServices = [
    {
      number: '01',
      title: t('solutions.p1_title'),
      desc: t('solutions.p1_desc'),
      icon: Home
    },
    {
      number: '02',
      title: t('solutions.p2_title'),
      desc: t('solutions.p2_desc'),
      icon: Utensils
    },
    {
      number: '03',
      title: t('solutions.p3_title'),
      desc: t('solutions.p3_desc'),
      icon: Sparkles
    }
  ];

  const supportServices = [
    { id: 'energy', name: t('solutions.s_energy'), desc: t('solutions.s_energy_desc'), icon: Zap },
    { id: 'water', name: t('solutions.s_water'), desc: t('solutions.s_water_desc'), icon: Droplets },
    { id: 'internet', name: t('solutions.s_internet'), desc: t('solutions.s_internet_desc'), icon: Wifi },
    { id: 'waste', name: t('solutions.s_waste'), desc: t('solutions.s_waste_desc'), icon: Trash2 },
    { id: 'logistics', name: t('solutions.s_logistics'), desc: t('solutions.s_logistics_desc'), icon: Truck },
    { id: 'health', name: t('solutions.s_health'), desc: t('solutions.s_health_desc'), icon: HeartPulse },
    { id: 'security', name: t('solutions.s_security'), desc: t('solutions.s_security_desc'), icon: ShieldCheck },
    { id: 'ops', name: t('solutions.s_ops'), desc: t('solutions.s_ops_desc'), icon: Activity },
  ];

  return (
    <section id="soluciones" className="py-20 sm:py-28 bg-[#202328] text-white relative tech-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1 w-6 bg-[#F3A801]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#F3A801] uppercase">
              CAPACIDAD INTEGRAL
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-display">
            {t('solutions.title')}
          </h2>

          <p className="text-sm sm:text-base text-gray-300 mt-2 font-normal">
            {t('solutions.subtitle')}
          </p>
        </div>

        {/* LEVEL 1: Primary Services (3 Symmetrical Cards) */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-700/80">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
              [ {t('solutions.primary_title')} ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {primaryServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.number}
                  className="bg-[#141619] border border-gray-700/80 rounded-2xl p-6 sm:p-8 relative group hover:border-[#F3A801] transition-all duration-300 shadow-xl flex flex-col justify-between h-full"
                >
                  {/* Top indicator & content */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-extrabold font-mono text-[#F3A801]">
                        {service.number}
                      </span>
                      <div className="p-3 bg-[#202328] border border-gray-700 rounded-xl text-[#F3A801] group-hover:scale-110 group-hover:border-[#F3A801]/60 transition-all shadow-md">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide font-display text-white mb-2">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[#F3A801] tracking-wider uppercase leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LEVEL 2: Support Services (8 Symmetrical Clean Cards without SOPORTE text) */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-700/80">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
              [ {t('solutions.support_title')} ]
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 mb-6">
            {t('solutions.support_subtitle')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-[#191B1F] border border-gray-800/90 p-5 rounded-xl hover:border-[#F3A801]/50 transition-all shadow-md flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#202328] border border-gray-700/80 rounded-lg text-[#F3A801] group-hover:scale-105 transition-transform shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-100 font-display">
                      {service.name}
                    </h4>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational Closing Banner */}
        <div className="mt-16 bg-[#141619] border-2 border-[#F3A801] p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <p className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white font-display">
              {t('solutions.closing')}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {t('solutions.closing_subtext')}
            </p>
          </div>

          <a
            href="#configurador"
            className="inline-flex items-center gap-2 bg-[#F3A801] hover:bg-[#DE9900] text-[#141619] font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition-all whitespace-nowrap tracking-wider shrink-0 font-mono shadow-lg"
          >
            <span>{t('solutions.closing_cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
