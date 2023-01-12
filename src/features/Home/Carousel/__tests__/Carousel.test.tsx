import React from 'react';
import { Carousel } from '../Carousel';
import { cleanup, render, RenderResult, screen } from '@site/src/test-utils';

describe('Homepage carousel', () => {
  beforeEach(() => {
    render(<Carousel />);
  });

  afterEach(cleanup);

  it('renders the carousel', () => {
    const carousel = screen.getByTestId('carousel-component');
    expect(carousel).toBeInTheDocument();
  });

  it('renders the title', () => {
    const title = screen.getByText(/See what our clients say/i);
    expect(title).toBeInTheDocument();
  });

  it('renders previous arrow', () => {
    const prev_arrow = screen.getByTestId('carousel-arrow-prev');
    expect(prev_arrow).toBeInTheDocument();
    expect(prev_arrow).toHaveStyle('background: url(/img/arrow_left.svg) no-repeat');
  });

  it('renders next arrow', () => {
    const prev_arrow = screen.getByTestId('carousel-arrow-next');
    expect(prev_arrow).toBeInTheDocument();
    expect(prev_arrow).toHaveStyle('background: url(/img/arrow_right.svg) no-repeat');
  });

  it('renders Alessandro slide', () => {
    const alessandro_slide = screen.getAllByText(/is one of the best APIs in the trading market/i);
    expect(alessandro_slide[0]).toBeInTheDocument();
  });

  it('renders Thiago slide', () => {
    const thiago_slide = screen.getAllByText(/Probably the best API for making your business/i);
    expect(thiago_slide[0]).toBeInTheDocument();
  });

  it('renders Josh slide', () => {
    const josh_slide = screen.getAllByText(/I have been using the deriv API for 13 years/i);
    expect(josh_slide[0]).toBeInTheDocument();
  });

  it('shows author Alessandro', () => {
    const alessandro = screen.getAllByText(/Alessandro, CEO | Italy/i);
    expect(alessandro[0]).toBeInTheDocument();
  });

  it('shows author Thiago', () => {
    const thiago = screen.getAllByText(/Thiago, entrepreneur | brazil/i);
    expect(thiago[0]).toBeInTheDocument();
  });

  it('shows author Josh', () => {
    const josh = screen.getAllByText(/josh, trader | australia/i);
    expect(josh[0]).toBeInTheDocument();
  });
});
