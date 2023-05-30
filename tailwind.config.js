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
      'auto-fill-50-fr': 'repeat(auto-fill, minmax(50px, auto))',
      'auto-fill-100-fr': 'repeat(auto-fill, minmax(100px, auto))',
      'auto-fill-150-fr': 'repeat(auto-fill, minmax(150px, auto))',
      'auto-fill-200-fr': 'repeat(auto-fill, minmax(200px, auto))',

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
