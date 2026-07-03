---
name: cinematic-dev-portfolio-skill
description: Skill dựng portfolio dev/AI dark-theme, nhiều hiệu ứng chuyển động cấp "Awwwards" (kiểu red1-for-hek.vercel.app). Gộp tech stack + hiệu ứng cụ thể với kỷ luật chống AI-slop (typography, màu sắc, layout, copy, hiệu năng, pre-flight check).
---

# Skill: Cinematic Dev Portfolio (Dark, High-Motion)

> Phạm vi: portfolio cá nhân dev/AI, dark theme, cuộn mượt, nhiều hiệu ứng chuyển động.
> Đây KHÔNG phải skill cho dashboard, SaaS B2B nghiêm túc, hay trang public-sector — những use case đó cần dial khác (xem mục 2).

---

## 0. Ghi chú override quan trọng

Bộ quy tắc "anti-slop" gốc mặc định **cấm/hạn chế** custom cursor, marquee nhiều lần, GSAP tràn lan... vì phần lớn brief SaaS/B2B không cần. Nhưng brief của bạn là **portfolio trình diễn kỹ năng động**, nên các mục sau được **chủ động mở khoá**:

- Custom cursor: **cho phép**, miễn có fallback tắt trên mobile/touch và tôn trọng `prefers-reduced-motion`.
- GSAP ScrollTrigger / pin / horizontal scroll: **cho phép** làm hiệu ứng chủ đạo, miễn mỗi animation có lý do rõ ràng (mục 4).
- Marquee: vẫn giới hạn **tối đa 1 lần/trang** (dùng cho Skills) để tránh lặp lại nhàm ở Footer — đây là điều chỉnh giữ nguyên từ bản cũ vì dùng 2 marquee trở lên luôn đọc là lười thiết kế.

Mọi phần còn lại của kỷ luật chống AI-tell (copy, màu sắc, bố cục) vẫn áp dụng nguyên vẹn.

---

## 1. Design Read (khai báo trước khi code 1 dòng)

Ví dụ: *"Đọc brief này là: portfolio dev/AI cho nhà tuyển dụng/khách hàng kỹ thuật, ngôn ngữ dark-tech điện ảnh, nghiêng về Next.js + Tailwind + GSAP/Motion + custom cursor, độ động cao."*

Nếu brief mơ hồ, hỏi đúng **1 câu** (ví dụ: "Bạn muốn thiên về tối giản kiểu Linear hay thử nghiệm kiểu Awwwards?"), không hỏi dồn nhiều câu.

---

## 2. Ba núm điều chỉnh (Dials)

| Dial | Ý nghĩa | Baseline cho skill này |
|---|---|---|
| `DESIGN_VARIANCE` | 1 = đối xứng hoàn hảo, 10 = bố cục nghệ thuật/phá cách | **8** |
| `MOTION_INTENSITY` | 1 = tĩnh, 10 = choreography điện ảnh | **8** |
| `VISUAL_DENSITY` | 1 = airy/gallery, 10 = dày đặc | **3** |

Nếu vibe words của user nghiêng "tối giản/calm" → hạ `VARIANCE` xuống 5-6, `MOTION` xuống 4-5. Nếu nghiêng "brutalist/Awwwards/thử nghiệm" → giữ 9-10.

---

## 3. Tech Stack Chuẩn

| Thành phần | Lựa chọn | Ghi chú |
|---|---|---|
| Framework | Next.js 14+ (App Router) + TypeScript | Mặc định Server Components; mọi component dùng Motion/GSAP/con trỏ chuột phải là leaf `'use client'` riêng biệt |
| Styling | Tailwind v4 | Dùng `@tailwindcss/postcss` hoặc Vite plugin, không dùng plugin `tailwindcss` cũ trong `postcss.config.js` |
| Scroll mượt | Lenis | Kết hợp với GSAP ScrollTrigger để đồng bộ |
| Scroll-telling / pin / horizontal scroll | **GSAP + ScrollTrigger** | Dùng cho: reveal khi cuộn, pin section, horizontal scroll hijack |
| Micro-interaction / component-level | **Motion** (`motion/react`, tên mới của Framer Motion) | Dùng cho button, card, page transition. `framer-motion` vẫn chạy được nhưng ưu tiên import từ `motion/react` |
| 3D / nền động | Three.js + React Three Fiber + Drei | Lazy-load bằng `next/dynamic({ ssr:false })`, chỉ tải sau khi above-the-fold render xong |
| Tách chữ animate | split-type | Hiệu ứng text reveal ký tự/dòng |
| Icon | `lucide-react` (giữ theo lựa chọn của bạn) hoặc `@phosphor-icons/react` / `@tabler/icons-react` nếu muốn né "AI tell" phổ biến nhất | Chỉ dùng **1 bộ icon duy nhất** cho toàn site, `strokeWidth` đồng nhất |
| Font | Tự host qua `next/font`, không nhúng `<link>` Google Fonts | Display: Cabinet Grotesk / Clash Display / Neue Montreal — Body: Satoshi / General Sans / Inter Tight. Tránh dùng Inter làm mặc định cho cả display lẫn body vì đây là "tell" phổ biến nhất của AI |
| Hosting | Vercel | CDN + edge functions |

