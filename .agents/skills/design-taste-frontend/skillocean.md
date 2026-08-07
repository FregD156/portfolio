---
name: ocean-sunset-hero-complete
description: Bộ skill đầy đủ để build hero + hiệu ứng toàn trang chủ đề "hoàng hôn biển mùa hè" cho portfolio — gồm bầu trời/sóng động bằng Canvas 2D, hiệu ứng trang trí mùa hè (chim, thuyền, đèn lồng, diều, cánh hoa, bóng lá dừa), hiệu ứng chuyển cảnh giữa section/trang, và hệ thống font chữ + icon chuyên nghiệp riêng biệt (không dùng font/icon mặc định, không emoji). Thuần HTML/CSS/Canvas 2D + JS vanilla, không phụ thuộc framework.
version: 2.0 (gộp từ v2 + v3 + v4 + v5)
stack: HTML5 Canvas 2D, vanilla JS, CSS, SVG
dependencies: "Không bắt buộc. Tuỳ chọn: simplex-noise (~2kB) cho sóng tự nhiên hơn; Tabler Icons chỉ cho icon mạng xã hội."
---

# Skill: Ocean Sunset Hero — Bản đầy đủ

## Mục lục

1. Mục tiêu, kiến trúc & tiêu chí hoàn thành
2. Hệ thống font chữ
3. Hệ thống icon (SVG nét mảnh, thay emoji)
4. Module Sky — bầu trời hoàng hôn động
5. Module Waves — sóng biển nhiều lớp
6. Module hiệu ứng mùa hè (chim, thuyền, đèn lồng, diều, cánh hoa, bóng lá dừa, god rays, ripple chuột)
7. Vòng lặp chính `OceanHero`, resize, dọn dẹp
8. Hiệu ứng chuyển cảnh giữa section & giữa trang
9. Đổi mood màu ngày → hoàng hôn → đêm xuyên suốt trang
10. Ngân sách hiệu năng tổng hợp theo thiết bị
11. Bảng phối hiệu ứng theo vị trí (tránh chồng chéo)
12. Khả năng tiếp cận & tương thích trình duyệt
13. Checklist bàn giao

---

## 1. Mục tiêu, kiến trúc & tiêu chí hoàn thành

**Mục tiêu:** hero + toàn trang portfolio có cảm giác "sống" như một buổi chiều hè bên biển — bầu trời và sóng chuyển động chân thực, điểm xuyết chi tiết mùa hè, chuyển cảnh mượt mà giữa các phần, chữ và icon có cá tính riêng chứ không phải mặc định.

**Cấu trúc thư mục:**
```
/ocean-hero
├── index.html
├── styles.css
└── ocean-hero.js
```

**DOM gốc:**
```html
<svg style="display:none"><!-- sprite icon, xem mục 3 --></svg>
<div class="splash"><div class="splash-wave"></div></div>

<section class="ocean-hero">
  <canvas id="sky-canvas" aria-hidden="true"></canvas>
  <canvas id="waves-canvas" aria-hidden="true"></canvas>
  <div class="hero-content"><!-- headline, CTA --></div>
</section>

<div class="section-transition" data-from="hero" data-to="about"><!-- morph wave divider --></div>
<section id="about" class="reveal-section">...</section>
<!-- các section khác -->
```

```css
.ocean-hero{ position:relative; overflow:hidden; min-height:100vh; }
.ocean-hero canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
.ocean-hero .hero-content{ position:relative; z-index:10; }
.ocean-hero .hero-content::before{
  content:''; position:absolute; inset:-24px;
  background:linear-gradient(180deg, rgba(7,59,76,.18), rgba(7,59,76,0) 70%);
  z-index:-1; border-radius:24px;
}
```

**Tiêu chí hoàn thành:**
- ≥55fps desktop, ≥30fps mobile
- Không giật khi resize/xoay màn hình
- Chữ luôn đọc rõ bất kể trạng thái animation/mood màu
- Tôn trọng `prefers-reduced-motion: reduce` ở mọi module (fallback tĩnh)
- Không rò rỉ bộ nhớ khi rời trang
- Không còn emoji hay font mặc định nào trong sản phẩm cuối

---

## 2. Hệ thống font chữ

| Vai trò | Font | Lý do |
|---|---|---|
| Display (H1, H2, tên thương hiệu) | **Fraunces** (variable, optical size 9–144) | Serif mềm, ấm, gần cảm giác viết tay trên bưu thiếp |
| Body / UI | **Plus Jakarta Sans** | Sans hiện đại, bo góc nhẹ, dễ đọc size nhỏ |
| Nhãn/eyebrow/tag/số liệu | **Space Mono** | Tạo cảm giác "con tem/dấu bưu điện", chỉ dùng cho nhãn ngắn |

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

