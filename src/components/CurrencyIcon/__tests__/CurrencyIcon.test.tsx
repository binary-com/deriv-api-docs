import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrencyIcon from '..';

jest.mock('@site/src/utils', () => ({
  ...jest.requireActual('@site/src/utils'),
  CURRENCY_MAP: new Map([['UST', { icon: 'tether', name: 'Tether Omni' }]]),
}));

describe('CurrencyIcon - component to display a currency icon', () => {
  it('should render a placeholder image, if the original image does not exist', () => {
    render(<CurrencyIcon currency='doesnotexist' />);
    const placeholder = screen.getByTestId('currency-icon');
    expect(placeholder).toHaveAttribute('src', '/img/placeholder_icon.svg');
  });

  it('should render a currency icon when given the correct input', () => {
    render(<CurrencyIcon currency='UST' />);
    const currency = screen.getByTestId('currency-icon');
    expect(currency).toHaveAttribute('src', '/img/tether.svg');
  });
});
