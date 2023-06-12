import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, RenderResult, within } from '@site/src/test-utils';
import Footer from '../';
import userEvent from '@testing-library/user-event';

describe('HeroHeader', () => {
  let render_result: RenderResult;
  beforeEach(() => {
    render_result = render(<Footer />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const hero_header = screen.getByTestId('footer-text');
    expect(hero_header).toBeInTheDocument();
  });
  it('should render main heading properly', () => {
    const footer_title = screen.getByText('Get connected');
    expect(footer_title).toBeInTheDocument();
  });
  it('should render the header description properly', () => {
    const footer_description = screen.getByText(
      'Discuss ideas and share solutions with developers worldwide.',
    );
    expect(footer_description).toBeInTheDocument();
  });
  it('should render community link properly', () => {
    const community_link = screen.getByRole('link', { name: 'Join our community' });
    expect(community_link).toBeInTheDocument();
    expect(community_link).toHaveAttribute('href', 'https://deriv.vanillacommunity.com/');
  });
  it('should render telegram link properly', () => {
    const telegram_link = screen.getByRole('link', { name: 'Telegram' });
    expect(telegram_link).toBeInTheDocument();
    expect(telegram_link).toHaveAttribute('href', 'https://t.me/+g6FV5tFY1u9lZGE1');
  });
  it('should render footer body texts properly', () => {
    const help_text = screen.getByText(/^we're here to help$/i);
    expect(help_text).toBeInTheDocument();
  });

  it('should render support section properly', async () => {
    const support_text = await screen.findByText(/^Email us at/i);
    expect(support_text).toHaveTextContent(/Email us at api-support@deriv.com/i);

    const question_text = await screen.findByText(/^if you have any questions./i);
    expect(question_text).toBeVisible();
  });
});
