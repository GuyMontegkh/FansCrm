const CracoAlias = require('craco-alias');

module.exports = () => ({
  eslint: {
    enable: true,
    mode: 'file',
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.json',
      },
    },
  ],
});
