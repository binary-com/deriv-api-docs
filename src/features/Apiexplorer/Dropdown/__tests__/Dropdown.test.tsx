import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Dropdown, TDropdown } from '../Dropdown';
import userEvent from '@testing-library/user-event';

const mockProps: TDropdown = {
  selected: '',
  setSelected: jest.fn(),
  handleChange: jest.fn(),
  selected_value: 'Select API Call - Version 3',
};

describe('Dropdown', () => {
  beforeEach(() => {
    render(<Dropdown {...mockProps} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  it('should have initial value as "Select API Call - Version 3"', () => {
    const initial_text = screen.getByText(/Select API Call - Version 3/i);
    expect(initial_text).toBeInTheDocument();
  });

  it('should render the options on click ', async () => {
    const btn = screen.getByTestId('dropdown');

    await act(async () => {
      fireEvent.click(btn);
    });
    const search_bar = screen.getByRole('textbox');

    expect(search_bar).toBeInTheDocument();
  });
  it('should test filter option correctly', async () => {
    const btn = screen.getByTestId('dropdown');

    await act(async () => {
      fireEvent.click(btn);
    });
    const search_bar = screen.getByRole('textbox');

    await userEvent.clear(search_bar);
    await userEvent.type(search_bar, 'Active Symbols');

    const options = screen.getAllByText('Active Symbols');

    expect(options.length).toBe(1);
  });

  it('should display the API Call name on the Dropdown when Clicked', async () => {
    const newProps = {
      selected: 'API Token',
      setSelected: jest.fn(),
      handleChange: jest.fn(),
      selected_value: 'API Token',
    };
    cleanup();
    render(<Dropdown {...newProps} />);
    const btn = screen.getByTestId('dropdown');
    await act(async () => {
      fireEvent.click(btn);
    });
    const option = await screen.findByText('API Token');

    await userEvent.click(option);

    expect(btn).toHaveTextContent('API Token');
  });
});
