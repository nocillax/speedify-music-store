import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind classes
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
