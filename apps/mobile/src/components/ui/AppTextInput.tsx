import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { colors, radius, spacing, typography } from '../../constants';

export type AppTextInputProps = TextInputProps & {
  hasError?: boolean;
};

export function AppTextInput({ hasError, placeholderTextColor, style, ...props }: AppTextInputProps) {
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor ?? colors.textMuted}
      style={[styles.input, hasError && styles.error, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.textPrimary,
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
  },
  error: {
    borderColor: colors.danger,
  },
});
