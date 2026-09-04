import { sql } from '../db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const {
        company_name,
        contact_person,
        estimated_people,
        location,
        duration,
        services,
        phone,
        email,
        notes,
        language
      } = body || {};

      if (!company_name || !phone || !email) {
        return res.status(400).json({ error: 'Faltan campos requeridos (empresa, teléfono o email).' });
      }

      const inquiryCode = 'B42-' + Math.floor(1000 + Math.random() * 9000);
      const servicesJson = JSON.stringify(Array.isArray(services) ? services : []);
      const people = parseInt(estimated_people, 10) || 0;

      const rows = await sql`
        INSERT INTO camp_inquiries (
          inquiry_code, company_name, contact_person, estimated_people, location,
          duration, services_json, phone, email, notes, language, status
        ) VALUES (
          ${inquiryCode},
          ${company_name},
          ${contact_person || ''},
          ${people},
          ${location || ''},
          ${duration || ''},
          ${servicesJson}::jsonb,
          ${phone},
          ${email},
          ${notes || ''},
          ${language || 'es'},
          'nueva'
        )
        RETURNING *;
      `;

      const saved = rows[0];
      return res.status(201).json({
        success: true,
        inquiry_code: inquiryCode,
        inquiryCode: inquiryCode,
        message: 'Configuración registrada exitosamente en la base de datos.',
        data: {
          ...saved,
          inquiry_code: inquiryCode,
          inquiryCode: inquiryCode,
          services: Array.isArray(services) ? services : []
        }
      });
    } catch (error) {
      console.error('Error saving camp inquiry:', error);
      return res.status(500).json({ error: 'Error al registrar la solicitud: ' + error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT * FROM camp_inquiries ORDER BY created_at DESC;
      `;
      const formatted = rows.map(r => ({
        ...r,
        services: Array.isArray(r.services_json) ? r.services_json : []
      }));
      return res.status(200).json(formatted);
    } catch (error) {
      console.error('Error fetching camp inquiries:', error);
      return res.status(500).json({ error: 'Error al obtener solicitudes: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
