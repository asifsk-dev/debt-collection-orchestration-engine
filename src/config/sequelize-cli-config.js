require('ts-node').register({
  transpileOnly: true,
  compilerOptions: { module: 'CommonJS' },
});

module.exports = require('./config.ts').default;
