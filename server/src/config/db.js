import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'base4200.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for performance
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

export function initDatabase() {
  // 1. Consultas de configuración de campamento
  db.exec(`
    CREATE TABLE IF NOT EXISTS camp_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inquiry_code TEXT UNIQUE,
      company_name TEXT NOT NULL,
      contact_person TEXT,
      estimated_people INTEGER NOT NULL,
      location TEXT NOT NULL,
      duration TEXT NOT NULL,
      services_json TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      notes TEXT,
      language TEXT DEFAULT 'es',
      status TEXT DEFAULT 'nueva', -- nueva | contactada | en_analisis | cerrada
      internal_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Postulaciones de proveedores
  db.exec(`
    CREATE TABLE IF NOT EXISTS supplier_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      category TEXT NOT NULL,
      services_offered TEXT NOT NULL,
      coverage_area TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      website TEXT,
      status TEXT DEFAULT 'pendiente', -- pendiente | contactado | evaluando | aprobado | descartado
      internal_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Usuarios administradores
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Configuración del sitio
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default admin if not exists
  const checkAdmin = db.prepare('SELECT id FROM admin_users WHERE username = ?');
  const existingAdmin = checkAdmin.get('admin');

  if (!existingAdmin) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Base4200@Admin', salt);
    const insertAdmin = db.prepare('INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)');
    insertAdmin.run('admin', hash, 'superadmin');
    console.log('✔ Usuario administrador inicial creado: admin / Base4200@Admin');
  }

  // Seed default settings
  const checkSettings = db.prepare('SELECT key FROM site_settings WHERE key = ?');
  if (!checkSettings.get('general_contact')) {
    const insertSetting = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)');
    insertSetting.run('general_contact', JSON.stringify({
      email: 'contacto@obema.com.ar',
      secondaryEmail: 'mariana.rojo@obema.com.ar',
      phone: '+54 380 154670111',
      whatsapp: '5493804670111',
      address: 'Av. 2 de Abril y Ruta Provincial 5, La Rioja, Argentina',
      website: 'www.base4200.com.ar'
    }));
  }

  console.log('✔ Base de datos SQLite inicializada correctamente en:', dbPath);
}

export default db;
