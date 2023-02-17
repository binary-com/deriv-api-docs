import React from 'react';
import { CellProps } from 'react-table';
import { TAppColumn } from '.';
import styles from './cells.module.scss';

interface IAppActionsCellProps extends React.PropsWithChildren<CellProps<TAppColumn, string>> {
  openDeleteDialog: () => void;
  openEditDialog: () => void;
}

const AppActionsCell = ({ openDeleteDialog, openEditDialog }: IAppActionsCellProps) => {
  return (
    <div className={styles.appActions}>
      <div onClick={openEditDialog} className={`${styles.updateApp} ${styles.tooltip}`}>
        <span className={styles.tooltipText}>Edit application details</span>
      </div>
      <div onClick={openDeleteDialog} className={`${styles.deleteApp} ${styles.tooltip}`}>
        <span className={styles.tooltipText}>Delete application</span>
      </div>
    </div>
  );
};

export default AppActionsCell;
