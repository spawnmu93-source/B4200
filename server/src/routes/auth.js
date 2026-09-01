import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { generateToken, authenticateAdmin } from '../middleware/auth.js';
import { validateBody, loginSchema } from '../middleware/validate.js';

const router = Router();

// POST /api/auth/login
router.post('/login', validateBody(loginSchema), (req, res) => {
  const { username, password } = req.validatedBody;

  const userStmt = db.prepare('SELECT * FROM admin_users WHERE username = ?');
  const user = userStmt.get(username);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const validPassword = bcrypt.compareSync(password, user.password_hash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role
  });

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// GET /api/auth/verify
router.get('/verify', authenticateAdmin, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

export default router;
