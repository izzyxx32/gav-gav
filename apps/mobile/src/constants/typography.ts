export const typography = {
  brand: {
    fontSize: 132,
    lineHeight: 108,
    fontWeight: '700',
  },
  onboardingCaption: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '400',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyStrong: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
} as const;

export type TypographyToken = keyof typeof typography;
