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

  // GET: List suppliers
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

  // PATCH / POST: Update supplier status
  if (req.method === 'PATCH' || req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, status } = body || {};

      if (!id || !status) {
        return res.status(400).json({ error: 'Se requiere id y status.' });
      }

      const rows = await sql`
        UPDATE supplier_applications
        SET status = ${status}
        WHERE id = ${parseInt(id, 10)}
        RETURNING *;
      `;

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Proveedor no encontrado.' });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating supplier status:', error);
      return res.status(500).json({ error: 'Error al actualizar proveedor: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
