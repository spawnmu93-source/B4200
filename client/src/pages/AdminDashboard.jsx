import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  LogOut, 
  FileText, 
  Users, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  RefreshCw, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  X,
  ChevronRight,
  Filter
} from 'lucide-react';
import logoHorizontalWhite from '../assets/logo-horizontal-white.svg';
import { api } from '../services/api';

export default function AdminDashboard({ onClose }) {
  const [token, setToken] = useState(localStorage.getItem('base4200_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('inquiries'); // inquiries | suppliers | stats
  const [inquiries, setInquiries] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [statusFilter, setStatusFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Check login on mount
  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, statusFilter, searchTerm]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const data = await api.login(username, password);
      localStorage.setItem('base4200_admin_token', data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('base4200_admin_token');
    setToken('');
  };

  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      // 1. Fetch Stats
      const statsData = await api.getStats(token);
      setStats(statsData);

      // 2. Fetch Inquiries
      const inqData = await api.getInquiries(token, { status: statusFilter, search: searchTerm });
      setInquiries(inqData);

      // 3. Fetch Suppliers
      const supData = await api.getSuppliers(token);
      setSuppliers(supData);

    } catch (err) {
      console.error('Error cargando datos administrativos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    setUpdatingId(inquiryId);
    try {
      await api.updateInquiryStatus(token, inquiryId, newStatus);
      setInquiries(prev => prev.map(item => item.id === inquiryId ? { ...item, status: newStatus } : item));
      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
      // Refresh stats
      const updatedStats = await api.getStats(token);
      setStats(updatedStats);
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSupplierStatusChange = async (supplierId, newStatus) => {
    try {
      await api.updateSupplierStatus(token, supplierId, newStatus);
      setSuppliers(prev => prev.map(item => item.id === supplierId ? { ...item, status: newStatus } : item));
      // Refresh stats
      const updatedStats = await api.getStats(token);
      setStats(updatedStats);
    } catch (err) {
      console.error('Error al actualizar proveedor:', err);
    }
  };

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    const map = {
      nueva: { bg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'NUEVA' },
      contactada: { bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'CONTACTADA' },
      en_analisis: { bg: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: 'EN ANÁLISIS' },
      cerrada: { bg: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'CERRADA' },
      pendiente: { bg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'PENDIENTE' },
      aprobado: { bg: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'APROBADO' },
      descartado: { bg: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'DESCARTADO' },
    };
    const current = map[status] || { bg: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: status };
    return (
      <span className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded border uppercase ${current.bg}`}>
        {current.label}
      </span>
    );
  };

  // If not logged in -> Show Login View
  if (!token) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141619]/90 backdrop-blur-md">
        <div className="w-full max-w-md bg-[#202328] border-2 border-gray-700 rounded-xl p-8 shadow-2xl relative">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <img src={logoHorizontalWhite} alt="BASE 4.200" className="h-10 mx-auto mb-4" />
            <h3 className="text-lg font-bold uppercase font-display text-white tracking-wider">
              PANEL DE ADMINISTRACIÓN
            </h3>
            <p className="text-xs text-gray-400 mt-1">Acceso restringido para el equipo comercial y operativo</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 text-red-300 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                Usuario
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#141619] border border-gray-700 rounded-md pl-10 pr-3 py-2.5 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#141619] border border-gray-700 rounded-md pl-10 pr-3 py-2.5 text-sm text-white focus:border-[#F3A801] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F3A801] hover:bg-[#DE9900] disabled:bg-gray-600 text-[#141619] font-bold text-xs uppercase py-3 rounded tracking-wider transition-all mt-2"
            >
              {loading ? 'AUTENTICANDO...' : 'INGRESAR AL PANEL →'}
            </button>
          </form>

          <p className="text-[11px] text-gray-500 text-center mt-6">
            Credenciales de acceso demo: <span className="font-mono text-gray-300">admin</span> / <span className="font-mono text-gray-300">Base4200@Admin</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#141619] text-white overflow-hidden animate-fadeIn">
      
      {/* Top Bar */}
      <header className="bg-[#202328] border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logoHorizontalWhite} alt="BASE 4.200" className="h-8" />
          <span className="text-xs font-mono font-bold uppercase bg-[#F3A801] text-[#141619] px-2 py-0.5 rounded">
            BACKOFFICE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchDashboardData}
            title="Recargar datos"
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar sesión</span>
          </button>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#191B1F] border-r border-gray-800 p-4 space-y-2 shrink-0">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'inquiries' ? 'bg-[#F3A801] text-[#141619]' : 'text-gray-300 hover:bg-[#202328]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Consultas Campamento</span>
            </div>
            {stats && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'inquiries' ? 'bg-[#141619] text-[#F3A801]' : 'bg-[#202328] text-gray-300'
              }`}>
                {stats.totalInquiries}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('suppliers')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'suppliers' ? 'bg-[#F3A801] text-[#141619]' : 'text-gray-300 hover:bg-[#202328]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Postulaciones Proveedores</span>
            </div>
            {stats && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'suppliers' ? 'bg-[#141619] text-[#F3A801]' : 'bg-[#202328] text-gray-300'
              }`}>
                {stats.totalSuppliers}
              </span>
            )}
          </button>

          <div className="pt-6 border-t border-gray-800 mt-6">
            <p className="text-[10px] font-mono text-gray-500 uppercase px-2 mb-2">Resumen Operativo</p>
            {stats && (
              <div className="space-y-2 text-xs text-gray-400 px-2">
                <div className="flex justify-between">
                  <span>Consultas Nuevas:</span>
                  <span className="font-bold text-[#F3A801]">{stats.newInquiries}</span>
                </div>
                <div className="flex justify-between">
                  <span>Proveedores Pendientes:</span>
                  <span className="font-bold text-white">{stats.pendingSuppliers}</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#141619]">
          
          {/* TAB 1: CAMP INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#202328] p-4 rounded-lg border border-gray-800">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-[#F3A801]" />
                  <span className="text-xs font-bold uppercase text-gray-300">Estado:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#141619] border border-gray-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                  >
                    <option value="todas">Todas</option>
                    <option value="nueva">Nueva</option>
                    <option value="contactada">Contactada</option>
                    <option value="en_analisis">En Análisis</option>
                    <option value="cerrada">Cerrada</option>
                  </select>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar empresa, código, lugar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#141619] border border-gray-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-white focus:border-[#F3A801] focus:outline-none"
                  />
                </div>
              </div>

              {/* Table or Empty Message */}
              {inquiries.length === 0 ? (
                <div className="text-center py-16 bg-[#202328] border border-gray-800 rounded-lg">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">No se encontraron consultas registradas.</p>
                </div>
              ) : (
                <div className="bg-[#202328] border border-gray-800 rounded-lg overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#191B1F] text-gray-400 font-mono uppercase text-[11px] border-b border-gray-800">
                        <tr>
                          <th className="p-3.5">Código</th>
                          <th className="p-3.5">Empresa</th>
                          <th className="p-3.5">Ubicación</th>
                          <th className="p-3.5">PAX</th>
                          <th className="p-3.5">Contacto</th>
                          <th className="p-3.5">Estado</th>
                          <th className="p-3.5 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800 text-gray-200">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-[#2A2E35] transition-colors">
                            <td className="p-3.5 font-mono font-bold text-[#F3A801]">
                              {inq.inquiry_code}
                            </td>
                            <td className="p-3.5 font-bold text-white">
                              {inq.company_name}
                              {inq.contact_person && (
                                <span className="block text-[11px] font-normal text-gray-400">
                                  {inq.contact_person}
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-gray-300">
                              {inq.location}
                            </td>
                            <td className="p-3.5 font-bold text-[#F3A801]">
                              {inq.estimated_people} pax
                            </td>
                            <td className="p-3.5 text-gray-300">
                              <span className="block">{inq.phone}</span>
                              <span className="block text-[11px] text-gray-400">{inq.email}</span>
                            </td>
                            <td className="p-3.5">
                              {renderStatusBadge(inq.status)}
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="inline-flex items-center gap-1 bg-[#141619] hover:bg-[#F3A801] hover:text-[#141619] text-gray-300 px-2.5 py-1 rounded border border-gray-700 transition-colors font-semibold text-[11px]"
                              >
                                <span>Ver Detalle</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: SUPPLIERS */}
          {activeTab === 'suppliers' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase font-display text-white">
                Postulaciones de Proveedores Registradas
              </h3>

              {suppliers.length === 0 ? (
                <div className="text-center py-16 bg-[#202328] border border-gray-800 rounded-lg">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">No hay postulaciones de proveedores aún.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suppliers.map((sup) => (
                    <div key={sup.id} className="bg-[#202328] border border-gray-800 p-5 rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-base font-bold text-white uppercase font-display">
                            {sup.company_name}
                          </h4>
                          <span className="text-xs font-mono text-[#F3A801] uppercase">
                            {sup.category} · Cobertura: {sup.coverage_area}
                          </span>
                        </div>
                        {renderStatusBadge(sup.status)}
                      </div>

                      <div className="p-3 bg-[#141619] rounded text-xs text-gray-300">
                        <p className="font-bold text-gray-400 mb-1">Servicios / Productos:</p>
                        <p>{sup.services_offered}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 pt-2 border-t border-gray-800">
                        <div>
                          <span className="text-gray-500 block">Contacto:</span>
                          <span className="font-semibold">{sup.contact_person}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Teléfono:</span>
                          <a href={`tel:${sup.phone}`} className="text-blue-400">{sup.phone}</a>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Email:</span>
                          <a href={`mailto:${sup.email}`} className="text-blue-400">{sup.email}</a>
                        </div>
                        {sup.website && (
                          <div>
                            <span className="text-gray-500 block">Sitio Web:</span>
                            <a href={sup.website} target="_blank" rel="noreferrer" className="text-[#F3A801] truncate block">{sup.website}</a>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                        <span className="text-[11px] text-gray-500">Cambiar estado:</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleSupplierStatusChange(sup.id, 'contactado')}
                            className="px-2 py-1 bg-blue-900/40 text-blue-300 hover:bg-blue-800/60 rounded text-[10px] font-bold"
                          >
                            Contactar
                          </button>
                          <button
                            onClick={() => handleSupplierStatusChange(sup.id, 'aprobado')}
                            className="px-2 py-1 bg-green-900/40 text-green-300 hover:bg-green-800/60 rounded text-[10px] font-bold"
                          >
                            Aprobar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141619]/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#202328] border-2 border-[#F3A801] rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
            
            <div className="bg-[#141619] p-5 border-b border-gray-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#F3A801] font-bold">
                  EXPEDIENTE: {selectedInquiry.inquiry_code}
                </span>
                <h3 className="text-lg font-bold uppercase text-white font-display">
                  {selectedInquiry.company_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 bg-[#141619] p-4 rounded-lg">
                <div>
                  <span className="text-gray-400 block text-xs">Ubicación de Proyecto:</span>
                  <span className="font-bold text-white">{selectedInquiry.location}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Dotación Estimada:</span>
                  <span className="font-bold text-[#F3A801] text-base">{selectedInquiry.estimated_people} personas</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Duración Operación:</span>
                  <span className="font-semibold text-white">{selectedInquiry.duration}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Idioma Origen:</span>
                  <span className="font-mono uppercase text-gray-300">{selectedInquiry.language}</span>
                </div>
              </div>

              {/* Servicios seleccionados */}
              <div>
                <h4 className="font-bold uppercase text-gray-300 text-xs mb-2">Servicios Solicitados:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInquiry.services.map((svc, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#141619] border border-gray-700 rounded text-xs text-[#F3A801]">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Datos de Contacto */}
              <div className="bg-[#141619] p-4 rounded-lg space-y-2">
                <h4 className="font-bold uppercase text-gray-300 text-xs">Canal Directo:</h4>
                <p><span className="text-gray-400">Responsable:</span> <span className="font-semibold">{selectedInquiry.contact_person || 'No indicado'}</span></p>
                <p><span className="text-gray-400">Teléfono:</span> <a href={`tel:${selectedInquiry.phone}`} className="text-blue-400">{selectedInquiry.phone}</a></p>
                <p><span className="text-gray-400">Email:</span> <a href={`mailto:${selectedInquiry.email}`} className="text-blue-400">{selectedInquiry.email}</a></p>
                {selectedInquiry.notes && (
                  <p className="pt-2 border-t border-gray-800"><span className="text-gray-400">Notas:</span> {selectedInquiry.notes}</p>
                )}
              </div>

              {/* Modificar Estado */}
              <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
                <span className="font-bold text-xs uppercase text-gray-300">Cambiar Estado:</span>
                <div className="flex gap-2">
                  {['nueva', 'contactada', 'en_analisis', 'cerrada'].map((st) => (
                    <button
                      key={st}
                      disabled={updatingId === selectedInquiry.id}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${
                        selectedInquiry.status === st 
                          ? 'bg-[#F3A801] text-[#141619]' 
                          : 'bg-[#141619] border border-gray-700 text-gray-400 hover:text-white'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
