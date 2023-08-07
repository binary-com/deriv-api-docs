import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import SubscribeRenderer from '..';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useSubscription from '@site/src/hooks/useSubscription';
import useDynamicImportJSON from '@site/src/hooks/useDynamicImportJSON';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { IPlaygroundContext } from '@site/src/contexts/playground/playground.context';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_logged_in: true,
  is_authorized: true,
}));

jest.mock('@site/src/hooks/usePlaygroundContext');

const mockUsePlaygroundContext = usePlaygroundContext as jest.MockedFunction<
  () => Partial<IPlaygroundContext<TSocketEndpointNames>>
>;

mockUsePlaygroundContext.mockImplementation(() => ({
  playground_history: [],
  setPlaygroundHistory: jest.fn(),
}));

jest.mock('@site/src/hooks/useDynamicImportJSON');

const mockUseDynamicImportJSON = useDynamicImportJSON as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDynamicImportJSON>>
>;

mockUseDynamicImportJSON.mockImplementation(() => ({
  request_info: {
    auth_required: 1,
    auth_scopes: [],
    description: 'this is a test with `echo_req` description',
    title: 'this is a test title',
  },
  response_info: {
    description: 'this is a test with `echo_req` description',
    title: 'this is a test title',
  },
  setSelected: jest.fn(),
  handleSelectChange: jest.fn(),
  text_data: {
    name: null,
    selected_value: 'Select API Call - Version 3',
    request: '',
  },
}));

jest.mock('@site/src/hooks/useSubscription');

const mockUseSubscription = useSubscription as jest.MockedFunction<
  () => Partial<ReturnType<typeof useSubscription>>
>;

const mockSubscribe = jest.fn();
const mockUnsubscribe = jest.fn();

mockUseSubscription.mockImplementation(() => ({
  subscribe: mockSubscribe,
  unsubscribe: mockUnsubscribe,
  error: { code: '' },
  full_response: {
    tick: 1,
    echo_req: { tick: 1 },
  },
}));

const request_data = `{
    "ticks": "R_50",
    "subscribe": 1
  }`;

describe('SubscribeRenderer', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render properly', async () => {
    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const button = await screen.findByRole('button', { name: /Send Request/i });
    expect(button).toBeVisible();
  });

  it('should throw an error if incorrect json is being parsed', async () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    render(<SubscribeRenderer name='ticks' auth={1} reqData={'asdawefaewf3232'} />);
    const button = await screen.findByRole('button', { name: /Send Request/i });
    await userEvent.click(button);

    expect(consoleOutput[0]).toEqual(
      'Could not parse the JSON data while trying to send the request: ',
    );
  });

  it('should call subscribe and unsubscribe when pressing the send request button', async () => {
    mockUseSubscription.mockImplementation(() => ({
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      error: { code: '' },
      full_response: {
        tick: 1,
        echo_req: { tick: 1 },
      },
      is_subscribed: true,
    }));

    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const button = await screen.findByRole('button', { name: /Send Request/i });
    expect(button).toBeVisible();

    await userEvent.click(button);
    expect(mockUnsubscribe).toBeCalledTimes(1);
    expect(mockSubscribe).toBeCalledTimes(1);
    expect(mockSubscribe).toBeCalledWith({ ticks: 'R_50', subscribe: 1 });
  });

  it('should call unsubscribe when pressing the clear button', async () => {
    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const button = await screen.findByRole('button', { name: 'Clear' });
    expect(button).toBeVisible();

    await userEvent.click(button);
    expect(mockUnsubscribe).toBeCalledTimes(1);
  });

  it('should call unsubscribe when unmounting the component', async () => {
    const { unmount } = render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    unmount();
    expect(mockUnsubscribe).toBeCalledTimes(1);
  });
  it('should call login dialog when the error code is not authourized', async () => {
    const setToggleModal = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([false, setToggleModal]);
    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: false,
      is_authorized: false,
    }));
    mockUseSubscription.mockImplementation(() => ({
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      error: { code: 'AuthorizationRequired' },
      full_response: {
        tick: 1,
        echo_req: { tick: 1 },
      },
    }));

    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const button = await screen.findByRole('button', { name: /Send Request/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(setToggleModal).toHaveBeenCalled();
    });
  });
});
