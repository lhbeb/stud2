/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        sans: ['Helvetica', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 6rem)',
        'heading': 'clamp(1.5rem, 4vw, 2.5rem)',
      },
      height: {
        '12': '3rem',   // 48px for mobile partners logos (30% reduction from 68px)
        '17': '4.25rem', // 68px for mobile partners logos (30% reduction from 96px)
        '21': '5.25rem', // 84px for small screens partners logos (30% reduction from 120px)
        '26': '6.5rem', // 104px for mobile navbar
        '24': '6rem',   // 96px for tablet navbar
        '30': '7.5rem', // 120px for mobile partners logos
      },
      spacing: {
        '26': '6.5rem', // 104px for mobile navbar
        '24': '6rem',   // 96px for tablet navbar
        '28': '7rem',   // 112px for mobile hero padding (reduced)
        '36': '9rem',   // 144px for mobile hero padding (original)
      },
    },
  },
  plugins: [],
};
