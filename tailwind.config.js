/** @type {import('tailwindcss').Config} */
export default {
  content: [ //Isso define quais arquivos da aplicação terão classes do tailwind
    "./index.html",
    "./src/**/*.tsx", //Todos os arquivos de src que têm essas extensões
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}

