window.onload = function () {
  const canvas = document.getElementById("sceneCanvas");
  const ctx = canvas.getContext("2d");

  let cloudX = 60;
  let direction = 1;
  let waveOffset = 0;

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, 250);
    skyGradient.addColorStop(0, "#5c6bc0");
    skyGradient.addColorStop(1, "#90a4ae");
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, 250);

    // Hills (ติดพื้นดิน)
    drawHill(ctx, 100, 250, 80, "#29941aff"); // กลาง
    drawHill(ctx, 40, 250, 60, "#10d44bff");  // ซ้าย
    drawHill(ctx, 180, 250, 50, "#185e2aff"); // ขวา

    // Sun
    drawSun(ctx, 700, 80, 40);

    // Clouds
    drawCloud(ctx, cloudX, 80);
    drawCloud(ctx, cloudX + 150, 60);

    // Field (ground)
    const fieldGradient = ctx.createLinearGradient(0, 250, 0, 500);
    fieldGradient.addColorStop(0, "#388e3c");
    fieldGradient.addColorStop(1, "#2e7d32");
    ctx.fillStyle = fieldGradient;
    ctx.fillRect(0, 250, canvas.width, 250);

    // River
    drawRiver(ctx, waveOffset);

    // Tree
    drawTree(ctx, 120, 310, 100, 180);

    // House
    drawHouse2Floors(ctx, 500, 300);

    // Birds
    drawBird(ctx, 200, 80);
    drawBird(ctx, 250, 100);
    drawBird(ctx, 300, 70);

    // Animate
    cloudX += 0.5 * direction;
    if (cloudX > 650 || cloudX < 20) direction *= -1;
    waveOffset -= 0.05;

    requestAnimationFrame(drawScene);
  }

  drawScene();
};

// ========= COMPONENTS =========

function drawHill(ctx, centerX, baseY, radius, color) {
  ctx.beginPath();
  ctx.arc(centerX, baseY, radius, Math.PI, 0, false);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawSun(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fdd835";
  ctx.fill();
  ctx.strokeStyle = "#f4511e";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function drawCloud(ctx, x, y) {
  ctx.fillStyle = "#eceff1";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.arc(x + 25, y + 5, 25, 0, Math.PI * 2);
  ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

function drawRiver(ctx, waveOffset) {
  const riverLeft = 280;
  const riverRight = 350;

  ctx.beginPath();
  ctx.moveTo(riverLeft, 250);
  for (let i = 250; i <= 500; i += 10) {
    const wave = Math.sin(i / 20 + waveOffset) * 10;
    ctx.lineTo(riverLeft + wave, i);
  }
  ctx.lineTo(riverRight, 500);
  for (let i = 500; i >= 250; i -= 10) {
    const wave = Math.sin(i / 20 + waveOffset + Math.PI) * 10;
    ctx.lineTo(riverRight + wave, i);
  }
  ctx.closePath();

  const riverGradient = ctx.createLinearGradient(0, 250, 0, 500);
  riverGradient.addColorStop(0, "#01579b");
  riverGradient.addColorStop(1, "#4fc3f7");
  ctx.fillStyle = riverGradient;
  ctx.fill();
}

function drawTree(ctx, x, y, width, height) {
  ctx.fillStyle = "#3e2723";
  ctx.fillRect(x + width / 2 - 15, y + height / 2, 30, height / 2);

  ctx.fillStyle = "#1b5e20";
  ctx.beginPath();
  ctx.arc(x + width / 2, y + height / 2 - 30, width * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + width / 2, y + height / 2 - 70, width * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + width / 2, y + height / 2 - 100, width * 0.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawHouse2Floors(ctx, x, y) {
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(x, y + 60, 140, 100);

  ctx.fillStyle = "#6d4c41";
  ctx.fillRect(x + 20, y, 100, 60);

  ctx.beginPath();
  ctx.moveTo(x + 10, y);
  ctx.lineTo(x + 70, y - 40);
  ctx.lineTo(x + 130, y);
  ctx.closePath();
  ctx.fillStyle = "#3e2723";
  ctx.fill();

  ctx.fillStyle = "#fff59d";
  ctx.fillRect(x + 30, y + 80, 20, 20);
  ctx.fillRect(x + 90, y + 80, 20, 20);
  ctx.fillRect(x + 50, y + 20, 20, 20);

  ctx.fillStyle = "#3e2723";
  ctx.fillRect(x + 60, y + 120, 20, 40);
}

function drawBird(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 10, y - 10, x + 20, y);
  ctx.quadraticCurveTo(x + 30, y - 10, x + 40, y);
  ctx.strokeStyle = "#212121";
  ctx.lineWidth = 2;
  ctx.stroke();
}
