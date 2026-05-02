import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SafeScreen, VStack } from '../src/components/layout';
import { AppButton, AppText, BackButton } from '../src/components/ui';
import { colors, radius, spacing, typography } from '../src/constants';

const CODE_LENGTH = 4;
const FAKE_CODE = '4700';
const RESEND_SECONDS = 30;

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
}

export default function VerifyEmailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ email?: string }>();
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const email = params.email || 'tapes1mple@yandex.ru';
  const resendDisabled = secondsLeft > 0;
  const hasCodeError = code.length === CODE_LENGTH && code !== FAKE_CODE;
  const fixedBlockBottom = keyboardHeight > 0 ? Math.max(8, keyboardHeight - insets.bottom + 8) : 216;

  const codeCells = useMemo(
    () =>
      Array.from({ length: CODE_LENGTH }, (_, index) => ({
        id: String(index),
        value: code[index] ?? '',
      })),
    [code]
  );

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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

  function handleCodeChange(value: string) {
    const nextCode = value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setCode(nextCode);

    if (nextCode === FAKE_CODE) {
      Keyboard.dismiss();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'my-pets' }],
        })
      );
    }
  }

  function handleResend() {
    if (resendDisabled) {
      return;
    }

    setCode('');
    setSecondsLeft(RESEND_SECONDS);
    inputRef.current?.focus();
  }

  return (
    <SafeScreen style={styles.screen} contentStyle={styles.safeContent}>
      <View style={styles.content}>
        <View style={styles.header}>
          <BackButton
            accessibilityLabel="Назад"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>

        <View style={styles.body}>
          <VStack gap={spacing.sm} style={styles.titleBlock}>
            <AppText color={colors.textPrimaryStrong} style={styles.title} variant="screenTitle">
              Подтвердите email
            </AppText>
            <Text style={styles.subtitle}>
              Мы отправили письмо с кодом на{' '}
              <Text style={styles.emailText}>{email}</Text>. Проверьте ваши входящие сообщения или
              папку спам.
            </Text>
          </VStack>
        </View>
      </View>

      <TextInput
        ref={inputRef}
        autoFocus
        caretHidden
        keyboardType="number-pad"
        maxLength={CODE_LENGTH}
        onChangeText={handleCodeChange}
        style={styles.hiddenInput}
        textContentType="oneTimeCode"
        value={code}
      />

      <View style={[styles.fixedInputBlock, { bottom: fixedBlockBottom }]}>
        <Pressable
          accessibilityHint={`Тестовый код: ${FAKE_CODE}`}
          accessibilityLabel="Код подтверждения"
          onPress={() => inputRef.current?.focus()}
          style={styles.codeArea}>
          <View style={styles.codeWrap}>
            {codeCells.map((cell) => (
              <View key={cell.id} style={styles.codeCell}>
                <AppText
                  color={hasCodeError ? colors.danger : colors.verificationText}
                  style={styles.codeText}>
                  {cell.value || '•'}
                </AppText>
              </View>
            ))}
          </View>
          {hasCodeError && (
            <AppText align="center" color={colors.danger} style={styles.errorText}>
              Неверный код
            </AppText>
          )}
        </Pressable>

        <AppButton
          disabled={resendDisabled}
          fullWidth
          label={
            resendDisabled
              ? `Получить новый код через ${formatCountdown(secondsLeft)}`
              : 'Получить новый код'
          }
          labelColor={colors.verificationText}
          labelStyle={styles.resendLabel}
          onPress={handleResend}
          style={[styles.resendButton, resendDisabled && styles.resendButtonDisabled]}
          variant="ghost"
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
  body: {
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
    ...typography.bodyMedium,
    color: colors.textSecondarySoft,
    letterSpacing: -0.14,
  },
  emailText: {
    color: colors.emailHighlight,
  },
  codeWrap: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  codeArea: {
    alignItems: 'center',
    marginBottom: 48,
    minHeight: 72,
  },
  codeCell: {
    alignItems: 'center',
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  codeText: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.16,
    lineHeight: 34,
  },
  errorText: {
    ...typography.bodyMedium,
    marginTop: 4,
  },
  hiddenInput: {
    height: 1,
    opacity: 0,
    position: 'absolute',
    width: 1,
  },
  fixedInputBlock: {
    left: 0,
    paddingHorizontal: spacing.lg,
    position: 'absolute',
    right: 0,
  },
  resendButton: {
    backgroundColor: colors.transparent,
    borderRadius: radius.lg,
    minHeight: 56,
  },
  resendButtonDisabled: {
    opacity: 0.25,
  },
  resendLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.04,
    lineHeight: 20,
  },
});
