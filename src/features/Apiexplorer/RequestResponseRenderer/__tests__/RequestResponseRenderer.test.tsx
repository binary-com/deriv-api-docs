import React from 'react';
import RequestResponseRenderer from '..';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_logged_in: true,
}));

describe('RequestResponseRenderer', () => {
  it('should catch the response error when JSON parse fails', async () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    render(<RequestResponseRenderer name='ticks' auth={0} reqData={'asdawefaewf3232'} />);
    const button = screen.getByRole('button', { name: /Send Request/i });
    await userEvent.click(button);

    expect(consoleOutput[0]).toEqual(
      'Could not parse the JSON data while trying to send the request: ',
    );
  });
  it('should render a dialog when the json is invalid', async () => {
    render(<RequestResponseRenderer name='ticks' auth={0} reqData={'asdawefaewf3232'} />);

    const button = screen.getByRole('button', { name: /Send Request/i });
    await userEvent.click(button);

    const dialog = await screen.findByText(/Your JSON object is invalid/i);

    expect(dialog).toBeVisible();
  });
  it('should be able to close the dialog when pressing the close button', async () => {
    render(<RequestResponseRenderer name='ticks' auth={0} reqData={'asdawefaewf3232'} />);

    const button = screen.getByRole('button', { name: /Send Request/i });
    await userEvent.click(button);

    const dialog = await screen.findByText(/Your JSON object is invalid/i);

    expect(dialog).toBeVisible();

    const close_button = screen.getByTestId('close-button');
    await userEvent.click(close_button);

    expect(dialog).not.toBeVisible();
  });
});
