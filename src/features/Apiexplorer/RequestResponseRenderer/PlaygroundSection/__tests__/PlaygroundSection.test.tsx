import React from 'react';
import PlaygroundSection from '..';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import { IPlaygroundContext } from '@site/src/contexts/playground/playground.context';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';

jest.mock('react', () => {
  return {
    ...jest.requireActual<typeof React>('react'),
    useRef: jest.fn(),
  };
});

jest.mock('@site/src/hooks/usePlaygroundContext');

const mockUsePlaygroundContext = usePlaygroundContext as jest.MockedFunction<
  () => Partial<IPlaygroundContext<TSocketEndpointNames>>
>;

const mockSetPlayHistory = jest.fn();

mockUsePlaygroundContext.mockImplementation(() => ({
  setPlaygroundHistory: mockSetPlayHistory,
  playground_history: [
    {
      echo_req: { ping: 1, req_id: 1 },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 1,
    },
    {
      echo_req: { ping: 1, req_id: 2 },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 2,
    },
    {
      echo_req: { ping: 1, req_id: 3 },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 3,
    },
    {
      echo_req: { ping: 1, req_id: 4 },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 4,
    },
    {
      echo_req: { ping: 1, req_id: 5 },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 5,
    },
  ],
}));

describe('PlaygroundSection', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render the loader', async () => {
    cleanup();
    mockUsePlaygroundContext.mockImplementation(() => ({
      setPlaygroundHistory: jest.fn(),
      playground_history: [],
    }));
    render(<PlaygroundSection loader response_state={false} full_response={null} error={null} />);
    const loader = await screen.findByTestId('dt_spinner');
    await waitFor(() => expect(loader).toBeVisible());
  });

  it('should autoscroll window to the bottom', async () => {
    render(
      <PlaygroundSection loader={false} response_state={false} full_response={null} error={null} />,
    );
    const container = screen.getByTestId('dt_playground_section');
    fireEvent.scroll(container, { y: 0 });
    expect(container.scrollHeight).toBe(0);
  });

  it('should stop autoscroll window to the bottom', async () => {
    render(
      <PlaygroundSection loader={false} response_state={false} full_response={null} error={null} />,
    );
    const container = screen.getByTestId('dt_playground_section');
    Object.defineProperty(container, 'scrollHeight', { value: 1000 });
    fireEvent.scroll(container, { y: 0 });
    expect(container.scrollHeight).toBe(1000);
  });

  it('should render the PlaygroundConsole', async () => {
    render(
      <PlaygroundSection loader={false} response_state={false} full_response={null} error={null} />,
    );
    const playground_section = await screen.findByTestId('dt_playground_section');
    expect(playground_section).toBeVisible();
  });

  it('should render the ReactJson', async () => {
    render(
      <PlaygroundSection
        loader={false}
        response_state
        full_response={{
          website_status: 1,
          echo_req: { req_id: 4, website_status: 1 },
        }}
        error={null}
      />,
    );

    const playground_section = await screen.findByTestId('dt_playground_section');
    expect(playground_section).toBeVisible();

    const json_view = await screen.findByTestId('dt_json_view');
    expect(json_view).toBeVisible();
  });
});
