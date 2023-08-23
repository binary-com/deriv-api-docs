import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { HeroHeader } from '../HeroHeader';

beforeEach(() => {
  render(<HeroHeader />);
});

afterEach(cleanup);

describe('HeroHeader', () => {
  it('should render properly', () => {
    const hero_header = screen.getByTestId('hero-header');
    expect(hero_header).toBeInTheDocument();
  });

  it('should render hero title properly', () => {
    const hero_title = screen.getByRole('heading', { level: 2 });
    expect(hero_title).toHaveTextContent('Deriv API');
  });

  it('should render hero subtitle text properly', () => {
    const hero_subtitle = screen.getByTestId('hero-header-subtitle');
    expect(hero_subtitle).toHaveTextContent(
      'Use our powerful, flexible, and free API to build a custom trading platform - for yourself or for your business.',
    );
  });
});