**Type scale (tỷ lệ 1.25, nền 16px):**
```css
:root{
  --fs-caption: 0.8125rem;
  --fs-body:    1rem;
  --fs-body-lg: 1.0625rem;
  --fs-h3:      1.25rem;
  --fs-h2:      1.75rem;
  --fs-h1:      clamp(2.5rem, 5.4vw, 4.125rem);
  --lh-tight: 1.05;
  --lh-normal: 1.65;
}
h1{ font-family:'Fraunces',serif; font-weight:700; font-size:var(--fs-h1); line-height:var(--lh-tight); letter-spacing:-0.01em; }
h2{ font-family:'Fraunces',serif; font-weight:600; font-size:var(--fs-h2); line-height:1.15; }
h3{ font-family:'Fraunces',serif; font-weight:600; font-size:var(--fs-h3); line-height:1.3; }
body, p{ font-family:'Plus Jakarta Sans',sans-serif; font-size:var(--fs-body); line-height:var(--lh-normal); }
.lead{ font-size:var(--fs-body-lg); }
.eyebrow, .tag, .postmark{ font-family:'Space Mono',monospace; font-size:var(--fs-caption); letter-spacing:0.06em; text-transform:uppercase; }
```

**Quy tắc:** Fraunces italic chỉ nhấn 1 từ trong headline, không nghiêng cả câu. H1 weight 700, H2/H3 weight 600 — giữ phân cấp. Space Mono không lọt vào đoạn văn dài.

---

## 3. Hệ thống icon (SVG nét mảnh, thay emoji)

Không dùng emoji (hiển thị khác nhau tuỳ OS, không đổi màu theo theme) và không dùng thư viện icon "đại trà". Vẽ bộ icon SVG nét mảnh riêng theo chủ đề biển: `viewBox="0 0 24 24"`, `stroke="currentColor"`, `stroke-width="1.6"`, `fill="none"`, `stroke-linecap/linejoin="round"`.

```html
<svg style="display:none">
  <symbol id="icon-wave" viewBox="0 0 24 24">
    <path d="M2 15c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3 2-3 4-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M2 19c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3 2-3 4-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.5"/>
  </symbol>
  <symbol id="icon-sun" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
      <path d="M12 2v2.5M12 19.5V22M22 12h-2.5M4.5 12H2M19 5l-1.8 1.8M6.8 17.2 5 19M19 19l-1.8-1.8M6.8 6.8 5 5"/>
    </g>
  </symbol>
  <symbol id="icon-palm" viewBox="0 0 24 24">
    <path d="M12 22V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M12 11c-3-4-7-4-9-2 2 1 4 0 5 1.5-3 0-5 2-5.5 4.5 2.5 0 4.5-1.5 5.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 11c3-4 7-4 9-2-2 1-4 0-5 1.5 3 0 5 2 5.5 4.5-2.5 0-4.5-1.5-5.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 11c-1-3 0-6 2-8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </symbol>
  <symbol id="icon-anchor" viewBox="0 0 24 24">
    <circle cx="12" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path d="M12 7v14M6 13c0 4 2.5 6.5 6 8M18 13c0 4-2.5 6.5-6 8M4 13h4M16 13h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </symbol>
  <symbol id="icon-shell" viewBox="0 0 24 24">
    <path d="M12 3c5 0 8 4 8 9a8 8 0 0 1-16 0c0-5 3-9 8-9Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M12 3v18M8 8c1.5 2 1.5 8 0 12M16 8c-1.5 2-1.5 8 0 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </symbol>
  <symbol id="icon-compass" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path d="M15 9l-2 6-4-2 2-6 4 2Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-sailboat" viewBox="0 0 24 24">
    <path d="M4 17h16l-2 3H6l-2-3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M12 17V4M12 5l5 6h-5M12 8l-4 5h4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-mail" viewBox="0 0 24 24">
    <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
</svg>
```

```css
.icon{ width:1.25em; height:1.25em; display:inline-block; vertical-align:-0.2em; stroke:currentColor; }
.icon-lg{ width:2rem; height:2rem; }
```

```html
<a href="#work" class="btn-primary">Xem dự án <svg class="icon"><use href="#icon-wave"/></svg></a>
<div class="stamp"><svg class="icon-lg"><use href="#icon-sailboat"/></svg></div>
```

Icon dùng `stroke="currentColor"` nên tự đổi màu theo mood-scroll (mục 9). Icon mạng xã hội ở footer là ngoại lệ hợp lý để dùng Tabler Icons (chỉ bản outline, ép `stroke-width` tương đương 1.6px để không lệch trọng lượng nét).

---

## 4. Module Sky — bầu trời hoàng hôn động

**Gradient nền (4 điểm dừng, dao động rất nhẹ theo thời gian):**
```js
function drawSkyGradient(ctx, w, h, t){
  const drift = Math.sin(t * 0.02) * 0.02;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0,            '#0B3D57');
  g.addColorStop(0.35 + drift, '#2C7DA0');
  g.addColorStop(0.65 + drift, '#FF9E7D');
  g.addColorStop(1,            '#FFE3A3');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}
```

