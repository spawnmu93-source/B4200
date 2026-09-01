/**
 * BASE 4.200 - Client API Service
 * Handles live backend communication with automatic seamless offline/demo fallback for static Vercel deployments.
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

// Initial seed data for demo / Vercel preview
const INITIAL_INQUIRIES = [
  {
    id: 1,
    inquiry_code: 'B42-8492',
    company_name: 'Minera Alumbrera S.A.',
    contact_person: 'Ing. Carlos Mendoza',
    email: 'cmendoza@alumbrera.com.ar',
    phone: '+54 9 383 459-8812',
    estimated_people: 120,
    location: 'Catamarca - Cordillera 3.800 msnm',
    duration: '18 meses',
    services: JSON.stringify(['accommodation', 'catering', 'cleaning', 'energy', 'water', 'internet', 'ops_control']),
    notes: 'Requerimiento de módulos habitacionales con aislación térmica reforzada clase A para vientos de 110 km/h y temperaturas de -18°C.',
    status: 'en_analisis',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 2,
    inquiry_code: 'B42-7104',
    company_name: 'Proyecto Josemaría (Lundin)',
    contact_person: 'Lic. Mariana Gómez',
    email: 'mgomez@josemaria.com',
    phone: '+54 9 264 422-9010',
    estimated_people: 80,
    location: 'San Juan - Iglesia 4.100 msnm',
    duration: '12 meses renovable',
    services: JSON.stringify(['accommodation', 'catering', 'energy', 'waste', 'logistics', 'security']),
    notes: 'Campamento de avanzada para campaña de exploración y perforación profunda. Se requiere servicio de catering de alta montaña (4.500 kcal/día) y grupo electrógeno redundante.',
    status: 'contactada',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 3,
    inquiry_code: 'B42-6320',
    company_name: 'Veladero Operaciones (Barrick)',
    contact_person: 'Ing. Roberto Silva',
    email: 'rsilva@barrick.com',
    phone: '+54 9 264 501-3344',
    estimated_people: 250,
    location: 'San Juan - Cordillera de los Andes',
    duration: '24 meses',
    services: JSON.stringify(['accommodation', 'catering', 'cleaning', 'energy', 'water', 'internet', 'waste', 'logistics', 'health', 'security', 'ops_control']),
    notes: 'Ampliación de capacidad habitacional para parada de planta y mantenimiento general. Integración total llave en mano bajo normas OBEMA.',
    status: 'nueva',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 4,
    inquiry_code: 'B42-5019',
    company_name: 'Livent Litio Argentina',
    contact_person: 'Valeria Rivas',
    email: 'vrivas@livent.com',
    phone: '+54 9 387 481-9920',
    estimated_people: 40,
    location: 'Salar del Hombre Muerto - Puna',
    duration: '6 meses',
    services: JSON.stringify(['accommodation', 'catering', 'energy', 'internet']),
    notes: 'Campamento compacto para equipo hidrogeológico.',
    status: 'cerrada',
    created_at: new Date(Date.now() - 3600000 * 96).toISOString()
  }
];

const INITIAL_SUPPLIERS = [
  {
    id: 1,
    company_name: 'Andes Logística Pesada SRL',
    category: 'Logística y Transporte 4x4',
    services_offered: 'Fletes en alta montaña, camiones tolva, camionetas mineras equipadas para puna.',
    coverage_area: 'San Juan, La Rioja, Catamarca',
    contact_person: 'Esteban Morales',
    phone: '+54 9 264 489-1122',
    email: 'contacto@andeslogistica.com.ar',
    website: 'https://www.andeslogistica.com.ar',
    status: 'aprobado',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString()
  },
  {
    id: 2,
    company_name: 'Energía Solar Cordillerana',
    category: 'Energía Renovable y Generación',
    services_offered: 'Sistemas híbridos fotovoltaicos con banco de baterías de litio para campamentos aislados.',
    coverage_area: 'Región NOA y Cuyo',
    contact_person: 'Ing. Lucas Farías',
    phone: '+54 9 380 433-7766',
    email: 'lucas@energiasolar.com.ar',
    website: 'https://www.energiasolar.com.ar',
    status: 'pendiente',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

function getStoredInquiries() {
  try {
    const data = localStorage.getItem('base4200_inquiries');
    if (!data) {
      localStorage.setItem('base4200_inquiries', JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

function saveStoredInquiries(inquiries) {
  try {
    localStorage.setItem('base4200_inquiries', JSON.stringify(inquiries));
  } catch (err) {
    console.error('Error saving inquiries to storage:', err);
  }
}

function getStoredSuppliers() {
  try {
    const data = localStorage.getItem('base4200_suppliers');
    if (!data) {
      localStorage.setItem('base4200_suppliers', JSON.stringify(INITIAL_SUPPLIERS));
      return INITIAL_SUPPLIERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SUPPLIERS;
  }
}

function saveStoredSuppliers(suppliers) {
  try {
    localStorage.setItem('base4200_suppliers', JSON.stringify(suppliers));
  } catch (err) {
    console.error('Error saving suppliers to storage:', err);
  }
}

export const api = {
  // Login
  async login(username, password) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback for Vercel demo
    }

    // Demo Authentication
    if (username.trim() === 'admin' && (password === 'Base4200@Admin' || password === 'admin')) {
      const token = 'demo_token_' + btoa(username + ':' + Date.now());
      return {
        token,
        user: { username: 'admin', role: 'superadmin' },
        message: 'Acceso concedido en modo demostración'
      };
    } else {
      throw new Error('Credenciales inválidas. Usuario o contraseña incorrectos.');
    }
  },

  // Submit Camp Inquiry
  async submitCampInquiry(payload) {
    try {
      const res = await fetch(`${API_BASE}/api/inquiries/camp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const code = 'B42-' + Math.floor(1000 + Math.random() * 9000);
    const newInquiry = {
      id: Date.now(),
      inquiry_code: code,
      company_name: payload.company_name,
      contact_person: payload.contact_person,
      email: payload.email,
      phone: payload.phone,
      estimated_people: payload.estimated_people,
      location: payload.location,
      duration: payload.duration,
      services: JSON.stringify(payload.services),
      notes: payload.notes || '',
      status: 'nueva',
      created_at: new Date().toISOString()
    };

    const current = getStoredInquiries();
    saveStoredInquiries([newInquiry, ...current]);

    return {
      success: true,
      inquiry_code: code,
      message: 'Configuración registrada exitosamente.',
      data: newInquiry
    };
  },

  // Submit Supplier Inquiry
  async submitSupplierInquiry(payload) {
    try {
      const res = await fetch(`${API_BASE}/api/inquiries/supplier`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const newSupplier = {
      id: Date.now(),
      company_name: payload.company_name,
      category: payload.category,
      services_offered: payload.services_offered,
      coverage_area: payload.coverage_area,
      contact_person: payload.contact_person,
      phone: payload.phone,
      email: payload.email,
      website: payload.website || '',
      status: 'pendiente',
      created_at: new Date().toISOString()
    };

    const current = getStoredSuppliers();
    saveStoredSuppliers([newSupplier, ...current]);

    return {
      success: true,
      message: 'Postulación recibida exitosamente.',
      data: newSupplier
    };
  },

  // Admin: Get Stats
  async getStats(token) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const inqs = getStoredInquiries();
    const sups = getStoredSuppliers();
    const totalPeople = inqs.reduce((acc, curr) => acc + (Number(curr.estimated_people) || 0), 0);

    return {
      total_inquiries: inqs.length,
      new_inquiries: inqs.filter(i => i.status === 'nueva').length,
      in_analysis: inqs.filter(i => i.status === 'en_analisis').length,
      contacted: inqs.filter(i => i.status === 'contactada').length,
      closed: inqs.filter(i => i.status === 'cerrada').length,
      total_people_configured: totalPeople,
      total_suppliers: sups.length,
      pending_suppliers: sups.filter(s => s.status === 'pendiente').length
    };
  },

  // Admin: Get Inquiries
  async getInquiries(token, { status = 'todas', search = '' } = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (status !== 'todas') queryParams.append('status', status);
      if (search) queryParams.append('search', search);

      const res = await fetch(`${API_BASE}/api/admin/inquiries?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    let list = getStoredInquiries();
    if (status && status !== 'todas') {
      list = list.filter(i => i.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i => 
        (i.company_name && i.company_name.toLowerCase().includes(q)) ||
        (i.contact_person && i.contact_person.toLowerCase().includes(q)) ||
        (i.location && i.location.toLowerCase().includes(q)) ||
        (i.inquiry_code && i.inquiry_code.toLowerCase().includes(q))
      );
    }
    return list;
  },

  // Admin: Get Suppliers
  async getSuppliers(token) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/suppliers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    return getStoredSuppliers();
  },

  // Admin: Update Inquiry Status
  async updateInquiryStatus(token, id, newStatus) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const list = getStoredInquiries();
    const updated = list.map(i => i.id === id ? { ...i, status: newStatus } : i);
    saveStoredInquiries(updated);
    return { success: true };
  },

  // Admin: Update Supplier Status
  async updateSupplierStatus(token, id, newStatus) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/suppliers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const list = getStoredSuppliers();
    const updated = list.map(s => s.id === id ? { ...s, status: newStatus } : s);
    saveStoredSuppliers(updated);
    return { success: true };
  }
};
