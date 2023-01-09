import '@testing-library/jest-dom';

// HINT: we need this mock for the tests with docusaurus components
window['docusaurus'] = {
  prefetch: jest.fn(),
  preload: jest.fn(),
};
