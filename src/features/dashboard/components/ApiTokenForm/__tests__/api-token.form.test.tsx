import React from 'react';
import { cleanup, render, screen, within } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import ApiTokenForm from '../api-token.form';
import useCreateToken from '../../../hooks/useCreateToken';

jest.mock('@site/src/features/dashboard/hooks/useCreateToken');

const mockUseCreateToken = useCreateToken as jest.MockedFunction<typeof useCreateToken>;

const mockCreateToken = jest.fn();

mockUseCreateToken.mockImplementation(() => {
  return {
    createToken: mockCreateToken,
    errorCreatingToken: undefined,
    isCreatingToken: false,
  };
});

const scopes = [
  {
    name: 'read',
    description:
      'This scope will allow third-party apps to view your account activity, settings, limits, balance sheets, trade purchase history, and more.',
    label: 'Read',
  },
  {
    name: 'trade',
    description:
      'This scope will allow third-party apps to buy and sell contracts for you, renew your expired purchases, and top up your demo accounts.',
    label: 'Trade',
  },
  {
    name: 'payments',
    description:
      'This scope will allow third-party apps to withdraw to payment agents and make inter-account transfers for you.',
    label: 'Payments',
  },
  {
    name: 'trading_information',
    description: 'This scope will allow third-party apps to view your trading history.',
    label: 'Trading Information',
  },
  {
    name: 'admin',
    description:
      'This scope will allow third-party apps to open accounts for you, manage your settings and token usage, and more.',
    label: 'Admin',
  },
];

describe('Home Page', () => {
  beforeEach(() => {
    render(<ApiTokenForm />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render first step title', () => {
    const firstStep = screen.getByTestId('first-step-title');
    expect(firstStep).toHaveTextContent(/Select scopes based on the access you need./i);
  });

  it('Should render all of scopes checkbox cards', () => {
    scopes.forEach((item) => {
      const apiTokenCard = screen.getByTestId(`api-token-card-${item.name}`);
      expect(apiTokenCard).toBeInTheDocument();
    });
  });

  it('Should render second step title', () => {
    const secondStep = screen.getByTestId('second-step-title');
    expect(secondStep).toHaveTextContent(
      /Name your token and click on Create to generate your token./i,
    );
  });

  it('Should check the checkbox when clicked on api token card', async () => {
    const adminTokenCard = screen.getByTestId('api-token-card-admin');
    const withinAdminTokenCard = within(adminTokenCard);
    const adminCheckbox = withinAdminTokenCard.getByRole<HTMLInputElement>('checkbox');

    expect(adminCheckbox.checked).toBeFalsy();

    await userEvent.click(adminTokenCard);

    expect(adminCheckbox.checked).toBeTruthy();
  });

  it('Should create token on form submit', async () => {
    const nameInput = screen.getByRole('textbox');

    await userEvent.type(nameInput, 'test create token');

    const submitButton = screen.getByRole('button', { name: /Create/i });
    await userEvent.click(submitButton);

    expect(mockCreateToken).toHaveBeenCalledTimes(1);
    expect(mockCreateToken).toHaveBeenCalledWith('test create token', []);
  });

  it('Should not create token when name input is empty', async () => {
    const nameInput = screen.getByRole('textbox');

    await userEvent.clear(nameInput);

    await userEvent.click(nameInput);

    expect(mockCreateToken).not.toHaveBeenCalled();
  });
});
