import '@testing-library/jest-dom';
import 'jest-location-mock';
import 'jest-localstorage-mock';

// HINT: we need this mock for the tests with docusaurus components
window['docusaurus'] = {
  prefetch: jest.fn(),
  preload: jest.fn(),
};

// HINT: we need for radix-ui dropdown menu for account switcher, based on this https://stackoverflow.com/questions/68679993/referenceerror-resizeobserver-is-not-defined
// TODO: please remove this when we have the official account switcher from deriv-app
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
