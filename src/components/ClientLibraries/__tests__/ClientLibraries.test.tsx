import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { ClientLibaries } from '../ClientLibraries';

describe('ClientLibraries', () => {
  beforeEach(() => {
    render(<ClientLibaries />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const client_header = screen.getByTestId('client-header');
    expect(client_header).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const client_text = screen.getByRole('heading', { level: 1 });
    expect(client_text).toBeInTheDocument();
  });
  it('should render subtitle text properly', () => {
    const client_subtitle = screen.getByRole('heading', { level: 4 });
    expect(client_subtitle).toBeInTheDocument();
  });
  it('should navigate to the correct links on click', () => {
    expect(screen.getByText('Go to the JavaScript library').closest('a')).toHaveAttribute(
      'href',
      'https://binary-com.github.io/deriv-api/',
    );
    expect(screen.getByText('Go to the Python library').closest('a')).toHaveAttribute(
      'href',
      'https://binary-com.github.io/python-deriv-api/',
    );
    expect(screen.getByText('Go to the Flutter library').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/deriv-com/flutter-deriv-api',
    );
  });
});
