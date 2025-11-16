import type { LucideIcon } from "lucide-react";

import { Brain, House } from "lucide-react";

interface props {
  name: string;
  path: string;
  icon: LucideIcon;
}

export const HeaderLinks: props[] = [
  { name: "Home", path: "/", icon: House },
  { name: "AI", path: "/AI", icon: Brain },
] as const;

export type BookFilterType = (typeof HeaderLinks)[number]["name"];
