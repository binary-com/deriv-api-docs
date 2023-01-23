import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useLoginUrl from '..';

jest.mock('@site/src/utils/constants', () => ({
  ...jest.requireActual('@site/src/utils/constants'),
  DEFAULT_WS_SERVER: 'test.binary.ws',
}));

jest.mock('@docusaurus/useIsBrowser', () => jest.fn().mockReturnValue(true));

jest.mock('@site/src/utils', () => ({
  ...jest.requireActual('@site/src/utils'),
  getIsLocalhost: jest.fn().mockReturnValue(false),
  getAppId: jest.fn().mockReturnValue('12345'),
}));

describe('Use Login URL', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Should get server_url and app_id from localstorage', () => {
    const { result } = renderHook(() => useLoginUrl());

    act(() => {
      result.current.getUrl('en');
    });

    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem).toHaveBeenCalledWith('config.server_url');
    expect(localStorage.getItem).toHaveBeenCalledWith('config.app_id');
  });

  it('Should set server_url and app_id in localstorage', () => {
    const { result } = renderHook(() => useLoginUrl());

    act(() => {
      result.current.getUrl('en');
    });

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('config.server_url', 'test.binary.ws');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('config.app_id', '12345');

    expect(localStorage.__STORE__['config.server_url']).toBe('test.binary.ws');
    expect(localStorage.__STORE__['config.app_id']).toBe('12345');
  });

  it('Should generate correct login url for localhost', () => {
    const { result } = renderHook(() => useLoginUrl());

    let generatedUrl: string;

    act(() => {
      generatedUrl = result.current.getUrl('en');
    });

    expect(generatedUrl).toContain('oauth2');
    expect(generatedUrl).toContain('test.binary.ws');
    expect(generatedUrl).toContain('app_id=12345');
    expect(generatedUrl).toBe('https://test.binary.ws/oauth2/authorize?app_id=12345&l=en');
  });

  it('Should generate correct url for spanish language', () => {
    const { result } = renderHook(() => useLoginUrl());

    let generatedUrl: string;

    act(() => {
      generatedUrl = result.current.getUrl('es');
    });

    expect(generatedUrl).toContain('l=es');
    expect(generatedUrl).toBe('https://test.binary.ws/oauth2/authorize?app_id=12345&l=es');
  });

  // it('Should return a string containing oauth2', () => {
  //   const { result } = renderHook(() => useLoginUrl());
  //   expect(result.current.getUrl('en')).toContain('/oauth2/');
  // });
  // it('Should return a string containing language "en"', () => {
  //   const { result } = renderHook(() => useLoginUrl());
  //   expect(result.current.getUrl('en')).toContain('/oauth2/');
  // });
  // it('Should return a string containing language "es"', () => {
  //   const { result } = renderHook(() => useLoginUrl());
  //   expect(result.current.getUrl('es')).toContain('/oauth2/');
  // });
});
