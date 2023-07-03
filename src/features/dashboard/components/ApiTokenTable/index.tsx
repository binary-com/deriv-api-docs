import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
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
  const TABLE_HEADER_HEIGHT = 125;
  const { tokens, isLoadingTokens } = useApiToken();
  const [table_height, setTableHeight] = useState(0);
  const table_row_ref = useRef(null);

  useEffect(() => {
    const row_element_exists = table_row_ref !== null;
    if (tokens.length > 0 && row_element_exists) {
      const row_height = table_row_ref.current?.clientHeight;
      setTableHeight(row_height * tokens.length);
    }
  }, [tokens, table_row_ref]);

  return (
    <div
      style={{ height: `calc(${table_height}px + ${TABLE_HEADER_HEIGHT}px + 50px)` }}
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
          table_row_ref={table_row_ref}
        />
      </div>
    </div>
  );
};

export default ApiTokenTable;
