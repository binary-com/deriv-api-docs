import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import RootContextProvider from '@site/src/contexts/root/root.context.provider';
import userEvent from '@testing-library/user-event';
import AccountSwitcher from '..';
import useRootContext from '@site/src/hooks/useRootContext';
import useLogout from '@site/src/hooks/useLogout';

jest.mock('@site/src/hooks/useRootContext');
jest.mock('@site/src/hooks/useLogout');

const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseRootContext = useRootContext as jest.MockedFunction<typeof useRootContext>;

const mockLogout = jest.fn();
const mockUpdateAccounts = jest.fn();
const mockUpdateCurrentAccount = jest.fn();

const fake_accounts = [
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
    mockUseRootContext.mockImplementation(() => {
      return {
        accounts: fake_accounts,
        currentAccount: {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
        is_logged_in: true,
        updateAccounts: mockUpdateAccounts,
        updateCurrentAccount: mockUpdateCurrentAccount,
      };
    });
    render(
      <RootContextProvider>
        <AccountSwitcher />
      </RootContextProvider>,
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
    mockUseRootContext.mockImplementation(() => {
      return {
        accounts: fake_accounts,
        currentAccount: {
          currency: '',
          name: '',
          token: '',
        },
        is_logged_in: false,
        updateAccounts: mockUpdateAccounts,
        updateCurrentAccount: mockUpdateCurrentAccount,
      };
    });
    render(
      <RootContextProvider>
        <AccountSwitcher />
      </RootContextProvider>,
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
    const current_account_button = screen.getByRole('button', { name: /USD/i });
    await userEvent.click(current_account_button);

    const first_menu_item = screen.getByRole('menuitem', { name: /eth/i });

    await userEvent.click(first_menu_item);

    expect(mockUpdateCurrentAccount).toHaveBeenCalledTimes(1);

    expect(mockUpdateCurrentAccount).toHaveBeenCalledWith({
      currency: 'ETH',
      name: 'CR2222222',
      token: 'second_token',
    });
  });
});
