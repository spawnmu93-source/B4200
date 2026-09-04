import { sql } from '../db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const inqCounts = await sql`
        SELECT
          COUNT(*)::int as total,
          COUNT(*) FILTER (WHERE status = 'nueva')::int as new_inquiries,
          COUNT(*) FILTER (WHERE status = 'en_analisis')::int as in_analysis,
          COUNT(*) FILTER (WHERE status = 'contactada')::int as contacted,
          COUNT(*) FILTER (WHERE status = 'cerrada')::int as closed,
          COALESCE(SUM(estimated_people), 0)::int as total_people
        FROM camp_inquiries;
      `;

      const supCounts = await sql`
        SELECT
          COUNT(*)::int as total,
          COUNT(*) FILTER (WHERE status = 'pendiente')::int as pending
        FROM supplier_applications;
      `;

      const inq = inqCounts[0] || {};
      const sup = supCounts[0] || {};

      return res.status(200).json({
        total_inquiries: inq.total || 0,
        new_inquiries: inq.new_inquiries || 0,
        in_analysis: inq.in_analysis || 0,
        contacted: inq.contacted || 0,
        closed: inq.closed || 0,
        total_people_configured: inq.total_people || 0,
        total_suppliers: sup.total || 0,
        pending_suppliers: sup.pending || 0
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return res.status(500).json({ error: 'Error al calcular estadísticas: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
