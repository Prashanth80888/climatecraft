/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Climate Craft canvas ────────────────────────────────────────
        // The pale cool blue/blue-grey page environment
        canvas: {
          DEFAULT: '#E5FEFF',
          soft: '#F0FAFA',
          aqua: '#C9F3F2',
          cyan: '#B8E9E8',
          mint: '#F7FCFB',
          blue: '#E0F6F5',
          deep: '#D4F0EF',
        },
        // ── Ink ─────────────────────────────────────────────────────────
        // Dark teal typography scale (readable on the light canvas & glass)
        ink: {
          950: '#063B3D',
          900: '#073F40',
          800: '#17504F',
          700: '#315F62',
          600: '#37676A',
        },
        // ── Teal / aqua ─────────────────────────────────────────────────
        teal: {
          950: '#0B4F4E',
          900: '#0F7776',
          800: '#12807F',
          700: '#169B9A',
          600: '#1FAAAA',
          500: '#53C9C5',
          400: '#7FD9D5',
          300: '#A8E8E4',
          200: '#CDF3F1',
        },
        // ── Warm gold ───────────────────────────────────────────────────
        // Restrained accent family; 400 is THE brand gold, 600–800 are
        // text-safe deepenings for use on the light canvas.
        gold: {
          900: '#5C4715',
          800: '#75591A',
          700: '#8F6D20',
          600: '#AD8A28',
          500: '#C9A84E',
          400: '#E7C96A',
          300: '#F0DC9C',
          200: '#F7EAC4',
          100: '#FBF3DF',
        },
        // ── Cream (legacy name, now the dark-teal text scale) ──────────
        // Historically light text on dark; on the new light canvas these
        // resolve to dark teal so every existing text-* class stays readable.
        cream: {
          100: '#063B3D',
          200: '#315F62',
          300: '#37676A',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glass': '0 24px 60px -28px rgba(18,59,61,0.18), 0 2px 8px -2px rgba(18,59,61,0.06)',
        'glass-lg': '0 40px 90px -36px rgba(18,59,61,0.25), 0 4px 14px -4px rgba(18,59,61,0.08)',
        'teal-glow': '0 18px 44px -14px rgba(22,155,154,0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-rtl': 'marquee-rtl 40s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      textShadow: {
        xs: '0 1px 1px rgba(6,59,61,0.12)',
        sm: '0 1px 2px rgba(6,59,61,0.15), 0 2px 4px rgba(6,59,61,0.08)',
        DEFAULT: '0 2px 4px rgba(6,59,61,0.18), 0 4px 8px rgba(6,59,61,0.12)',
        lg: '0 4px 8px rgba(6,59,61,0.2), 0 8px 16px rgba(6,59,61,0.15)',
        none: 'none',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const textShadows = {
        '.text-shadow-xs': { textShadow: '0 1px 1px rgba(6,59,61,0.12)' },
        '.text-shadow-sm': { textShadow: '0 1px 2px rgba(6,59,61,0.15), 0 2px 4px rgba(6,59,61,0.08)' },
        '.text-shadow': { textShadow: '0 2px 4px rgba(6,59,61,0.18), 0 4px 8px rgba(6,59,61,0.12)' },
        '.text-shadow-lg': { textShadow: '0 4px 8px rgba(6,59,61,0.2), 0 8px 16px rgba(6,59,61,0.15)' },
        '.text-shadow-none': { textShadow: 'none' },
      }
      addUtilities(textShadows)
    },
  ],
}
