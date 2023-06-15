import React, { ReactNode } from 'react';
import OfficialContentsProvider from '@site/src/contexts/official-contents/official-contents.provider';
import { IOfficialContents } from '@site/src/contexts/official-contents/official-contents.context';
import { cleanup } from '@testing-library/react';
import { RenderHookResult, renderHook } from '@testing-library/react-hooks';
import useOfficialContentsContext from '..';

const wrapper = ({ children }) => <OfficialContentsProvider>{children}</OfficialContentsProvider>;

describe('useOfficialContentsContext', () => {
  let view: RenderHookResult<{ children: ReactNode }, IOfficialContents>;

  beforeEach(() => {
    window.localStorage.clear();
    view = renderHook(() => useOfficialContentsContext(), { wrapper });
  });

  afterEach(() => {
    cleanup();
  });

  it('should hide the content when feature flag is 1', () => {
    const branding_state = view.result.current.is_official_domain;
    expect(branding_state).toEqual(false);
  });
});
