/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { useDeleteApp } from '@site/src/hooks/useDeleteApp';
import { useApps } from '@site/src/hooks/useApps';
import { SkeletonText } from '@site/src/components/SkeletonText';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import AppManagementEmpty from './AppManagementEmpty';
import DeleteAppDialog from './DeleteAppDialog';
import '../AppManager.module.scss';
import styles from './AppManagement.module.scss';

type TScopes = {
  values?: string[];
};

type TCell = {
  cell: { value: string[] };
};

type TRow = {
  row: {
    original: { app_id: number };
  };
};

export default function AppManagement() {
  const { setManagerState, setDialogState, setUpdatingRow, dialog_state, is_empty_state } =
    useAppManagerContext();
  const [app_id, setAppId] = React.useState(null);
  const { deleteApp } = useDeleteApp(app_id);
  const { data, isLoading } = useApps();
  const dialog_is_open = dialog_state === 'DIALOG_DELETE';
  const table_data = React.useMemo(() => data?.app_list || [], [data]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Application Name',
        accessor: 'name',
      },
      {
        Header: 'Application ID',
        accessor: 'app_id',
      },
      {
        Header: 'Scopes',
        accessor: 'scopes',
        Cell: ({ cell: { value } }: TCell) => <Scopes values={value} />,
      },
      {
        Header: 'Redirect URL',
        accessor: 'redirect_uri',
      },
      {
        Header: '',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }: TRow) => {
          const app_id = row.original.app_id;
          const triggerModal = () => {
            setAppId(app_id);
            setDialogState('DIALOG_DELETE');
          };
          const updateAppTrigger = () => {
            setManagerState('UPDATE_STATE');
            setUpdatingRow(row.original);
          };
          return (
            <div className={styles.appActions}>
              <div onClick={updateAppTrigger} className={`${styles.updateApp} ${styles.tooltip}`}>
                <span className={styles.tooltipText}>Edit application details</span>
              </div>
              <div onClick={triggerModal} className={`${styles.deleteApp} ${styles.tooltip}`}>
                <span className={styles.tooltipText}>Delete application</span>
              </div>
            </div>
          );
        },
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: table_data,
    },
    useSortBy,
  );

  return (
    <React.Fragment>
      <div className={styles.manageApps}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {isLoading && <SkeletonRows />}
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {dialog_is_open && <DeleteAppDialog deleteApp={deleteApp} />}
      {is_empty_state && <AppManagementEmpty />}
    </React.Fragment>
  );
}

const Scopes = ({ values }: TScopes) => {
  return (
    <React.Fragment>
      {values.map((scopes: string): React.ReactElement => {
        return (
          <span className={`${styles.scope}  ${scopes === 'admin' ? styles.adminScope : ''}`}>
            {scopes.charAt(0).toUpperCase() + scopes.slice(1).replace('_', ' ')}
          </span>
        );
      })}
    </React.Fragment>
  );
};

const SkeletonRows = () => {
  const Skeleton = () => (
    <tr data-testid='loading-skeleton'>
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
  // return 5 skeletons
  return (
    <React.Fragment>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} />
      ))}
    </React.Fragment>
  );
};
