import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import UserNavbarDesktopItem from '../item.desktop';
import userEvent from '@testing-library/user-event';
import { IAuthContext, IUserLoginAccount } from '@site/src/contexts/auth/auth.context';
import useAuthContext from '@site/src/hooks/useAuthContext';

jest.mock('@site/src/hooks/useAuthContext');
const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

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

mockUseAuthContext.mockImplementation(() => ({
  loginAccounts: fake_accounts,
  currentLoginAccount: {
    currency: 'USD',
    name: 'CR111111',
    token: 'first_token',
  },
  is_logged_in: true,
}));

describe('User Navbar Desktop Item', () => {
  describe('Given user is logged out', () => {
    beforeEach(() => {
      render(<UserNavbarDesktopItem is_logged_in={false} authUrl={'https://www.example.com'} />);
    });

    afterEach(() => {
      cleanup();
    });

    it('Should render login link navbar item', async () => {
      const login_nav_button = screen.getByRole<HTMLAnchorElement>('link', { name: /log in/i });
      expect(login_nav_button).toHaveAttribute('href', 'https://www.example.com');
    });
  });
  describe('Given user is logged in', () => {
    beforeEach(() => {
      render(<UserNavbarDesktopItem is_logged_in={true} authUrl={'https://www.example.com'} />);
    });
    afterEach(() => {
      cleanup();
    });

    it('Should render Account Switcher', () => {
      const accounts_button = screen.getByRole('button', { name: /CR111111/i });
      expect(accounts_button).toBeInTheDocument();
    });

    it('Should render Logout Button', async () => {
      const accounts_button = screen.getByRole('button', { name: /CR111111/i });
      expect(accounts_button).toBeInTheDocument();

      await userEvent.click(accounts_button);

      const logout_button = screen.getByRole('button', { name: /Log out/i });
      expect(logout_button).toHaveTextContent('Log out');
    });
  });
});
