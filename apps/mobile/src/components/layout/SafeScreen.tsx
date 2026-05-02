import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../constants';

export type SafeScreenProps = PropsWithChildren<
  ViewProps & {
    contentStyle?: ViewStyle;
  }
>;

export function SafeScreen({ children, style, contentStyle, ...props }: SafeScreenProps) {
  return (
    <SafeAreaView style={[styles.root, style]} {...props}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
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
