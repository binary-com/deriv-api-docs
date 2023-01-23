import useLoginUrl from '@site/src/hooks/useLoginUrl';
import useLogout from '@site/src/hooks/useLogout';
import useRootContext from '@site/src/hooks/useRootContext';
import { cleanup, render, screen } from '@site/src/test-utils';
import React from 'react';
import UserNavbarItem from '..';

jest.mock('@site/src/hooks/useRootContext');
jest.mock('@site/src/hooks/useLogout');
jest.mock('@site/src/hooks/useLoginUrl');

const mockLogout = jest.fn();
const mockUpdateAccounts = jest.fn();
const mockUpdateCurrentAccount = jest.fn();
const mockGetUrl = jest.fn().mockReturnValue('https://www.example.com');

const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseRootContext = useRootContext as jest.MockedFunction<typeof useRootContext>;
const mockUseLoginUrl = useLoginUrl as jest.MockedFunction<typeof useLoginUrl>;

mockUseLogout.mockImplementation(() => {
  return {
    logout: mockLogout,
  };
});

mockUseLoginUrl.mockImplementation(() => {
  return {
    getUrl: mockGetUrl,
  };
});

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

describe('User NavBar item', () => {
  describe('Given device type is mobile', () => {
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
    beforeEach(() => {
      render(<UserNavbarItem mobile={true} />);
    });

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    it('Should render User Navbar Mobile item', () => {
      const logout_button = screen.getByText<HTMLAnchorElement>('Logout');
      expect(logout_button).not.toHaveAttribute('href', 'https://www.example.com');
    });
  });

  describe('Given device type is desktop', () => {
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
    beforeEach(() => {
      render(<UserNavbarItem mobile={false} />);
    });

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    it('Should render User Navbar Desktop item', () => {
      const current_account = screen.getByRole<HTMLButtonElement>('button', {
        name: 'CR111111 - USD',
      });
      expect(current_account).toHaveAttribute('data-state', 'closed');
    });
  });
});