### Bộ lệnh cài đặt

```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app
cd my-portfolio
npm install gsap motion @studio-freight/lenis split-type
npm install three @react-three/fiber @react-three/drei
npm install lucide-react react-parallax-tilt react-fast-marquee
```

### Thư viện bổ trợ tuỳ chọn

| Thư viện | Công dụng |
|---|---|
| `lottie-react` | Animation vector từ After Effects |
| `react-intersection-observer` | Trigger khi phần tử vào viewport (thay thế cho `whileInView` nếu không dùng Motion) |
| `tsParticles` / Vanta.js | Nền particle nhanh, không cần code 3D thủ công |
| View Transitions API | Page transition mượt giữa route (ưu tiên hơn Barba.js vì là chuẩn web native) |

---

## 4. Nguyên Tắc Kỹ Thuật Animation (bắt buộc)

- **RSC safety**: mọi component dùng Motion/GSAP/con trỏ chuột/scroll listener phải có `'use client'` ở đầu file, tách biệt khỏi layout tĩnh.
- **Không dùng `useState` cho giá trị liên tục** (vị trí chuột, scroll progress, magnetic hover). Dùng `useMotionValue` / `useTransform` / `useScroll` của Motion — `useState` gây re-render mỗi frame và giật trên mobile.
- **Cấm tuyệt đối** `window.addEventListener('scroll', ...)` và tính scroll progress bằng `window.scrollY` trong React state. Dùng Motion `useScroll()`, GSAP `ScrollTrigger`, `IntersectionObserver`, hoặc CSS `animation-timeline: view()`.
- **Motion phải có lý do**: trước khi thêm animation, tự hỏi nó phục vụ gì — phân cấp thị giác, kể chuyện theo trình tự, phản hồi hành động, hay chuyển trạng thái? "Trông ngầu" không phải lý do hợp lệ.
- **`prefers-reduced-motion` bắt buộc** cho mọi hiệu ứng ở `MOTION_INTENSITY > 3`: custom cursor, magnetic button, parallax, scroll-hijack đều phải fallback về tĩnh/tức thời.
- **Không mix GSAP/Three.js với Motion trong cùng 1 component tree** — chúng tranh nhau frame.

### 4.A Sticky-Stack (Section Pin) — khung mẫu chuẩn

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function StickyStack({ cards }: { cards: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => (
        <div key={i} className="stack-card sticky top-0 min-h-[100dvh] flex items-center justify-center">
          {card}
        </div>
      ))}
    </div>
  );
}
```

### 4.B Horizontal-Pan (cuộn ngang trong section) — khung mẫu chuẩn

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalPan({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div ref={track} className="flex h-[100dvh] items-center">
        {children}
      </div>
    </section>
  );
}
```

**Lỗi thường gặp**: trigger fire giữa chừng scroll thay vì pin đúng lúc chạm viewport top → luôn dùng `start: "top top"`, không dùng `"top center"` hay `"top 80%"`.

