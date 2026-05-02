import { StyleSheet } from 'react-native';

import { SafeScreen, VStack } from '../src/components/layout';
import { AppText } from '../src/components/ui';
import { colors, spacing } from '../src/constants';

export default function IndexScreen() {
  return (
    <SafeScreen style={styles.screen} contentStyle={styles.content}>
      <VStack gap={spacing.md} align="center">
        <AppText variant="title" align="center">
          Gav-Gav mobile is ready
        </AppText>
        <AppText variant="body" color={colors.textSecondary} align="center">
          Ready for screen-by-screen Figma implementation
        </AppText>
      </VStack>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