**Mặt trời (glow mềm, "lặn" theo scroll):**
```js
const sun = { x: 0.72, y: 0.28, r: 0.09, scrollOffset: 0 };
function drawSun(ctx, w, h){
  const cx = w * sun.x, cy = h * sun.y + sun.scrollOffset, r = h * sun.r;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3);
  glow.addColorStop(0, 'rgba(255,233,168,0.35)');
  glow.addColorStop(1, 'rgba(255,233,168,0)');
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(cx, cy, r * 3, 0, Math.PI * 2); ctx.fill();
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  core.addColorStop(0, '#FFF4D6'); core.addColorStop(1, '#FFE9A8');
  ctx.fillStyle = core;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
}
window.addEventListener('scroll', () => {
  const heroEl = document.querySelector('.ocean-hero');
  const progress = Math.min(1, Math.max(0, -heroEl.getBoundingClientRect().top / heroEl.offsetHeight));
  sun.scrollOffset = progress * heroEl.offsetHeight * 0.4;
}, { passive: true });
```

**Mây parallax (2 lớp):**
```js
const cloudLayers = [
  { count: 3, speed: 0.15, alpha: 0.35, scale: 1.4, y: 0.18 },
  { count: 2, speed: 0.35, alpha: 0.55, scale: 1.0, y: 0.30 },
];
function drawClouds(ctx, w, h, t){
  cloudLayers.forEach(layer => {
    for (let i = 0; i < layer.count; i++){
      const spread = w / layer.count;
      const x = (((i * spread) + t * layer.speed * 20) % (w + spread * layer.scale)) - spread * layer.scale;
      const y = h * layer.y + Math.sin(t * 0.1 + i) * 6;
      drawCloudShape(ctx, x, y, layer.scale * 60, layer.alpha);
    }
  });
}
function drawCloudShape(ctx, x, y, size, alpha){
  ctx.fillStyle = `rgba(255,244,230,${alpha})`;
  [[0,0,1],[size*0.6,-size*0.15,0.8],[-size*0.6,-size*0.1,0.7],[size*0.3,size*0.1,0.9]]
    .forEach(([dx,dy,s]) => {
      ctx.beginPath();
      ctx.ellipse(x+dx, y+dy, size*s*0.5, size*s*0.32, 0, 0, Math.PI*2);
      ctx.fill();
    });
}
```

---

## 5. Module Waves — sóng biển nhiều lớp

**Hàm sóng tự nhiên (cộng 3 tần số, không dùng 1 sin đơn):**
```js
function waveY(x, t, layer){
  return layer.baseY
    + Math.sin(x * layer.freq1 + t * layer.speed1) * layer.amp1
    + Math.sin(x * layer.freq2 + t * layer.speed2) * layer.amp2
    + Math.sin(x * layer.freq3 * 0.5 + t * layer.speed3 * 0.7) * layer.amp3 * 0.5;
}
```
Tuỳ chọn thay 1 số hạng bằng `simplex-noise`: `noise2D(x * 0.003, t * 0.05) * layer.amp2`.

**4 lớp sóng (xa → gần):**
```js
const waveLayers = [
  { baseY: 0.55, color: '15,110,86',   alpha: 0.35, freq1:0.004, freq2:0.011, freq3:0.002, amp1:10, amp2:5, amp3:14, speed1:0.6, speed2:1.1, speed3:0.3 },
  { baseY: 0.65, color: '18,184,166',  alpha: 0.50, freq1:0.005, freq2:0.013, freq3:0.003, amp1:14, amp2:7, amp3:18, speed1:0.8, speed2:1.4, speed3:0.4 },
  { baseY: 0.78, color: '79,216,196',  alpha: 0.70, freq1:0.006, freq2:0.016, freq3:0.004, amp1:18, amp2:9, amp3:22, speed1:1.0, speed2:1.8, speed3:0.5 },
  { baseY: 0.90, color: '234,251,247', alpha: 0.90, freq1:0.007, freq2:0.02,  freq3:0.005, amp1:10, amp2:6, amp3:12, speed1:1.3, speed2:2.2, speed3:0.6 },
];
function drawWaveLayer(ctx, w, h, t, layer, step = 4){
  ctx.beginPath(); ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += step){ ctx.lineTo(x, h * layer.baseY + waveY(x, t, layer)); }
  ctx.lineTo(w, h); ctx.closePath();
  ctx.fillStyle = `rgba(${layer.color},${layer.alpha})`; ctx.fill();
}
function drawWaves(ctx, w, h, t, step){ waveLayers.forEach(layer => drawWaveLayer(ctx, w, h, t, layer, step)); }
```

