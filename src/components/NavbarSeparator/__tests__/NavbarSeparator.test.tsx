import React from 'react';
import NavbarSeparator from '..';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { findByTestId, render, screen } from '@testing-library/react';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_logged_in: true,
}));

describe('NavbarSeparator', () => {
  it('renders the NavbarSeparator', async () => {
    render(<NavbarSeparator />);

    const separator = await screen.findByTestId('dt_navbar_separator');
    expect(separator).toBeVisible();
  });

  it('does not render separator when user is not logged in', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: false,
    }));
    render(<NavbarSeparator />);

    const separatorContainer = screen.queryByTestId('dt_navbar_separator');
    expect(separatorContainer).not.toBeInTheDocument();
  });
});
