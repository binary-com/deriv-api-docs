import { ThemeProvider } from "@deriv/ui";
import React from "react";
import { RootContext } from "../components/contexts/root-context/RootContext";

export default function Root({ children }) {
  return (
    <>
      <RootContext>
        <ThemeProvider>{children}</ThemeProvider>
      </RootContext>
    </>
  );
}
