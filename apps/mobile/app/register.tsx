import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SafeScreen, VStack } from '../src/components/layout';
import { AppButton, AppText, AppTextInput, BackButton } from '../src/components/ui';
import { colors, radius, spacing, typography } from '../src/constants';

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const normalizedEmail = email.trim();
  const isEmailValid = normalizedEmail === 'ad' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  const hasEmail = email.length > 0;
  const isTyping = isFocused || hasEmail;
  const buttonBottom = keyboardHeight > 0 ? Math.max(8, keyboardHeight - insets.bottom + 8) : 32;

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSubscription = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeScreen style={styles.screen} contentStyle={styles.safeContent}>
      <TouchableWithoutFeedback
        accessible={false}
        onPress={() => {
          Keyboard.dismiss();
          inputRef.current?.blur();
        }}>
        <View style={styles.content}>
          <View style={styles.header}>
            <BackButton
              accessibilityLabel="Назад"
              onPress={() => router.back()}
              style={styles.backButton}
            />
          </View>

          <VStack gap={27} style={styles.form}>
            <VStack gap={spacing.sm} style={styles.titleBlock}>
              <AppText color={colors.textPrimaryStrong} style={styles.title} variant="screenTitle">
                Введите email
              </AppText>
              <AppText color={colors.textSecondarySoft} style={styles.subtitle} variant="bodyMedium">
                Чтобы создать аккаунт
              </AppText>
            </VStack>

            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                inputRef.current?.focus();
              }}
              style={[styles.inputShell, isTyping ? styles.inputShellTyping : styles.inputShellEmpty]}>
              {isTyping && (
                <AppText color={colors.textSecondarySoft} style={styles.inputLabel} variant="label">
                  Ваш email
                </AppText>
              )}
              <AppTextInput
                ref={inputRef}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onBlur={() => setIsFocused(false)}
                onChangeText={setEmail}
                onFocus={() => setIsFocused(true)}
                placeholder={isTyping ? undefined : 'Ваш email'}
                placeholderTextColor={colors.textSecondarySoft}
                style={[styles.input, !isTyping && styles.inputEmpty, isTyping && styles.inputTyping]}
                textContentType="emailAddress"
                value={email}
              />
            </Pressable>
          </VStack>
        </View>
      </TouchableWithoutFeedback>

      <View style={[styles.buttonWrap, { bottom: buttonBottom }]}>
        <AppButton
          disabled={!isEmailValid}
          fullWidth
          label="Продолжить"
          labelStyle={styles.buttonLabel}
          onPress={() =>
            router.push({
              pathname: '/verify-email',
              params: { email: normalizedEmail },
            })
          }
          style={[styles.continueButton, !isEmailValid && styles.continueButtonDisabled]}
        />
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
    position: 'relative',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    backgroundColor: colors.transparent,
  },
  form: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  titleBlock: {
    width: '100%',
  },
  title: {
    letterSpacing: -1.12,
  },
  subtitle: {
    letterSpacing: -0.14,
  },
  inputShell: {
    backgroundColor: colors.inputSurface,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    width: '100%',
  },
  inputShellEmpty: {
    borderRadius: 20,
    height: 70,
    paddingVertical: 0,
  },
  inputShellTyping: {
    borderRadius: 20,
    height: 72,
    paddingVertical: 16,
  },
  inputLabel: {
    letterSpacing: -0.24,
    lineHeight: 16,
    marginBottom: 0,
  },
  input: {
    backgroundColor: colors.transparent,
    borderRadius: 0,
    borderWidth: 0,
    color: colors.textPrimarySoft,
    minHeight: 28,
    paddingHorizontal: 0,
    paddingVertical: 0,
    ...typography.bodyMedium,
    fontSize: 14,
    letterSpacing: -0.07,
  },
  inputTyping: {
    ...typography.body,
    color: colors.textPrimarySoft,
    height: 22,
    letterSpacing: -0.32,
    lineHeight: 22,
    marginTop: 2,
    minHeight: 0,
  },
  inputEmpty: {
    ...typography.body,
    color: colors.textSecondarySoft,
    height: 70,
    letterSpacing: -0.32,
    lineHeight: 22,
    minHeight: 70,
  },
  buttonWrap: {
    left: 0,
    paddingHorizontal: spacing.lg,
    position: 'absolute',
    right: 0,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    minHeight: 72,
  },
  continueButtonDisabled: {
    opacity: 0.3,
  },
  buttonLabel: {
    letterSpacing: -0.64,
    lineHeight: 18,
  },
});
