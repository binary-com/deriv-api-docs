import React from 'react';
import CustomSelectDropdown from '..';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const registerMock = jest.fn();

describe('CustomSelectDropdown', () => {
  it('should be able to render the component', () => {
    render(
      <CustomSelectDropdown label='test' value='test' register={registerMock()}>
        <div>Selected item element</div>
        <div>Dropdown element</div>
      </CustomSelectDropdown>,
    );

    const custom_dropdown = screen.getByTestId('custom-dropdown');
    expect(custom_dropdown).toBeInTheDocument();
  });

  it('should be able to render the component with an error message', () => {
    render(
      <CustomSelectDropdown label='test' value='test' register={registerMock()} is_error>
        <div>Selected item element</div>
        <div>Dropdown element</div>
        <div>Error message</div>
      </CustomSelectDropdown>,
    );

    const error_message = screen.getByText('Error message');
    expect(error_message).toBeVisible();
  });

  it('should be able to show the dropdown when using hotkeys', async () => {
    render(
      <CustomSelectDropdown label='test' value='test' register={registerMock()}>
        <div>Selected item element</div>
        <div>Dropdown element</div>
      </CustomSelectDropdown>,
    );

    await userEvent.keyboard('{Tab}{ArrowDown}');

    const dropdown_list = screen.getByTestId('custom-dropdown');
    expect(dropdown_list.classList.contains('active')).toBe(true);
  });
});
