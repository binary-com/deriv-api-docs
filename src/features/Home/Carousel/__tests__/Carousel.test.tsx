import React from 'react';
import { Carousel } from '../Carousel';
import { cleanup, render, RenderResult, screen, within } from '@site/src/test-utils';

// jest.mock('swiper/css');

describe('Homepage carousel', () => {
  it('Renders the carousel', () => {
    render(<Carousel />);
    const carousel = screen.getByTestId('carousel-component');
    expect(carousel).toBeInTheDocument();
  });
});
