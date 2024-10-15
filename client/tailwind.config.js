/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        fantasy : ["Permanent Marker" , "cursive"]
      },
      backgroundImage : {
        'image1' : "url('../../assets/image1.png')"
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  plugins: [],
}