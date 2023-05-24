import React from 'react';
import { Header } from '..';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('should be able to render the header with links', () => {
    render(<Header />);
    const deriv_website_link = screen.getByText('Deriv website');
    const who_we_are_link = screen.getByText('Who we are');
    const contact_us_link = screen.getByText('Contact us');

    expect(deriv_website_link).toBeVisible();
    expect(who_we_are_link).toBeVisible();
    expect(contact_us_link).toBeVisible();
  });
});
