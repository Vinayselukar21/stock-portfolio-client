import { useEffect, useState } from "react";

type ScreenSize = {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export function useScreenSize(): ScreenSize {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    isMobile: width < 640,
    isTablet: width >= 640 && width <= 1024,
    isDesktop: width > 1024,
  };
}
