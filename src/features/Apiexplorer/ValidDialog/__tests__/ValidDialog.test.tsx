import React from 'react';
import ValidDialog from '..';
import { screen, render } from '@testing-library/react';

describe('ValidDialog', () => {
  test('if correct test is rendered', () => {
    location.assign = jest.fn();

    render(<ValidDialog setToggleModal={jest.fn()} setIsValid={jest.fn()} />);
    const text = screen.getByText('Incorrect Syntax');

    expect(text).toBeVisible();
  });
});
