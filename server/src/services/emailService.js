import nodemailer from 'nodemailer';

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendCampInquiryNotification(inquiry) {
  const recipient = process.env.NOTIFICATION_EMAIL || 'contacto@obema.com.ar, mariana.rojo@obema.com.ar';
  
  const servicesList = Array.isArray(inquiry.services) 
    ? inquiry.services.join(', ')
    : inquiry.services;

  const subject = `[BASE 4.200] Nueva Solicitud de Campamento - ${inquiry.company_name} (${inquiry.inquiry_code})`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #202328; border-radius: 6px; overflow: hidden;">
      <div style="background-color: #202328; color: #FFFFFF; padding: 20px; border-bottom: 4px solid #F3A801;">
        <h2 style="margin: 0; color: #F3A801; font-size: 20px;">BASE 4.200 - DESCANSO A LA ALTURA</h2>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #CCCCCC;">Nueva solicitud de configuración recibida desde el portal web</p>
      </div>

      <div style="padding: 24px; background-color: #FFFFFF; color: #141619;">
        <div style="background-color: #F8F9FA; border-left: 4px solid #F3A801; padding: 12px 16px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 14px; font-weight: bold; color: #202328;">CÓDIGO DE CONSULTA: <span style="color: #F3A801;">${inquiry.inquiry_code}</span></p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #686C6F;">Fecha/Hora: ${new Date().toLocaleString('es-AR')}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; width: 40%; color: #202328;">Empresa:</td>
            <td style="padding: 8px 0; color: #141619;">${inquiry.company_name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Responsable de contacto:</td>
            <td style="padding: 8px 0; color: #141619;">${inquiry.contact_person || 'No especificado'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Cantidad estimada de personas:</td>
            <td style="padding: 8px 0; color: #141619; font-weight: bold; color: #F3A801;">${inquiry.estimated_people} personas</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Ubicación del proyecto:</td>
            <td style="padding: 8px 0; color: #141619;">${inquiry.location}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Duración estimada de temporada:</td>
            <td style="padding: 8px 0; color: #141619;">${inquiry.duration}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Servicios de interés:</td>
            <td style="padding: 8px 0; color: #141619;">${servicesList}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Teléfono / WhatsApp:</td>
            <td style="padding: 8px 0; color: #141619;"><a href="tel:${inquiry.phone}" style="color: #1766A3;">${inquiry.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Correo electrónico:</td>
            <td style="padding: 8px 0; color: #141619;"><a href="mailto:${inquiry.email}" style="color: #1766A3;">${inquiry.email}</a></td>
          </tr>
          ${inquiry.notes ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #202328;">Notas adicionales:</td>
            <td style="padding: 8px 0; color: #141619;">${inquiry.notes}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <div style="background-color: #141619; color: #888888; padding: 14px 24px; font-size: 11px; text-align: center;">
        BASE 4.200 · by OBEMA S.A. | Soluciones Integrales para Campamentos y Operaciones Remotas
      </div>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"BASE 4.200 Web" <${process.env.SMTP_FROM || 'no-reply@base4200.com.ar'}>`,
        to: recipient,
        subject,
        html
      });
      console.log(`✔ Correo de notificación enviado a ${recipient}`);
    } catch (err) {
      console.error('⚠ Error al enviar correo SMTP:', err.message);
    }
  } else {
    console.log('\n--- [SIMULADOR DE EMAIL TRANSACCIONAL] ---');
    console.log(`Para: ${recipient}`);
    console.log(`Asunto: ${subject}`);
    console.log(`Código: ${inquiry.inquiry_code} | Empresa: ${inquiry.company_name} | Personas: ${inquiry.estimated_people}`);
    console.log('-------------------------------------------\n');
  }
}

export async function sendSupplierNotification(supplier) {
  console.log(`\n✔ [ALERTA PROVEEDOR] Nueva postulación de proveedor: ${supplier.company_name} (${supplier.category}) - Contacto: ${supplier.contact_person} (${supplier.email})\n`);
}
