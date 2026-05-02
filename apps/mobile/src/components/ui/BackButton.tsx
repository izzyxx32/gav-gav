import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { colors } from '../../constants';

export type BackButtonProps = PressableProps;

export function BackButton({ style, ...props }: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      style={(state) => [
        styles.button,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}>
      <View pointerEvents="none" style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 40,
  },
  chevron: {
    borderColor: colors.accentText,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderRightWidth: 0,
    borderTopWidth: 0,
    height: 14,
    transform: [{ rotate: '45deg' }],
    width: 14,
  },
});
