import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radius, shadows, spacing } from '../../constants';

export type AppCardProps = PropsWithChildren<
  ViewProps & {
    elevated?: boolean;
  }
>;

export function AppCard({ children, elevated, style, ...props }: AppCardProps) {
  return (
    <View style={[styles.base, elevated ? shadows.sm : shadows.none, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
  },
});
