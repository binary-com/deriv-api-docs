import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ApiFeatures } from '../ApiFeatures';

describe('ClientLibraries', () => {
  it('should render properly', () => {
    render(<ApiFeatures />);
    const api_features = screen.getByTestId('api-features');
    expect(api_features).toBeInTheDocument();
  });
  it('should render title properly', () => {
    render(<ApiFeatures />);
    const api_heading = screen.getByRole('heading', { level: 1 });
    expect(api_heading).toBeInTheDocument();
  });
  it('should render title properly', () => {
    render(<ApiFeatures />);
    const api_text = screen.getByRole('definition');
    expect(api_text).toBeInTheDocument();
  });
  it('should render  subtitle text properly', () => {
    render(<ApiFeatures />);
    const api_list = screen.getByRole('list');
    expect(api_list).toBeInTheDocument();
  });
});
