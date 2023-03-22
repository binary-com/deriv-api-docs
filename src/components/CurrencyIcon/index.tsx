import React from 'react';
import { getCurrencyObject } from '@site/src/utils';

const CurrencyIcon = ({ currency }: { currency: string }) => {
  const icon = getCurrencyObject(currency)?.icon;

  return <img data-testid='currency-icon' alt={`${currency}-icon`} src={`/img/${icon}.svg`} />;
};

export default CurrencyIcon;
