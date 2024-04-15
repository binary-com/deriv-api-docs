import { ApplicationObject } from '@deriv/api-types';
import React, { HTMLAttributes, useCallback, useState } from 'react';
import { Cell, Column } from 'react-table';
import DeleteAppDialog from '../Dialogs/DeleteAppDialog';
import UpdateAppDialog from '../Dialogs/UpdateAppDialog';
import Table from '../Table';
import ScopesCell from '../Table/scopes.cell';
import AppActionsCell from './app-actions.cell';
import CopyTextCell from '../Table/copy-text.cell';
import { Button, Heading, Text } from '@deriv/quill-design';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';
import useAppManager from '@site/src/hooks/useAppManager';
import './apps-table.scss';

export type TAppColumn = Column<ApplicationObject>;

const appTableColumns: TAppColumn[] = [
  {
    Header: 'App’s name',
    accessor: 'name',
    minWidth: 150,
    maxWidth: 200,
  },
  {
    Header: 'App ID',
    accessor: 'app_id',
    minWidth: 120,
    maxWidth: 150,
    Cell: CopyTextCell,
  },
  {
    Header: 'OAuth scopes',
    accessor: 'scopes',
    minWidth: 200,
    Cell: ScopesCell,
  },
  {
    Header: 'OAuth redirect URL',
    accessor: 'redirect_uri',
    minWidth: 350,
    Cell: CopyTextCell,
  },
  {
    Header: 'Actions',
    id: 'actions',
    accessor: (originalRow) => originalRow.app_id,
    Cell: AppActionsCell,
  },
];

interface AppsTableProps extends HTMLAttributes<HTMLTableElement> {
  apps: ApplicationObject[];
}

const AppsTableHeader = () => {
  const { updateCurrentTab } = useAppManager();

  return (
    <div className='apps_table__header'>
      <div className='apps_table__header__texts'>
        <Heading.H3>App manager</Heading.H3>
        <Text size='md'>
          Here&apos;s where you can see your app&apos;s details. Edit your app settings to suit your
          needs or delete them permanently.
        </Text>
      </div>
      <Button
        colorStyle='coral'
        size='md'
        variant='primary'
        role='submit'
        iconPosition='start'
        icon={LabelPairedCirclePlusMdRegularIcon}
        onClick={() => {
          updateCurrentTab('REGISTER_APP');
        }}
      >
        Register new application
      </Button>
    </div>
  );
};

const AppsTable = ({ apps }: AppsTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [actionRow, setActionRow] = useState<ApplicationObject>();

  const getCustomCellProps = useCallback((cell: Cell<ApplicationObject, unknown>) => {
    return {
      openDeleteDialog: () => {
        setActionRow(cell.row.original);
        // setIsDeleteOpen(true);
      },

      openEditDialog: () => {
        setActionRow(cell.row.original);
        // setIsEditOpen(true);
      },
    };
  }, []);

  const onCloseEdit = () => {
    setActionRow(null);
    setIsEditOpen(false);
  };

  const onCloseDelete = () => {
    setActionRow(null);
    setIsDeleteOpen(false);
  };

  return (
    <div className='apps_table'>
      {isDeleteOpen && <DeleteAppDialog appId={actionRow.app_id} onClose={onCloseDelete} />}
      {isEditOpen && <UpdateAppDialog app={actionRow} onClose={onCloseEdit} />}
      <div>
        <AppsTableHeader />
        {apps?.length ? (
          <Table
            data={apps}
            columns={appTableColumns}
            getCustomCellProps={getCustomCellProps}
            parentClass='apps_table'
          />
        ) : null}
      </div>
    </div>
  );
};

export default AppsTable;
