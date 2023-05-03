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
    expect(result.current.request_info).toEqual(
      '{\n  "active_symbols": "brief",\n  "product_type": "basic"\n}',
    );
  });
});
