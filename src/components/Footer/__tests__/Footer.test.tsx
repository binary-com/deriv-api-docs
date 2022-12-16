import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '../footer';

jest.mock('@linaria/core', () => ({
  css: () => jest.fn(),
}));

describe('HeroHeader', () => {
  it('should render properly', () => {
    render(<Footer />);
    const hero_header = screen.getByTestId('footer-text');
    expect(hero_header).toBeInTheDocument();
  });
  it('should render Headings properly', () => {
    render(<Footer />);
    const footer_title = screen.getByRole('heading', { level: 2 });
    expect(footer_title).toBeInTheDocument();
  });
  it('should render text properly', () => {
    render(<Footer />);
    const footer_subtitle = screen.getByRole('heading', { level: 7 });
    expect(footer_subtitle).toBeInTheDocument();
  });

  it('should redirect to the correct link onclick');
  render(<Footer />);
  expect(screen.getByText('Join our Community').closest('a')).toHaveAttribute(
    'href',
    'https://binary.vanillacommunity.com/',
  );
});
