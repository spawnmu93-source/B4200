import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Building2, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  FileText,
  CheckSquare,
  Square
} from 'lucide-react';
import { api } from '../services/api';

export default function CampConfigurator() {
  const { t, i18n } = useTranslation();

  const servicesList = [
    { id: 'accommodation', label: t('configurator.services_options.accommodation') },
    { id: 'catering', label: t('configurator.services_options.catering') },
    { id: 'cleaning', label: t('configurator.services_options.cleaning') },
    { id: 'energy', label: t('configurator.services_options.energy') },
    { id: 'water', label: t('configurator.services_options.water') },
    { id: 'internet', label: t('configurator.services_options.internet') },
    { id: 'waste', label: t('configurator.services_options.waste') },
    { id: 'logistics', label: t('configurator.services_options.logistics') },
    { id: 'health', label: t('configurator.services_options.health') },
    { id: 'security', label: t('configurator.services_options.security') },
    { id: 'ops_control', label: t('configurator.services_options.ops_control') },
    { id: 'other', label: t('configurator.services_options.other') }
  ];

  const peoplePresets = [20, 40, 80, 150, 300];

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    estimated_people: '',
    location: '',
    duration: '',
    services: ['accommodation', 'catering', 'cleaning', 'energy'],
    phone: '',
    email: '',
    notes: '',
    website_url_hp: ''
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleService = (serviceId) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceId);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== serviceId) };
      } else {
        return { ...prev, services: [...prev.services, serviceId] };
      }
    });
  };

  const handleSelectAllServices = () => {
    if (formData.services.length === servicesList.length) {
      setFormData({ ...formData, services: [] });
    } else {
      setFormData({ ...formData, services: servicesList.map((s) => s.id) });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.services.length === 0) {
      setErrorMessage(i18n.language.startsWith('es') 
        ? 'Por favor seleccione al menos un servicio de interés.' 
        : 'Please select at least one service of interest.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        estimated_people: parseInt(formData.estimated_people, 10),
        language: i18n.language || 'es'
      };

      const data = await api.submitCampInquiry(payload);
      setSuccessData(data);
    } catch (err) {
      setErrorMessage(err.message || (i18n.language.startsWith('es') ? 'Error de conexión con el servidor.' : 'Server connection error.'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccessData(null);
    setErrorMessage('');
    setFormData({
      company_name: '',
      contact_person: '',
      estimated_people: '',
      location: '',
      duration: '',
      services: ['accommodation', 'catering', 'cleaning', 'energy'],
      phone: '',
      email: '',
      notes: '',
      website_url_hp: ''
    });
  };

  return (
    <section id="configurador" className="py-20 sm:py-28 bg-[#141619] text-white relative tech-grid-pattern border-t-2 border-[#F3A801]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#202328] border border-[#F3A801]/40 rounded text-xs font-mono font-bold tracking-widest text-[#F3A801] uppercase mb-4 shadow">
            <span className="w-2 h-2 bg-[#F3A801] rounded-full animate-ping" />
            <span>{t('configurator.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase font-display text-white">
            {t('configurator.title')}
          </h2>

          <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-2xl mx-auto">
            {t('configurator.description')}
          </p>
        </div>

        {/* Success Screen */}
        {successData ? (
          <div className="bg-[#202328] border-2 border-[#F3A801] rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl animate-fadeIn">
            <div className="inline-flex p-4 bg-[#F3A801]/10 text-[#F3A801] rounded-full border border-[#F3A801]/30 mb-6">
              <CheckCircle2 className="w-16 h-16" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white mb-2">
              {t('configurator.success_title')}
            </h3>

            <p className="text-sm text-gray-300 mb-6">
              {t('configurator.success_desc')}
            </p>

            <div className="bg-[#141619] border border-[#F3A801]/60 py-3 px-8 rounded-lg inline-block mb-6 font-mono text-2xl sm:text-3xl font-black text-[#F3A801] tracking-widest shadow-inner">
              {successData.inquiry_code || successData.inquiryCode || successData.data?.inquiry_code || successData.data?.inquiryCode || 'B42-4200'}
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mb-8">
              {t('configurator.success_sub')}
            </p>

            <button
              onClick={resetForm}
              className="bg-[#F3A801] hover:bg-[#DE9900] text-[#141619] font-bold text-xs uppercase px-8 py-3.5 rounded tracking-wider transition-all"
            >
              {t('configurator.another_btn')}
            </button>
          </div>
        ) : (
          /* Main Configurator Form */
          <form onSubmit={handleSubmit} className="bg-[#202328] border border-gray-700/80 rounded-xl p-6 sm:p-10 shadow-2xl">
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-900/40 border border-red-500 rounded text-red-200 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Invisible Honeypot */}
            <input
              type="text"
              name="website_url_hp"
              value={formData.website_url_hp}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {/* STEP 1: Operation & Location Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 pb-3 mb-6 border-b border-gray-700">
                <span className="text-xs font-mono font-bold text-[#F3A801]">01.</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {t('configurator.step1_title')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Empresa */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#F3A801]" />
                    <span>{t('configurator.company')}</span>
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    required
                    placeholder={t('configurator.company_ph')}
                    value={formData.company_name}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:ring-1 focus:ring-[#F3A801] focus:outline-none transition-all"
                  />
                </div>

                {/* Responsable */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#F3A801]" />
                    <span>{t('configurator.contact_name')}</span>
                  </label>
                  <input
                    type="text"
                    name="contact_person"
                    placeholder={t('configurator.contact_name_ph')}
                    value={formData.contact_person}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:ring-1 focus:ring-[#F3A801] focus:outline-none transition-all"
                  />
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F3A801]" />
                    <span>{t('configurator.location')}</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder={t('configurator.location_ph')}
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:ring-1 focus:ring-[#F3A801] focus:outline-none transition-all"
                  />
                </div>

                {/* Duración */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F3A801]" />
                    <span>{t('configurator.duration')}</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    placeholder={t('configurator.duration_ph')}
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:ring-1 focus:ring-[#F3A801] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Cantidad de personas con presets */}
              <div className="mt-6">
                <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#F3A801]" />
                  <span>{t('configurator.estimated_people')}</span>
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  {peoplePresets.map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setFormData({ ...formData, estimated_people: qty.toString() })}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all ${
                        formData.estimated_people === qty.toString()
                          ? 'bg-[#F3A801] text-[#141619] font-bold'
                          : 'bg-[#141619] border border-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {qty} {t('configurator.pax')}
                    </button>
                  ))}

                  <div className="flex-1 min-w-[140px]">
                    <input
                      type="number"
                      name="estimated_people"
                      min="1"
                      required
                      placeholder={t('configurator.estimated_people_ph')}
                      value={formData.estimated_people}
                      onChange={handleChange}
                      className="w-full bg-[#141619] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Matrix of Services Required */}
            <div className="mb-8">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F3A801]">02.</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    {t('configurator.step2_title')}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleSelectAllServices}
                  className="text-[11px] font-mono text-[#F3A801] hover:underline"
                >
                  {formData.services.length === servicesList.length ? t('configurator.unselect_all') : t('configurator.select_all')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {servicesList.map((service) => {
                  const isSelected = formData.services.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#F3A801]/10 border-[#F3A801] text-white shadow-md'
                          : 'bg-[#141619] border-gray-800 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <div className={`p-1 rounded ${isSelected ? 'text-[#F3A801]' : 'text-gray-600'}`}>
                        {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {service.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Contact Channels & Notes */}
            <div className="mb-8">
              <div className="flex items-center gap-2 pb-3 mb-6 border-b border-gray-700">
                <span className="text-xs font-mono font-bold text-[#F3A801]">03.</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {t('configurator.step3_title')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Telefono */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#F3A801]" />
                    <span>{t('configurator.phone')}</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={t('configurator.phone_ph')}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#F3A801]" />
                    <span>{t('configurator.email')}</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t('configurator.email_ph')}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#141619] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:outline-none"
                  />
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#F3A801]" />
                  <span>{t('configurator.notes')}</span>
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder={t('configurator.notes_ph')}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-[#141619] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#F3A801] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-400">
                {t('configurator.privacy_note')}
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#F3A801] hover:bg-[#DE9900] disabled:bg-gray-600 text-[#141619] font-extrabold text-xs sm:text-sm uppercase px-10 py-4 rounded shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 tracking-wider"
              >
                <span>{loading ? t('configurator.sending') : t('configurator.submit')}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
