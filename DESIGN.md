# Design Brief

**Free Fire companion app** | Military brutalist aesthetic | Cinematic, high-intensity mobile experience for hardcore gamers.

## Tone & Differentiation
Aggressive, cinematic, high-contrast. Glowing orange accents, floating particles, pulsing CTAs. Game stats dominate; premium military UI language. Anti-generic: bold typography, sharp corners, dramatic lighting.

## Color Palette (OKLCH)

| Role | Value | Hex | Usage |
|------|-------|-----|-------|
| Background | `0.08 0 0` | #0a0a0f | Near-black, primary surface |
| Foreground | `0.92 0 0` | #ebebeb | High-contrast text, 0.92 lightness |
| Primary (Fire Orange) | `0.63 0.22 40` | #ff6a00 | Accents, CTAs, glowing borders |
| Secondary (Gold) | `0.88 0.18 90` | #ffd700 | Highlights, legendary tier badges |
| Muted | `0.25 0 0` | #353535 | Borders, dividers, subtle surfaces |
| Card | `0.12 0 0` | #1a1a1f | Elevated surfaces, character/weapon cards |
| Destructive | `0.55 0.22 22` | #d84a3a | Damage, health warnings |

## Typography

| Layer | Font | Weight | Use |
|-------|------|--------|-----|
| Display | Satoshi | 700 | Headers, titles, CTAs |
| Body | Nunito | 400–600 | Body text, descriptions |
| Mono | JetBrains Mono | 400 | Stats, loadouts, numbers |

Type scale: 24px (h1), 18px (h2), 14px (body), 12px (caption). Mobile-first.

## Structural Zones

| Zone | Background | Border | Rationale |
|------|-----------|--------|-----------|
| Header/Nav | `--card` (0.12) | `--border` (0.18) | Elevated, distinct from content |
| Hero (cinematic) | Gradient fire orange to gold, 40% opacity over background | None | Full-viewport immersion, character/weapon showcase |
| Content Cards | `--card` (0.12) | Glowing orange border (0.8 opacity) | Elevated, interactive |
| Bottom Nav | `--card` (0.12) | `--border` (0.18) top | Persistent, mobile-primary |
| Stat Bars | `--muted` (0.25) | None | Low-contrast background for overlays |

## Shape Language
Border-radius: 2px (minimal, military). Interactive cards: glow effect (box-shadow orange). Borders: 1px solid with glow. No rounded corners; sharp, angular aesthetic. Rarity badges: sharp corners, colored backgrounds (Common green, Rare blue, Epic purple, Legendary gold).

## Spacing & Rhythm
Mobile-first: 16px base padding, 12px gaps. Density increases on screens ≥768px. Cards: 12px internal padding. Hero section: 100vh or 80vh viewport height. CTA buttons: 16px × 12px padding, uppercase, bold.

## Animation & Motion
- **Glow pulse**: 2s loop on interactive elements (box-shadow oscillation).
- **Float**: 6s ease-in-out, 20px vertical travel for particle overlays.
- **Transition default**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot). 0.3s all properties.
- Choreography: Stagger entries 100ms apart on character roster; fade + scale on card hover.

## Component Patterns
- **CTA buttons**: Fire orange bg, uppercase sans-serif, pulse-glow animation, 2px borders.
- **Character cards**: Image overlay, rarity tier badge (top-right), stat bar (bottom), glowing border on hover.
- **Stat bars**: Muted background, colored fills (health=green, damage=orange, armor=grey).
- **Tier badges**: Inline label (Common/Rare/Epic/Legendary), color-coded bg, white text.

## Constraints
- No gradients except hero section and fire accent linear-gradient.
- No opacity shifts; tune L/C instead.
- No rounded corners ≥8px; military sharp.
- Never use default Tailwind blue or shadows.
- Mobile viewport priority: max-width 375px for design testing.

