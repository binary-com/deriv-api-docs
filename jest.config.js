module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  coverageReporters: ['lcov'],
  coverageDirectory: './coverage/',
  testEnvironment: "jsdom",
  preset: 'ts-jest',
    transform: {
        '^.+\\.{ts,tsx}?$': 'ts-jest'
    },
};
