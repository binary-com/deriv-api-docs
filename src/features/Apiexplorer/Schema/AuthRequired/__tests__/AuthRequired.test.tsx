import React from 'react';
import AuthRequired from '..';
import { render, screen } from '@testing-library/react';

describe('AuthRequired', () => {
  it('renders AuthRequired properly', async () => {
    render(<AuthRequired auth_scopes={['scope1']} />);
    const scope = await screen.findByText('scope1');
    expect(scope).toBeVisible();
  });
});
