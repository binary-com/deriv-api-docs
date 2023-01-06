/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!src/configs/cms/**'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  coverageDirectory: './coverage/',
  coverageReporters: ['lcov'],
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': ['ts-jest'],
    '^.+\\.tsx?$': ['ts-jest', { babelConfig: true }],
  },
};
