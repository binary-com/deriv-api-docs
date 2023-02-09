import { cleanup, render, screen } from '@site/src/test-utils';
import React from 'react';
import ApiTokenTable from '..';
import useGetTokens from '../../../hooks/useGetTokens';
import useTokenPage from '../../../hooks/useTokenPage';

jest.mock('../../../hooks/useGetTokens');

const mockUseGetToken = useGetTokens as jest.MockedFunction<
  () => Partial<ReturnType<typeof useGetTokens>>
>;

jest.mock('../../../hooks/useTokenPage');

const mockUseTokenPage = useTokenPage as jest.MockedFunction<
  () => Partial<ReturnType<typeof useTokenPage>>
>;

describe('Api Token Table', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should render loading when isLoadingTokens is truthy ', async () => {
    mockUseGetToken.mockImplementationOnce(() => ({
      isLoadingTokens: true,
    }));

    mockUseTokenPage.mockImplementationOnce(() => ({
      tokens: [],
    }));

    render(<ApiTokenTable />);

    const loadingElement = await screen.findByTestId('circles-loading');
    expect(loadingElement).toBeVisible();
  });

  it('Should not render loading when isLoadingTokens is falsy', async () => {
    mockUseGetToken.mockImplementationOnce(() => ({
      isLoadingTokens: false,
    }));

    mockUseTokenPage.mockImplementationOnce(() => ({
      tokens: [],
    }));

    render(<ApiTokenTable />);

    const loadingElement = await screen.findByTestId('circles-loading');
    expect(loadingElement).not.toBeVisible();
  });
});
