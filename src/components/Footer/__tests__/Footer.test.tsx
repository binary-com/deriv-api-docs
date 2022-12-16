import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Footer } from '../footer';

beforeEach(() => {
  render(<Footer />);
});

afterEach(cleanup);

describe('HeroHeader', () => {
  it('should render properly', () => {
    const hero_header = screen.getByTestId('footer-text');
    expect(hero_header).toBeInTheDocument();
  });
  it('should render Headings properly', () => {
    const footer_title = screen.getByRole('heading', { level: 3 });
    expect(footer_title).toBeInTheDocument();
  });
  it('should render text properly', () => {
    const footer_subtitle = screen.getByRole('heading', { level: 7 });
    expect(footer_subtitle).toBeInTheDocument();
  });

  it('should redirect to the correct link onclick', () => {
    expect(screen.getByTestId('community-link')).toHaveAttribute(
      'href',
      'https://binary.vanillacommunity.com/',
    );
  });
});
