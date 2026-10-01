/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#061325',
          DEFAULT: '#0B2344',
          800: '#0E2A50',
          700: '#143868',
          600: '#1D4E89',
          100: '#E8EFF8',
          50: '#F0F5FC'
        },
        green: {
          DEFAULT: '#16B86A',
          600: '#129B58',
          700: '#0E7D46',
          400: '#34D399',
          100: '#D1FAE5',
          50: '#ECFDF5'
        },
        offwhite: {
          DEFAULT: '#F5F2EA',
          50: '#FAF8F4',
          100: '#F5F2EA',
          200: '#EAE5D8',
        },
        slate: {
          text: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(11, 35, 68, 0.05), 0 2px 6px -1px rgba(11, 35, 68, 0.03)',
        'premium': '0 10px 30px -5px rgba(11, 35, 68, 0.08), 0 4px 12px -2px rgba(11, 35, 68, 0.04)',
        'hover': '0 20px 40px -10px rgba(11, 35, 68, 0.12), 0 8px 16px -4px rgba(11, 35, 68, 0.06)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
