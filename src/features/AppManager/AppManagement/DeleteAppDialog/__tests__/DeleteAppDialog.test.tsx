import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import DeleteAppDialog from '..';

const fakeDeleteApp = jest.fn();

describe('DeleteAppDialog', () => {
  beforeEach(() => {
    render(<DeleteAppDialog deleteApp={fakeDeleteApp} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render delete dialog content', () => {
    const content = screen.getByText(/Are you sure you want to delete this app?/i);
    expect(content).toBeInTheDocument();
  });

  it('should render the dialog title', () => {
    const title = screen.getByText(/Delete app/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });
});
