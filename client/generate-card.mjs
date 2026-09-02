import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

async function generatePerfectCard() {
  const width = 2048;
  const height = 2048;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Ensure fully transparent background (Alpha channel outside the card)
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Card Outer Shape (Rounded Rectangle with 80px radius)
  const cardPadding = 30;
  const cardX = cardPadding;
  const cardY = cardPadding;
  const cardW = width - cardPadding * 2;
  const cardH = height - cardPadding * 2;
  const cardRadius = 80;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, cardRadius);
  ctx.clip(); // All contents clipped within the rounded card with alpha outside

  // 2. Base Card Background (Deep Technical Charcoal Gradient)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#16181C');
  bgGrad.addColorStop(0.5, '#121417');
  bgGrad.addColorStop(1, '#0C0D0F');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Subtle Technical Grid Pattern
  ctx.strokeStyle = 'rgba(243, 168, 1, 0.04)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 4. Subtle Topographic Elevation Curves on the Left
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.ellipse(420, 580, 260 + i * 45, 360 + i * 35, Math.PI / 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 5. Diagonal Decorative Cut Line separating Top-Left from Top-Right
  ctx.strokeStyle = '#F3A801';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(1060, 60);
  ctx.lineTo(960, 960);
  ctx.stroke();

  // 6. Mountain Panorama in Middle-Bottom
  const heroPath = 'src/assets/hero-bg-horizontal.png';
  if (fs.existsSync(heroPath)) {
    const mountainImg = await loadImage(heroPath);
    // Draw mountain across the lower middle section
    const mountY = 880;
    const mountH = 880;
    ctx.drawImage(mountainImg, 0, mountY, width, mountH);

    // Smooth gradient overlay to blend mountain top into card background
    const mountFade = ctx.createLinearGradient(0, mountY, 0, mountY + 360);
    mountFade.addColorStop(0, 'rgba(18, 20, 23, 1)');
    mountFade.addColorStop(0.4, 'rgba(18, 20, 23, 0.7)');
    mountFade.addColorStop(1, 'rgba(18, 20, 23, 0)');
    ctx.fillStyle = mountFade;
    ctx.fillRect(0, mountY, width, 380);

    // Bottom dark gradient over mountain to host the 3 feature blocks
    const lowerGrad = ctx.createLinearGradient(0, 1400, 0, 1850);
    lowerGrad.addColorStop(0, 'rgba(18, 20, 23, 0.5)');
    lowerGrad.addColorStop(0.5, 'rgba(18, 20, 23, 0.92)');
    lowerGrad.addColorStop(1, 'rgba(18, 20, 23, 1)');
    ctx.fillStyle = lowerGrad;
    ctx.fillRect(0, 1400, width, 500);
  }

  // 7. Render Symmetrical, Perfectly Proportioned Official Logo on Left
  const logoCenterX = 480;
  const logoTopY = 120;

  // Chevrons (Top Yellow, Bottom White)
  const chW = 85;
  const chH = 42;
  const chY1 = logoTopY + 50;
  const chY2 = chY1 + 44;

  // Top Chevron: Yellow #F3A801
  ctx.fillStyle = '#F3A801';
  ctx.beginPath();
  ctx.moveTo(logoCenterX, chY1 - chH);
  ctx.lineTo(logoCenterX + chW, chY1 + 10);
  ctx.lineTo(logoCenterX + chW, chY1 + 35);
  ctx.lineTo(logoCenterX, chY1 - 15);
  ctx.lineTo(logoCenterX - chW, chY1 + 35);
  ctx.lineTo(logoCenterX - chW, chY1 + 10);
  ctx.closePath();
  ctx.fill();

  // Bottom Chevron: White #FFFFFF
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(logoCenterX, chY2 - chH);
  ctx.lineTo(logoCenterX + chW, chY2 + 10);
  ctx.lineTo(logoCenterX + chW, chY2 + 35);
  ctx.lineTo(logoCenterX, chY2 - 15);
  ctx.lineTo(logoCenterX - chW, chY2 + 35);
  ctx.lineTo(logoCenterX - chW, chY2 + 10);
  ctx.closePath();
  ctx.fill();

  // "BASE 4.200" - Exact same font size and height (Symmetrical)
  ctx.textBaseline = 'top';
  ctx.font = '900 102px "Arial", "Segoe UI", sans-serif';
  
  const textBase = 'BASE';
  const text4200 = ' 4.200';
  const baseW = ctx.measureText(textBase).width;
  const numW = ctx.measureText(text4200).width;
  const totalLogoW = baseW + numW;
  const logoStartX = logoCenterX - totalLogoW / 2;
  const logoTextY = chY2 + 65;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(textBase, logoStartX, logoTextY);

  ctx.fillStyle = '#F3A801';
  ctx.fillText(text4200, logoStartX + baseW, logoTextY);

  // "DESCANSO A LA ALTURA"
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 28px "Arial", "Segoe UI", sans-serif';
  drawSpacedText(ctx, 'DESCANSO A LA ALTURA', logoCenterX, logoTextY + 115, 6);

  // "by OBEMA S.A." with OBEMA blue
  const byY = logoTextY + 175;
  ctx.font = '600 26px "Arial", "Segoe UI", sans-serif';
  const byW = ctx.measureText('by ').width;
  ctx.font = '900 30px "Arial", "Segoe UI", sans-serif';
  const obemaW = ctx.measureText('OBEMA').width;
  ctx.font = '600 22px "Arial", "Segoe UI", sans-serif';
  const saW = ctx.measureText(' S.A.').width;

  const totalByW = byW + obemaW + saW;
  let curByX = logoCenterX - totalByW / 2;

  ctx.textAlign = 'left';
  ctx.font = '600 26px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#8B929A';
  ctx.fillText('by ', curByX, byY + 2);
  curByX += byW;

  ctx.font = '900 30px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#1766A3';
  ctx.fillText('OBEMA', curByX, byY);
  curByX += obemaW;

  ctx.font = '600 22px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#8B929A';
  ctx.fillText(' S.A.', curByX, byY + 5);

  // 8. Conceptual Claim Typography below logo
  ctx.textAlign = 'left';
  const claimX = 145;
  const claimY = 655;

  ctx.font = '900 48px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('CONSTRUIMOS', claimX, claimY);
  ctx.fillText('LA BASE.', claimX, claimY + 58);

  ctx.fillStyle = '#F3A801';
  ctx.fillText('INTEGRAMOS', claimX, claimY + 128);
  ctx.fillText('LAS SOLUCIONES.', claimX, claimY + 186);

  // 9. Generate 100% Scannable QR Code for https://www.base4200.com.ar
  const qrUrl = 'https://www.base4200.com.ar';
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#141619',
      light: '#FFFFFF'
    },
    width: 900
  });
  const qrImg = await loadImage(qrDataUrl);

  // QR Container Box (Right Column)
  const qrBoxX = 1140;
  const qrBoxY = 135;
  const qrBoxW = 730;
  const qrBoxH = 730;
  const qrBoxRadius = 45;

  const btnY = qrBoxY + qrBoxH + 26;
  const btnH = 100;
  const totalBoxH = qrBoxH + 26 + btnH;

  // Gold Corner Accents around QR Card and button container (Clean without overlapping)
  const cornerLen = 50;
  const cornerOffset = 22;
  
  ctx.strokeStyle = '#F3A801';
  ctx.lineWidth = 4;
  
  // Top-Left Corner
  ctx.beginPath();
  ctx.moveTo(qrBoxX - cornerOffset + cornerLen, qrBoxY - cornerOffset);
  ctx.lineTo(qrBoxX - cornerOffset, qrBoxY - cornerOffset);
  ctx.lineTo(qrBoxX - cornerOffset, qrBoxY - cornerOffset + cornerLen);
  ctx.stroke();

  // Top-Right Corner
  ctx.beginPath();
  ctx.moveTo(qrBoxX + qrBoxW + cornerOffset - cornerLen, qrBoxY - cornerOffset);
  ctx.lineTo(qrBoxX + qrBoxW + cornerOffset, qrBoxY - cornerOffset);
  ctx.lineTo(qrBoxX + qrBoxW + cornerOffset, qrBoxY - cornerOffset + cornerLen);
  ctx.stroke();

  // Bottom-Left Corner
  ctx.beginPath();
  ctx.moveTo(qrBoxX - cornerOffset + cornerLen, qrBoxY + totalBoxH + cornerOffset);
  ctx.lineTo(qrBoxX - cornerOffset, qrBoxY + totalBoxH + cornerOffset);
  ctx.lineTo(qrBoxX - cornerOffset, qrBoxY + totalBoxH + cornerOffset - cornerLen);
  ctx.stroke();

  // Bottom-Right Corner
  ctx.beginPath();
  ctx.moveTo(qrBoxX + qrBoxW + cornerOffset - cornerLen, qrBoxY + totalBoxH + cornerOffset);
  ctx.lineTo(qrBoxX + qrBoxW + cornerOffset, qrBoxY + totalBoxH + cornerOffset);
  ctx.lineTo(qrBoxX + qrBoxW + cornerOffset, qrBoxY + totalBoxH + cornerOffset - cornerLen);
  ctx.stroke();

  // White Rounded Card for QR Code
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, qrBoxRadius);
  ctx.fill();

  // Draw QR Inside
  const qrPad = 48;
  ctx.drawImage(qrImg, qrBoxX + qrPad, qrBoxY + qrPad, qrBoxW - qrPad * 2, qrBoxH - qrPad * 2);

  // Center Chevron Badge in QR
  const centerBadgeSize = 120;
  const qrCenterX = qrBoxX + qrBoxW / 2;
  const qrCenterY = qrBoxY + qrBoxH / 2;
  
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qrCenterX - centerBadgeSize / 2, qrCenterY - centerBadgeSize / 2, centerBadgeSize, centerBadgeSize, 18);
  ctx.fill();

  // Draw crisp Chevrons inside the QR center
  ctx.fillStyle = '#F3A801';
  ctx.beginPath();
  ctx.moveTo(qrCenterX, qrCenterY - 42);
  ctx.lineTo(qrCenterX + 38, qrCenterY - 15);
  ctx.lineTo(qrCenterX + 38, qrCenterY - 3);
  ctx.lineTo(qrCenterX, qrCenterY - 30);
  ctx.lineTo(qrCenterX - 38, qrCenterY - 3);
  ctx.lineTo(qrCenterX - 38, qrCenterY - 15);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#141619';
  ctx.beginPath();
  ctx.moveTo(qrCenterX, qrCenterY - 9);
  ctx.lineTo(qrCenterX + 38, qrCenterY + 18);
  ctx.lineTo(qrCenterX + 38, qrCenterY + 30);
  ctx.lineTo(qrCenterX, qrCenterY + 3);
  ctx.lineTo(qrCenterX - 38, qrCenterY + 30);
  ctx.lineTo(qrCenterX - 38, qrCenterY + 18);
  ctx.closePath();
  ctx.fill();

  // Yellow Callout Button below QR Box
  ctx.fillStyle = '#F3A801';
  ctx.beginPath();
  ctx.roundRect(qrBoxX, btnY, qrBoxW, btnH, 22);
  ctx.fill();

  // Vector Smartphone Icon + Text inside Yellow Button
  const btnCenterY = btnY + btnH / 2;
  const phoneX = qrBoxX + 50;
  const phoneY = btnCenterY;
  drawPhoneIcon(ctx, phoneX, phoneY);

  ctx.fillStyle = '#141619';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '900 25px "Arial", "Segoe UI", sans-serif';
  ctx.fillText('ESCANEÁ Y CONOCÉ NUESTRAS SOLUCIONES', phoneX + 30, btnCenterY);

  // 10. Draw 3 Technical Highlight Columns across Lower Section
  const colY = 1580;
  const col1X = 390;
  const col2X = 1024;
  const col3X = 1650;

  // Divider lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(690, colY - 50);
  ctx.lineTo(690, colY + 140);
  ctx.moveTo(1350, colY - 50);
  ctx.lineTo(1350, colY + 140);
  ctx.stroke();

  // Column 1: Campamentos
  drawMountainIcon(ctx, col1X, colY - 15);
  ctx.font = '800 24px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('CAMPAMENTOS Y', col1X, colY + 65);
  ctx.fillText('OPERACIONES REMOTAS', col1X, colY + 98);

  // Column 2: Infraestructura
  drawContainerIcon(ctx, col2X, colY - 15);
  ctx.font = '800 24px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('INFRAESTRUCTURA', col2X, colY + 65);
  ctx.fillText('+ SERVICIOS + OPERACIÓN', col2X, colY + 98);

  // Column 3: Trayectoria
  drawShieldIcon(ctx, col3X, colY - 15);
  ctx.font = '800 24px "Arial", "Segoe UI", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('TRAYECTORIA Y', col3X, colY + 65);
  ctx.fillText('CAPACIDAD OBEMA', col3X, colY + 98);

  // 11. Solid Yellow Footer Bar across bottom of card
  const footH = 135;
  const footY = height - cardPadding - footH;

  ctx.fillStyle = '#F3A801';
  ctx.fillRect(cardX, footY, cardW, footH);

  // Globe icon + domain + location
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#141619';
  ctx.font = '900 32px "Arial", "Segoe UI", sans-serif';
  
  const footTextY = footY + footH / 2;
  ctx.fillText('🌐  www.base4200.com.ar', cardX + 110, footTextY);

  ctx.fillStyle = 'rgba(20, 22, 25, 0.45)';
  ctx.fillText('|', cardX + 630, footTextY - 2);

  ctx.fillStyle = '#141619';
  ctx.font = '800 28px "Arial", "Segoe UI", sans-serif';
  ctx.fillText('LA RIOJA, ARGENTINA', cardX + 680, footTextY);

  // Right chevron stripes ///
  const chevX = cardX + cardW - 220;
  ctx.fillStyle = '#141619';
  for (let i = 0; i < 3; i++) {
    const cx = chevX + i * 42;
    ctx.beginPath();
    ctx.moveTo(cx + 18, footTextY - 22);
    ctx.lineTo(cx + 34, footTextY - 22);
    ctx.lineTo(cx + 16, footTextY + 22);
    ctx.lineTo(cx, footTextY + 22);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore(); // Restore clip

  // Save to all target paths
  const outPathDesktop = 'c:/Users/SYS LR/Desktop/BASE_4200_QR_CARD.png';
  const outPathProject = 'c:/Users/SYS LR/Desktop/PAGE BASE4200/BASE_4200_QR_CARD.png';
  const outPathPublic = 'c:/Users/SYS LR/Desktop/PAGE BASE4200/client/public/BASE_4200_QR_CARD.png';

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPathDesktop, buffer);
  fs.writeFileSync(outPathProject, buffer);
  fs.writeFileSync(outPathPublic, buffer);

  console.log('SUCCESS: Generated pristine alpha-channel vector card at:', outPathDesktop);
}

