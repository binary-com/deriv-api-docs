import React from 'react';
import '@testing-library/jest-dom';
import ApiExplorerFeatures from '..';
import userEvent from '@testing-library/user-event';
import useAuthContext from '@site/src/hooks/useAuthContext';
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

describe('ApiExplorerFeatures', () => {
  beforeEach(() => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        is_logged_in: true,
      };
    });
    render(<ApiExplorerFeatures />);
  });
  it('should render the title', () => {
    const title = screen.getByRole('heading', { name: /API Explorer/i });
    expect(title).toBeInTheDocument();
  });

  it('should render the dropdown', () => {
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  it('should render the textarea', () => {
    const textarea = screen.getByPlaceholderText('Request JSON');
    expect(textarea).toBeInTheDocument();
  });

  it('should render schemawrapper', () => {
    act(async () => {
      const playground_select = await screen.findByText(/select api call/i);
      await userEvent.click(playground_select);

      const select_option = await screen.findByText(/active symbols/i);
      await userEvent.click(select_option);

      const schemawrapper = screen.getByTestId('playgroundDocs');
      expect(schemawrapper).toBeInTheDocument();
    });
  });
});