### 4.C Scroll-Reveal đơn giản (không cần pin) — dùng Motion, nhẹ hơn GSAP

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function RevealStagger({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid gap-6">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
```

Dùng cho: feature list, project grid reveal, timeline item — chỉ dùng GSAP cho phần thực sự cần pin/scrub.

---

## 5. Bộ Hiệu Ứng Đặc Trưng (10 hiệu ứng chủ lực + quy tắc áp dụng)

| # | Hiệu ứng | Công cụ | Quy tắc bắt buộc |
|---|---|---|---|
| 1 | **Custom cursor** (chấm tròn, phóng to khi hover, `mix-blend-mode: difference`) | CSS + Motion values | Ẩn hoàn toàn trên touch device (`@media (hover: hover)`), tắt khi `prefers-reduced-motion` |
| 2 | **Magnetic button** | GSAP `quickTo` hoặc Motion `useMotionValue` | Không dùng `useState` để track vị trí chuột |
| 3 | **Text reveal khi cuộn** | split-type + GSAP/Motion, `clip-path` | Có mục đích: dùng cho headline/tiêu đề section, không lạm dụng ở mọi đoạn văn |
| 4 | **Marquee** | `react-fast-marquee` hoặc CSS animation | **Tối đa 1 lần/trang** — ưu tiên cho Skills, không lặp lại ở Footer |
| 5 | **Hover image preview** (ảnh bám chuột khi hover list project) | Motion + `useMotionValue` | Ảnh phải là ảnh thật (screenshot dự án/generated), không dùng placeholder xám |
| 6 | **Noise/grain overlay** | SVG noise, `mix-blend-mode` | Chỉ áp lên `fixed inset-0 pointer-events-none`, **không bao giờ** trên container đang cuộn (phá FPS mobile) |
| 7 | **Glassmorphism / gradient blur nền** | `backdrop-filter` + layered border + inner shadow | Có fallback solid-fill dưới `prefers-reduced-transparency`; đây là "web approximation", không gọi là Apple Liquid Glass chính thức |
| 8 | **Section Pin + Horizontal Scroll** | GSAP ScrollTrigger (xem khung mẫu 4.B) | `start: "top top"`, pin đúng section |
| 9 | **Preloader / loading screen** | GSAP timeline đếm % | Bỏ qua nếu bundle nhẹ và LCP đã tốt — preloader không cần thiết chỉ để "trông xịn" |
| 10 | **3D Tilt Card** | `react-parallax-tilt` | Dùng cho project card, không dùng cho mọi card trên trang |

---

## 6. Cấu Trúc Trang Chuẩn

```
1. Preloader (tuỳ chọn — chỉ giữ nếu bundle thực sự nặng)
2. Navbar — fixed, 1 dòng ở desktop, cao tối đa 80px, ẩn/hiện khi cuộn
3. Hero
   - Headline tối đa 2 dòng, subtext tối đa 20 từ / 4 dòng
   - Tối đa 4 phần tử text: (eyebrow HOẶC brand strip) + headline + subtext + CTA (1 chính, tối đa 1 phụ)
   - KHÔNG thêm: tagline nhỏ dưới CTA, trust strip, phiên bản/BETA label, scroll cue text ("Scroll to explore")
   - Nền: particle/3D blob/gradient động — ảnh/asset thật, không phải div giả
   - padding-top tối đa pt-24 ở desktop
4. About — text + ảnh thật, fade-in khi vào viewport
5. Skills — marquee icon công nghệ (đây là nơi DUY NHẤT dùng marquee)
6. Projects — grid hoặc horizontal scroll, hover preview ảnh thật, tilt effect
   - Không dựng fake screenshot bằng div; dùng ảnh thật hoặc ảnh generate
7. Experience / Timeline — vertical timeline, SVG stroke-dashoffset vẽ dần khi cuộn
8. Contact — label phía trên input, error text phía dưới, focus state rõ ràng, contrast đạt WCAG AA
9. Footer — 1 CTA rõ ràng (không lặp lại intent "liên hệ" dưới nhiều tên khác nhau), không marquee lần 2
```

**Quy tắc chống lặp bố cục**: mỗi kiểu layout (3-cột-ảnh, split-text-image...) chỉ xuất hiện tối đa 1 lần trên trang. Nếu có 8 section, phải dùng ít nhất 4 layout family khác nhau.

---

## 7. Design System (màu, chữ, spacing)

- **Nền:** dark mode chủ đạo (`zinc-950`/`#0a0a0a`, tránh `#000000` thuần), **1 màu accent duy nhất** dùng nhất quán toàn trang (không đổi màu CTA giữa các section).
- **Tránh mặc định "AI purple/blue glow"** trừ khi đó là màu thương hiệu chủ đích — ưu tiên: emerald, electric blue, deep rose, burnt orange, lime.
- **Typography:** 1 font display cỡ lớn (Cabinet Grotesk / Clash Display / Neue Montreal) cho tiêu đề, 1 font phụ (Satoshi / General Sans) cho nội dung. Tránh Inter làm lựa chọn mặc định cho cả hai vai trò.
- **Bo góc nhất quán:** chọn 1 hệ số bo góc cho toàn trang (all-sharp, all-soft 12-16px, hoặc all-pill cho phần tương tác) — không trộn lẫn tuỳ tiện.
- **Grid 12 cột**, container `max-w-[1400px] mx-auto`.
- **Micro-interaction ở mọi phần tử click được**: hover state + `:active` dùng `scale-[0.98]` hoặc `-translate-y-[1px]` để mô phỏng "nhấn vật lý".
- **Kiểm tra contrast nút bấm**: không bao giờ để CTA trắng-trên-trắng hoặc ghost button không viền trên ảnh nền — tối thiểu WCAG AA 4.5:1.

---

## 8. Nội Dung & Hình Ảnh Thật (tránh dấu hiệu "AI-slop")

- **Ưu tiên ảnh thật/generate** cho hero, project, about — không dùng div giả lập screenshot, không dùng SVG minh hoạ vẽ tay tuỳ tiện.
- **Không dùng tên giả kiểu "John Doe"**, không dùng brand giả kiểu "Acme/Nexus/SmartFlow" nếu đang trình bày dự án thật của bạn — dùng tên dự án thật.
- **Không số liệu "đẹp giả tạo"** (99.99%, tròn số) trừ khi có dữ liệu thật.
- **Cấm em-dash (—)** trong mọi headline, eyebrow, nút, caption, quote — dùng dấu gạch ngang thường (-) hoặc tách câu.
- **Giới hạn eyebrow**: tối đa 1 eyebrow (label in hoa nhỏ) trên mỗi 3 section, kể cả Hero.
- **Không thêm**: version label (v0.6, BETA) trừ khi thật sự đang launch, số thứ tự section kiểu "00/INDEX", chấm màu trang trí không mang ý nghĩa trạng thái thật, dòng "Scroll to explore".
- **Quote/testimonial** (nếu có): tối đa 3 dòng, có tên + vai trò thật.

---

## 9. Hiệu Năng & Accessibility

- Chỉ animate `transform` và `opacity`; tránh animate `top/left/width/height` (gây reflow).
- `will-change` dùng tiết kiệm, chỉ trên phần tử thực sự đang animate.
- Lazy-load 3D/particle bằng `next/dynamic({ ssr: false })`.
- Giảm/tắt animation nặng trên mobile qua `prefers-reduced-motion`.
- Nén ảnh bằng `next/image`, ưu tiên WebP/AVIF, `priority` cho ảnh hero.
- Mọi `useEffect` gắn animation phải có cleanup function (GSAP `ctx.revert()`, huỷ ScrollTrigger).
- Mục tiêu Core Web Vitals: **LCP < 2.5s, INP < 200ms, CLS < 0.1** — chạy Lighthouse trước khi coi là xong.
- Test cả 2 theme nếu có light mode, nhưng mặc định site này khoá 1 theme (dark) xuyên suốt — không đảo theme giữa các section.

---

## 10. Roadmap Dựng Trang

1. Setup Next.js + Tailwind + TypeScript
2. Dựng layout tĩnh, đảm bảo responsive trước khi thêm animation
3. Thêm Lenis smooth scroll
4. Thêm GSAP + ScrollTrigger cho reveal cơ bản
5. Thêm Motion cho micro-interaction (button, card)
6. Thêm custom cursor + magnetic button (có fallback mobile/reduced-motion)
7. Thêm 3D/particle background sau cùng (nặng nhất, dễ ảnh hưởng LCP)
8. Tối ưu hiệu năng + test đa thiết bị + Lighthouse
9. Deploy Vercel

---

## 11. Pre-Flight Checklist (bắt buộc trước khi giao)

- [ ] Design Read đã khai báo 1 dòng?
- [ ] Dial `VARIANCE/MOTION/DENSITY` phù hợp brief, không mặc định mù quáng?
- [ ] **Zero em-dash (—)** trên toàn trang?
- [ ] 1 theme duy nhất xuyên suốt, không đảo mid-page?
- [ ] 1 accent color duy nhất, dùng nhất quán?
- [ ] 1 hệ bo góc duy nhất?
- [ ] Mọi CTA đủ contrast (WCAG AA), không wrap 2 dòng?
- [ ] Form input/label/error đủ contrast?
- [ ] Hero: headline ≤ 2 dòng, subtext ≤ 20 từ, CTA visible không cần cuộn, `pt` ≤ `pt-24`?
- [ ] Hero tối đa 4 phần tử text, không tagline/trust-strip thừa?
- [ ] Marquee xuất hiện đúng 1 lần/trang?
- [ ] Custom cursor tắt trên touch + tôn trọng reduced-motion?
- [ ] Không layout nào lặp lại quá 1 lần liên tiếp (zigzag tối đa 2 lần)?
- [ ] Ảnh là ảnh thật/generate, không div giả screenshot?
- [ ] Icon dùng đúng 1 bộ duy nhất, `strokeWidth` đồng nhất?
- [ ] Mọi animation `useEffect` có cleanup?
- [ ] Không dùng `window.addEventListener('scroll')`?
- [ ] Không dùng `useState` cho giá trị liên tục (chuột, scroll)?
- [ ] `prefers-reduced-motion` được tôn trọng cho mọi motion `MOTION_INTENSITY > 3`?
- [ ] Core Web Vitals đạt mục tiêu (LCP/INP/CLS)?
- [ ] Copy đã tự đọc lại toàn bộ, không câu tối nghĩa/nghe "AI"?

Nếu 1 ô không tick được thật lòng, trang chưa xong — sửa trước khi giao.