"use client"; // Ensures this is a Client Component

import ThemeClient from "./ThemeClient";

export default function ThemeProviderWrapper({ children }) {
  return <ThemeClient>{children}</ThemeClient>;
}
