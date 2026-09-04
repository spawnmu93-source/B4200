export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
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
      const { username, password } = body || {};

      const u = (username || '').trim();
      const p = (password || '').trim();

      if (u === 'admin' && (p === 'Base4200*' || p === 'Base4200@Admin')) {
        const token = 'b42_' + Buffer.from(`${u}:${Date.now()}`).toString('base64');
        return res.status(200).json({
          token,
          user: { username: 'admin', role: 'superadmin' },
          message: 'Acceso autorizado al Panel de Administración BASE 4.200'
        });
      }

      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Error interno en autenticación: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
