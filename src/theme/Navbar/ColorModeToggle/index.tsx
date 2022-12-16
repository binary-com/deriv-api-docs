import React, { useEffect } from 'react';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import type { Props } from '@theme/Navbar/ColorModeToggle';
import { useTheme } from '@deriv/ui';
import type { EColorMode } from '@deriv/ui/dist/types/src/components/core/theme-context/theme-context';

export default function NavbarColorModeToggle({ className }: Props): JSX.Element | null {
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();
  const { setColorMode: setDerivUiColorMode } = useTheme();

  useEffect(() => {
    setDerivUiColorMode(colorMode as EColorMode);
  }, [colorMode, setDerivUiColorMode]);

  if (disabled) {
    return null;
  }

  return <ColorModeToggle className={className} value={colorMode} onChange={setColorMode} />;
}
