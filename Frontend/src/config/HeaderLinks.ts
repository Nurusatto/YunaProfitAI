import type { LucideIcon } from "lucide-react";

import { Brain, ChartColumnIncreasing, Euro } from "lucide-react";

interface props {
  name: string;
  path: string;
  icon: LucideIcon;
}

export const HeaderLinks: props[] = [
  { name: "Home", path: "/", icon: ChartColumnIncreasing },
  { name: "AI", path: "/AI", icon: Brain },
  { name: "Finance", path: "/finance", icon: Euro },
] as const;

export type BookFilterType = (typeof HeaderLinks)[number]["name"];
