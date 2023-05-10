import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '..';

describe('Loader', () => {
  it('should render the loader', async () => {
    render(<Loader />);
    const loader = await screen.findByTestId('circles-loading');
    expect(loader).toBeVisible();
  });
});
