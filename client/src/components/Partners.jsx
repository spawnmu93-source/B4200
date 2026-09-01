import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';
import SupplierModal from './SupplierModal';

export default function Partners() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="aliados" className="py-16 sm:py-20 bg-[#F4F5F7] text-[#141619] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1 w-6 bg-[#F3A801]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#202328] uppercase">
              {t('partners.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#202328] uppercase font-display leading-tight">
            {t('partners.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#686C6F] mt-2 leading-relaxed">
            {t('partners.description')}
          </p>
        </div>

        {/* Supplier Onboarding Box */}
        <div className="bg-[#202328] text-white p-8 sm:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border-l-4 border-[#F3A801]">
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
            className="inline-flex items-center gap-2 bg-[#F3A801] hover:bg-[#DE9900] text-[#141619] font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition-all whitespace-nowrap tracking-wider shrink-0 font-mono shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
