import { execSync } from 'child_process';
import fs from 'fs';

console.log('--- BASE 4.200 VERCEL BUILD ---');
console.log('Step 1: Compiling client with Vite...');
execSync('npm --prefix client run build', { stdio: 'inherit' });

console.log('Step 2: Ensuring dist directory exists at root...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.cpSync('client/dist', 'dist', { recursive: true });

console.log('✅ Build successful! Output available in both ./dist and ./client/dist');
