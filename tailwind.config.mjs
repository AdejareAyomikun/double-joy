/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B48B78",
        accent: "#E3C9AC",
        bg: "#FCF9F6",
        text: "#3A2E2A",
        muted: "#7A6A63",
      },
    },
  },
  plugins: [],
};
