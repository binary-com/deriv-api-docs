import React from 'react';
import { sandboxes } from '../utility/sandboxes';
import SandboxIframe from '..';
import { render, screen } from '@testing-library/react';

describe('SandboxIframe', () => {
  it('should render the SandboxIframe', () => {
    render(<SandboxIframe sandbox={sandboxes.ticks} />);
    const iframe = screen.getByTitle('static');
    expect(iframe).toBeVisible();
  });
});
