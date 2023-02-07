import React from 'react';
import { cleanup, render, screen, fireEvent } from '@site/src/test-utils';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import { RegisterAppDialogSuccess } from '..';

jest.mock('@site/src/hooks/useAppManagerContext');
const mockUseAppManagerContext = useAppManagerContext as jest.MockedFunction<
  typeof useAppManagerContext
>;

mockUseAppManagerContext.mockImplementation(() => {
  return {
    dialog_state: 'DIALOG_SUCCESS',
  };
});

describe('RegisterAppDialogSuccess', () => {
  beforeEach(() => {
    render(<RegisterAppDialogSuccess />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders success dialog content', () => {
    const content = screen.getByText(
      /You have successfully registered your application. You can now start using Deriv API/i,
    );
    expect(content).toBeInTheDocument();
  });

  it('renders success dialog title', () => {
    const title = screen.getByText(/success!/i);
    expect(title).toBeInTheDocument();
  });

  it('should render success modal buttons', async () => {
    const button = await screen.findAllByRole('button');
    expect(button).toHaveLength(3);
  });
});
