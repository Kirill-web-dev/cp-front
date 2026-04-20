"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher({ classname }: { classname?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Switch className={classname} id="theme" checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />;
}
