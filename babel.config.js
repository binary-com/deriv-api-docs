module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@linaria',
    require.resolve('@docusaurus/core/lib/babel/preset'),
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-jsx-remove-data-test-id',
          {
            attributes: 'data-testid',
          },
        ],
      ],
    },
    test: {
      plugins: [],
    },
  },
};
