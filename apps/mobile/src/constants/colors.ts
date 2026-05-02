export const colors = {
  background: '#FFFFFF',
  surface: '#F7F8FA',
  surfaceRaised: '#FFFFFF',
  border: '#E4E7EC',
  textPrimary: '#101828',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  primary: '#2563EB',
  primaryPressed: '#1D4ED8',
  primaryText: '#FFFFFF',
  danger: '#D92D20',
  success: '#039855',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
