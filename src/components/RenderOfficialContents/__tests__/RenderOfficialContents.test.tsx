import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import useOfficialContentsContext from '@site/src/hooks/useOfficialContentsContext';
import RenderOfficialContents from '..';

jest.mock('@site/src/hooks/useOfficialContentsContext');

const mockUseOfficialContentsContext = useOfficialContentsContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useOfficialContentsContext>>
>;

describe('RenderOfficialContents', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render the content when on the correct host', () => {
    mockUseOfficialContentsContext.mockImplementation(() => ({
      is_official_domain: true,
    }));

    render(
      <RenderOfficialContents>
        <div>test</div>
      </RenderOfficialContents>,
    );

    const content = screen.getByText('test');
    expect(content).toBeVisible();
  });

  it('should render alternative when false host', () => {
    mockUseOfficialContentsContext.mockImplementation(() => ({
      is_official_domain: false,
    }));

    render(
      <RenderOfficialContents>
        <div>test</div>
        <div>alternative</div>
      </RenderOfficialContents>,
    );

    const content = screen.getByText('alternative');
    expect(content).toBeVisible();
  });

  it('should render nothing, when the host is wrong and there is no alternative component', () => {
    mockUseOfficialContentsContext.mockImplementation(() => ({
      is_official_domain: false,
    }));

    const { container } = render(
      <RenderOfficialContents>
        <div>test</div>
      </RenderOfficialContents>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render alternative when using feature flag', () => {
    // window = Object.create(window);
    // const url = "http://dummy.com";
    // Object.defineProperty(window, 'location', {
    //   value: {
    //     href: url,
    //     hash: '#toggleBranding'
    //   },
    //   writable: true // possibility to override
    // });

    mockUseOfficialContentsContext.mockImplementation(() => ({
      is_official_domain: false,
    }));

    const hash = '#toggleBranding';
    Object.defineProperty(window.location, 'hash', {
      writable: true,
      value: hash,
    });

    render(
      <RenderOfficialContents>
        <div>test</div>
        <div>alternative</div>
      </RenderOfficialContents>,
    );

    expect(window.location.hash).toEqual('#toggleBranding');

    const content = screen.getByText('alternative');
    expect(content).toBeVisible();
  });
});
