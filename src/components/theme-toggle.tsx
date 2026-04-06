"use client";

import { cn } from "@/lib/utils";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useId, useState } from "react";

export default function ThemeToggle({
  showLabel,
  className,
}: {
  showLabel?: boolean;
  className?: string;
}) {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const [system, setSystem] = useState(false);

  const smartToggle = () => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (theme === "system") {
      setTheme(prefersDarkScheme ? "light" : "dark");
      setSystem(false);
    } else if (
      (theme === "light" && !prefersDarkScheme) ||
      (theme === "dark" && prefersDarkScheme)
    ) {
      setTheme(theme === "light" ? "dark" : "light");
      setSystem(false);
    } else {
      setTheme("system");
      setSystem(true);
    }
  };

  const themeLabel = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };

  return (
    <div
      className={cn("flex flex-col justify-center", className)}
      suppressHydrationWarning
    >
      <input
        type="checkbox"
        name="theme-toggle"
        id={id}
        className="peer sr-only"
        checked={system}
        onChange={smartToggle}
        aria-label="Toggle dark mode"
      />
      <label
        className="text-muted-foreground w-full gap-1 hover:text-foreground/80 rounded peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 relative inline-flex size-8 cursor-pointer items-center justify-center transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
        htmlFor={id}
        aria-hidden="true"
      >
        <IconSun className="dark:hidden" size={20} aria-hidden="true" />
        <IconMoon className="hidden dark:block" size={20} aria-hidden="true" />
        <span className="sr-only">Switch to system/light/dark version</span>
        {showLabel && (
          <span
            className="ml-2 text-sm font-medium truncate text-foreground"
            suppressHydrationWarning
          >
            {themeLabel[theme as keyof typeof themeLabel] || "System"}
          </span>
        )}
      </label>
    </div>
  );
}
