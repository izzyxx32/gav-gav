import { Pressable, StyleSheet, type PressableProps, type TextStyle } from 'react-native';

import { colors, radius, spacing } from '../../constants';
import { AppText } from './AppText';

export type AppIconButtonProps = PressableProps & {
  iconLabel: string;
  labelColor?: string;
  labelStyle?: TextStyle;
};

export function AppIconButton({
  disabled,
  iconLabel,
  labelColor,
  labelStyle,
  style,
  ...props
}: AppIconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={props.accessibilityLabel ?? iconLabel}
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        styles.base,
        disabled && styles.disabled,
        state.pressed && !disabled && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}>
      <AppText variant="bodyStrong" align="center" color={labelColor} style={labelStyle}>
        {iconLabel}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    height: 44,
    justifyContent: 'center',
    padding: spacing.sm,
    width: 44,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
});
