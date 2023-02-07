import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import RegisteredAppTabs from '..';

describe('RegisterAppTabs', () => {
  beforeEach(() => {
    render(<RegisteredAppTabs />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders register application switch button', () => {
    const register_button = screen.getByText(/Register application/i);
    expect(register_button).toBeInTheDocument();
  });

  it('renders manage apps switch button', () => {
    const manage_button = screen.getByText(/Manage applications/i);
    expect(manage_button).toBeInTheDocument();
  });
});
