/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f6feb',
      },
      boxShadow: {
        small: '0 1px 2px rgba(0,0,0,0.06)',
        medium: '0 4px 12px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
      }
    }
  }
};
