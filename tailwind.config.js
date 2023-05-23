/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Helvetica: "Helvetica",
      },
      backgroundImage: {
        imageOne: "url('/static/images/imageOne.png')",
        imageTwo: "url('/static/images/imageTwo.png')",
        imageThree: "url('/static/images/imageThree.png')",
      },
    },
  },
  plugins: [],
};
