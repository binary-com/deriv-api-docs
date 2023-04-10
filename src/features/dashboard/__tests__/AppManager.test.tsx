import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useAppManager from '@site/src/hooks/useAppManager';
import useApiToken from '@site/src/hooks/useApiToken';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import { ApplicationObject } from '@deriv/api-types';
import { AppManager } from '..';
import { useTable } from 'react-table';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
  updateTokens: jest.fn(),
  currentToken: {
    display_name: 'first_token',
    last_used: '',
    scopes: ['read', 'trade'],
    token: 'token_1',
    valid_for_ip: '',
  },
  tokens: [
    {
      display_name: 'first_token',
      last_used: '',
      scopes: ['read', 'trade'],
      token: 'token_1',
      valid_for_ip: '',
    },
  ],
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
];

jest.mock('@site/src/hooks/useAppManager');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

// jest.mock('react-table');

// const mockReactTable = useTable as jest.MockedFunction<() => Partial<ReturnType<typeof useTable>>>;

// mockReactTable.mockImplementation(() => ({
//   getTableProps: jest.fn(),
//   getTableBodyProps: jest.fn(),
//   rows: [],
//   headerGroups: [],
// }));

describe('AppManager', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Shows the login screen', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: false,
    }));

    mockUseAppManager.mockImplementation(() => ({
      currentTab: 'MANAGE_TOKENS',
    }));

    render(<AppManager />);

    const login = screen.getByText(
      /Log in to your Deriv account to get the API token and start using our API./i,
    );
    expect(login).toBeInTheDocument();
  });

  it('Shows the dashboard', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: true,
    }));

    mockUseAppManager.mockImplementation(() => ({
      currentTab: 'MANAGE_TOKENS',
    }));

    render(<AppManager />);

    const dashboard_tabs = screen.getByText(
      /Register your app, get an app ID, and start using the Deriv API/i,
    );
    expect(dashboard_tabs).toBeInTheDocument();
  });

  it('Should be able to switch to a different tab', async () => {
    const mockUpdatecurrentTab = jest.fn();
    const mockGetApps = jest.fn();

    mockUseAppManager.mockImplementation(() => ({
      updateCurrentTab: mockUpdatecurrentTab,
      apps: fakeApplications,
      getApps: mockGetApps,
    }));

    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: true,
      is_authorized: true,
      currentLoginAccount: {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
      loginAccounts: [
        {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
      ],
    }));

    render(<AppManager />);

    const register_application_button = await screen.findByText(/Register application/i);
    expect(register_application_button).toBeInTheDocument();

    await userEvent.click(register_application_button);

    expect(mockUpdatecurrentTab).toHaveBeenCalledTimes(1);
    expect(mockUpdatecurrentTab).toHaveBeenCalledWith('REGISTER_APP');

    const register_app_page = await screen.findByText(/Select your api token/i);
    expect(register_app_page).toBeInTheDocument();

    const manage_application_button = await screen.findByText(/Manage applications/i);
    expect(manage_application_button).toBeInTheDocument();

    await userEvent.click(manage_application_button);

    expect(mockGetApps).toHaveBeenCalledTimes(1);

    const manage_apps_page = await screen.findByText('first app');

    expect(manage_apps_page).toBeInTheDocument();
  });

  it('Should be able to get all apps on app manager page', async () => {
    const mockGetApps = jest.fn();

    mockUseAppManager.mockImplementation(() => ({
      getApps: mockGetApps,
      apps: fakeApplications,
      currentTab: 'MANAGE_APPS',
    }));

    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: true,
      is_authorized: true,
      currentLoginAccount: {
        currency: 'USD',
        name: 'CR111111',
        token: 'first_token',
      },
      loginAccounts: [
        {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
      ],
    }));

    render(<AppManager />);

    const manage_application_button = await screen.findByText(/Manage applications/i);
    expect(manage_application_button).toBeInTheDocument();

    await userEvent.click(manage_application_button);

    // const manage_apps_page = await screen.findAllByTestId('dt_loading_skeleton_row');
    // expect(manage_apps_page[0]).toBeInTheDocument();

    expect(mockGetApps).toHaveBeenCalledTimes(1);
    // expect(mockGetApps).toHaveBeenCalledWith(fakeApplications);
  });
});
