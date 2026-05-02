import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen, VStack } from '../src/components/layout';
import { AppButton, AppCard, AppText } from '../src/components/ui';
import { colors, radius, spacing, typography } from '../src/constants';

const onboardingLogo = require('../src/assets/icons/onboarding-logo.svg');
const dogEarCut = require('../src/assets/images/dog-ear-cut.png');
const welcomeDog = require('../src/assets/images/welcome-dog.png');

export default function IndexScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.screen} contentStyle={styles.content}>
      <View style={styles.heroArea}>
        <View style={styles.dogOuter}>
          <View style={styles.dogClip}>
            <Image source={welcomeDog} contentFit="fill" style={styles.dogImage} />
          </View>
        </View>

        <Image source={onboardingLogo} contentFit="contain" style={styles.logoImage} />

        <Image source={dogEarCut} contentFit="fill" style={styles.dogEarCut} />

        <AppText color={colors.onboardingText} style={styles.captionText}>
          совместные{'\n'}прогулки{'\n'}для собак{'\n'}и людей
        </AppText>

        <View style={styles.dogShadow} />
      </View>

      <AppCard style={styles.actionPanel}>
        <VStack gap={spacing.sm}>
          <AppButton
            fullWidth
            label="Зарегистрироваться"
            onPress={() => router.push('/register')}
            style={styles.primaryButton}
            labelStyle={styles.buttonLabel}
          />
          <AppButton
            fullWidth
            label="У меня есть аккаунт"
            labelColor={colors.accentText}
            style={styles.secondaryButton}
            labelStyle={styles.buttonLabel}
            variant="secondary"
          />
        </VStack>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.onboardingBackground,
  },
  content: {
    backgroundColor: colors.onboardingBackground,
    overflow: 'hidden',
  },
  heroArea: {
    flex: 1,
    position: 'relative',
  },
  logoImage: {
    height: 249,
    left: 14,
    position: 'absolute',
    top: 77,
    width: 261,
    zIndex: 3,
  },
  dogOuter: {
    alignItems: 'center',
    height: 833.186,
    justifyContent: 'center',
    left: -77,
    position: 'absolute',
    top: 143.05,
    width: 522.885,
    zIndex: 2,
  },
  dogClip: {
    height: 795.919,
    overflow: 'hidden',
    position: 'relative',
    transform: [{ rotate: '-5.11deg' }],
    width: 453.771,
  },
  dogImage: {
    height: 1008.257,
    left: -86.137,
    position: 'absolute',
    top: 0,
    width: 712.06,
  },
  dogEarCut: {
    height: 179.929,
    left: 73.77,
    position: 'absolute',
    top: 163.31,
    width: 90.199,
    zIndex: 20,
  },
  captionText: {
    ...typography.onboardingCaption,
    bottom: 266,
    left: 14,
    letterSpacing: -1.2,
    opacity: 0.6,
    position: 'absolute',
    zIndex: 4,
  },
  dogShadow: {
    backgroundColor: colors.onboardingShadow,
    borderRadius: radius.pill,
    bottom: 118,
    height: 96,
    left: 9,
    opacity: 0.35,
    position: 'absolute',
    right: 9,
    transform: [{ scaleY: 0.45 }],
    zIndex: 1,
  },
  actionPanel: {
    backgroundColor: colors.background,
    borderWidth: 0,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: 20,
    paddingTop: 20,
    position: 'absolute',
    right: 0,
    zIndex: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    minHeight: 72,
  },
  secondaryButton: {
    backgroundColor: colors.onboardingButtonSecondary,
    borderColor: colors.transparent,
    borderRadius: radius.pill,
    minHeight: 72,
  },
  buttonLabel: {
    letterSpacing: -0.64,
    lineHeight: 18,
  },
});
