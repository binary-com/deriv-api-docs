import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import SchemaTitle from '../SchemaTitle';

describe('SchemaTitle', () => {
  beforeEach(() => {
    render(<SchemaTitle className={''} />);
  });

  afterEach(cleanup);

  it('should render the title', () => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
