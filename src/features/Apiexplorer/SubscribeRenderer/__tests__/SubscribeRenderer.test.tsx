import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';
import SubscribeRenderer from '..';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useSubscription from '@site/src/hooks/useSubscription';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_logged_in: true,
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
  error: '',
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

  it('should call subscribe and unsubscribe when pressing the send request button', async () => {
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
});
