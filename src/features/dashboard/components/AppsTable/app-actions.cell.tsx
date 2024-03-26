import React from 'react';
import { CellProps } from 'react-table';
import styles from './cells.module.scss';
import { ApplicationObject } from '@deriv/api-types';

interface IAppActionsCellProps extends CellProps<ApplicationObject> {
  openDeleteDialog: () => void;
  openEditDialog: () => void;
}

const AppActionsCell = ({ openDeleteDialog, openEditDialog }: IAppActionsCellProps) => {
  return (
    <div className={styles.appActions} data-testid={'app-action-cell'}>
      <div
        onClick={openEditDialog}
        className={`${styles.updateApp} ${styles.tooltip}`}
        data-testid={'update-app-button'}
      >
        <span className={styles.tooltipText}>Edit application details</span>
      </div>
      <div
        onClick={openDeleteDialog}
        className={`${styles.deleteApp} ${styles.tooltip}`}
        data-testid={'delete-app-button'}
      >
        <span className={styles.tooltipText}>Delete application</span>
      </div>
    </div>
  );
};

export default AppActionsCell;
