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

  // GET: List all inquiries with optional status/search filters
  if (req.method === 'GET') {
    try {
      const { status, search } = req.query || {};

      let rows;
      if (status && status !== 'todas') {
        if (search) {
          const searchPattern = `%${search}%`;
          rows = await sql`
            SELECT * FROM camp_inquiries
            WHERE status = ${status}
              AND (company_name ILIKE ${searchPattern} OR inquiry_code ILIKE ${searchPattern} OR location ILIKE ${searchPattern})
            ORDER BY created_at DESC;
          `;
        } else {
          rows = await sql`
            SELECT * FROM camp_inquiries
            WHERE status = ${status}
            ORDER BY created_at DESC;
          `;
        }
      } else {
        if (search) {
          const searchPattern = `%${search}%`;
          rows = await sql`
            SELECT * FROM camp_inquiries
            WHERE company_name ILIKE ${searchPattern} OR inquiry_code ILIKE ${searchPattern} OR location ILIKE ${searchPattern}
            ORDER BY created_at DESC;
          `;
        } else {
          rows = await sql`
            SELECT * FROM camp_inquiries
            ORDER BY created_at DESC;
          `;
        }
      }

      const formatted = rows.map(r => ({
        ...r,
        services: Array.isArray(r.services_json) ? r.services_json : []
      }));

      return res.status(200).json(formatted);
    } catch (error) {
      console.error('Error fetching admin inquiries:', error);
      return res.status(500).json({ error: 'Error al consultar expedientes: ' + error.message });
    }
  }

  // PATCH / POST: Update inquiry status
  if (req.method === 'PATCH' || req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, status } = body || {};

      if (!id || !status) {
        return res.status(400).json({ error: 'Se requiere id y status.' });
      }

      const rows = await sql`
        UPDATE camp_inquiries
        SET status = ${status}, updated_at = NOW()
        WHERE id = ${parseInt(id, 10)}
        RETURNING *;
      `;

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Consulta no encontrada.' });
      }

      const updated = rows[0];
      return res.status(200).json({
        ...updated,
        services: Array.isArray(updated.services_json) ? updated.services_json : []
      });
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      return res.status(500).json({ error: 'Error al actualizar estado: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
