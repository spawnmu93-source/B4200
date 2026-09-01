import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Handshake, UserPlus, CheckCircle } from 'lucide-react';
import SupplierModal from './SupplierModal';

export default function Partners() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const categories = t('partners.categories', { returnObjects: true }) || [];

  return (
    <section id="aliados" className="py-20 sm:py-24 bg-[#F4F5F7] text-[#141619] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1 w-6 bg-[#F3A801]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#202328] uppercase">
              {t('partners.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202328] uppercase font-display">
            {t('partners.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#686C6F] mt-2">
            {t('partners.description')}
          </p>
        </div>

        {/* Partner Capability Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Array.isArray(categories) && categories.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#1766A3] mb-3">
                  <Handshake className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                    {t('partners.certified_badge')}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#202328] uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#686C6F]">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-green-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t('partners.audit_badge')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary CTA: Supplier Onboarding Box */}
        <div className="bg-[#202328] text-white p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide font-display text-white">
              {t('partners.invite_title')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              {t('partners.invite_subtitle')}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border-2 border-[#F3A801] text-[#F3A801] hover:text-white font-bold text-xs uppercase px-6 py-3 rounded transition-all whitespace-nowrap tracking-wider shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('partners.supplier_cta')}</span>
          </button>
        </div>

      </div>

      {/* Supplier Application Modal */}
      <SupplierModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
