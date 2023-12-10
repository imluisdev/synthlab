/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "close-menu":"url(https://firebasestorage.googleapis.com/v0/b/synthlab-src.appspot.com/o/icon-close.svg?alt=media&token=3d535e2e-cd50-40e6-9fa5-0e793cb8cf9d)",
        "open-menu":"url(https://firebasestorage.googleapis.com/v0/b/synthlab-src.appspot.com/o/icon-hamburger.svg?alt=media&token=4ab4c6dc-993e-4caf-8c0f-91d627668f66)"
      }
    },
  },
  plugins: [],
}

