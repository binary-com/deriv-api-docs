import React from 'react';
import NavbarSeparator from '..';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { render, screen } from '@testing-library/react';

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
});
