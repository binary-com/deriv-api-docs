import React from 'react';
import { Text } from '@deriv/ui';
import {
  ClientLibrary,
  IconJS,
  LibraryLogo,
  LogoAndLink,
  LibraryGoTo,
  LibraryChevron,
} from './ClientLibraries.styles';

export const ClientLibaries = () => {
  return (
    <div className='main-page-row'>
      <ClientLibrary data-testid='client-header'>
        <div>
          <IconJS>
            <img src='/img/js-library.svg' />
          </IconJS>
          <Text
            type='heading-2'
            bold
            align='center'
            role='heading'
            aria-level={1}
            css={{
              'margin-bottom': '40px',
            }}
          >
            Comprehensive all-in-one client library
          </Text>
          <Text
            type='subtitle-1'
            align='center'
            css={{
              'font-weight': 400,
              '@mobile': { 'text-align': 'center' },
            }}
            role='heading'
            aria-level={4}
          >
            Use our powerful, flexible, and free API to build a custom trading <br />
            platform - for yourself or for your business.
          </Text>
          <LibraryLogo>
            <LogoAndLink>
              <LibraryGoTo href='https://binary-com.github.io/deriv-api/' target='_blank'>
                <img src='/img/js.svg'></img>
                <label>Go to the JavaScript library</label>
                <LibraryChevron src='/img/library-chevron.svg' />
              </LibraryGoTo>
            </LogoAndLink>
            <LogoAndLink>
              <LibraryGoTo href='https://binary-com.github.io/python-deriv-api/' target='_blank'>
                <img src='/img/py.svg'></img>
                <label>Go to the Python library</label>
                <LibraryChevron src='/img/library-chevron.svg' />
              </LibraryGoTo>
            </LogoAndLink>
            <LogoAndLink>
              <LibraryGoTo href='https://github.com/deriv-com/flutter-deriv-api' target='_blank'>
                <img src='/img/flutter.svg'></img>
                <label>Go to the Flutter library</label>
                <LibraryChevron src='/img/library-chevron.svg' />
              </LibraryGoTo>
            </LogoAndLink>
          </LibraryLogo>
        </div>
      </ClientLibrary>
    </div>
  );
};