**Foam (bọt sóng) trên lớp gần nhất:**
```js
function drawFoam(ctx, w, h, t, layer, step = 4){
  ctx.beginPath();
  for (let x = 0; x <= w; x += step){
    const y = h * layer.baseY + waveY(x, t, layer);
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(255,255,255,${0.5 + Math.sin(t * 1.5) * 0.2})`;
  ctx.lineWidth = 2.5; ctx.stroke();
}
```

**Sparkle (ánh nắng lấp lánh trên nước):**
```js
function createParticles(count, w, h, band){
  return Array.from({ length: count }, () => ({
    x: Math.random() * w, yFactor: band.from + Math.random() * (band.to - band.from),
    size: 1 + Math.random() * 1.5, speed: 0.5 + Math.random() * 1.5, offset: Math.random() * Math.PI * 2,
  }));
}
const sparkles = createParticles(40, window.innerWidth, window.innerHeight, { from: 0.6, to: 0.85 });
function drawSparkles(ctx, w, h, t){
  sparkles.forEach(p => {
    const alpha = Math.abs(Math.sin(t * p.speed + p.offset));
    ctx.fillStyle = `rgba(255,244,214,${alpha * 0.8})`;
    ctx.beginPath(); ctx.arc(p.x, h * p.yFactor, p.size, 0, Math.PI * 2); ctx.fill();
  });
}
```

**Parallax theo chuột (tuỳ chọn):**
```js
let mouseOffset = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
  mouseOffset.x = (e.clientX / window.innerWidth - 0.5) * 12;
  mouseOffset.y = (e.clientY / window.innerHeight - 0.5) * 8;
}, { passive: true });
```

---

## 6. Module hiệu ứng mùa hè

**Chim hải âu bay:**
```js
const gulls = Array.from({ length: 4 }, () => ({
  x: Math.random(), y: 0.12 + Math.random() * 0.15, speed: 0.04 + Math.random() * 0.03,
  flapOffset: Math.random() * Math.PI * 2, scale: 0.7 + Math.random() * 0.6,
}));
function drawGull(ctx, x, y, scale, flap){
  const wing = Math.sin(flap) * 6 * scale;
  ctx.strokeStyle = 'rgba(11,61,87,0.55)'; ctx.lineWidth = 1.6 * scale; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 10*scale, y + wing);
  ctx.quadraticCurveTo(x - 4*scale, y - wing, x, y);
  ctx.quadraticCurveTo(x + 4*scale, y - wing, x + 10*scale, y + wing);
  ctx.stroke();
}
function drawGulls(ctx, w, h, t){
  gulls.forEach(g => {
    g.x = (g.x + g.speed * 0.001) % 1.15;
    const px = g.x * w - 0.1 * w;
    const py = g.y * h + Math.sin(t * 0.3 + g.flapOffset) * 8;
    drawGull(ctx, px, py, g.scale, t * 6 + g.flapOffset);
  });
}
```

**Thuyền buồm trôi theo mặt sóng:**
```js
const boats = [ { xFactor:0.22, drift:0.15, bob:1.2, scale:1 }, { xFactor:0.68, drift:-0.1, bob:1.5, scale:0.75 } ];
function drawBoat(ctx, x, y, scale){
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(14,0); ctx.lineTo(9,8); ctx.lineTo(-9,8); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,110,87,0.9)';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-20); ctx.lineTo(12,0); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function drawBoats(ctx, w, h, t){
  boats.forEach(b => {
    const x = ((b.xFactor * w + t * b.drift * 10) % (w + 60)) - 30;
    const y = h * waveLayers[3].baseY + waveY(x, t, waveLayers[3]) - 6 + Math.sin(t * b.bob) * 3;
    drawBoat(ctx, x, y, b.scale);
  });
}
```

**Đèn lồng bay lên (chỉ bật khi mood chuyển tối, xem mục 9):**
```js
function createLanterns(count, w, h){
  return Array.from({ length: count }, () => ({
    x: Math.random() * w, y: h + Math.random() * h,
    speed: 0.15 + Math.random() * 0.25, sway: Math.random() * Math.PI * 2, scale: 0.5 + Math.random() * 0.8,
  }));
}
const lanterns = createLanterns(6, window.innerWidth, window.innerHeight);
function drawLanterns(ctx, w, h, t){
  lanterns.forEach(l => {
    l.y -= l.speed;
    if (l.y < -20){ l.y = h + 20; l.x = Math.random() * w; }
    const x = l.x + Math.sin(t * 0.5 + l.sway) * 10;
    const glow = ctx.createRadialGradient(x, l.y, 0, x, l.y, 14 * l.scale);
    glow.addColorStop(0, 'rgba(255,200,120,0.9)'); glow.addColorStop(1, 'rgba(255,200,120,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, l.y, 14 * l.scale, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,170,90,0.9)';
    ctx.beginPath(); ctx.ellipse(x, l.y, 5*l.scale, 7*l.scale, 0, 0, Math.PI*2); ctx.fill();
  });
}
```

**Diều bay:**
```js
const kite = { xFactor: 0.15, yFactor: 0.2 };
function drawKite(ctx, w, h, t){
  const x = w * kite.xFactor + Math.sin(t * 0.4) * 20, y = h * kite.yFactor + Math.cos(t * 0.3) * 14;
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 0.4) * 0.15);
  ctx.fillStyle = 'rgba(255,201,60,0.9)';
  ctx.beginPath(); ctx.moveTo(0,-16); ctx.lineTo(14,0); ctx.lineTo(0,16); ctx.lineTo(-14,0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(14,0); ctx.moveTo(0,-16); ctx.lineTo(0,16); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,201,60,0.6)'; ctx.beginPath(); ctx.moveTo(0,16);
  for (let i=1;i<=4;i++){ ctx.lineTo(Math.sin(t*2+i)*6, 16+i*10); }
  ctx.stroke(); ctx.restore();
}
```

**Cánh hoa rơi:**
```js
function createPetals(count, w, h){
  return Array.from({ length: count }, () => ({
    x: Math.random()*w, y: Math.random()*-h, speed: 0.4+Math.random()*0.6,
    drift: Math.random()*Math.PI*2, rot: Math.random()*Math.PI*2, rotSpeed: (Math.random()-0.5)*0.02, size: 4+Math.random()*4,
  }));
}
const petals = createPetals(12, window.innerWidth, window.innerHeight);
function drawPetals(ctx, w, h, t){
  petals.forEach(p => {
    p.y += p.speed; p.x += Math.sin(t*0.6+p.drift)*0.6; p.rot += p.rotSpeed;
    if (p.y > h+10){ p.y = -10; p.x = Math.random()*w; }
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = 'rgba(255,158,125,0.75)';
    ctx.beginPath(); ctx.ellipse(0,0,p.size,p.size*0.55,0,0,Math.PI*2); ctx.fill();
    ctx.restore();
  });
}
```

**Bóng lá dừa đung đưa (thuần CSS, rẻ, luôn bật kể cả mobile):**
```html
<svg class="palm-shadow" viewBox="0 0 300 300" aria-hidden="true">
  <g fill="rgba(7,59,76,0.85)">
    <path d="M20,300 C20,180 60,120 90,60 C70,110 40,160 20,300 Z"/>
    <path d="M20,300 C40,190 90,140 150,90 C100,130 50,180 20,300 Z"/>
    <path d="M20,300 C60,200 130,160 190,130 C130,160 70,210 20,300 Z"/>
  </g>
