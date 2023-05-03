import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useDynamicImportJSON from '..';

jest.mock('@docusaurus/router', () => ({
  useLocation: () => ({
    pathname: '/api-explorer#active_symbols',
    hash: '#active_symbols',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@site/src/hooks/useAuthContext');

describe('useDynamicImportJSON', () => {
  const { result } = renderHook(() => useDynamicImportJSON());
  it('should populate text data with the correct values', () => {
    act(() => {
      expect(result.current.text_data).toEqual({
        request: '{\n  "active_symbols": "brief",\n  "product_type": "basic"\n}',
        selected_value: 'Active Symbols',
        name: 'active_symbols',
      });
    });
  });
  it('should have the correct hash value in the URL on selection of an api call', () => {
    const location = require('@docusaurus/router').useLocation();
    const url = location.hash;
    expect(url).toMatch('active_symbols');
  });

  it('should have correct text area inputs inside dynamic imports correctly', () => {
    act(() => {
      result.current.dynamicImportJSON(result.current.text_data.selected_value);
    });
    expect(result.current.request_info).toEqual({
      $schema: 'http://json-schema.org/draft-04/schema#',
      additionalProperties: false,
      auth_required: 0,
      default: {
        $schema: 'http://json-schema.org/draft-04/schema#',
        additionalProperties: false,
        auth_required: 0,
        description:
          'Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).',
        properties: {
          active_symbols: {
            description: 'If you use `brief`, only a subset of fields will be returned.',
            enum: ['brief', 'full'],
            type: 'string',
          },
          landing_company: {
            description:
              '[Optional] If you specify this field, only symbols available for trading by that landing company will be returned. If you are logged in, only symbols available for trading by your landing company will be returned regardless of what you specify in this field.',
            enum: [
              'iom',
              'malta',
              'maltainvest',
              'svg',
              'virtual',
              'vanuatu',
              'champion',
              'champion-virtual',
            ],
            type: 'string',
          },
          passthrough: {
            description:
              '[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.',
            type: 'object',
          },
          product_type: {
            description:
              '[Optional] If you specify this field, only symbols that can be traded through that product type will be returned.',
            enum: ['basic'],
            type: 'string',
          },
          req_id: { description: '[Optional] Used to map request to response.', type: 'integer' },
        },
        required: ['active_symbols'],
        title: 'Active Symbols (request)',
        type: 'object',
      },
      description:
        'Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).',
      properties: {
        active_symbols: {
          description: 'If you use `brief`, only a subset of fields will be returned.',
          enum: ['brief', 'full'],
          type: 'string',
        },
        landing_company: {
          description:
            '[Optional] If you specify this field, only symbols available for trading by that landing company will be returned. If you are logged in, only symbols available for trading by your landing company will be returned regardless of what you specify in this field.',
          enum: [
            'iom',
            'malta',
            'maltainvest',
            'svg',
            'virtual',
            'vanuatu',
            'champion',
            'champion-virtual',
          ],
          type: 'string',
        },
        passthrough: {
          description:
            '[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.',
          type: 'object',
        },
        product_type: {
          description:
            '[Optional] If you specify this field, only symbols that can be traded through that product type will be returned.',
          enum: ['basic'],
          type: 'string',
        },
        req_id: { description: '[Optional] Used to map request to response.', type: 'integer' },
      },
      required: ['active_symbols'],
      title: 'Active Symbols (request)',
      type: 'object',
    });
  });
});
