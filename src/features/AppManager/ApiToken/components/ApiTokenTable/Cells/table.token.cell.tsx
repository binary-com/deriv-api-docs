import React from 'react';
import { CellProps } from 'react-table';
import { TTokenType } from '../../../../../../contexts/tokenPage/types';

const ApiTokenCell = ({ cell }: React.PropsWithChildren<CellProps<TTokenType, string>>) => {
  return <div data-testid={'token-cell'}>{cell.value}</div>;
};

export default ApiTokenCell;
