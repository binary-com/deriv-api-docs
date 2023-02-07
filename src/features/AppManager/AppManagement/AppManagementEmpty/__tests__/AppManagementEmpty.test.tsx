import React from 'react';
import { render, screen } from '@testing-library/react';
import AppManagementEmpty from '..';

describe('AppManagementEmpty', () => {
  beforeEach(() => {
    render(<AppManagementEmpty />);
  });

  it('should render the component', () => {
    const component = screen.getByTestId('management-empty');
    expect(component).toBeInTheDocument();
  });

  it('should render the content', () => {
    const content = screen.getByText(
      /To see your details reflected, please register your app via the registration form/i,
    );
    expect(content).toBeInTheDocument();
  });

  it('should render the redirect button', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
