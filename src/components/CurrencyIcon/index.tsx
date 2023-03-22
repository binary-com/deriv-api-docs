import React from 'react';
import { CURRENCY_MAP } from '@site/src/utils';

const CurrencyIcon = ({ currency }: { currency: string }) => {
  const icon = CURRENCY_MAP.get(currency) ? CURRENCY_MAP.get(currency).icon : 'placeholder_icon';

  return (
    <img
      data-testid='currency-icon'
      alt={`${currency}-icon`}
      src={`/img/${icon}.svg`}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/img/placeholder_icon.svg';
      }}
    />
  );
};

export default CurrencyIcon;
