import { ApplicationObject } from '@deriv/api-types';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { render, screen, cleanup, within } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import AppsTable from '..';

jest.mock('@site/src/hooks/useAuthContext');
const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

mockUseAuthContext.mockImplementation(() => ({
  is_authorized: true,
  currentLoginAccount: {
    currency: 'USD',
    name: 'CR111111',
    token: 'first_token',
  },
}));

const fakeApplications: ApplicationObject[] = [
  {
    active: 1,
    app_id: 11111,
    app_markup_percentage: 0,
    appstore: '',
    github: '',
    googleplay: '',
    homepage: '',
    name: 'first app',
    redirect_uri: 'https://example.com',
    scopes: ['admin', 'payments', 'read', 'trade', 'trading_information'],
    verification_uri: 'https://example.com',
    last_used: '',
  },
  {
    active: 1,
    app_id: 22222,
    app_markup_percentage: 0,
    appstore: '',
    github: '',
    googleplay: '',
    homepage: '',
    name: 'second app',
    redirect_uri: 'https://example.com',
    scopes: ['payments', 'read', 'trade', 'trading_information'],
    verification_uri: 'https://example.com',
    last_used: '',
  },
];

describe('Apps Table', () => {
  beforeEach(() => {
    render(<AppsTable apps={fakeApplications} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render all applications properly', () => {
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  it.skip('Should open delete dialog for the application row properly', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();
  });

  it.skip('Should close delete dialog on cancel ', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    const closeDeleteDialog = await screen.findByText(/cancel/i);
    await userEvent.click(closeDeleteDialog);

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it.skip('Should close delete dialog when pressing the delete button', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    const closeDeleteDialog = screen.getByText(/yes, delete/i);
    await userEvent.click(closeDeleteDialog);

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it.skip('opens modal for delete app and closes it with close button', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    // test-id provided by Deriv UI library component
    const modal_button = screen.getByTestId('close-button');
    await userEvent.click(modal_button);

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it.skip('Should open edit dialog form on edit button', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openEditDialog = withinActionCell.getByTestId('update-app-button');
    await userEvent.click(openEditDialog);

    const updateDialogTitle = await screen.findByText('Update App');
    expect(updateDialogTitle).toBeInTheDocument();
  });
});
