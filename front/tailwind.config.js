/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      rotate: {
        '180': '180deg',
      },
      animation: {
        blob: "blob 7s infinite",

      },
        fontFamily: {
          Tektur: ['Tektur', 'sans-serif'],
          Cormorant: ['Cormorant Garamond', 'serif'],
          Bree: ['Bree Serif', 'serif'],
          Open: ['Open Sans', 'sans-serif'],
          Angkor: ['Angkor', 'serif'],
          
        },
    
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  variants: {
  
  },

  plugins: [
      require("tailwind-scrollbar"),
      function({addUtilities}){
        const newUtilities ={
          ".scrollbar-thin": {
            scrollbarWidth : "thin",
            scrollbarColor : "white"
          },
          ".scrollbar-webkit":{
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-track": {
              background: "white"
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "white",
              borderRadius: "20px",
              border: "1px solid white"
            }
          }
        }
        addUtilities(newUtilities, ["responsive", "hover"])
      }
      // Otros plugins si los tienes
    ],

};