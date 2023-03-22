import React from 'react';
import CustomCheckbox from '..';
import { render, screen } from '@testing-library/react';

const registerMock = jest.fn();

describe('CustomCheckbox', () => {
  it('should render the checkbox', () => {
    render(<CustomCheckbox name='test' id='test' register={registerMock()} />);
    const custom_checkbox = screen.getByTestId('custom-checkbox');
    expect(custom_checkbox).toBeInTheDocument();
  });
});
