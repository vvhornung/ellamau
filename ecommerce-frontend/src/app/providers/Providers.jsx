"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import QueryProvider from "./QueryProvider";
import StyledComponentsRegistry from "../lib/registry";
import { CartProvider } from "../contexts/CartContext";

export default function Providers({ children }) {
  return (
    <StyledComponentsRegistry>
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </QueryProvider>
    </StyledComponentsRegistry>
  );
}
