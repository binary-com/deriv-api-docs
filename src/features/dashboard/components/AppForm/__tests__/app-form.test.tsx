import { Button } from '@deriv/ui';
import useApiToken from '@site/src/hooks/useApiToken';
import { render, screen, cleanup } from '@site/src/test-utils';
import { TTokensArrayType } from '@site/src/types';
import userEvent from '@testing-library/user-event';
import React from 'react';
import AppForm from '..';

jest.mock('@site/src/hooks/useApiToken');
jest.mock('@site/src/utils', () => ({
  ...jest.requireActual('@site/src/utils'),
}));

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
  tokens: [],
  updateCurrentToken: jest.fn(),
}));

const renderButtons = () => {
  return (
    <div>
      <Button role='submit'>Update Application</Button>
    </div>
  );
};

describe('App Form', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<AppForm renderButtons={renderButtons} submit={mockOnSubmit} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should show error message for having no admin token', async () => {
    const fakeTokens: TTokensArrayType = [
      {
        display_name: 'first',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'first_token',
        valid_for_ip: '',
      },
      {
        display_name: 'second',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'second_token',
        valid_for_ip: '',
      },
    ];

    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      updateCurrentToken: jest.fn(),
    }));

    const errorText = screen.getByText(
      /This account doesn't have API tokens with the admin scope. Choose another account./i,
    );

    expect(errorText).toBeInTheDocument();
  });

  it('Should show error message for empty app name', async () => {
    const submitButton = screen.getByText('Update Application');

    await userEvent.click(submitButton);

    const appNameErrorText = await screen.findByText('Enter your app name.');

    expect(appNameErrorText).toBeInTheDocument();
  });

  it('Should show error for long app name', async () => {
    const submitButton = screen.getByText('Update Application');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await userEvent.type(
      tokenNameInput,
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi corrupti neque ratione repudiandae in dolores reiciendis sequi',
    );

    await userEvent.click(submitButton);

    const appNameErrorText = await screen.findByText('Your app name cannot exceed 48 characters.');

    expect(appNameErrorText).toBeInTheDocument();
  });

  it('Should show error message for long app markup percentage', async () => {
    const submitButton = screen.getByText('Update Application');

    const appMarkupPercentageInput = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: 'Markup percentage (optional)',
    });

    await userEvent.type(appMarkupPercentageInput, '12.222222');

    await userEvent.click(submitButton);

    const appMarkupPercentageError = await screen.findByText(
      'Your markup value cannot be more than 4 characters.',
    );

    expect(appMarkupPercentageError).toBeInTheDocument();
  });

  it('Should show error message for wrong value', async () => {
    const fakeTokens: TTokensArrayType = [
      {
        display_name: 'first',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'first_token',
        valid_for_ip: '',
      },
      {
        display_name: 'second',
        last_used: '2023-01-19 15:09:39',
        scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
        token: 'second_token',
        valid_for_ip: '',
      },
      {
        display_name: 'third',
        last_used: '',
        scopes: ['read', 'trade', 'payments', 'admin'],
        token: 'third_token',
        valid_for_ip: '',
      },
    ];

    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      updateCurrentToken: jest.fn(),
    }));

    const submitButton = screen.getByText('Update Application');

    const appMarkupPercentageInput = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: 'Markup percentage (optional)',
    });

    await userEvent.type(appMarkupPercentageInput, '5.01');

    await userEvent.click(submitButton);

    const appMarkupPercentageError = await screen.findByText(
      'Your markup value must be equal to or above 0.00 and no more than 5.00.',
    );

    expect(appMarkupPercentageError).toBeInTheDocument();
  });

  it('Should call onSubmit on submitting the form', async () => {
    const submitButton = screen.getByText('Update Application');

    const selectTokenOption = screen.getByTestId('select-token');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    const appRedirectUrlInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Authorization URL (optional)',
    });

    const appVerificationUrlInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Verification URL (optional)',
    });

    await userEvent.click(selectTokenOption);

    const tokenOption = screen.getByText('second');

    await userEvent.click(tokenOption);
    await userEvent.type(tokenNameInput, 'test app name');
    await userEvent.type(appRedirectUrlInput, 'https://example.com');
    await userEvent.type(appVerificationUrlInput, 'https://example.com');
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
