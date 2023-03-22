import useTokenSelector from '..';
import useApiToken from '../../useApiToken';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
  updateCurrentToken: jest.fn(),
}));

describe('useTokenSelector', () => {
  it('should be able to switch to an account', () => {
    const { result } = renderHook(() => useTokenSelector());

    act(() => {
      result.current.onSelectToken;
    });

    expect(mockUseApiToken).toBeCalledTimes(1);
  });
});
