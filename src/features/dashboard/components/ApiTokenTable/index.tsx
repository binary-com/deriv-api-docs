import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import styles from './api-table.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';
import { Column } from 'react-table';
import { TTokenType } from '@site/src/types';
import ApiTokenCell from './table.token.cell';
import ApiLastUsedCell from './table.lastused.cell';
import ScopesCell from '../Table/scopes.cell';
import Table from '../Table';

export type TTokenColumn = Column<TTokenType>;

const tableColumns: TTokenColumn[] = [
  {
    Header: 'Name',
    accessor: 'display_name',
  },
  {
    Header: 'Token',
    accessor: 'token',
    Cell: ApiTokenCell,
  },
  {
    Header: 'Scopes',
    accessor: 'scopes',
    Cell: ScopesCell,
  },
  {
    Header: 'Last Used',
    accessor: 'last_used',
    Cell: ApiLastUsedCell,
  },
  {
    Header: 'Valid for IP',
    accessor: 'valid_for_ip',
  },
];

const ApiTokenTable = (props: HTMLAttributes<HTMLDivElement>) => {
  const ROW_HEIGHT = 125;
  const { tokens, isLoadingTokens } = useApiToken();
  const [table_height, setTableHeight] = useState(0);

  useEffect(() => {
    if (tokens.length > 0) {
      setTableHeight(ROW_HEIGHT * tokens.length);
    }
  }, [tokens]);

  return (
    <div
      style={{ height: `calc(${table_height}px + ${ROW_HEIGHT}px + 50px)` }}
      className={styles.api_table_container}
    >
      <div className={styles.api_table} {...props}>
        <Circles
          height='100'
          width='100'
          color='#d44c0d'
          ariaLabel='circles-loading'
          wrapperClass='loading'
          visible={isLoadingTokens}
        />
        <Table
          columns={tableColumns}
          data={tokens}
          initialState={{ hiddenColumns: ['valid_for_ip'] }}
          row_height={ROW_HEIGHT}
        />
      </div>
    </div>
  );
};

export default ApiTokenTable;
