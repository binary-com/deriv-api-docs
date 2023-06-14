import React from 'react';
import TokenCreationDialogSuccess from '..';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Token Creation Dialog', () => {
  const mockOnClose = jest.fn();

  it('Should display correct title on the modal', () => {
    render(<TokenCreationDialogSuccess setToggleModal={mockOnClose} />);

    const title = screen.getByText(/Token created successfully/i);
    expect(title).toHaveTextContent('Token created successfully');
  });

  it('Should display correct content on the modal', () => {
    render(<TokenCreationDialogSuccess setToggleModal={mockOnClose} />);

    const textContent = screen.getByText(/Your API token is ready to be used./i);
    expect(textContent).toHaveTextContent('Your API token is ready to be used.');
  });

  it('Should close the modal on OK button click', async () => {
    render(<TokenCreationDialogSuccess setToggleModal={mockOnClose} />);

    const okButton = screen.getByRole('button', { name: /OK/i });
    expect(okButton).toBeInTheDocument();

    await userEvent.click(okButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
