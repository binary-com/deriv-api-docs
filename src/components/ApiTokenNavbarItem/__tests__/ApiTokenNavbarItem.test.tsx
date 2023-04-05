import useApiToken from '@site/src/hooks/useApiToken';
import useAuthContext from '@site/src/hooks/useAuthContext';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@site/src/test-utils';

import React from 'react';
import ApiTokenNavbarItem from '..';
import { TTokensArrayType } from '@site/src/types';

jest.mock('@site/src/hooks/useApiToken');
const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

describe('Api Token Navbar Item', () => {
  it('Should NOT render anything when user is not logged in or is not authenticated', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_authorized: false,
      is_logged_in: false,
    }));

    mockUseApiToken.mockImplementation(() => ({
      tokens: [],
      currentToken: {},
      isLoadingTokens: true,
    }));

    const renderResult = render(<ApiTokenNavbarItem />);
    expect(renderResult.container).toBeEmptyDOMElement();
  });

  it('Should render current api token', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_authorized: true,
      is_logged_in: true,
    }));

    mockUseApiToken.mockImplementation(() => ({
      tokens: [
        {
          display_name: 'first_token',
          last_used: '',
          scopes: ['read', 'trade'],
          token: 'token_1',
          valid_for_ip: '',
        },
        {
          display_name: 'michio_app_pages',
          last_used: '2022-10-04 10:33:51',
          scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
          token: 'token_2',
          valid_for_ip: '',
        },
      ],
      currentToken: {
        display_name: 'first_token',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      },
      isLoadingTokens: false,
    }));

    render(<ApiTokenNavbarItem />);

    const currentTokenButton = screen.getByRole('button');

    expect(currentTokenButton).toBeInTheDocument();

    expect(currentTokenButton).toHaveTextContent(`Selected Token: first_token`);
  });

  it('Should render please create token when current token is empty', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_authorized: true,
      is_logged_in: true,
    }));

    mockUseApiToken.mockImplementation(() => ({
      tokens: [],
      currentToken: null,
      isLoadingTokens: false,
    }));

    render(<ApiTokenNavbarItem />);

    const currentTokenButton = screen.getByRole('button');

    expect(currentTokenButton).toBeInTheDocument();

    expect(currentTokenButton).toHaveTextContent(`Please create a token`);
  });

  it('Should render token in drop down', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_authorized: true,
      is_logged_in: true,
    }));

    const fake_tokens: TTokensArrayType = [
      {
        display_name: 'first_token',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      },
      {
        display_name: 'michio_app_pages',
        last_used: '2022-10-04 10:33:51',
        scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
        token: 'token_2',
        valid_for_ip: '',
      },
    ];

    mockUseApiToken.mockImplementation(() => ({
      tokens: [...fake_tokens],
      currentToken: {
        display_name: 'first_token',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      },
      isLoadingTokens: false,
    }));

    render(<ApiTokenNavbarItem />);

    const current_account_button = screen.getByRole('button');
    await userEvent.click(current_account_button);
    const menu_items = screen.getAllByRole('menuitem');
    const tokens = menu_items.slice(0, 2);

    expect(menu_items.length).toBe(3);

    for (const [index, item] of tokens.entries()) {
      expect(item).toHaveTextContent(`${fake_tokens[index].display_name}`);
    }
  });

  it('Should update current token on menu item click', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_authorized: true,
      is_logged_in: true,
    }));

    const fake_tokens: TTokensArrayType = [
      {
        display_name: 'first_token',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      },
      {
        display_name: 'michio_app_pages',
        last_used: '2022-10-04 10:33:51',
        scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
        token: 'token_2',
        valid_for_ip: '',
      },
    ];

    const mockUpdateCurrentToken = jest.fn();

    mockUseApiToken.mockImplementation(() => ({
      tokens: fake_tokens,
      currentToken: {
        display_name: 'first_token',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'token_1',
        valid_for_ip: '',
      },
      isLoadingTokens: false,
      updateCurrentToken: mockUpdateCurrentToken,
    }));

    render(<ApiTokenNavbarItem />);

    const currentTokenButton = screen.getByRole('button');
    await userEvent.click(currentTokenButton);

    const first_menu_item = screen.getByRole('menuitem', { name: /michio_app_pages/i });

    await userEvent.click(first_menu_item);

    expect(mockUpdateCurrentToken).toHaveBeenCalledTimes(1);

    expect(mockUpdateCurrentToken).toHaveBeenCalledWith({
      display_name: 'michio_app_pages',
      last_used: '2022-10-04 10:33:51',
      scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
      token: 'token_2',
      valid_for_ip: '',
    });
  });
});
