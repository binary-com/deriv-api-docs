import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useSubscription from '@site/src/hooks/useSubscription';
import useWS from '@site/src/hooks/useWs';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import userEvent from '@testing-library/user-event';
import RequestJSONBox from '..';

const fakeHookObject = {
  clear: jest.fn(),
  send: jest.fn(),
  full_response: {
    tick: 1,
    echo_req: { tick: 1 },
  },
};

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

jest.mock('@site/src/hooks/useSubscription');

const mockUseSubscription = useSubscription as jest.MockedFunction<
  () => Partial<ReturnType<typeof useSubscription>>
>;

mockUseSubscription.mockImplementation(() => fakeHookObject);

jest.mock('@site/src/hooks/useWs');

const mockuseWS = useWS as jest.MockedFunction<() => Partial<ReturnType<typeof useWS>>>;

mockuseWS.mockImplementation(() => fakeHookObject);

describe('RequestResponseRenderer', () => {
  const mockProps = {
    handleChange: jest.fn(),
    request_example: '{"app_list": 1}',
    name: 'app_list' as TSocketEndpointNames,
    auth: 1,
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
    const newProps = {
      handleChange: jest.fn(),
      request_example: '',
      name: '' as TSocketEndpointNames,
      auth: 0,
    };
    cleanup();
    render(<RequestJSONBox {...newProps} />);
    const textarea = screen.getByLabelText('Request JSON');
    const placeholder = screen.getAllByPlaceholderText('Request JSON');
    expect(textarea).toBeInTheDocument();
    expect(placeholder).toHaveLength(1);
  });

  it('should render response renderer component', async () => {
    const primaryButton = screen.getByRole('button', { name: /Send Request/i });
    const secondaryButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(primaryButton);
    const playgroundSection = screen.getByTestId('dt_playground_section');
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
