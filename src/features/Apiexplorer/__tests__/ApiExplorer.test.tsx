import React from 'react';
import '@testing-library/jest-dom';
import ApiExplorerFeatures from '..';
import userEvent from '@testing-library/user-event';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useDynamicImportJSON from '@site/src/hooks/dynamicImport';
import { render, screen } from '@testing-library/react';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { act } from 'react-dom/test-utils';

jest.mock('@docusaurus/router', () => ({
  useLocation: () => ({
    pathname: '/api-explorer',
    hash: '',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => {
  return {
    is_logged_in: false,
  };
});

jest.mock('@site/src/hooks/dynamicImport');

const mockUseDynamicImportJSON = useDynamicImportJSON as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDynamicImportJSON>>
>;

mockUseDynamicImportJSON.mockImplementation(() => ({
  request_info: {
    auth_required: 1,
    auth_scopes: [],
  },
  text_data: {
    name: null,
    selected_value: 'Select API Call - Version 3',
    request: '',
  },
}));

describe('ApiExplorerFeatures', () => {
  beforeEach(() => {
    render(<ApiExplorerFeatures />);
  });

  it('should render the title', () => {
    const title = screen.getByRole('heading', { name: /API Explorer/i });
    expect(title).toBeInTheDocument();
  });

  it('should be able to select from dropdown', async () => {
    const playground_select = await screen.findByText(/select api call/i);
    await userEvent.click(playground_select);

    const select_option = await screen.findByText(/active symbols/i);
    await userEvent.click(select_option);

    expect(select_option).not.toBeVisible();
  });

  it('should close the dropdown when clicking outside of it', async () => {
    const playground_select = await screen.findByText(/select api call/i);
    await userEvent.click(playground_select);

    const select_option = await screen.findByText(/active symbols/i);
    expect(select_option).toBeVisible();

    const page_title = await screen.findByText(/api explorer/i);
    await userEvent.click(page_title);

    expect(select_option).not.toBeVisible();
  });

  it('should render LoginDialog and it can be closed', async () => {
    const playground_select = await screen.findByText(/select api call/i);
    await userEvent.click(playground_select);

    const select_option = await screen.findByText(/application: get details/i);
    expect(select_option).toBeVisible();

    await userEvent.click(select_option);

    const send_request = await screen.findByText(/send request/i);
    await userEvent.click(send_request);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeVisible();

    const close_button = await screen.findByTestId('close-button');

    await userEvent.click(close_button);
    expect(dialog).not.toBeVisible();
  });
});
