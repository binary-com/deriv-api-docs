import React, { HTMLAttributes, LegacyRef, ReactNode } from 'react';
import { Cell, Column, TableState, useTable } from 'react-table';
import './table.scss';

const defaultPropGetter = () => ({});

interface ITableProps<T extends object> extends HTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: Column<T>[];
  initialState?: TableState<T>;
  row_height?: number;
  getCustomCellProps?: (cell: Cell<T, unknown>) => object;
}

const Table = <T extends object>({
  data,
  columns,
  initialState,
  getCustomCellProps = defaultPropGetter,
  row_height,
  ...rest
}: ITableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
    initialState: initialState,
  });

  return (
    <table {...getTableProps()} {...rest}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.getHeaderGroupProps().key} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.getHeaderProps().key} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              style={{ height: `${row_height}px` }}
              key={row.getRowProps().key}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td key={cell.getCellProps().key} {...cell.getCellProps()}>
                    {cell.render('Cell', getCustomCellProps(cell))}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
