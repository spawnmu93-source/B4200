import { Router } from 'express';
import db from '../config/db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Protect all admin routes
router.use(authenticateAdmin);

// GET /api/admin/stats - Resumen de métricas para el dashboard
router.get('/stats', (req, res) => {
  try {
    const totalInquiries = db.prepare('SELECT COUNT(*) as count FROM camp_inquiries').get().count;
    const newInquiries = db.prepare("SELECT COUNT(*) as count FROM camp_inquiries WHERE status = 'nueva'").get().count;
    const totalSuppliers = db.prepare('SELECT COUNT(*) as count FROM supplier_applications').get().count;
    const pendingSuppliers = db.prepare("SELECT COUNT(*) as count FROM supplier_applications WHERE status = 'pendiente'").get().count;

    res.json({
      totalInquiries,
      newInquiries,
      totalSuppliers,
      pendingSuppliers
    });
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).json({ error: 'Error al obtener métricas del dashboard' });
  }
});

// GET /api/admin/inquiries - Listado de consultas con filtros
router.get('/inquiries', (req, res) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT * FROM camp_inquiries';
    const params = [];
    const conditions = [];

    if (status && status !== 'todas') {
      conditions.push('status = ?');
      params.push(status);
    }

    if (search) {
      conditions.push('(company_name LIKE ? OR inquiry_code LIKE ? OR location LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const inquiries = db.prepare(query).all(...params);

    const parsedInquiries = inquiries.map(row => ({
      ...row,
      services: JSON.parse(row.services_json || '[]')
    }));

    res.json(parsedInquiries);
  } catch (err) {
    console.error('Error al obtener consultas:', err);
    res.status(500).json({ error: 'Error al listar consultas' });
  }
});

// PATCH /api/admin/inquiries/:id - Actualizar estado o notas internas
router.patch('/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, internal_notes } = req.body;

    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }

    if (internal_notes !== undefined) {
      updates.push('internal_notes = ?');
      params.push(internal_notes);
    }

    updates.push("updated_at = datetime('now')");

    if (updates.length === 1) {
      return res.status(400).json({ error: 'No se enviaron campos para actualizar.' });
    }

    const query = `UPDATE camp_inquiries SET ${updates.join(', ')} WHERE id = ?`;
    params.push(id);

    const result = db.prepare(query).run(...params);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Consulta no encontrada.' });
    }

    res.json({ success: true, message: 'Consulta actualizada correctamente.' });
  } catch (err) {
    console.error('Error al actualizar consulta:', err);
    res.status(500).json({ error: 'Error al actualizar la consulta' });
  }
});

// GET /api/admin/suppliers - Listado de proveedores postulados
router.get('/suppliers', (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM supplier_applications';
    const params = [];

    if (status && status !== 'todas') {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const suppliers = db.prepare(query).all(...params);
    res.json(suppliers);
  } catch (err) {
    console.error('Error al obtener proveedores:', err);
    res.status(500).json({ error: 'Error al listar proveedores' });
  }
});

// PATCH /api/admin/suppliers/:id - Actualizar estado de proveedor
router.patch('/suppliers/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, internal_notes } = req.body;

    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }

    if (internal_notes !== undefined) {
      updates.push('internal_notes = ?');
      params.push(internal_notes);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No se enviaron campos para actualizar.' });
    }

    const query = `UPDATE supplier_applications SET ${updates.join(', ')} WHERE id = ?`;
    params.push(id);

    const result = db.prepare(query).run(...params);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado.' });
    }

    res.json({ success: true, message: 'Proveedor actualizado correctamente.' });
  } catch (err) {
    console.error('Error al actualizar proveedor:', err);
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
});

// GET /api/admin/settings - Obtener configuración general
router.get('/settings', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM site_settings').all();
    const result = {};
    for (const row of settings) {
      try {
        result[row.key] = JSON.parse(row.value);
      } catch {
        result[row.key] = row.value;
      }
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener configuraciones' });
  }
});

// PUT /api/admin/settings - Guardar configuración
router.put('/settings', (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ error: 'Clave y valor requeridos' });
    }

    const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
    const stmt = db.prepare(`
      INSERT INTO site_settings (key, value, updated_at) 
      VALUES (?, ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `);
    stmt.run(key, valStr);

    res.json({ success: true, message: 'Configuración guardada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar configuración' });
  }
});

export default router;
