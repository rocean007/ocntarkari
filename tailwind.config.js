/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0faf0',
          100: '#d6f2d5',
          200: '#b0e4ae',
          300: '#7dce7a',
          400: '#4eb34a',
          500: '#3D7A3A',
          600: '#2D5E2A',
          700: '#234820',
          800: '#1c3819',
          900: '#162d14',
        },
        cream: {
          50:  '#fdfcf8',
          100: '#F7F6F1',
          200: '#F0EEE6',
          300: '#E8E4D9',
          400: '#D9D3C3',
          500: '#C4BAA5',
        },
      },
      animation: {
        'shimmer': 'shimmer 1.6s infinite',
        'float': 'float 4s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        'slide-up': 'slideUp 0.45s cubic-bezier(0.4,0,0.2,1) both',
        'fade-in': 'fadeIn 0.4s ease both',
        'modal-in': 'modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'spin-smooth': 'spin 0.8s linear infinite',
        'cart-bounce': 'cartBounce 0.4s ease both',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(3deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-2deg)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          from: { opacity: '0', transform: 'scale(0.92) translateY(16px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        cartBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, #ECEAE2 25%, #F5F4EF 50%, #ECEAE2 75%)',
      },
      boxShadow: {
        'brand': '0 8px 24px rgba(61,122,58,0.22)',
        'brand-lg': '0 12px 32px rgba(61,122,58,0.30)',
        'card': '0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 32px rgba(0,0,0,0.10)',
        'drawer': '-8px 0 40px rgba(0,0,0,0.12)',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}
