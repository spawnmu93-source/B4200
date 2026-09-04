import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, CheckCircle, AlertCircle, Building2, Phone, Mail, Globe, MapPin, Tag } from 'lucide-react';
import { api } from '../services/api';

export default function SupplierModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    company_name: '',
    category: '',
    services_offered: '',
    coverage_area: '',
    contact_person: '',
    phone: '',
    email: '',
    website: '',
    website_url_hp: '' // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.submitSupplierInquiry(formData);
      setSuccessData(res);
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message || 'Error al procesar la postulación.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setSuccessData(null);
    setErrorMsg('');
    setFormData({
      company_name: '',
      category: '',
      services_offered: '',
      coverage_area: '',
      contact_person: '',
      phone: '',
      email: '',
      website: '',
      website_url_hp: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141619]/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#202328] border-2 border-gray-700 rounded-xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#141619] px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#F3A801] rounded-sm" />
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white font-display">
              {t('supplier_modal.title')}
            </h3>
          </div>

          <button
            onClick={handleResetAndClose}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex p-3 bg-green-500/10 text-green-400 rounded-full border border-green-500/30">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold uppercase text-white font-display">
                Postulación Registrada Exitosamente
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                Hemos generado el código de operación para tu postulación:
              </p>
              <div>
                <div className="bg-[#141619] border border-[#F3A801]/60 py-3 px-8 rounded-lg inline-block font-mono text-2xl sm:text-3xl font-black text-[#F3A801] tracking-widest shadow-inner my-2">
                  {successData?.supplier_code || successData?.supplierCode || successData?.data?.supplier_code || 'PRV-4200'}
                </div>
              </div>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                {t('supplier_modal.success')}
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-4 bg-[#F3A801] hover:bg-[#DE9900] text-[#141619] font-bold text-xs uppercase px-8 py-3.5 rounded tracking-wider transition-all"
              >
                {t('supplier_modal.close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-400 pb-2">
                {t('supplier_modal.subtitle')}
              </p>

              {errorMsg && (
                <div className="p-3 bg-red-900/30 border border-red-500 text-red-300 text-xs rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Honeypot invisible field */}
              <input
                type="text"
                name="website_url_hp"
                value={formData.website_url_hp}
                onChange={handleChange}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Empresa */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                    {t('supplier_modal.company')}
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    required
                    value={formData.company_name}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>

                {/* Rubro */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                    {t('supplier_modal.category')}
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    placeholder={t('supplier_modal.category_ph')}
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>
              </div>

              {/* Servicios Ofrecidos */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                  {t('supplier_modal.services')}
                </label>
                <textarea
                  name="services_offered"
                  rows="2"
                  required
                  value={formData.services_offered}
                  onChange={handleChange}
                  className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Zona de Cobertura */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                    {t('supplier_modal.coverage')}
                  </label>
                  <input
                    type="text"
                    name="coverage_area"
                    required
                    placeholder={t('supplier_modal.coverage_ph')}
                    value={formData.coverage_area}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>

                {/* Persona de Contacto */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                    {t('supplier_modal.contact')}
                  </label>
                  <input
                    type="text"
                    name="contact_person"
                    required
                    value={formData.contact_person}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Telefono */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                    {t('supplier_modal.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                    {t('supplier_modal.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                    {t('supplier_modal.website')}
                  </label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-700">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs uppercase font-bold rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F3A801] hover:bg-[#DE9900] disabled:bg-gray-600 text-[#141619] font-bold text-xs uppercase rounded tracking-wider transition-all"
                >
                  <span>{loading ? t('supplier_modal.sending') : t('supplier_modal.submit')}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
