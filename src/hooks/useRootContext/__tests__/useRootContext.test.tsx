import RootContextProvider from '@site/src/contexts/root.context';
import { renderHook, act } from '@testing-library/react-hooks';
import useRootContext from '..';

describe('Root Context', () => {
  const wrapper = RootContextProvider;

  it('Should have is_logged_in as falsy', () => {
    const { result } = renderHook(() => useRootContext(), { wrapper });
    expect(result.current.is_logged_in).toBeFalsy();
  });

  it('Should have is_logged_in as truthy on change', () => {
    const { result } = renderHook(() => useRootContext(), { wrapper });
    act(() => {
      result.current.setIsLoggedIn(true);
    });
    expect(result.current.is_logged_in).toBeTruthy();
  });
});
