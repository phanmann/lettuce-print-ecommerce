/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Material Design 3 Color System - Industrial Brooklyn Theme
        "primary": "#4e6300",
        "primary-container": "#cbfd19",
        "on-primary": "#e1ff88",
        "on-primary-container": "#4a5e00",
        "on-primary-fixed": "#3a4a00",
        "on-primary-fixed-variant": "#526900",
        "primary-dim": "#435600",
        "primary-fixed": "#cbfd19",
        "primary-fixed-dim": "#beee00",
        
        "secondary": "#5c5b5b",
        "secondary-container": "#e5e2e1",
        "on-secondary": "#f5f2f1",
        "on-secondary-container": "#525151",
        "on-secondary-fixed": "#403f3f",
        "on-secondary-fixed-variant": "#5c5b5b",
        "secondary-dim": "#504f4f",
        "secondary-fixed": "#e5e2e1",
        "secondary-fixed-dim": "#d6d4d3",
        
        "tertiary": "#5c5b5b",
        "tertiary-container": "#ffffff",
        "on-tertiary": "#f5f2f1",
        "on-tertiary-container": "#636262",
        "on-tertiary-fixed": "#515050",
        "on-tertiary-fixed-variant": "#6e6d6d",
        "tertiary-dim": "#504f4f",
        "tertiary-fixed": "#ffffff",
        "tertiary-fixed-dim": "#f3f0ef",
        
        "surface": "#f6f6f6",
        "surface-bright": "#f6f6f6",
        "surface-dim": "#d2d5d5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f0f1f1",
        "surface-container": "#e7e8e8",
        "surface-container-high": "#e1e3e3",
        "surface-container-highest": "#dbdddd",
        "surface-variant": "#dbdddd",
        "on-surface": "#2d2f2f",
        "on-surface-variant": "#5a5c5c",
        
        "background": "#f6f6f6",
        "on-background": "#2d2f2f",
        
        "outline": "#757777",
        "outline-variant": "#acadad",
        
        "error": "#b02500",
        "error-container": "#f95630",
        "error-dim": "#b92902",
        "on-error": "#ffefec",
        "on-error-container": "#520c00",
        
        "inverse-surface": "#0c0f0f",
        "inverse-on-surface": "#9c9d9d",
        "inverse-primary": "#cbfd19",
        "surface-tint": "#4e6300",
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Epilogue", "sans-serif"],  
        "label": ["Space Grotesk", "sans-serif"],
        sans: ["Epilogue", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px", 
        "xl": "0px",
        "full": "9999px",
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}