import { cleanup, render, screen } from '@site/src/test-utils';
import React from 'react';
import UserNavbarMobileItem from '../item.mobile';
import userEvent from '@testing-library/user-event';

const mockLogout = jest.fn();

describe('User Navbar Mobile Item', () => {
  describe('Given user is logged out', () => {
    beforeEach(() => {
      render(<UserNavbarMobileItem is_logged_in={false} authUrl={'https://www.example.com'} />);
    });

    afterEach(() => {
      cleanup();
    });

    it('Should render login link navbar item', () => {
      const login_button = screen.getByRole<HTMLAnchorElement>('link', { name: /login/i });
      expect(login_button).toHaveTextContent('Login');
      expect(login_button).toHaveAttribute('href', 'https://www.example.com');
    });
  });

  describe('Given user is logged in', () => {
    beforeEach(() => {
      render(
        <UserNavbarMobileItem
          is_logged_in={true}
          logout={mockLogout}
          authUrl={'https://www.example.com'}
        />,
      );
    });

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    it('Should render logout navbar link item', async () => {
      const logout_button = screen.getByText<HTMLAnchorElement>('Logout');
      expect(logout_button).toHaveTextContent('Logout');
      await userEvent.click(logout_button);
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
