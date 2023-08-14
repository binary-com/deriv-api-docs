import React from 'react';
import Logo from '@theme/Logo';
import RenderOfficialContents from '@site/src/components/RenderOfficialContents';
export default function NavbarLogo() {
  return (
    <RenderOfficialContents>
      <Logo
        className='navbar__brand'
        imageClassName='navbar__logo'
        titleClassName='navbar__title text--truncate'
      />
    </RenderOfficialContents>
  );
}
