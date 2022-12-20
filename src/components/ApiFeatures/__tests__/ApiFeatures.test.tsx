import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { ApiFeatures } from '../ApiFeatures';

describe('ApiFeatures', () => {
  beforeEach(() => {
    render(<ApiFeatures />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const api_features = screen.getByTestId('api-features');
    expect(api_features).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const api_heading = screen.getByRole('heading', { level: 1 });
    expect(api_heading).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const api_text = screen.getByRole('definition');
    expect(api_text).toBeInTheDocument();
  });
  it('should render  subtitle text properly', () => {
    const api_list = screen.getByRole('list');
    expect(api_list).toBeInTheDocument();
  });
  it('should render feature image', () => {
    const image = screen.getByTestId('api-features-img');
    expect(image).toBeInTheDocument();
  });
});
