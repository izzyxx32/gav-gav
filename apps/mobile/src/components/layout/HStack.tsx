import type { PropsWithChildren } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

type StackAlign = ViewStyle['alignItems'];
type StackJustify = ViewStyle['justifyContent'];

export type HStackProps = PropsWithChildren<
  ViewProps & {
    align?: StackAlign;
    gap?: number;
    justify?: StackJustify;
    wrap?: boolean;
  }
>;

export function HStack({ align, children, gap = 0, justify, style, wrap, ...props }: HStackProps) {
  return (
    <View
      style={[
        {
          alignItems: align,
          flexDirection: 'row',
          flexWrap: wrap ? 'wrap' : 'nowrap',
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
