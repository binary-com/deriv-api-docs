import React from 'react';
import RecursiveProperties from '..';
import { render, screen } from '@testing-library/react';

const fakeItem = {
  description: 'This is the main item description',
  items: {
    description: 'nested items',
    properties: {
      recursive_item: {
        description: 'This is a recursive item',
      },
    },
  },
  properties: {
    recursive_item: {
      description: 'This is a recursive item',
    },
  },
};

jest.mock('@docusaurus/router', () => ({
  useLocation: () => ({
    pathname: '',
    hash: '',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('RecursiveProperties', () => {
  it('should be able to render recursive items', async () => {
    render(
      <RecursiveProperties
        is_open
        properties={fakeItem.properties || fakeItem?.items?.properties}
        value={fakeItem}
      />,
    );
    const recursion_1_description = await screen.findByText(/nested items/i);
    expect(recursion_1_description).toBeVisible();

    const recursion_2_name = await screen.findByText(/recursive_item/i);
    expect(recursion_2_name).toBeVisible();

    const recursion_2_description = await screen.findByText(/This is a recursive item/i);
    expect(recursion_2_description).toBeVisible();
  });

  it('renders only the description (last item) if there are no nested items anymore', async () => {
    render(<RecursiveProperties is_open properties={null} value={fakeItem} />);
    const item = await screen.findByText(/This is the main item description/i);
    expect(item).toBeVisible();
  });
});
