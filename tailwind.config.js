/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          100: "#101828",
          200: "#EAECF0",
          300: "#344054",
          400: "#667085",
          500: "#D0D5DD",
          600: "#F9FAFB",
          700:'#84818A'
        },
        adGreen: {
          100: "#F9FFFC",
          200: "#00A85A",
          300:"#ECFDF3"
        },
        adYellow: {
          100: "#FF9000",
        },
        adRed:{
          100:'#B71212'
        }
      },
    },
  },
  plugins: [],
};
