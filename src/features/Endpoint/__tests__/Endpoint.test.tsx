import React from 'react';
import '@testing-library/jest-dom';
import {
  act,
  cleanup,
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import EndPoint from '../Endpoint';

describe('Endpoint', () => {
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
    const app_id = screen.getByPlaceholderText('e.g. 9999');
    expect(server).toHaveValue('green.binaryws.com');

    expect(app_id).toHaveValue('35014');
  });

  it('validate user inputs, and provides error messages for app id field', async () => {
    const app_id = screen.getByPlaceholderText('e.g. 9999');
    await act(async () => {
      fireEvent.change(app_id, {
        target: { value: 'abcd' },
      });
    });

    await act(async () => {
      fireEvent.blur(app_id);
    });

    expect(screen.getByTestId('app_id_error')).toBeInTheDocument();
  });

  it('validate user inputs, and provides error messages for server field', async () => {
    const server = screen.getByPlaceholderText('e.g. frontend.binaryws.com');

    await act(async () => {
      const server = screen.getByPlaceholderText('e.g. frontend.binaryws.com');
      fireEvent.change(server, {
        target: { value: 'qa10@deriv.com' },
      });
    });

    await act(async () => {
      fireEvent.blur(server);
    });

    expect(screen.getByTestId('server_error')).toBeInTheDocument();
  });

  it('should validate submit button functionality', async () => {
    const server = screen.getByPlaceholderText('e.g. frontend.binaryws.com');
    const app_id = screen.getByPlaceholderText('e.g. 9999');

    await act(async () => {
      const server = screen.getByPlaceholderText('e.g. frontend.binaryws.com');
      fireEvent.change(server, {
        target: { value: 'blue.binaryws.com' },
      });
      fireEvent.change(app_id, {
        target: { value: '31063' },
      });
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId('Endpoint'));
    });

    expect(server).toHaveValue('blue.binaryws.com');
    expect(app_id).toHaveValue('31063');
  });
});
