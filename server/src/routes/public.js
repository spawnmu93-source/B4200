import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

// GET /api/public/contact
router.get('/contact', (req, res) => {
  try {
    const row = db.prepare("SELECT value FROM site_settings WHERE key = 'general_contact'").get();
    if (row) {
      res.json(JSON.parse(row.value));
    } else {
      res.json({
        email: 'contacto@obema.com.ar',
        phone: '+54 380 154670111',
        whatsapp: '5493804670111',
        address: 'Av. 2 de Abril y Ruta Provincial 5, La Rioja, Argentina',
        website: 'www.base4200.com.ar'
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de contacto' });
  }
});

export default router;
