import React from 'react';
import LoginDialog from '..';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

jest.mock('@docusaurus/router', () => ({
  useLocation: jest.fn(),
}));

describe('LoginDialog', () => {
  test('if sign up button is clickable', async () => {
    location.assign = jest.fn();

    render(<LoginDialog setToggleModal={jest.fn()} />);
    const sign_up = await screen.findByRole('button', { name: 'Sign up' });

    await userEvent.click(sign_up);

    expect(location.assign).toBeCalledTimes(1);
  });

  test('if log in button is clickable', async () => {
    location.assign = jest.fn();

    render(<LoginDialog setToggleModal={jest.fn()} />);
    const log_in = await screen.findByRole('button', { name: 'Log in' });

    await userEvent.click(log_in);

    expect(location.assign).toBeCalledTimes(1);
  });
});
