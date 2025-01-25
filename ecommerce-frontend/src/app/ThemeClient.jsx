"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

export default function ThemeClient({
  children,
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
