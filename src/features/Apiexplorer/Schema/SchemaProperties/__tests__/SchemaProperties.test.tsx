import React from 'react';
import SchemaProperties from '..';
import { render } from '@testing-library/react';

describe('SchemaProperties', () => {
  it('should throw an error when invalid JSON properties are passed', async () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    const fake_properties = {
      info: 'test',
      default: null,
      properties: null,
    };

    // creating intentionally a circular dependency,
    // triggering the try catch error mechanism.
    fake_properties.default = {
      default: fake_properties,
    };

    render(<SchemaProperties jsonSchema={fake_properties} />);

    expect(consoleOutput).toEqual(['There was an issue stringifying JSON data: ']);
  });
});
