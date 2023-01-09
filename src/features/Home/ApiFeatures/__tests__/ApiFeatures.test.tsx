import React from 'react';
import { cleanup, render, RenderResult, screen, within } from '@site/src/test-utils';
import { ApiFeatures } from '../ApiFeatures';

describe('ApiFeatures', () => {
  let render_result: RenderResult;
  beforeEach(() => {
    render_result = render(<ApiFeatures />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const api_features = screen.getByTestId('api-features');
    expect(api_features).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const api_heading = screen.getByRole('heading', { level: 1 });
    expect(api_heading).toHaveTextContent('Deriv API features');
  });
  it('should render title properly', () => {
    const api_text = screen.getByRole('definition');
    expect(api_text).toHaveTextContent(
      'Deriv API gives you full access to all the trading functionalities of DTrader and allows you to build your own comprehensive trading systems and analysis tools.',
    );
  });
  it('should render subtitle text properly', () => {
    const note_text = screen.getByRole('note');
    expect(note_text).toHaveTextContent("With our API, you'll be able to:");
  });
  it('should render list properly', () => {
    const api_list = screen.getByRole('list');
    expect(api_list).toBeInTheDocument();
    const api_list_items = api_list.childElementCount;
    expect(api_list_items).toBe(6);
  });
  it('should render list items properly', () => {
    const api_list = screen.getByRole('list');
    const { getAllByRole } = within(api_list);
    const list_items = getAllByRole('listitem');
    expect(list_items.length).toBe(6);
  });

  it('should render list items texts properly', () => {
    const api_list = screen.getByRole('list');
    const { getAllByRole } = within(api_list);
    const list_items = getAllByRole('listitem');
    const contents = list_items.map((item) => item.textContent);
    expect(contents).toEqual([
      'Trade digital options and multipliers',
      'Monitor real-time pricing',
      'Buy/sell contracts',
      "Manage user's accounts",
      'Monitor existing contracts',
      "View user's historical transactions",
    ]);
  });

  it('should render feature image', () => {
    const image = screen.getByTestId('api-features-img');
    expect(image).toBeInTheDocument();
  });
});