</svg>
```
```css
.palm-shadow{ position:absolute; bottom:-10%; left:-5%; width:280px; height:280px; z-index:5; transform-origin:bottom left; animation:sway 6s ease-in-out infinite; pointer-events:none; }
@keyframes sway{ 0%,100%{ transform:rotate(-2deg); } 50%{ transform:rotate(2deg); } }
@media (prefers-reduced-motion: reduce){ .palm-shadow{ animation:none; } }
```

**God rays nâng cao (tia nắng xuyên nước):**
```js
function drawGodRays(ctx, w, h, t, sunX, sunY){
  const rayCount = 6;
  for (let i = 0; i < rayCount; i++){
    const angle = -Math.PI/2 + (i - rayCount/2) * 0.12;
    const len = h * 0.9;
    const alpha = 0.05 + Math.abs(Math.sin(t * 0.5 + i)) * 0.05;
    const grad = ctx.createLinearGradient(sunX, sunY, sunX + Math.cos(angle)*len, sunY + Math.sin(angle)*len + len);
    grad.addColorStop(0, `rgba(255,233,168,${alpha})`); grad.addColorStop(1, 'rgba(255,233,168,0)');
    ctx.fillStyle = grad; ctx.save(); ctx.translate(sunX, sunY); ctx.rotate(angle);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-14,len); ctx.lineTo(14,len); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
}
```

**Ripple theo con trỏ chuột (chỉ desktop có `pointer: fine`):**
```js
const ripples = [];
wavesCanvas.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.85){
    const rect = wavesCanvas.getBoundingClientRect();
    ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, alpha: 0.5 });
  }
});
function drawRipples(ctx){
  for (let i = ripples.length - 1; i >= 0; i--){
    const r = ripples[i]; r.r += 1.2; r.alpha -= 0.012;
    if (r.alpha <= 0){ ripples.splice(i, 1); continue; }
    ctx.strokeStyle = `rgba(255,255,255,${r.alpha})`; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke();
  }
}
```

---

## 7. Vòng lặp chính `OceanHero`, resize, dọn dẹp

```js
const tier = window.innerWidth < 640 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';
const enabled = {
  gulls: tier !== 'mobile', boats: true, lanterns: tier === 'desktop', kite: tier !== 'mobile',
  petals: tier !== 'mobile', godRays: tier === 'desktop',
  ripples: tier === 'desktop' && matchMedia('(pointer: fine)').matches,
};

