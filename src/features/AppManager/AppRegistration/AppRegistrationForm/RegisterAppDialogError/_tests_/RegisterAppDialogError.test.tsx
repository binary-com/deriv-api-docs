import React from 'react';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import { cleanup, render, screen } from '@site/src/test-utils';
import { RegisterAppDialogError } from '..';

const fake_error = {
  error: {
    message: 'Something went wrong',
    code: 'InvalidToken',
  },
};

jest.mock('@site/src/hooks/useAppManagerContext');
const mockUseAppManagerContext = useAppManagerContext as jest.MockedFunction<
  typeof useAppManagerContext
>;

mockUseAppManagerContext.mockImplementation(() => {
  return {
    dialog_state: 'DIALOG_ERROR',
  };
});

describe('register app error dialog', () => {
  beforeEach(() => {
    render(<RegisterAppDialogError error={fake_error} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render error modal buttons', async () => {
    const button = await screen.findAllByRole('button');
    expect(button).toHaveLength(2);
  });

  it('should render error modal title', () => {
    const title = screen.getByText(/Error!/i);
    expect(title).toBeInTheDocument();
  });

  it('should render modal content', async () => {
    const content = screen.getByText(
      /Enter your API token \(with the Admin scope\) to register your app/i,
    );
    expect(content).toBeInTheDocument();
  });
});
