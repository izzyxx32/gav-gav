import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';

import { colors } from '../../constants';

export type ScreenProps = PropsWithChildren<
  ViewProps & {
    contentStyle?: ViewStyle;
  }
>;

export function Screen({ children, style, contentStyle, ...props }: ScreenProps) {
  return (
    <View style={[styles.root, style]} {...props}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
