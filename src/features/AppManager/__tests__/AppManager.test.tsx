import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { AppManager } from '../AppManager';

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

  it('Renders the subtitle', async () => {
    const subtitle = await screen.getByText(
      /register your app, get an app id, and start using the deriv api/i,
    );
    expect(subtitle).toBeInTheDocument();
  });
});
