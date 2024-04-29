import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { GetStarted } from '../GetStarted';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { act, renderHook } from '@testing-library/react-hooks';

describe('GetStarted', () => {
  beforeEach(() => {
    render(<GetStarted />);
  });

  afterEach(cleanup);

  it('should render properly', () => {
    const get_started = screen.getByTestId('started-header');
    expect(get_started).toBeInTheDocument();
  });

  it('should navigate to the correct links on click', () => {
    const { result } = renderHook(() => useDocusaurusContext());

    let local: string;
    act(() => {
      local = result.current.i18n.currentLocale;
    });
    const lang = local === 'en' ? '' : `/${local}`;

    expect(screen.getByTestId('signUp').closest('a')).toHaveAttribute(
      'href',
      'https://deriv.com/signup/',
    );
    expect(screen.getByTestId('register').closest('a')).toHaveAttribute(
      'href',
      `${lang}/dashboard`,
    );
    expect(screen.getByTestId('guide').closest('a')).toHaveAttribute(
      'href',
      `${lang}/docs/category/guides`,
    );
  });
});
