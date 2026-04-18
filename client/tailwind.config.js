/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode manually
  theme: {
    extend: {
      colors: {
        darkPrimary: '#0B0B0F',
        darkSecondary: '#111827',
        goldPrimary: '#D4AF37',
        goldLight: '#F5D76E',
        accentBlue: '#2563EB',
        success: '#10B981',
        lightBg: '#F8F8F8',
        whiteCard: '#FFFFFF',
        darkText: '#111827',
        lightText: '#F9FAFB',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37' },
          '100%': { boxShadow: '0 0 20px #D4AF37, 0 0 30px #F5D76E' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
