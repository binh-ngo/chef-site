/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%" : {
            transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },    
        "100%": {
          transform: "translate(0px, 0px) scale(1)",
        },    
      }
    }
    },
    screens: {
      '3xs': '300px',
      '2xs': '400px',
      'xs': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1280px',
      'xl': '1500px',
      '2xl': '1680px',
      '3xl': '1900px',
    },
  },
  plugins: [],
}

