import React from 'react';
import SchemaOneOfBodyHeader from '..';
import { screen, render } from '@testing-library/react';

describe('SchemaOneOfBodyHeader', () => {
  it('should render SchemaOneOfBodyHeader with button having object type as display name', () => {
    render(
      <SchemaOneOfBodyHeader
        key_title='cashier'
        oneOf={[
          {
            description: 'description 1',
            type: 'string',
          },
          {
            description: 'description 1',
            type: 'number',
          },
          {
            description: 'description 2',
            type: 'object',
          },
        ]}
        updateIndexArray={() => jest.fn()}
      />,
    );
    const one_of = screen.getByText(/one of/i);
    const button_1 = screen.getByRole('button', {
      name: /string/i,
    });
    const button_2 = screen.getByRole('button', {
      name: /object/i,
    });
    const button_3 = screen.getByRole('button', {
      name: /number/i,
    });
    expect(one_of).toBeInTheDocument();
    expect(button_1).toBeInTheDocument();
    expect(button_2).toBeInTheDocument();
    expect(button_3).toBeInTheDocument();
  });

  it('should render SchemaOneOfBodyHeader with button having object type as display name', () => {
    render(
      <SchemaOneOfBodyHeader
        key_title='cashier'
        oneOf={[
          {
            description: 'description 1',
            type: 'string',
            title: 'some title',
          },
          {
            description: 'description 2',
            type: 'null',
          },
        ]}
        updateIndexArray={() => jest.fn()}
      />,
    );
    const one_of = screen.getByText(/one of/i);
    const button_1 = screen.getByRole('button', {
      name: /some title/i,
    });
    const button_2 = screen.getByRole('button', {
      name: /null/i,
    });
    expect(one_of).toBeInTheDocument();
    expect(button_1).toBeInTheDocument();
    expect(button_2).toBeInTheDocument();
  });

  it('should render SchemaOneOfBodyHeader with pattern', () => {
    render(
      <SchemaOneOfBodyHeader
        key_title='cashier'
        oneOf={[
          {
            type: 'integer',
            pattern: 'some regex pattern',
          },
          {
            type: 'array',
            items: {
              type: 'string',
              pattern: 'some regex pattern',
            },
          },
        ]}
        updateIndexArray={() => jest.fn()}
      />,
    );
    const one_of = screen.getByText(/one of/i);
    const type_1 = screen.getByText(/integer/i);
    const pattern = screen.getByText(/some regex pattern/i);
    const type_2 = screen.getByText(/array/i);

    expect(one_of).toBeInTheDocument();
    expect(type_1).toBeInTheDocument();
    expect(pattern).toBeInTheDocument();
    expect(type_2).toBeInTheDocument();
  });
});
