import React from 'react';
import PlaygroundSection from '..';
import { cleanup, render, screen } from '@testing-library/react';
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

mockUsePlaygroundContext.mockImplementation(() => ({
  setPlaygroundHistory: jest.fn(),
  playground_history: [],
}));

describe('PlaygroundSection', () => {
  afterAll(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render the loader', async () => {
    render(<PlaygroundSection loader response_state={false} full_response={null} error={null} />);
    const loader = await screen.findByTestId('dt_spinner');
    expect(loader).toBeVisible();
  });

  it('should render the PlaygroundConsole', async () => {
    render(
      <PlaygroundSection loader={false} response_state={false} full_response={null} error={null} />,
    );
    const playground_section = await screen.findByTestId('dt_playground_section');
    expect(playground_section).toBeVisible();
  });

  it('should render the ReactJson', async () => {
    render(<PlaygroundSection loader={false} response_state full_response={null} error={null} />);

    const playground_section = await screen.findByTestId('dt_playground_section');
    expect(playground_section).toBeVisible();

    const json_view = await screen.findByTestId('dt_json_view');
    expect(json_view).toBeVisible();
  });
});
