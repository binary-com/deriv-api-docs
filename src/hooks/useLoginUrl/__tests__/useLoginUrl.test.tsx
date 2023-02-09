import { renderHook, cleanup } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useLoginUrl from '..';
import * as utils from '@site/src/utils';

jest
  .spyOn(utils, 'getServerConfig')
  .mockReturnValue({ appId: '1234', serverUrl: 'test.binary.sx' });

describe('Use Login URL', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Should return login url for english language by default ', () => {
    const { result } = renderHook(() => useLoginUrl());

    let loginUrl: string;
    act(() => {
      loginUrl = result.current.getUrl();
    });

    expect(loginUrl).toContain('l=en');
    expect(utils.getServerConfig).toHaveBeenCalled();
    expect(loginUrl).toMatch(/https:\/\/test.binary.sx/);
    expect(loginUrl).toMatch(/app_id=1234/);
  });

  it('Should return login url for spanish language correctly', () => {
    const { result } = renderHook(() => useLoginUrl());

    let loginUrl: string;
    act(() => {
      loginUrl = result.current.getUrl('es');
    });

    expect(loginUrl).toContain('l=es');
    expect(utils.getServerConfig).toHaveBeenCalled();
    expect(loginUrl).toMatch(/https:\/\/test.binary.sx/);
    expect(loginUrl).toMatch(/app_id=1234/);
  });

  // it("Should generate vercel login url when it's not browser", () => {
  //   jest.spyOn(utils, 'getIsBrowser').mockReturnValueOnce(false);
  //   const { result } = renderHook(() => useLoginUrl());

  //   let generatedUrl: string;

  //   act(() => {
  //     generatedUrl = result.current.getUrl('es');
  //   });

  //   expect(generatedUrl).toContain('l=es');
  //   expect(generatedUrl).toBe('https://test.binary.ws/oauth2/authorize?app_id=35073&l=es');
  // });

  // it('Should get server_url and app_id from localstorage', () => {
  //   jest.spyOn(utils, 'getIsLocalhost').mockReturnValueOnce(true);
  //   jest.spyOn(utils, 'getIsBrowser').mockReturnValueOnce(true);

  //   const { result } = renderHook(() => useLoginUrl());

  //   let generatedUrl: string;

  //   act(() => {
  //     generatedUrl = result.current.getUrl('es');
  //   });
  //   expect(generatedUrl).toBe('https://test.binary.ws/oauth2/authorize?app_id=35074&l=es');

  //   expect(localStorage.getItem).toHaveBeenCalledTimes(2);
  //   expect(localStorage.getItem).toHaveBeenCalledWith('config.server_url');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('config.app_id');
  // });

  // it('Should set server_url and app_id in localstorage', () => {
  //   jest.spyOn(utils, 'getIsBrowser').mockReturnValueOnce(true);

  //   jest.spyOn(utils, 'getIsLocalhost').mockReturnValueOnce(true);
  //   const { result } = renderHook(() => useLoginUrl());

  //   act(() => {
  //     result.current.getUrl('en');
  //   });

  //   expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  //   expect(localStorage.setItem).toHaveBeenCalledWith('config.server_url', 'test.binary.ws');
  //   expect(localStorage.setItem).toHaveBeenLastCalledWith('config.app_id', '35074');

  //   expect(localStorage.__STORE__['config.server_url']).toBe('test.binary.ws');
  //   expect(localStorage.__STORE__['config.app_id']).toBe('35074');
  // });

  // it('Should generate correct login url for localhost', () => {
  //   jest.spyOn(utils, 'getIsLocalhost').mockReturnValueOnce(true);
  //   jest.spyOn(utils, 'getIsBrowser').mockReturnValueOnce(true);

  //   const { result } = renderHook(() => useLoginUrl());

  //   let generatedUrl: string;

  //   act(() => {
  //     generatedUrl = result.current.getUrl('en');
  //   });

  //   expect(generatedUrl).toContain('oauth2');
  //   expect(generatedUrl).toContain('test.binary.ws');
  //   expect(generatedUrl).toContain('app_id=35074');
  //   expect(generatedUrl).toBe('https://test.binary.ws/oauth2/authorize?app_id=35074&l=en');
  // });

  // it('Should generate correct url for spanish language', () => {
  //   jest.spyOn(utils, 'getIsLocalhost').mockReturnValueOnce(false);
  //   jest.spyOn(utils, 'getIsBrowser').mockReturnValueOnce(true);

  //   const { result } = renderHook(() => useLoginUrl());

  //   let generatedUrl: string;

  //   act(() => {
  //     generatedUrl = result.current.getUrl('es');
  //   });

  //   expect(generatedUrl).toContain('l=es');
  //   expect(generatedUrl).toBe('https://test.binary.ws/oauth2/authorize?app_id=35073&l=es');
  // });
});
