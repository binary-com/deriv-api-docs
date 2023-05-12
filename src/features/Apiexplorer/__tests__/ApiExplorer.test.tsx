import React from 'react';
import '@testing-library/jest-dom';
import ApiExplorerFeatures from '..';
import userEvent from '@testing-library/user-event';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useDynamicImportJSON from '@site/src/hooks/useDynamicImportJSON';
import { cleanup, render, screen } from '@testing-library/react';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { act } from 'react-dom/test-utils';
import RequestResponseRenderer from '../RequestResponseRenderer';

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

jest.mock('@site/src/hooks/useWs');

const mockuseWS = useWS as jest.MockedFunction<() => Partial<ReturnType<typeof useWS>>>;

const mockClear = jest.fn();

mockuseWS.mockImplementation(() => ({
  clear: mockClear,
  send: jest.fn(),
}));

jest.mock('@site/src/hooks/useDynamicImportJSON');

const mockUseDynamicImportJSON = useDynamicImportJSON as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDynamicImportJSON>>
>;

mockUseDynamicImportJSON.mockImplementation(() => ({
  request_info: {
    auth_required: 1,
    auth_scopes: [],
    description: 'this is a test with `echo_req` description',
    title: 'this is a test title',
  },
  response_info: {
    description: 'this is a test with `echo_req` description',
    title: 'this is a test title',
  },
  setSelected: jest.fn(),
  handleSelectChange: jest.fn(),
  text_data: {
    name: null,
    selected_value: 'Select API Call - Version 3',
    request: ' { "echo_req": 1 } ',
  },
}));

describe('ApiExplorerFeatures', () => {
  describe('Logged out', () => {
    beforeEach(() => {
      mockUseAuthContext.mockImplementation(() => {
        return {
          is_logged_in: false,
          is_authorized: false,
        };
      });
      render(<ApiExplorerFeatures />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('should render the title', () => {
      const title = screen.getByRole('heading', { name: /API Explorer/i });
      expect(title).toBeInTheDocument();
    });

    it('should be able to select from dropdown', async () => {
      const playground_select = screen.getByText(/select api call/i);
      await userEvent.click(playground_select);

      const select_option = screen.getByText(/active symbols/i);
      await userEvent.click(select_option);

      expect(select_option).not.toBeVisible();
    });

    it('should close the dropdown when clicking outside of it', async () => {
      const playground_select = screen.getByText(/select api call/i);
      await userEvent.click(playground_select);

      const select_option = screen.getByText(/active symbols/i);
      expect(select_option).toBeVisible();

      const page_title = screen.getByText(/api explorer/i);
      await userEvent.click(page_title);

      expect(select_option).not.toBeVisible();
    });

    it('should render LoginDialog and it can be closed', async () => {
      const playground_select = screen.getByText(/select api call/i);
      await userEvent.click(playground_select);

      const select_option = screen.getByText(/application: get details/i);
      expect(select_option).toBeVisible();

      await userEvent.click(select_option);

      const send_request = screen.getByText(/send request/i);
      await userEvent.click(send_request);

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeVisible();

      const close_button = screen.getByTestId('close-button');

      await userEvent.click(close_button);
      expect(dialog).not.toBeVisible();
    });
  });

  describe('Logged in', () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('should render the RequestResponseRenderer and can clear it', async () => {
      mockUseDynamicImportJSON.mockImplementation(() => ({
        request_info: {
          auth_required: 0,
          auth_scopes: [],
          description: 'this is a test with `echo_req` description',
          title: 'this is a test title',
        },
        response_info: {
          description: 'this is a test with `echo_req` description',
          title: 'this is a test title',
        },
        setSelected: jest.fn(),
        handleSelectChange: jest.fn(),
        text_data: {
          request: '{\n  "active_symbols": "brief",\n  "product_type": "basic"\n}',
          selected_value: 'Active Symbols',
          name: 'active_symbols',
        },
      }));

      render(<ApiExplorerFeatures />);

      const playground_select = screen.getByText(/select api call/i);
      await userEvent.click(playground_select);

      const select_option = screen.getByText(/active symbols/i);
      expect(select_option).toBeVisible();

      await userEvent.click(select_option);

      await act(async () => {
        const send_request = await screen.findByRole('button', { name: /send request/i });
        expect(send_request).toBeVisible();
        await userEvent.click(send_request);
      });

      const playground_console = await screen.findByTestId('dt_playground_section');

      expect(playground_console).toBeVisible();

      const clear_request = screen.getByRole('button', { name: /clear/i });
      await userEvent.click(clear_request);

      // Once during the send request and once during the clear request
      expect(mockClear).toHaveBeenCalledTimes(2);
    });
  });

  describe('Disabled send request button', () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('should not be able to click send request button when unauthorized', async () => {
      mockUseAuthContext.mockImplementation(() => {
        return {
          is_logged_in: true,
          is_authorized: false,
        };
      });

      render(<ApiExplorerFeatures />);

      const playground_select = screen.getByText(/select api call/i);
      await userEvent.click(playground_select);

      const select_option = screen.getByText(/active symbols/i);
      expect(select_option).toBeVisible();

      await userEvent.click(select_option);

      const send_request = screen.getByRole('button', { name: /send request/i });
      expect(send_request).toBeVisible();
      await userEvent.click(send_request);

      expect(mockClear).toHaveBeenCalledTimes(0);
    });
  });

  it('should throw an error if incorrect json is being parsed', async () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    render(<RequestResponseRenderer name='ticks' auth={1} reqData={'asdawefaewf3232'} />);
    const button = await screen.findByRole('button', { name: /Send Request/i });
    await userEvent.click(button);

    expect(consoleOutput[0]).toEqual(
      'Could not parse the JSON data while trying to send the request: ',
    );
  });
});
