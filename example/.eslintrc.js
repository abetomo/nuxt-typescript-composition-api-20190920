module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  presets: [
    ["@babel/preset-env", { "loose": true }],
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
  }
}