// Helper: draw spaced text
function drawSpacedText(ctx, text, centerX, y, letterSpacing) {
  const chars = text.split('');
  let totalWidth = 0;
  const widths = chars.map(c => {
    const w = ctx.measureText(c).width;
    totalWidth += w + letterSpacing;
    return w;
  });
  totalWidth -= letterSpacing;

  let curX = centerX - totalWidth / 2;
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], curX + widths[i] / 2, y);
    curX += widths[i] + letterSpacing;
  }
}

// Vector Icon Helper: Phone
function drawPhoneIcon(ctx, x, y) {
  ctx.strokeStyle = '#141619';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(x - 14, y - 22, 28, 44, 6);
  ctx.stroke();
  ctx.fillStyle = '#141619';
  ctx.beginPath();
  ctx.arc(x, y + 14, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

// Icon Helper: Mountain
function drawMountainIcon(ctx, x, y) {
  ctx.strokeStyle = '#F3A801';
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 45, y + 25);
  ctx.lineTo(x, y - 35);
  ctx.lineTo(x + 45, y + 25);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 10, y + 25);
  ctx.lineTo(x + 28, y - 5);
  ctx.lineTo(x + 45, y + 25);
  ctx.stroke();
}

// Icon Helper: Container / Modular
function drawContainerIcon(ctx, x, y) {
  ctx.strokeStyle = '#F3A801';
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.strokeRect(x - 45, y - 30, 90, 60);
  ctx.moveTo(x - 22, y - 30);
  ctx.lineTo(x - 22, y + 30);
  ctx.moveTo(x, y - 30);
  ctx.lineTo(x, y + 30);
  ctx.moveTo(x + 22, y - 30);
  ctx.lineTo(x + 22, y + 30);
  ctx.stroke();
}

// Icon Helper: Shield Check
function drawShieldIcon(ctx, x, y) {
  ctx.strokeStyle = '#F3A801';
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y - 35);
  ctx.lineTo(x + 35, y - 20);
  ctx.lineTo(x + 35, y + 10);
  ctx.quadraticCurveTo(x + 35, y + 35, x, y + 45);
  ctx.quadraticCurveTo(x - 35, y + 35, x - 35, y + 10);
  ctx.lineTo(x - 35, y - 20);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 14, y + 2);
  ctx.lineTo(x - 3, y + 14);
  ctx.lineTo(x + 15, y - 10);
  ctx.stroke();
}

generatePerfectCard().catch(console.error);
