// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#100A2F',
        secondary: '#9700FF',
      },
      fontFamily: {
        content: ['content-font', 'system-ui', 'sans-serif'],
        title: ['title-font', 'system-ui', 'sans-serif'],
        highlight: ['highlight-font', 'system-ui', 'sans-serif'],
      },
    },
  },

  plugins: [],
}
