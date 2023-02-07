import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { AppManager } from '../AppManager';

jest.mock('@site/src/hooks/useRootContext', () => {
  return jest.fn(() => ({
    is_logged_in: true,
  }));
});

describe('AppManager parent component', () => {
  beforeEach(() => {
    render(<AppManager />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Renders the component', () => {
    const main_component = screen.getByTestId('app-manager');
    expect(main_component).toBeInTheDocument();
  });

  it('Renders the main title', () => {
    const main_title = screen.getByText(/your apps/i);
    expect(main_title).toBeInTheDocument();
  });

  it('Renders the subtitle', () => {
    const subtitle = screen.getByText(
      /Register your app, get an app ID, and start using the Deriv API/i,
    );
    expect(subtitle).toBeInTheDocument();
  });
});
