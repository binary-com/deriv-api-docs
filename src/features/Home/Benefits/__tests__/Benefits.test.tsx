import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { Benefits } from '../Benefits';

describe('Benefits', () => {
  beforeEach(() => {
    render(<Benefits />);
  });

  afterEach(cleanup);

  it('should render the component', () => {
    const benefits = screen.getByTestId('benefits');
    expect(benefits).toBeInTheDocument();
  });
  it('should render benefits icons', () => {
    const automation = screen.getByText(/automation/i);
    const integration = screen.getByText(/integration/i);
    const execution = screen.getByText(/execution/i);

    expect(automation).toBeInTheDocument();
    expect(integration).toBeInTheDocument();
    expect(execution).toBeInTheDocument();
  });
  it('should render personalise your trading information', () => {
    const title = screen.getByText(/Personalise your trading$/i);
    const information = screen.getByText(/create charts and views/i);

    expect(title).toBeInTheDocument();
    expect(information).toBeInTheDocument();
  });
  it('should render build a business information', () => {
    const title = screen.getByText(/build a business and earn more/i);
    const information = screen.getByText(/create your own trading apps/i);

    expect(title).toBeInTheDocument();
    expect(information).toBeInTheDocument();
  });
  it('should render personalise image', () => {
    const image = screen.getByTestId('personalisation');
    expect(image).toBeInTheDocument();
  });
  it('should render business image', () => {
    const image = screen.getByTestId('build-business');
    expect(image).toBeInTheDocument();
  });
});
