import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import userEvent from '@testing-library/user-event';
import RequestJSONBox from '..';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

describe('RequestResponseRenderer', () => {
  const mockProps = {
    handleChange: jest.fn(),
    request_example: '{"app_list": 1}',
    name: 'app_list' as TSocketEndpointNames,
    auth_required: 0,
  };

  beforeEach(() => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        is_logged_in: true,
      };
    });
    render(<RequestJSONBox {...mockProps} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render textarea', () => {
    const textarea = screen.getByPlaceholderText('Request JSON');
    expect(textarea).toBeInTheDocument();
  });

  it('should render response renderer component', async () => {
    const primaryButton = screen.getByRole('button', { name: /Send Request/i });
    const secondaryButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(primaryButton);
    const playgroundSection = screen.getByTestId('playground-section');
    expect(playgroundSection).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });
  it('should show  request api json of the call selected from dropdown inside the text area', async () => {
    const textarea = screen.getByPlaceholderText('Request JSON');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('{"app_list": 1}');
  });
});
