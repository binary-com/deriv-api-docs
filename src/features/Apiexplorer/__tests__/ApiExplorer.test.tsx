import React from 'react';
import '@testing-library/jest-dom';
import ApiExplorerFeatures from '..';
import { render, screen } from '@testing-library/react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';

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
    const schemawrapper = screen.getByTestId('playgroundDocs');
    expect(schemawrapper).toBeInTheDocument();
  });
});
