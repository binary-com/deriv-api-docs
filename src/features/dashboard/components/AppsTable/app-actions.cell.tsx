import React from 'react';
import { CellProps } from 'react-table';
import { TAppColumn } from '.';
import { LabelPairedPenSmRegularIcon, LabelPairedTrashSmRegularIcon } from '@deriv/quill-icons';
import CustomTooltip from '@site/src/components/CustomTooltip';
import styles from './cells.module.scss';

interface IAppActionsCellProps extends React.PropsWithChildren<CellProps<TAppColumn, string>> {
  openDeleteDialog: () => void;
  openEditDialog: () => void;
}

const AppActionsCell = ({ openDeleteDialog, openEditDialog }: IAppActionsCellProps) => {
  return (
    <div className={styles.appActions} data-testid={'app-action-cell'}>
      <div onClick={openEditDialog} data-testid={'update-app-button'}>
        <CustomTooltip text='Edit application details'>
          <LabelPairedPenSmRegularIcon />
        </CustomTooltip>
      </div>

      <div onClick={openDeleteDialog} data-testid={'delete-app-button'}>
        <CustomTooltip text='Delete application'>
          <LabelPairedTrashSmRegularIcon />
        </CustomTooltip>
      </div>
    </div>
  );
};

export default AppActionsCell;
