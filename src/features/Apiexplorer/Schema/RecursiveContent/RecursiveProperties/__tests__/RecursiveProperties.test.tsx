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
    recursive_item_1: {
      description: 'This is a recursive item',
    },
    recursive_item_2: {
      description: 'This is recursive item 2',
      oneOf: 'This is oneOf key for recursive_item_2',
    },
    recursive_item_3: {
      description: 'This is recursive item 3',
      oneOf: [
        {
          description: 'This is object 1',
          type: 'string',
        },
        {
          description: 'This is object 2',
          type: 'object',
          properties: {
            property_1: {
              description: 'item 1',
              type: 'string',
              enum: ['deposit', 'withdraw'],
            },
            property_2: {
              description: 'item 2',
              type: 'object',
              properties: {
                property_2_1: {
                  description: 'item 3',
                  type: 'string',
                },
              },
            },
          },
        },
      ],
    },
  },
  definitions: {
    stream_types: {
      description: 'This stream_types description',
      type: 'string',
      enum: [
        'balance',
        'candles',
        'cashier_payments',
        'p2p_advert',
        'p2p_advertiser',
        'p2p_order',
        'proposal',
        'proposal_open_contract',
        'ticks',
        'transaction',
        'trading_platform_asset_listing',
        'website_status',
        'p2p_settings',
        'crypto_estimations',
      ],
    },
  },
};

describe('RecursiveProperties', () => {
  it('should be able to render recursive items', async () => {
    render(
      <RecursiveProperties
        is_open
        properties={fakeItem.properties || fakeItem?.items?.properties}
        value={fakeItem}
        jsonSchema={fakeItem}
      />,
    );
    const recursion_1_description = await screen.findByText(/nested items/i);
    expect(recursion_1_description).toBeVisible();

    const recursion_2_name = await screen.findByText(/recursive_item_1/i);
    const recursion_2_description = await screen.findByText(/This is a recursive item/i);
    expect(recursion_2_name).toBeVisible();
    expect(recursion_2_description).toBeVisible();

    const recursion_3_name = await screen.findByText(/recursive_item_2/i);
    const recursion_3_description = await screen.findByText(/This is recursive item 2/i);
    expect(recursion_3_name).toBeVisible();
    expect(recursion_3_description).toBeVisible();

    const recursion_4_name = await screen.findByText(/recursive_item_3/i);
    const recursion_4_description = await screen.findByText(/This is recursive item 3/i);
    expect(recursion_4_name).toBeVisible();
    expect(recursion_4_description).toBeVisible();
  });

  it('renders only the description (last item) if there are no nested items anymore', async () => {
    render(
      <RecursiveProperties is_open properties={null} value={fakeItem} jsonSchema={fakeItem} />,
    );
    const item = await screen.findByText(/This is the main item description/i);
    expect(item).toBeVisible();
  });

  it('renders StreamTypesObject for forgetAll api call', async () => {
    render(
      <RecursiveProperties
        is_open
        properties={null}
        value={fakeItem.properties.recursive_item_2}
        jsonSchema={fakeItem}
      />,
    );
    const streamTypesObject = await screen.getByTestId('dt_stream_types_object');
    expect(streamTypesObject).toBeVisible();
  });

  it('renders SchemaOneOfObjectContent if the value of key inside property schema contains oneOf', async () => {
    render(
      <RecursiveProperties
        is_open
        properties={fakeItem.properties}
        value={fakeItem.properties}
        jsonSchema={fakeItem}
      />,
    );
    const schemaOneOfObjectContent = await screen.getAllByTestId(
      'dt_schema_oneof_object_content',
    )[0];
    expect(schemaOneOfObjectContent).toBeVisible();
  });
});
