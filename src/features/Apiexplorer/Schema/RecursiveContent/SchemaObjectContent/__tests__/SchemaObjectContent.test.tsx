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

  it('should throw an error if the properties cannot be stringified', () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    const fake_properties = {
      test_item: {
        description: 'test description',
        type: 'array',
        defaultValue: 'default_test',
        pattern: 'some_test_pattern',
        examples: ['example1', 'example2'],
        enum: ['test1', 'test2'],
        title: 'test title',
        properties: null,
      },
    };

    // creating intentionally a circular dependency,
    // triggering the try catch error mechanism.
    fake_properties.test_item.properties = {
      test_item: fake_properties.test_item,
    };

    render(<SchemaObjectContent key_value='test_item' properties={fake_properties} />);

    expect(consoleOutput).toEqual(['There was an issue stringifying JSON data: ']);
  });

  it('should throw an error if the properties cannot be stringified', async () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    const fake_properties = {
      test_item: {
        description: 'test description',
        type: 'array',
        defaultValue: 'default_test',
        pattern: 'some_test_pattern',
        examples: ['example1', 'example2'],
        enum: ['test1', 'test2'],
        title: 'test title',
        properties: null,
      },
    };

    render(<SchemaObjectContent key_value='test_item' properties={fake_properties} />);

    const schema_button = await screen.findByText('{}');

    expect(schema_button).toBeVisible();

    await userEvent.click(schema_button);

    const schema = await screen.findByTitle('JSON');
    expect(schema).toBeVisible();
  });
});
