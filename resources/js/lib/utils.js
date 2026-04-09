import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conditional logic.
 *
 * Combines `clsx` for conditional class composition with `twMerge` for resolving conflicting Tailwind utilities so the
 * last specified class wins.
 *
 * @param {...(string | string[] | Record<string, boolean> | undefined | null | false)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
