import React from 'react';
import { cleanup, render } from '@site/src/test-utils';
import ApiExplorerFeatures from '..';

describe('API Explorer', () => {
  beforeEach(() => {
    render(<ApiExplorerFeatures />);
  });

  afterEach(() => {
    cleanup();
  });
});
