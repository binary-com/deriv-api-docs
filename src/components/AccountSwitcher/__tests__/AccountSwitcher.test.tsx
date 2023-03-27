import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import AccountSwitcher from '..';
import useLogout from '@site/src/hooks/useLogout';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import { IUserLoginAccount } from '@site/src/contexts/auth/auth.context';

jest.mock('@site/src/hooks/useAuthContext');
jest.mock('@site/src/hooks/useLogout');

const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

const mockLogout = jest.fn();
const mockUpdateLoginAccounts = jest.fn();
const mockUpdateCurrentLoginAccount = jest.fn();

const fake_accounts: IUserLoginAccount[] = [
  {
    currency: 'USD',
    name: 'CR111111',
    token: 'first_token',
  },
  {
    currency: 'ETH',
    name: 'CR2222222',
    token: 'second_token',
  },
];

mockUseLogout.mockImplementation(() => {
  return {
    logout: mockLogout,
  };
});

describe('HeroHeader', () => {
  beforeEach(() => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
        is_logged_in: true,
        updateLoginAccounts: mockUpdateLoginAccounts,
        updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
      };
    });
    render(
      <AuthProvider>
        <AccountSwitcher />
      </AuthProvider>,
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should call do logout on logout button click', async () => {
    const logout_button = screen.getByRole('button', { name: /logout/i });

    await userEvent.click(logout_button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('Should render current account ', () => {
    const current_account_button = screen.getByRole('button', { name: `CR111111 - USD` });

    expect(current_account_button).toBeInTheDocument();
  });

  it('Should render Accounts when no account is selected', () => {
    cleanup();
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: '',
          name: '',
          token: '',
        },
        is_logged_in: false,
        updateLoginAccounts: mockUpdateLoginAccounts,
        updateCurrentLoginAccount: mockUpdateCurrentLoginAccount,
      };
    });
    render(
      <AuthProvider>
        <AccountSwitcher />
      </AuthProvider>,
    );

    const accounts_button = screen.getByRole('button', { name: /accounts/i });
    expect(accounts_button).toBeInTheDocument();
  });

  it('Should render the dropdown menu on current account button click', async () => {
    const current_account_button = screen.getByRole('button', { name: /USD/i });
    await userEvent.click(current_account_button);

    const menu_items = screen.getAllByRole('menuitem');

    expect(menu_items.length).toBe(2);

    for (const [index, item] of menu_items.entries()) {
      expect(item).toHaveTextContent(
        `${fake_accounts[index].name} - ${fake_accounts[index].currency}`,
      );
    }
  });

  it('Should update current account on menu item click', async () => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
        is_logged_in: true,
        updateAccounts: mockUpdateLoginAccounts,
        updateCurrentAccount: mockUpdateCurrentLoginAccount,
      };
    });

    const current_account_button = screen.getByRole('button', { name: /USD/i });
    await userEvent.click(current_account_button);

    const first_menu_item = screen.getByRole('menuitem', { name: /eth/i });

    await userEvent.click(first_menu_item);

    expect(mockUpdateCurrentLoginAccount).toHaveBeenCalledTimes(1);

    expect(mockUpdateCurrentLoginAccount).toHaveBeenCalledWith({
      currency: 'ETH',
      name: 'CR2222222',
      token: 'second_token',
    });
  });
});
