import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import useLogout from '@site/src/hooks/useLogout';
import { cleanup, render, screen } from '@site/src/test-utils';
import React from 'react';
import UserNavbarItem from '..';
import { IUserLoginAccount } from '@site/src/contexts/auth/auth.context';

jest.mock('@site/src/hooks/useAuthContext');
jest.mock('@site/src/hooks/useLogout');
jest.mock('@site/src/hooks/useLoginUrl');

const mockLogout = jest.fn();
const mockUpdateAccounts = jest.fn();
const mockUpdateCurrentAccount = jest.fn();
const mockGetUrl = jest.fn().mockReturnValue('https://www.example.com');

const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;
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

describe('User NavBar item', () => {
  describe('Given device type is mobile', () => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
        is_logged_in: true,
        updateLoginAccounts: mockUpdateAccounts,
        updateCurrentLoginAccount: mockUpdateCurrentAccount,
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
    mockUseAuthContext.mockImplementation(() => {
      return {
        loginAccounts: fake_accounts,
        currentLoginAccount: {
          currency: 'USD',
          name: 'CR111111',
          token: 'first_token',
        },
        is_logged_in: true,
        updateLoginAccounts: mockUpdateAccounts,
        updateCurrentLoginAccount: mockUpdateCurrentAccount,
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
        name: /CR111111/i,
      });
      expect(current_account).toBeInTheDocument();
    });
  });
});
