import { Pressable, StyleSheet, type PressableProps, type TextStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../../constants';
import { AppText } from './AppText';

export type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

export type AppButtonProps = PressableProps & {
  fullWidth?: boolean;
  label: string;
  labelColor?: string;
  labelStyle?: TextStyle;
  variant?: AppButtonVariant;
};

export function AppButton({
  disabled,
  fullWidth,
  label,
  labelColor,
  labelStyle,
  style,
  variant = 'primary',
  ...props
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        state.pressed && !disabled && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}>
      <AppText
        variant="button"
        color={labelColor ?? (variant === 'primary' ? colors.primaryText : colors.textPrimary)}
        style={[styles.label, labelStyle]}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radius.md,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typography.button,
  },
});
