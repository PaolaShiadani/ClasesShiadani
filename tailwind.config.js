/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        wine: "#800020",
        crimson: "#DC143C",
        "gold-custom": "#F5c700",
        "ebony-custom": "#0C0C0C",
        "pearl-custom": "#FDFDFD",
        "silver-custom": "#C0C0C0",
        "navy-custom": "#000080",
      },
    },
  },
  plugins: [],
};
