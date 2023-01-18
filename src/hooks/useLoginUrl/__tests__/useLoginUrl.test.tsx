import { renderHook } from '@testing-library/react-hooks';
import useLoginUrl from '..';

describe('Login', () => {
  it('Should return a string containing oauth2', () => {
    const { result } = renderHook(() => useLoginUrl('en'));
    expect(result.current.getUrl()).toContain('/oauth2/');
  });
  it('Should return a string containing language "en"', () => {
    const { result } = renderHook(() => useLoginUrl('en'));
    expect(result.current.getUrl()).toContain('/oauth2/');
  });
  it('Should return a string containing language "es"', () => {
    const { result } = renderHook(() => useLoginUrl('es'));
    expect(result.current.getUrl()).toContain('/oauth2/');
  });
});
