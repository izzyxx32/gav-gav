import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { SafeScreen, VStack } from '../src/components/layout';
import { AppButton, AppText } from '../src/components/ui';
import { colors, radius, spacing, typography } from '../src/constants';

export default function MyPetsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (event) => {
      event.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeScreen style={styles.screen} contentStyle={styles.safeContent}>
      <View style={styles.content}>
        <View style={styles.titleBlock}>
          <AppText color={colors.textPrimaryStrong} style={styles.title} variant="screenTitle">
            Мои питомцы
          </AppText>
        </View>

        <VStack align="center" gap={24} style={styles.emptyState}>
          <AppText align="center" color={colors.textTertiary} style={styles.emptyText}>
            Вы ещё не добавили{'\n'}ни одного питомца
          </AppText>
          <AppButton label="Добавить питомца" labelStyle={styles.addButtonLabel} style={styles.addButton} />
        </VStack>

        <View style={styles.bottomSpacer} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  safeContent: {
    backgroundColor: colors.background,
  },
  content: {
    height: 752,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 16,
    width: '100%',
  },
  titleBlock: {
    width: '100%',
  },
  title: {
    letterSpacing: -1.12,
  },
  emptyState: {
    alignSelf: 'center',
  },
  emptyText: {
    color: colors.textTertiary,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.04,
    lineHeight: 22,
  },
  addButton: {
    backgroundColor: colors.accentText,
    borderRadius: radius.pill,
    minHeight: 56,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  addButtonLabel: {
    ...typography.bodyMedium,
    color: colors.primaryText,
    letterSpacing: -0.14,
  },
  bottomSpacer: {
    height: 56,
    width: '100%',
  },
});
