module.exports = {
    extends: 'standard-with-typescript',
    parserOptions: {
      project: './tsconfig.json'
    },
    rules: {
      'padded-blocks': 'off',
      "no-unused-vars": "off" 
    }
  };