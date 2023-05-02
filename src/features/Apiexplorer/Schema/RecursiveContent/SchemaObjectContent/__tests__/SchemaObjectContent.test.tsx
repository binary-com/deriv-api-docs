import React from 'react';
import SchemaObjectContent from '..';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

const fake_properties = {
  test_item: {
    description: 'test description',
    type: 'array',
    defaultValue: 'default_test',
    pattern: 'some_test_pattern',
    examples: ['example1', 'example2'],
    enum: ['test1', 'test2'],
    title: 'test title',
    properties: {
      test_property: {
        description: 'property description',
        type: 'string',
      },
    },
  },
};

describe('SchemaObjectContent', () => {
  it('should be able to open a nested object item', async () => {
    render(<SchemaObjectContent key_value='test_item' properties={fake_properties} />);

    const button = await screen.findByRole('button', { name: /test_item/i });
    expect(button).toBeVisible();

    await userEvent.click(button);

    const nested_property = await screen.findByText(/property description/i);
    expect(nested_property).toBeVisible();

    await userEvent.click(button);

    expect(nested_property).not.toBeVisible();
  });
});
