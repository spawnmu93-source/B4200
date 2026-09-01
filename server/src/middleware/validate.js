import { z } from 'zod';

export const campInquirySchema = z.object({
  company_name: z.string().min(2, 'El nombre de la empresa es obligatorio'),
  contact_person: z.string().optional().nullable(),
  estimated_people: z.coerce.number().int().positive('La cantidad de personas debe ser mayor a 0'),
  location: z.string().min(2, 'La ubicación del proyecto es obligatoria'),
  duration: z.string().min(2, 'La duración estimada de temporada/operación es obligatoria'),
  services: z.array(z.string()).min(1, 'Debe seleccionar al menos un servicio de interés'),
  phone: z.string().min(6, 'El teléfono o WhatsApp es obligatorio'),
  email: z.string().email('Debe ingresar un correo electrónico válido'),
  notes: z.string().optional().nullable(),
  language: z.string().default('es'),
  // Honeypot field for bot detection (must be empty)
  website_url_hp: z.string().optional()
});

export const supplierApplicationSchema = z.object({
  company_name: z.string().min(2, 'El nombre de la empresa o razón social es obligatorio'),
  category: z.string().min(2, 'El rubro es obligatorio'),
  services_offered: z.string().min(5, 'Los servicios o productos ofrecidos son obligatorios'),
  coverage_area: z.string().min(2, 'La zona de cobertura es obligatoria'),
  contact_person: z.string().min(2, 'La persona de contacto es obligatoria'),
  phone: z.string().min(6, 'El teléfono es obligatorio'),
  email: z.string().email('Debe ingresar un correo válido'),
  website: z.string().optional().nullable(),
  // Honeypot field
  website_url_hp: z.string().optional()
});

export const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria')
});

export function validateBody(schema) {
  return (req, res, next) => {
    // Check honeypot
    if (req.body.website_url_hp && req.body.website_url_hp.trim() !== '') {
      // Silently pretend success to bots
      return res.status(200).json({ success: true, message: 'Recibido correctamente' });
    }

    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMap = result.error.flatten().fieldErrors;
      return res.status(400).json({
        error: 'Errores de validación en los datos enviados',
        details: errorMap
      });
    }

    req.validatedBody = result.data;
    next();
  };
}
