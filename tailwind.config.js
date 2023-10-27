/**@type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#88CEE7',
          100: '#77C7E4',
          200: '#66C0E1',
          300: '#55B9DD',
          400: '#44B2DA',
          500: '#33ABD7',
          600: '#28A1CC',
          700: '#2593BB',
          800: '#2286AA',
          900: '#1E7999',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#c7c7c7',
          300: '#a3a3a3',
          400: '#5c5c5c',
          500: '#151515',
          600: '#131313',
          700: '#0f0f0f',
          800: '#0c0c0c',
          900: '#0a0a0a',
        },
        tertiary: {
          50: '#D0E7D2',
          100: '#C4E1C6',
          200: '#B8DBBA',
          300: '#ACD5AE',
          400: '#A0CFA2',
          500: '#94C995',
          600: '#88C389',
          700: '#7CB97D',
          800: '#70B371',
          900: '#64AD65',
        },
        success: '#4caf50',
        alert: '#f44336',
        warning: '#ff9800',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        header: 'theme(height.14)',
        main: 'calc(100vh - theme(height.14))',
      },
      width: {
        sidebar: 'theme(width.16)',
        main: 'calc(100vw - theme(width.16))',
        submenu: 'theme(width.52)',
        panel: 'calc(100% - theme(width.52))',
        100: '35rem',
      },
    },
  },
  plugins: [],
}
