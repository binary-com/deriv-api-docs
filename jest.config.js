module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  preset: 'ts-jest',
  transform: {
    '^.+\\.{ts,tsx}?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
};
