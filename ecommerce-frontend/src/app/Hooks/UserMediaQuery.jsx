import { useTheme } from "styled-components";
import { useState, useEffect } from "react";

export function useMediaQuery(breakpointKey) {
  const theme = useTheme();
  const query = theme.media[breakpointKey];
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
