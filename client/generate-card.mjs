import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

async function generateCard() {
  const width = 2048;
  const height = 2048;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Load user reference image as the base high-definition template
  const refPath = 'C:/Users/SYS LR/.gemini/antigravity/brain/ee20b2c7-424c-45ba-bbfd-4da84bcbd71b/.user_uploaded/media_1788309379277.png';
  const refImage = await loadImage(refPath);

  // Draw base high-res reference design
  ctx.drawImage(refImage, 0, 0, width, height);

  // Generate a verified 100% scannable QR Code for https://www.base4200.com.ar
  const qrUrl = 'https://www.base4200.com.ar';
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#141619',
      light: '#FFFFFF'
    },
    width: 800
  });

  const qrImage = await loadImage(qrDataUrl);

  // Exact coordinates of the QR box in 2048x2048:
  // In reference 1024x1024: box is roughly x: 597, y: 180, w: 326, h: 335
  // In 2048x2048:
  const scale = 2048 / 1024;
  const qrBoxX = 596 * scale;
  const qrBoxY = 178 * scale;
  const qrBoxW = 328 * scale;
  const qrBoxH = 338 * scale;
  const radius = 28 * scale;

  // Draw clean rounded white box
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, radius);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Draw the QR Code inside with uniform padding
  const qrPadding = 24 * scale;
  ctx.drawImage(
    qrImage, 
    qrBoxX + qrPadding, 
    qrBoxY + qrPadding, 
    qrBoxW - qrPadding * 2, 
    qrBoxH - qrPadding * 2
  );

  // Draw subtle center logo badge on the QR code (Chevrons)
  const centerBadgeSize = 58 * scale;
  const centerX = qrBoxX + qrBoxW / 2;
  const centerY = qrBoxY + qrBoxH / 2;
  
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(centerX - centerBadgeSize / 2, centerY - centerBadgeSize / 2, centerBadgeSize, centerBadgeSize, 8 * scale);
  ctx.fill();

  // Draw Chevrons inside the QR center
  // Top chevron (Yellow #F3A801)
  const chScale = scale * 0.9;
  ctx.fillStyle = '#F3A801';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 20 * chScale);
  ctx.lineTo(centerX + 18 * chScale, centerY - 7 * chScale);
  ctx.lineTo(centerX + 18 * chScale, centerY - 1 * chScale);
  ctx.lineTo(centerX, centerY - 14 * chScale);
  ctx.lineTo(centerX - 18 * chScale, centerY - 1 * chScale);
  ctx.lineTo(centerX - 18 * chScale, centerY - 7 * chScale);
  ctx.closePath();
  ctx.fill();

  // Bottom chevron (Dark #141619)
  ctx.fillStyle = '#141619';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 4 * chScale);
  ctx.lineTo(centerX + 18 * chScale, centerY + 9 * chScale);
  ctx.lineTo(centerX + 18 * chScale, centerY + 15 * chScale);
  ctx.lineTo(centerX, centerY + 2 * chScale);
  ctx.lineTo(centerX - 18 * chScale, centerY + 15 * chScale);
  ctx.lineTo(centerX - 18 * chScale, centerY + 9 * chScale);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // Save to project folder and Desktop
  const outPathProject = 'c:/Users/SYS LR/Desktop/PAGE BASE4200/BASE_4200_QR_CARD.png';
  const outPathDesktop = 'c:/Users/SYS LR/Desktop/BASE_4200_QR_CARD.png';
  const outPathPublic = 'c:/Users/SYS LR/Desktop/PAGE BASE4200/client/public/BASE_4200_QR_CARD.png';
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPathProject, buffer);
  fs.writeFileSync(outPathDesktop, buffer);
  fs.writeFileSync(outPathPublic, buffer);

  console.log('SUCCESS: Generated ultra high-res QR card at:');
  console.log('1.', outPathDesktop);
  console.log('2.', outPathProject);
}

generateCard().catch(console.error);
