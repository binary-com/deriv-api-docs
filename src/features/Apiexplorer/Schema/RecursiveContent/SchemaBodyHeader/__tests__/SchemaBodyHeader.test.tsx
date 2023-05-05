import React from 'react';
import SchemaBodyHeader from '..';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

describe('SchemaBodyHeader', () => {
  it('should render the SchemaBodyHeader with number type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type='number'
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText('number');
    expect(type).toBeVisible();
  });

  it('should render the SchemaBodyHeader with array type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type='array'
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText('array');
    expect(type).toBeVisible();
  });

  it('should render the SchemaBodyHeader with integer type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type='integer'
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText('integer');
    expect(type).toBeVisible();
  });

  it('should render the SchemaBodyHeader with string type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type='string'
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText('string');
    expect(type).toBeVisible();
  });

  it('should render the SchemaBodyHeader with number array type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type={['number']}
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText(/number/i);
    expect(type).toBeVisible();
  });

  it('should render the SchemaBodyHeader with string array type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type={['string']}
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText(/string/i);
    expect(type).toBeVisible();
  });

  it('should render the SchemaBodyHeader with nested array type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type={['array']}
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText(/array/i);
    expect(type).toBeVisible();
  });

  it('should render the SchemaBodyHeader with integer array type', async () => {
    render(
      <SchemaBodyHeader
        key_value='test_key_value'
        type={['integer']}
        defaultValue='default_test'
        pattern='some_test_pattern'
        examples={['example1', 'example2']}
        enum={['test1', 'test2']}
        title='test title'
        is_open_object
        setIsOpenObject={() => jest.fn()}
      />,
    );
    const type = await screen.findByText(/integer/i);
    expect(type).toBeVisible();
  });
});