class OceanHero {
  constructor(root){
    this.root = root;
    this.skyCanvas = root.querySelector('#sky-canvas');
    this.wavesCanvas = root.querySelector('#waves-canvas');
    this.skyCtx = this.skyCanvas.getContext('2d');
    this.wavesCtx = this.wavesCanvas.getContext('2d');
    this.t = 0; this.rafId = null;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resize = this.resize.bind(this); this.tick = this.tick.bind(this);
  }
  resize(){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.isMobile = window.innerWidth < 640;
    [this.skyCanvas, this.wavesCanvas].forEach(c => {
      c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr;
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    this.w = this.skyCanvas.clientWidth; this.h = this.skyCanvas.clientHeight;
  }
  tick(){
    this.t += 0.016;
    const step = this.isMobile ? 8 : 4;
    const mood = getGlobalMood(window.scrollY, document.body.scrollHeight - window.innerHeight); // mục 9

    this.skyCtx.clearRect(0, 0, this.w, this.h);
    drawSkyGradient(this.skyCtx, this.w, this.h, this.t);
    if (enabled.godRays) drawGodRays(this.skyCtx, this.w, this.h, this.t, this.w * sun.x, this.h * sun.y + sun.scrollOffset);
    drawSun(this.skyCtx, this.w, this.h);
    drawClouds(this.skyCtx, this.w, this.h, this.t);
    if (enabled.gulls) drawGulls(this.skyCtx, this.w, this.h, this.t);
    if (enabled.kite) drawKite(this.skyCtx, this.w, this.h, this.t);
    if (enabled.petals) drawPetals(this.skyCtx, this.w, this.h, this.t);
    if (enabled.lanterns && mood.t > 0.5) drawLanterns(this.skyCtx, this.w, this.h, this.t);

    this.wavesCtx.clearRect(0, 0, this.w, this.h);
    drawWaves(this.wavesCtx, this.w, this.h, this.t, step);
    if (enabled.boats) drawBoats(this.wavesCtx, this.w, this.h, this.t);
    drawFoam(this.wavesCtx, this.w, this.h, this.t, waveLayers[3], step);
    drawSparkles(this.wavesCtx, this.w, this.h, this.t);
    if (enabled.ripples) drawRipples(this.wavesCtx);

    this.rafId = requestAnimationFrame(this.tick);
  }
  start(){
    this.resize();
    window.addEventListener('resize', this.resize);
    if (this.reduceMotion){
      drawSkyGradient(this.skyCtx, this.w, this.h, 0);
      drawSun(this.skyCtx, this.w, this.h);
      drawWaves(this.wavesCtx, this.w, this.h, 0, 4);
      return;
    }
    this.rafId = requestAnimationFrame(this.tick);
  }
  destroy(){ cancelAnimationFrame(this.rafId); window.removeEventListener('resize', this.resize); }
}

const hero = new OceanHero(document.querySelector('.ocean-hero'));
hero.start();
// gọi hero.destroy() khi unmount trong SPA
```

---

## 8. Hiệu ứng chuyển cảnh giữa section & giữa trang

**Smooth scroll vật lý (nền tảng, bỏ qua nếu `prefers-reduced-motion`):**
```js
class SmoothScroll {
  constructor(){ this.current = window.scrollY; this.target = window.scrollY; this.ease = 0.09; this.raf = null;
    window.addEventListener('scroll', () => { this.target = window.scrollY; }, { passive: true }); }
  start(onUpdate){
    const loop = () => {
      this.current += (this.target - this.current) * this.ease;
      if (Math.abs(this.target - this.current) < 0.05) this.current = this.target;
      onUpdate(this.current, this.target);
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  }
  destroy(){ cancelAnimationFrame(this.raf); }
}
```

**Đường chia section dạng sóng "morph" theo scroll:**
```html
<div class="section-transition" data-from="hero" data-to="about">
  <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
    <path id="morph-wave" d="M0,80 C360,80 1080,80 1440,80 L1440,160 L0,160 Z"/>
  </svg>
</div>
```
```js
function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }
function updateMorphWave(el, progress){
  const amp = 40 * easeOutCubic(progress);
  const baseY = 80 - progress * 20;
  el.querySelector('#morph-wave').setAttribute('d',
    `M0,${baseY} C360,${baseY-amp} 1080,${baseY+amp} 1440,${baseY} L1440,160 L0,160 Z`);
}
function getSectionProgress(el){
  const rect = el.getBoundingClientRect(), vh = window.innerHeight;
  return Math.min(1, Math.max(0, 1 - rect.top / vh));
}
```

**Circle reveal — section "mở ra" từ một điểm (dùng cho Skills → Projects):**
```css
.reveal-section{ clip-path: circle(0% at 50% 0%); transition: clip-path .1s linear; }
```
```js
function updateCircleReveal(el, progress){ el.style.clipPath = `circle(${progress * 75}% at 50% 0%)`; }
```

**Curtain wipe — chỉ dùng cho 1-2 điểm chuyển thật sự lớn (đổi route, mở modal dự án):**
```css
.curtain{ position:fixed; inset:0; z-index:100; background:linear-gradient(115deg, var(--wave-mid) 50%, transparent 50.5%); transform:translateX(-100%); pointer-events:none; }
```
```js
function playCurtainWipe(onMidpoint){
  const curtain = document.querySelector('.curtain');
  curtain.animate(
    [{transform:'translateX(-100%)'},{transform:'translateX(0%)'},{transform:'translateX(100%)'}],
    { duration: 900, easing:'cubic-bezier(.76,0,.24,1)' }
  );
  setTimeout(onMidpoint, 900 * 0.45);
}
```

**Text reveal so le theo dòng:**
```html
<h2 class="reveal-text">
  <span><span class="inner">Những tấm bưu thiếp</span></span>
  <span><span class="inner">từ hành trình sáng tạo.</span></span>
</h2>
```
```css
.reveal-text span{ display:block; overflow:hidden; }
.reveal-text span > .inner{ display:block; transform:translateY(110%); transition:transform .8s cubic-bezier(.16,1,.3,1); }
.reveal-text.in span:nth-child(1) .inner{ transition-delay:.05s; }
.reveal-text.in span:nth-child(2) .inner{ transition-delay:.18s; }
.reveal-text.in span > .inner{ transform:translateY(0); }
```

**Sticky scroll storytelling (cho phần "hành trình"/"quy trình làm việc"):**
```css
.story-section{ height:300vh; position:relative; }
.story-sticky{ position:sticky; top:0; height:100vh; overflow:hidden; }
.story-step{ position:absolute; inset:0; opacity:0; transform:translateY(30px); transition:opacity .5s ease, transform .5s ease; }
.story-step.active{ opacity:1; transform:translateY(0); }
```
```js
function initStoryScroll(sectionEl){
  const steps = sectionEl.querySelectorAll('.story-step');
  function update(){
    const rect = sectionEl.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / (sectionEl.offsetHeight - window.innerHeight)));
    const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    steps.forEach((s, i) => s.classList.toggle('active', i === stepIndex));
  }
  window.addEventListener('scroll', update, { passive: true }); update();
}
```

**Splash intro "thuỷ triều rút" khi tải trang lần đầu:**
```css
.splash{ position:fixed; inset:0; z-index:200; background:var(--wave-mid,#12B8A6); display:flex; align-items:center; justify-content:center; }
.splash.leaving{ transform:translateY(-100%); transition:transform .9s cubic-bezier(.76,0,.24,1) .3s; }
```
```js
window.addEventListener('load', () => {
  const splash = document.querySelector('.splash');
  requestAnimationFrame(() => { splash.classList.add('leaving'); setTimeout(() => splash.remove(), 1300); });
});
```

**View Transitions API cho chuyển route (trang chi tiết dự án):**
```js
function navigateWithTransition(url){
  if (!document.startViewTransition){ window.location.href = url; return; }
  document.startViewTransition(async () => {
    const res = await fetch(url);
    const newDoc = new DOMParser().parseFromString(await res.text(), 'text/html');
    document.querySelector('main').replaceWith(newDoc.querySelector('main'));
    document.title = newDoc.title;
    history.pushState({}, '', url);
  });
}
```
```css
::view-transition-old(root){ animation: fade-out .4s ease forwards; }
::view-transition-new(root){ animation: fade-in-wave .5s ease forwards; }
@keyframes fade-out{ to{ opacity:0; } }
@keyframes fade-in-wave{ from{ opacity:0; clip-path:circle(0% at 50% 50%); } to{ opacity:1; clip-path:circle(150% at 50% 50%); } }
```

---

## 9. Đổi mood màu ngày → hoàng hôn → đêm xuyên suốt trang

```js
const dayPalette   = { top:'#4FA8D8', horizon:'#DFF3FA', wave:'rgb(31,174,142)' };
const sunsetPalette= { top:'#0B3D57', horizon:'#FFE3A3', wave:'rgb(18,184,166)' };
const nightPalette = { top:'#041220', horizon:'#1B3A4B', wave:'rgb(10,60,70)' };

function getGlobalMood(scrollY, docHeight){
  const p = Math.min(1, Math.max(0, scrollY / docHeight));
  if (p < 0.5) return { from: dayPalette, to: sunsetPalette, t: p / 0.5 };
  return { from: sunsetPalette, to: nightPalette, t: (p - 0.5) / 0.5 };
}
```

Nội suy màu sky-gradient và `waveLayers[].color` theo `getGlobalMood()` mỗi frame trong `tick()`. Đồng thời cập nhật CSS variable cho `<body>` để các section phía dưới hero cũng đổi ánh sáng theo cùng nhịp — đây là hiệu ứng tạo cảm giác kể chuyện mạnh nhất trong toàn bộ skill.

Throttle theo `requestAnimationFrame`, không tính trực tiếp trong sự kiện `scroll` thô:
```js
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking){ requestAnimationFrame(() => { updateAllScrollEffects(); ticking = false; }); ticking = true; }
}, { passive: true });
```

---

## 10. Ngân sách hiệu năng tổng hợp theo thiết bị

| Module | Desktop | Tablet | Mobile |
|---|:---:|:---:|:---:|
| Sky gradient + sun | ✅ | ✅ | ✅ |
| Waves 4 lớp + foam + sparkle | ✅ | ✅ | ✅ (sparkle giảm còn ~15, `step=8`) |
| Mây parallax | ✅ 2 lớp | ✅ 1 lớp | ✅ 1 lớp |
| Chim hải âu | ✅ | ✅ | ⛔ |
| Thuyền trôi | ✅ | ✅ | ✅ (1 thuyền) |
| Đèn lồng bay | ✅ | ⚠️ tuỳ chọn | ⛔ |
| Diều bay | ✅ | ✅ | ⛔ |
| Cánh hoa rơi | ✅ | ✅ (giảm còn 6) | ⛔ |
| Bóng lá dừa (CSS) | ✅ | ✅ | ✅ (rẻ, luôn bật) |
| God rays | ✅ | ⚠️ tuỳ chọn | ⛔ |
| Ripple chuột | ✅ | ✅ | ⛔ (không có chuột thật) |
| Mood màu xuyên trang | ✅ | ✅ | ✅ (chi phí thấp, chỉ nội suy màu) |

`devicePixelRatio` luôn giới hạn tối đa 2. Trên Safari/iOS cũ, nếu vẫn giật dù đã áp bảng trên, gộp sky + waves vào chung 1 canvas để giảm overhead context switch.

---

## 11. Bảng phối hiệu ứng theo vị trí (tránh chồng chéo)

| Vị trí | Hiệu ứng đề xuất | Vì sao |
|---|---|---|
| Tải trang lần đầu | Splash thuỷ triều rút | Ấn tượng đầu, chỉ 1 lần |
| Hero → About | Morph wave divider | Nhẹ nhàng, đúng chất "sóng đưa" |
| About → Skills | Fade-up thường | Giữ nhịp đọc, không cần kịch tính |
| Skills → Projects | Circle reveal | Cảm giác "mở khung ảnh", hợp chủ đề bưu thiếp |
| Projects → CTA/Footer | Mood màu tự chuyển (mục 9) | Không cần transition riêng |
| Sang trang chi tiết dự án | View Transitions circle | Route thật sự đổi |
| Section dài (About/Process) | Sticky storytelling | Khi có nhiều bước tuần tự |

**Không** áp curtain wipe cho từng section nhỏ — chỉ 1-2 lần trong cả trang, ở điểm chuyển thật sự quan trọng. **Không** bật toàn bộ hiệu ứng mùa hè (mục 6) cùng lúc trên mọi thiết bị — dùng 3 combo mood gợi ý: "sáng sớm năng động" (chim + thuyền, không đèn lồng), "chiều tà thư giãn" (god rays + cánh hoa, mặc định khuyên dùng), "đêm hè lãng mạn" (đèn lồng + sao, cuối trang).

---

## 12. Khả năng tiếp cận & tương thích trình duyệt

- Cả hai canvas gắn `aria-hidden="true"`.
- `prefers-reduced-motion: reduce` bắt buộc tôn trọng ở **mọi** module (sky/waves/summer-fx/transitions) — fallback về frame tĩnh hoặc scroll mặc định, không tuỳ chọn.
- Tương phản chữ trên `.hero-content` đạt tối thiểu WCAG AA (4.5:1) tại mọi thời điểm animation/mood — dùng overlay gradient tối nhẹ phía sau chữ nếu cần.
- Canvas 2D + View Transitions API: canvas chạy mọi trình duyệt hiện đại; View Transitions fallback im lặng về chuyển trang thường trên trình duyệt chưa hỗ trợ (Safari cũ, Firefox) — không cần polyfill.
- Font variable Fraunces cần `font-display: swap` (đã có trong link Google Fonts) để không chớp layout khi mạng chậm.

---

## 13. Checklist bàn giao

- [ ] FPS ≥55 desktop / ≥30 mobile khi kiểm tra bằng DevTools Performance
- [ ] Resize/xoay màn hình không giật, không méo tỉ lệ
- [ ] Bật `prefers-reduced-motion` trong OS → toàn bộ animation dừng, không riêng phần nào bị bỏ sót
- [ ] Không còn emoji nào trong code (`grep` toàn bộ dự án)
- [ ] Mọi heading dùng đúng biến `--fs-h1/h2/h3`, Space Mono chỉ ở label/tag/postmark
- [ ] Icon SVG tự vẽ và icon thư viện (nếu có) cân bằng độ dày nét
- [ ] Mood màu chuyển mượt từ đầu đến cuối trang, không giật cấp màu (banding)
- [ ] Curtain wipe chỉ xuất hiện ở 1-2 điểm chuyển quan trọng, không lạm dụng
- [ ] `hero.destroy()` / `SmoothScroll.destroy()` được gọi đúng lúc unmount nếu dùng trong SPA — kiểm tra Memory tab không tăng dần
- [ ] Test trên ít nhất 1 thiết bị mobile thật, không chỉ DevTools responsive mode