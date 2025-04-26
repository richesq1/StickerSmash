import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { colors, spacing, typography } from '../constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <ThemedText style={styles.title}>This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText style={styles.linkText}>Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: 'bold', // Replace with a valid fontWeight value
    color: colors.text.primary,
    marginBottom: spacing.large,
  },
  link: {
    marginTop: spacing.medium,
    paddingVertical: spacing.medium,
  },
  linkText: {
      ...typography.bodyBold,
      fontWeight: 'bold', // Ensure fontWeight is a valid value
      color: colors.primary,
    }
});
