// import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
// import defaultTheme from "tailwindcss/defaultTheme"

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#7C78DD',
          600: '#5A5894',
        },
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
// export default config
