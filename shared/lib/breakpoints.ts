export const BREAKPOINTS = {
  mobile: '(max-width: 600px)',
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
