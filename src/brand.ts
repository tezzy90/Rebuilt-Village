/**
 * Rebuilt Village — Brand Design System
 *
 * All values are extracted directly from the logo:
 *   · Tree of art forms on black background
 *   · Gold wordmark: "REBUILT VILLAGE"
 *   · Tagline: "Rebuilding Community Through Art"
 *
 * ─────────────────────────────────────────────────────
 *  COLOR USAGE RULES
 * ─────────────────────────────────────────────────────
 *  Gold (#C9A84C)     → Primary CTA buttons, accent text, borders, highlights
 *  Black (#0A0A0A)    → Page background (dark mode), gold button text
 *  Warm Cream (#F9F6F0) → Page background (light mode)
 *
 *  Art-form accents:
 *    Teal    → Community events, volunteer, growth themes
 *    Green   → Film education, programs, workshops
 *    Crimson → Theater, drama, screening events
 *    Purple  → Creative/artistic content
 *    Blue    → Trust, governance, board, documents
 *    Amber   → Energy, campaigns, fundraising urgency
 *    Pink    → Music, performance, celebration
 * ─────────────────────────────────────────────────────
 */

export const BRAND = {
  colors: {
    // ── Primary identity ──
    gold:          '#C9A84C',
    goldLight:     '#E0C06E',
    goldDark:      '#A07830',
    black:         '#0A0A0A',
    offBlack:      '#141414',
    warmCream:     '#F9F6F0',

    // ── Art-form accent palette (tree branch colors) ──
    teal:          '#2DBFA0',  // community / growth
    green:         '#4A9E52',  // film / education
    crimson:       '#C0392B',  // theater / drama
    purple:        '#7B2FBE',  // creative expression
    blue:          '#1B4FBE',  // trust / visual arts
    amber:         '#E07B00',  // energy / workshops
    pink:          '#DC267F',  // music / performance
  },

  fonts: {
    display: "'Cinzel', Georgia, serif",          // logo wordmark match — all caps Roman
    serif:   "'Cormorant Garamond', Georgia, serif", // elegant editorial headings
    sans:    "'Inter', system-ui, sans-serif",    // clean body and UI
    mono:    "'Fira Code', Monaco, monospace",    // labels, metadata, code
  },

  // Program types map to their tree branch color
  programColors: {
    film:        '#4A9E52',   // green
    theater:     '#C0392B',   // crimson
    music:       '#DC267F',   // pink
    visual:      '#1B4FBE',   // blue
    community:   '#2DBFA0',   // teal
    workshop:    '#E07B00',   // amber
    advanced:    '#7B2FBE',   // purple
  } as Record<string, string>,

  // Donation tier colors (maps to tree vibrancy)
  donorTiers: {
    seed:          { color: '#4A9E52', label: 'Seed Planter',      min: 10  },
    branch:        { color: '#2DBFA0', label: 'Branch Builder',    min: 25  },
    trunk:         { color: '#E07B00', label: 'Trunk Supporter',   min: 50  },
    canopy:        { color: '#C9A84C', label: 'Canopy Creator',    min: 100 },
    root:          { color: '#7B2FBE', label: 'Root Sustainer',    min: 250 },
    grove:         { color: '#1B4FBE', label: 'Grove Grower',      min: 500 },
    forest:        { color: '#C0392B', label: 'Forest Builder',    min: 1000},
  },
} as const;

/** Returns a Tailwind-compatible inline style with the brand accent for a program type */
export function programAccentStyle(type: keyof typeof BRAND.programColors) {
  return { color: BRAND.programColors[type] };
}

/** Maps a donation amount to the appropriate donor tier label */
export function donorTierForAmount(amount: number) {
  const tiers = Object.values(BRAND.donorTiers).sort((a, b) => b.min - a.min);
  return tiers.find(t => amount >= t.min) ?? BRAND.donorTiers.seed;
}
