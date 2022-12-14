import React, { useEffect } from "react";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import ColorModeToggle from "@theme/ColorModeToggle";
import type { Props } from "@theme/Navbar/ColorModeToggle";
import { useTheme } from "@deriv/ui";
import { EColorMode } from "@deriv/ui/dist/types/src/components/core/theme-context/theme-context";

export default function NavbarColorModeToggle({
  className,
}: Props): JSX.Element | null {
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();
  const { setColorMode: setDerivUiColorMode } = useTheme();

  if (disabled) {
    return null;
  }

  useEffect(() => {
    setDerivUiColorMode(colorMode as EColorMode);
  }, [colorMode]);

  return (
    <ColorModeToggle
      className={className}
      value={colorMode}
      onChange={setColorMode}
    />
  );
}
