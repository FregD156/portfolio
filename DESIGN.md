# DESIGN.md

## System Architecture & Visual Language

### 1. Design Read & Configuration (`taste-skill`)
- **Design Read:** High-caliber Software Engineering & AI Research portfolio for tech hiring managers and innovation panels, featuring a bioluminescent deep-ocean WebGL theme with low-poly crystalline geometric facets.
- **The 3 Dials:**
  - `DESIGN_VARIANCE: 7` (Asymmetrical Bento grid layout, poly-chamfer clip-paths, titanium rivet details)
  - `MOTION_INTENSITY: 6` (Fluid trochoidal ocean wave math, physics tilt cards, interactive WebGL depth, smooth Lenis scrolling)
  - `VISUAL_DENSITY: 4` (Generous line heights, crisp typography hierarchy, high information density without clutter)

### 2. Color Palette & Tokens
- **Base Environment:**
  - Deep Lagoon Dark (`--background: #034F6B`, `#022433`)
  - Sunny Lagoon Light (`--background: #0284C7`, `#02283C`)
- **Accent & Highlights:**
  - Bioluminescent Teal (`--primary: #2DD4BF`, `#0682A6`)
  - Warm Sun Gold (`--gold-sand: #FDE68A`, `--gold-warm: #F59E0B`)
- **Anti-Slop Color Rules:**
  - No pure `#000000` or neutral `#111827` slate.
  - No purple-to-blue AI gradients.
  - Backgrounds & cards are always tinted with deep lagoon tones (`rgba(2, 34, 48, 0.88)`).

### 3. Typography Hierarchy
- **Header & Display:** Outfit (sans-serif) with tight tracking (`tracking-tight` / `tracking-wider`).
- **Technical & Data:** JetBrains Mono for metrics, code snippets, tech tags, and awards.
- **Accent / Signature:** Great Vibes / Dancing Script for personal signature branding.
- **Sizing Scale:** Clamp scaling for fluid responsiveness across screen sizes.

### 4. Component Patterns & Anti-Patterns
- **Cards & Containers:** `poly-chamfer` low-poly polygon clips with 1.5px teal glow borders (`box-shadow: 0 0 0 1.5px rgba(45, 212, 191, 0.65)`).
- **Anti-Patterns Flagged & Resolved:**
  - ❌ Card-in-card nesting: Replaced with unified Bento Grid sections.
  - ❌ Inter font for everything: Replaced with Outfit + JetBrains Mono pairing.
  - ❌ Square icon badges on every title: Replaced with thematic custom SVG ocean icons.
  - ❌ Muted gray text on dark blue: Enforced minimum WCAG AA contrast with `#E2F8FF` and `#FFFFFF`.

### 5. Motion & Physics
- **Trochoidal Wave Engine:** Real-time canvas wave simulation using sharp crest power `Math.pow((w + 1) * 0.5, 1.6)`.
- **Micro-Interactions:** `scale(0.97)` click feedback, 3D parallax tilt on hover, Framer Motion reveal masks.
