import useApiToken from '@site/src/hooks/useApiToken';
import { cleanup, render, screen } from '@site/src/test-utils';
import React from 'react';
import ApiTokenTable from '..';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

describe('Api Token Table', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render loading when isLoadingTokens is truthy ', async () => {
    mockUseApiToken.mockImplementationOnce(() => ({
      tokens: [],
      isLoadingTokens: true,
    }));

    render(<ApiTokenTable />);

    const loadingElement = await screen.findByTestId('circles-loading');
    expect(loadingElement).toBeVisible();
  });

  it('Should not render loading when isLoadingTokens is falsy', async () => {
    mockUseApiToken.mockImplementationOnce(() => ({
      tokens: [],
      isLoadingTokens: false,
    }));

    render(<ApiTokenTable />);

    const loadingElement = await screen.findByTestId('circles-loading');
    expect(loadingElement).not.toBeVisible();
  });
});
