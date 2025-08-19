export default [
  {
    files: ['**/*.js'], // cualquier archivo js
    languageOptions: {
      ecmaVersion: 'latest', // última versión de ECMAScript (nota: era 'lastest', debe ser 'latest')
      sourceType: 'module' // tipo de módulo
    },
    rules: {
      semi: ['error', 'always'], // siempre usar punto y coma
      quotes: ['error', 'single'] // usar comillas simples
    }
  }
];
