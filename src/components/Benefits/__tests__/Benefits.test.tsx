import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
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
    const automation_icon = screen.getByTestId('automation');
    const integration_icon = screen.getByTestId('integration');
    const execution_icon = screen.getByTestId('execution');
    const automation = screen.getByText(/automation/i);
    const integration = screen.getByText(/integration/i);
    const execution = screen.getByText(/execution/i);

    expect(automation_icon).toHaveStyle('background: url(/img/automation.svg) no-repeat');
    expect(integration_icon).toHaveStyle('background: url(/img/integration.svg) no-repeat');
    expect(execution_icon).toHaveStyle('background: url(/img/execution.svg) no-repeat');
    expect(automation).toBeInTheDocument;
    expect(integration).toBeInTheDocument;
    expect(execution).toBeInTheDocument;
  });
  it('should render personalise your trading information', () => {
    const title = screen.queryAllByText(/personalise your trading/i);
    const information = screen.getByText(/create charts and views/i);

    expect(title[0]).toBeInTheDocument();
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
    expect(image).toHaveStyle('background: url(/img/personalisation.png) no-repeat');
  });
  it('should render business image', () => {
    const image = screen.getByTestId('build-business');
    expect(image).toHaveStyle('background: url(/img/build-business.png) no-repeat');
  });
});
