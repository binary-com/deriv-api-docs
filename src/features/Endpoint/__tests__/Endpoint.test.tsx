import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import EndPoint from '../Endpoint';

describe('Login', () => {
  beforeEach(() => {
    render(<EndPoint />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const endpoint = screen.getByTestId('Endpoint');
    expect(endpoint).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const endpoint_text = screen.getByRole('heading');
    expect(endpoint_text).toBeInTheDocument();
  });

  it('should have default values in input fields', () => {
    const server = screen.getByPlaceholderText('e.g. frontend.binaryws.com');
    expect(server).toHaveValue('green.binary.com');

    const app_id = screen.getByPlaceholderText('e.g. 9999');

    expect(app_id).toHaveValue('35014');
  });
});
