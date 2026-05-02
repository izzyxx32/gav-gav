import { Text, type TextProps, type TextStyle } from 'react-native';

import { colors, typography, type TypographyToken } from '../../constants';

export type AppTextProps = TextProps & {
  align?: TextStyle['textAlign'];
  color?: string;
  variant?: TypographyToken;
};

export function AppText({
  align,
  children,
  color = colors.textPrimary,
  style,
  variant = 'body',
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        typography[variant],
        {
          color,
          textAlign: align,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
}
