import React from 'react';
import JsonView from '..';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import { render, screen } from '@testing-library/react';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import { IPlaygroundContext } from '@site/src/contexts/playground/playground.context';

jest.mock('@site/src/hooks/usePlaygroundContext');

const mockUsePlaygroundContext = usePlaygroundContext as jest.MockedFunction<
  () => Partial<IPlaygroundContext<TSocketEndpointNames>>
>;

mockUsePlaygroundContext.mockImplementation(() => ({
  setPlaygroundHistory: jest.fn(),
  playground_history: [
    {
      echo_req: { ping: 1, req_id: 3 },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 3,
    },
  ],
}));

describe('JsonView', () => {
  it('should be able to render the JsonView', () => {
    render(<JsonView />);
    // req_id determines the index number of dt_json_container-(idx);
    const response_block = screen.getByTestId('dt_json_container-3');
    expect(response_block).toBeInTheDocument();
  });
});
