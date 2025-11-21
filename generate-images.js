const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'src', 'components', 'windows', 'programs', 'welcome', 'img', 'portfolio');

// Syncano - Music Streaming
function createSyncanoImage() {
  const canvas = createCanvas(400, 600);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 400, 600);
  gradient.addColorStop(0, '#1DB954');
  gradient.addColorStop(1, '#191414');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 600);

  // Dark overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, 400, 600);

  // Vinyl record
  ctx.fillStyle = 'rgba(26, 26, 26, 0.8)';
  ctx.beginPath();
  ctx.arc(200, 250, 120, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.beginPath();
  ctx.arc(200, 250, 100, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1DB954';
  ctx.beginPath();
  ctx.arc(200, 250, 30, 0, Math.PI * 2);
  ctx.fill();

  // Sound waves
  ctx.strokeStyle = 'rgba(29, 185, 84, 0.6)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const y = 200 + i * 50;
    ctx.moveTo(50, y);
    ctx.quadraticCurveTo(100, y - 20, 150, y);
    ctx.quadraticCurveTo(200, y + 20, 250, y);
    ctx.quadraticCurveTo(300, y - 20, 350, y);
    ctx.stroke();
  }

  // User circles (collaboration)
  ctx.fillStyle = 'rgba(29, 185, 84, 0.7)';
  ctx.beginPath();
  ctx.arc(120, 450, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(200, 430, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(280, 450, 20, 0, Math.PI * 2);
  ctx.fill();

  // Title
  ctx.font = 'bold 42px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('MELODEXA', 200, 520);

  ctx.font = '18px Arial';
  ctx.fillStyle = '#1DB954';
  ctx.fillText('Listen Together, Anywhere', 200, 550);

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(path.join(outputDir, 'syncano.jpg'), buffer);
  console.log('✓ Created syncano.jpg');
}

// Screenwise.ai - AI Interview Assistant
function createScreenwiseImage() {
  const canvas = createCanvas(400, 600);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 400, 600);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 600);

  // AI Brain network
  const nodes = [
    { x: 160, y: 220 }, { x: 240, y: 220 }, { x: 200, y: 250 },
    { x: 170, y: 290 }, { x: 230, y: 290 }
  ];

  // Connections
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
  ctx.lineWidth = 2;
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
    }
  }

  // Nodes
  ctx.fillStyle = '#00d4ff';
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  // Brain circle
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(200, 250, 80, 0, Math.PI * 2);
  ctx.stroke();

  // Circuit pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(100 + i * 50, 100 + i * 30, 30 + i * 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Invisible eye icon
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.ellipse(200, 420, 40, 25, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(150, 415);
  ctx.lineTo(250, 425);
  ctx.stroke();

  // Title
  ctx.font = 'bold 38px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('SCREENWISE.AI', 200, 510);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#00d4ff';
  ctx.fillText('AI Interview Assistant', 200, 540);

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(path.join(outputDir, 'screenwise.jpg'), buffer);
  console.log('✓ Created screenwise.jpg');
}

// MAQ Software - Enterprise Mobile
function createMAQSoftwareImage() {
  const canvas = createCanvas(400, 600);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 400, 600);
  gradient.addColorStop(0, '#1e3a8a');
  gradient.addColorStop(1, '#0ea5e9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 600);

  // Grid pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 100 + i * 100);
    ctx.lineTo(400, 100 + i * 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(100 + i * 100, 0);
    ctx.lineTo(100 + i * 100, 600);
    ctx.stroke();
  }

  // Phone outline
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(140, 150, 120, 220, 15);
  ctx.fill();
  ctx.stroke();

  // Screen content - header
  ctx.fillStyle = 'rgba(14, 165, 233, 0.8)';
  ctx.beginPath();
  ctx.roundRect(150, 165, 100, 15, 3);
  ctx.fill();

  // Dashboard lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  [190, 205, 220].forEach(y => {
    ctx.fillRect(150, y, 70 + Math.random() * 30, 8);
  });

  // Chart bars
  const bars = [40, 60, 50, 70, 55];
  ctx.fillStyle = '#10b981';
  bars.forEach((height, i) => {
    ctx.fillRect(155 + i * 20, 300 - height, 12, height);
  });

  // User circles
  ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
  [90, 200, 310].forEach((x, i) => {
    ctx.beginPath();
    ctx.arc(x, 480 - (i === 1 ? 20 : 0), 15 + (i === 1 ? 3 : 0), 0, Math.PI * 2);
    ctx.fill();
  });

  // Title
  ctx.font = 'bold 36px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('MAQ SOFTWARE', 200, 520);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#0ea5e9';
  ctx.fillText('Enterprise Mobile Solution', 200, 545);

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(path.join(outputDir, 'maqsoftware.jpg'), buffer);
  console.log('✓ Created maqsoftware.jpg');
}

