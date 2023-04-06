import { SkeletonText } from '@site/src/components/SkeletonText';
import React, { HTMLAttributes } from 'react';

interface ISkeletonRow {
  columnCount: number;
}

const SkeletonRow = ({ columnCount }: ISkeletonRow) => (
  <tr data-testid='dt_loading_skeleton_row'>
    {[...Array(columnCount)].map((_, i) => (
      <td data-testid={`dr_loading_table_column_${i}`} key={i}>
        <SkeletonText />
      </td>
    ))}
  </tr>
);

interface ILoadingTableProps extends HTMLAttributes<HTMLTableElement> {
  rowCount: number;
  columnCount?: number;
}

const LoadingTable = ({ rowCount, columnCount = 5 }: ILoadingTableProps) => {
  return (
    <table>
      <tbody>
        {[...Array(rowCount)].map((_, i) => (
          <SkeletonRow columnCount={columnCount} key={i} />
        ))}
      </tbody>
    </table>
  );
};

export default LoadingTable;
