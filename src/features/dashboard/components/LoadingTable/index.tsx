import { SkeletonText } from '@site/src/components/SkeletonText';
import React, { HTMLAttributes } from 'react';

const Skeleton = () => (
  <tr data-testid='loading-skeleton-row'>
    <td>
      <SkeletonText />
    </td>
    <td>
      <SkeletonText />
    </td>
    <td>
      <SkeletonText />
    </td>
    <td>
      <SkeletonText />
    </td>
    <td>
      <SkeletonText />
    </td>
  </tr>
);

interface ILoadingTableProps extends HTMLAttributes<HTMLTableElement> {
  rowCount: number;
}

const LoadingTable = ({ rowCount }: ILoadingTableProps) => {
  return (
    <table>
      <tbody>
        {[...Array(rowCount)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </tbody>
    </table>
  );
};

export default LoadingTable;
