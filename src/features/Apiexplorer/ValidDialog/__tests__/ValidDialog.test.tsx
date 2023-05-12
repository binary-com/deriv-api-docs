import React from 'react';
import ValidDialog from '..';
import { screen, render } from '@testing-library/react';

describe('ValidDialog', () => {
  test('if correct test is rendered', () => {
    location.assign = jest.fn();

    render(<ValidDialog setIsValid={jest.fn()} setToggleModal={jest.fn()} />);
    const text = screen.getByText(
      'Your JSON object is invalid. Please make sure you provide the correct syntax for your JSON object.',
    );

    expect(text).toBeVisible();
  });
});
