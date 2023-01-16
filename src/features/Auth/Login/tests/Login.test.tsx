import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Login } from '../Login';

describe('Login', () => {
  beforeEach(() => {
    render(<Login />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const login = screen.getByTestId('login');
    expect(login).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const login_text = screen.getByRole('heading');
    expect(login_text).toBeInTheDocument();
  });
  it('should render image properly', () => {
    const login_img = screen.getByRole('image');
    expect(login_img).toHaveStyle('background: /img/login.svg');
  });
});
