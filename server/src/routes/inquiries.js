import { Router } from 'express';
import db from '../config/db.js';
import { validateBody, campInquirySchema, supplierApplicationSchema } from '../middleware/validate.js';
import { sendCampInquiryNotification, sendSupplierNotification } from '../services/emailService.js';
import crypto from 'node:crypto';

const router = Router();

// POST /api/inquiries/camp - Formulario "Configurá tu Campamento"
router.post('/camp', validateBody(campInquirySchema), async (req, res) => {
  try {
    const data = req.validatedBody;
    const inquiryCode = 'B42-' + crypto.randomBytes(3).toString('hex').toUpperCase();

    const insertStmt = db.prepare(`
      INSERT INTO camp_inquiries (
        inquiry_code,
        company_name,
        contact_person,
        estimated_people,
        location,
        duration,
        services_json,
        phone,
        email,
        notes,
        language,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'nueva')
    `);

    insertStmt.run(
      inquiryCode,
      data.company_name,
      data.contact_person || null,
      data.estimated_people,
      data.location,
      data.duration,
      JSON.stringify(data.services),
      data.phone,
      data.email,
      data.notes || null,
      data.language || 'es'
    );

    // Disparar notificación por correo
    await sendCampInquiryNotification({
      ...data,
      inquiry_code: inquiryCode
    });

    res.status(201).json({
      success: true,
      inquiryCode,
      message: 'Configuración de campamento recibida exitosamente. Un asesor de BASE 4.200 se comunicará a la brevedad.'
    });
  } catch (error) {
    console.error('Error al guardar consulta de campamento:', error);
    res.status(500).json({ error: 'Hubo un problema al procesar la solicitud. Por favor intente nuevamente.' });
  }
});

// POST /api/inquiries/supplier - Formulario "Quiero ser Proveedor"
router.post('/supplier', validateBody(supplierApplicationSchema), async (req, res) => {
  try {
    const data = req.validatedBody;

    const insertStmt = db.prepare(`
      INSERT INTO supplier_applications (
        company_name,
        category,
        services_offered,
        coverage_area,
        contact_person,
        phone,
        email,
        website,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pendiente')
    `);

    insertStmt.run(
      data.company_name,
      data.category,
      data.services_offered,
      data.coverage_area,
      data.contact_person,
      data.phone,
      data.email,
      data.website || null
    );

    await sendSupplierNotification(data);

    res.status(201).json({
      success: true,
      message: 'Postulación de proveedor recibida correctamente. Evaluaremos su propuesta técnica y comercial.'
    });
  } catch (error) {
    console.error('Error al guardar postulación de proveedor:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la postulación.' });
  }
});

export default router;
