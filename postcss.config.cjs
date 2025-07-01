// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},   // <— ÚNICAMENTE el plugin nuevo
    autoprefixer: {},
  }
}