// Canon Forces - Competitive Programming
function createCanonForcesImage() {
  const canvas = createCanvas(400, 600);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 400, 600);
  gradient.addColorStop(0, '#ff4500');
  gradient.addColorStop(0.5, '#ffa500');
  gradient.addColorStop(1, '#ff6b35');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 600);

  // Code editor background
  ctx.fillStyle = 'rgba(26, 26, 26, 0.9)';
  ctx.strokeStyle = '#ffa500';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(50, 120, 300, 280, 10);
  ctx.fill();
  ctx.stroke();

  // Code lines
  ctx.font = '14px Consolas, monospace';
  const codeLines = [
    { text: 'def solve():', color: '#00ff00', x: 70, y: 160 },
    { text: '  n = int(input())', color: '#ffffff', x: 90, y: 185 },
    { text: '  arr = list(map(int,', color: '#ffffff', x: 90, y: 210 },
    { text: '    input().split()))', color: '#ffffff', x: 110, y: 235 },
    { text: '  result = sum(arr)', color: '#87ceeb', x: 90, y: 260 },
    { text: '  print(result)', color: '#ffff00', x: 90, y: 285 },
    { text: 'solve()', color: '#00ff00', x: 70, y: 315 }
  ];

  codeLines.forEach(line => {
    ctx.fillStyle = line.color;
    ctx.globalAlpha = 0.8;
    ctx.fillText(line.text, line.x, line.y);
  });
  ctx.globalAlpha = 1;

  // Difficulty tags
  const tags = [
    { text: 'EASY', color: '#00ff00', x: 120, y: 440 },
    { text: 'MEDIUM', color: '#ffa500', x: 200, y: 440 },
    { text: 'HARD', color: '#ff0000', x: 280, y: 440 }
  ];

  tags.forEach(tag => {
    const width = ctx.measureText(tag.text).width + 12;
    ctx.fillStyle = tag.color;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.roundRect(tag.x - width / 2, tag.y - 12, width, 25, 5);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = tag.color === '#00ff00' || tag.color === '#ffa500' ? '#000000' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(tag.text, tag.x, tag.y + 2);
  });

  // Calendar icon
  ctx.fillStyle = 'rgba(26, 26, 26, 0.8)';
  ctx.strokeStyle = '#ffa500';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(175, 55, 50, 50, 5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffa500';
  ctx.fillRect(175, 55, 50, 12);

  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#ffa500';
  ctx.textAlign = 'center';
  ctx.fillText('22', 200, 90);

  // Title
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('CANON FORCES', 200, 510);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#ffa500';
  ctx.fillText('Daily Coding Challenge', 200, 540);

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(path.join(outputDir, 'canonforces.jpg'), buffer);
  console.log('✓ Created canonforces.jpg');
}

// Generate all images
try {
  createSyncanoImage();
  createScreenwiseImage();
  createMAQSoftwareImage();
  createCanonForcesImage();
  console.log('\n✅ All images generated successfully!');
} catch (error) {
  console.error('Error generating images:', error);
  process.exit(1);
}
