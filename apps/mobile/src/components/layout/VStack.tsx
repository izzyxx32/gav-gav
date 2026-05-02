import type { PropsWithChildren } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

type StackAlign = ViewStyle['alignItems'];
type StackJustify = ViewStyle['justifyContent'];

export type VStackProps = PropsWithChildren<
  ViewProps & {
    align?: StackAlign;
    gap?: number;
    justify?: StackJustify;
  }
>;

export function VStack({ align, children, gap = 0, justify, style, ...props }: VStackProps) {
  return (
    <View
      style={[
        {
          alignItems: align,
          flexDirection: 'column',
          gap,
          justifyContent: justify,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}
