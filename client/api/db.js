import pkg from '@neondatabase/serverless';
const { neon } = pkg;

const connectionString = process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  'postgresql://neondb_owner:npg_2c5BaFHtDoZN@ep-polished-darkness-av5fwscu-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require';

export const sql = neon(connectionString);
