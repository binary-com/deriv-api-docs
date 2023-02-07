import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { useAppManagerContext } from '@site/src/hooks/useAppManagerContext';
import AppManagement from '../AppManagement';

jest.mock('@site/src/hooks/useAppManagerContext');
const mockUseAppManagerContext = useAppManagerContext as jest.MockedFunction<
  typeof useAppManagerContext
>;

mockUseAppManagerContext.mockImplementation(() => ({
  is_empty_state: true,
  dialog_state: 'DIALOG_DELETE',
}));

describe('AppManagement', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render table column titles', () => {
    render(<AppManagement />);
    const app_name = screen.getByText(/application name/i);
    expect(app_name).toBeInTheDocument();

    const app_id = screen.getByText(/application id/i);
    expect(app_id).toBeInTheDocument();

    const scopes = screen.getByText(/scopes/i);
    expect(scopes).toBeInTheDocument();

    const redirect_url = screen.getByText(/redirect url/i);
    expect(redirect_url).toBeInTheDocument();
  });
});

describe('Loading skeleton', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render loading skeleton', () => {
    render(<AppManagement />);
    const skeleton = screen.getAllByTestId('loading-skeleton');
    expect(skeleton[0]).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render empty state', () => {
    render(<AppManagement />);

    const empty_state_container = screen.getByTestId('management-empty');
    expect(empty_state_container).toBeInTheDocument();
  });
});

describe('DeleteAppDialog', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render DeleteAppDialog', () => {
    render(<AppManagement />);

    const empty_state_container = screen.getByText(/Are you sure you want to delete this app?/i);
    expect(empty_state_container).toBeInTheDocument();
  });
});
