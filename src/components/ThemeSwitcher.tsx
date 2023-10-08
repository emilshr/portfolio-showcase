"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      onClick={(event) => {
        event.stopPropagation();
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
    >
      Switch theme
    </Button>
  );
};
