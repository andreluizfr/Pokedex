import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    gridTemplateColumns: {
      'auto-fill-50': 'repeat(auto-fill, minmax(50px, 1fr))',
      'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
      'auto-fill-150': 'repeat(auto-fill, minmax(150px, 1fr))',
      'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
    }
  },
};
export const plugins = [
  plugin(({ addVariant }) => {
    addVariant('checked', '&[data-state=checked]');
  }),
  plugin(({ addVariant }) => {
    addVariant('unchecked', '&[data-state=unchecked]');
  }),
  plugin(({ addVariant }) => {
    addVariant('active', '&[data-state=active]');
  }),
  plugin(({ addVariant }) => {
    addVariant('inactive', '&[data-state=inactive]');
  }),
];
