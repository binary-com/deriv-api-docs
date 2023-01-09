/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/configs/**',
    '!src/pages/**', // TODO: Fix the docusuarus module naming
    '!src/theme/**', // TODO: Fix the docusuarus module naming
    '!src/test-utils.tsx',
  ],
  coverageDirectory: './coverage/',
  // coverageReporters: ['lcov'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': ['ts-jest', { babelConfig: true }],
    '^.+\\.mjs$': ['babel-jest'],
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '@theme/(.*)': '@docusaurus/theme-classic/src/theme/$1',

    '@docusaurus/(ErrorBoundary|BrowserOnly|ComponentCreator|constants|ExecutionEnvironment|Head|Interpolate|isInternalUrl|Link|Noop|renderRoutes|router|Translate|use.*)':
      '@docusaurus/core/lib/client/exports/$1',

    '@generated/(.*)': '<rootDir>/.docusaurus/$1',

    '@docusaurus/plugin-content-docs/client': '@docusaurus/plugin-content-docs/src/client/index.ts',
    '@site/(.*)': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'json'],
  rootDir: '.',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  transformIgnorePatterns: ['node_modules/(?!(@docusaurus)|@theme)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
