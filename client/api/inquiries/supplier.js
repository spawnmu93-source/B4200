import { sql } from '../db.js';

export default async function handler(req, res) {
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
        category,
        services_offered,
        coverage_area,
        contact_person,
        phone,
        email,
        website
      } = body || {};

      if (!company_name || !contact_person || !phone || !email) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para la postulación.' });
      }

      const rows = await sql`
        INSERT INTO supplier_applications (
          company_name, category, services_offered, coverage_area,
          contact_person, phone, email, website, status
        ) VALUES (
          ${company_name},
          ${category || 'General'},
          ${services_offered || ''},
          ${coverage_area || ''},
          ${contact_person},
          ${phone},
          ${email},
          ${website || ''},
          'pendiente'
        )
        RETURNING *;
      `;

      return res.status(201).json({
        success: true,
        message: 'Postulación recibida y registrada exitosamente en la base de datos.',
        data: rows[0]
      });
    } catch (error) {
      console.error('Error saving supplier application:', error);
      return res.status(500).json({ error: 'Error al registrar proveedor: ' + error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT * FROM supplier_applications ORDER BY created_at DESC;
      `;
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      return res.status(500).json({ error: 'Error al consultar proveedores: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
