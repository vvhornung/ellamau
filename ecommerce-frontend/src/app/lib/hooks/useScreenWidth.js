import { useState, useEffect } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768;
  const isDesktop = screenWidth >= 1024;

  return { screenWidth, isMobile, isTablet, isDesktop };
};

export default useScreenWidth;
