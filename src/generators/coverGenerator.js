import { createRNG } from "../utils/rng";

// Generate deterministic album cover using canvas with realistic album art style
export const generateAlbumCover = (seed, title, artist) => {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  // Create RNG for this cover
  const rng = createRNG(seed);

  // Generate colors based on seed
  const hue1 = Math.floor(rng() * 360);
  const hue2 = (hue1 + 60 + Math.floor(rng() * 120)) % 360; // Complementary colors
  const hue3 = (hue1 + 180 + Math.floor(rng() * 60)) % 360;

  // Choose a random style
  const styleIndex = Math.floor(rng() * 5);

  switch (styleIndex) {
    case 0: // Radial gradient with geometric shapes
      drawRadialStyle(ctx, rng, hue1, hue2, hue3);
      break;
    case 1: // Striped pattern
      drawStripedStyle(ctx, rng, hue1, hue2);
      break;
    case 2: // Abstract shapes
      drawAbstractStyle(ctx, rng, hue1, hue2, hue3);
      break;
    case 3: // Retro vinyl style
      drawVinylStyle(ctx, rng, hue1, hue2);
      break;
    case 4: // Modern minimalist
      drawMinimalistStyle(ctx, rng, hue1, hue2);
      break;
  }

  // Add text overlay with better styling
  addTextOverlay(ctx, title, artist);

  return canvas.toDataURL();
};

// Radial gradient with overlapping circles
const drawRadialStyle = (ctx, rng, hue1, hue2, hue3) => {
  const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 250);
  gradient.addColorStop(0, `hsl(${hue1}, 80%, 60%)`);
  gradient.addColorStop(0.5, `hsl(${hue2}, 70%, 50%)`);
  gradient.addColorStop(1, `hsl(${hue3}, 60%, 40%)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 300);

  // Add overlapping circles
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = `hsla(${hue1 + i * 30}, 70%, 60%, 0.3)`;
    ctx.beginPath();
    ctx.arc(rng() * 300, rng() * 300, 30 + rng() * 80, 0, Math.PI * 2);
    ctx.fill();
  }
};

// Striped pattern (like retro album covers)
const drawStripedStyle = (ctx, rng, hue1, hue2) => {
  const stripeCount = 8 + Math.floor(rng() * 8);
  const stripeWidth = 300 / stripeCount;

  for (let i = 0; i < stripeCount; i++) {
    ctx.fillStyle =
      i % 2 === 0
        ? `hsl(${hue1}, 70%, ${40 + rng() * 20}%)`
        : `hsl(${hue2}, 70%, ${40 + rng() * 20}%)`;

    if (rng() > 0.5) {
      // Vertical stripes
      ctx.fillRect(i * stripeWidth, 0, stripeWidth, 300);
    } else {
      // Horizontal stripes
      ctx.fillRect(0, i * stripeWidth, 300, stripeWidth);
    }
  }
};

// Abstract geometric shapes
const drawAbstractStyle = (ctx, rng, hue1, hue2, hue3) => {
  // Background
  ctx.fillStyle = `hsl(${hue1}, 60%, 30%)`;
  ctx.fillRect(0, 0, 300, 300);

  // Random triangles and rectangles
  for (let i = 0; i < 8; i++) {
    const hue = [hue1, hue2, hue3][Math.floor(rng() * 3)];
    ctx.fillStyle = `hsla(${hue}, ${60 + rng() * 30}%, ${
      40 + rng() * 30
    }%, 0.7)`;

    if (rng() > 0.5) {
      // Triangle
      ctx.beginPath();
      ctx.moveTo(rng() * 300, rng() * 300);
      ctx.lineTo(rng() * 300, rng() * 300);
      ctx.lineTo(rng() * 300, rng() * 300);
      ctx.closePath();
      ctx.fill();
    } else {
      // Rectangle
      ctx.fillRect(
        rng() * 250,
        rng() * 250,
        50 + rng() * 100,
        50 + rng() * 100
      );
    }
  }
};

// Vinyl record style
const drawVinylStyle = (ctx, rng, hue1, hue2) => {
  // Background
  const gradient = ctx.createLinearGradient(0, 0, 300, 300);
  gradient.addColorStop(0, `hsl(${hue1}, 50%, 40%)`);
  gradient.addColorStop(1, `hsl(${hue2}, 50%, 20%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 300);

  // Vinyl record circles
  const centerX = 150;
  const centerY = 150;

  for (let r = 150; r > 0; r -= 15) {
    ctx.strokeStyle = `hsla(0, 0%, ${10 + (r / 150) * 30}%, 0.8)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Center hole
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
  ctx.fill();
};

// Modern minimalist style
const drawMinimalistStyle = (ctx, rng, hue1, hue2) => {
  // Solid background
  ctx.fillStyle = `hsl(${hue1}, 70%, 50%)`;
  ctx.fillRect(0, 0, 300, 300);

  // Simple geometric shape in center
  const shapeType = Math.floor(rng() * 3);
  ctx.fillStyle = `hsl(${hue2}, 80%, 60%)`;

  if (shapeType === 0) {
    // Circle
    ctx.beginPath();
    ctx.arc(150, 150, 80, 0, Math.PI * 2);
    ctx.fill();
  } else if (shapeType === 1) {
    // Square
    ctx.fillRect(85, 85, 130, 130);
  } else {
    // Triangle
    ctx.beginPath();
    ctx.moveTo(150, 70);
    ctx.lineTo(220, 220);
    ctx.lineTo(80, 220);
    ctx.closePath();
    ctx.fill();
  }
};

// Add text overlay with better styling
const addTextOverlay = (ctx, title, artist) => {
  // Semi-transparent background for text
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 200, 300, 100);

  // Title
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 5;
  ctx.font = "bold 20px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(truncateText(title, 22), 150, 235);

  // Artist
  ctx.font = "16px Arial, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.fillText(truncateText(artist, 28), 150, 260);

  // Reset shadow
  ctx.shadowBlur = 0;
};

// Truncate text to max length
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
