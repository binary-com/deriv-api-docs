import { cleanup, render, screen } from '@site/src/test-utils';
import React from 'react';
import UserNavbarDesktopItem from '../item.desktop';

describe('User Navbar Desktop Item', () => {
  describe('Given user is logged out', () => {
    beforeEach(() => {
      render(<UserNavbarDesktopItem is_logged_in={false} authUrl={'https://www.example.com'} />);
    });

    afterEach(() => {
      cleanup();
    });

    it('Should render login link navbar item', async () => {
      const login_nav_button = screen.getByRole<HTMLAnchorElement>('link', { name: /login/i });
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
      const accounts_button = screen.getByRole('button', { name: /accounts/i });
      expect(accounts_button).toBeInTheDocument();
    });

    it('Should render Logout Button', () => {
      const logout_button = screen.getByRole('button', { name: /logout/i });
      expect(logout_button).toHaveTextContent('Logout');
    });
  });
});
