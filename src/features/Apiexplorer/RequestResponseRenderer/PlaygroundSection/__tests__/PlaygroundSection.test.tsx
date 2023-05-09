import React from 'react';
import PlaygroundSection from '..';
import { render, screen } from '@testing-library/react';

const fake_full_response = {
  msg_type: 'test',
};

describe('PlaygroundSection', () => {
  it('should render the loader', async () => {
    render(
      <PlaygroundSection
        loader
        response_state={false}
        full_response={fake_full_response}
        error={null}
        name=''
      />,
    );
    const loader = await screen.findByTestId('circles-loading');
    expect(loader).toBeVisible();
  });

  it('should render the PlaygroundConsole', async () => {
    render(
      <PlaygroundSection
        loader={false}
        response_state={false}
        full_response={fake_full_response}
        error={null}
        name=''
      />,
    );
    const playground_section = await screen.findByTestId('dt_playground_section');
    expect(playground_section).toBeVisible();
  });

  it('should render the ReactJson', async () => {
    render(
      <PlaygroundSection
        loader={false}
        response_state
        full_response={fake_full_response}
        error={null}
        name=''
      />,
    );

    const playground_section = await screen.findByTestId('dt_playground_section');
    expect(playground_section).toBeVisible();

    const json_view = await screen.findByTestId('dt_json_view');
    expect(json_view).toBeVisible();
  });
});
