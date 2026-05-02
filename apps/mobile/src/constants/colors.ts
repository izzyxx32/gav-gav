export const colors = {
  background: '#FFFFFF',
  surface: '#F7F8FA',
  surfaceRaised: '#FFFFFF',
  border: '#E4E7EC',
  textPrimary: '#101828',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  primary: '#6155F5',
  primaryPressed: '#5246E7',
  primaryText: '#FFFFFF',
  accentText: '#5246E7',
  onboardingBackground: '#6155F5',
  onboardingText: '#F4F2F7',
  onboardingButtonSecondary: 'rgba(43, 36, 82, 0.04)',
  onboardingShadow: 'rgba(30, 30, 30, 0.9)',
  danger: '#D92D20',
  success: '#039855',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
