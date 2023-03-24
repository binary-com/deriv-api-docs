import React from 'react';
import CustomCheckbox from '..';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const registerMock = jest.fn();

describe('CustomCheckbox', () => {
  beforeEach(() => {
    render(
      <CustomCheckbox name='test' id='test' register={registerMock()}>
        <label htmlFor='test'>this is a test label</label>
      </CustomCheckbox>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the checkbox', () => {
    const custom_checkbox_parent = screen.getByTestId('custom-checkbox-test');
    expect(custom_checkbox_parent).toBeInTheDocument();
  });

  it('should check the checkbox', async () => {
    const custom_checkbox_parent = screen.getByTestId('custom-checkbox-test');
    const checkbox = custom_checkbox_parent.children[0].children[0];

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should check the checkbox when clicking the label', async () => {
    const label = screen.getByText('this is a test label');
    await userEvent.click(label);

    const custom_checkbox_parent = screen.getByTestId('custom-checkbox-test');
    const checkbox = custom_checkbox_parent.children[0].children[0];

    expect(checkbox).toBeChecked();
  });
});
