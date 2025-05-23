import { ScrollView, StyleSheet } from 'react-native';
import { WeatherProvider } from '../../context/WeatherContext';
import { WeatherStation } from '../../components/WeatherStation';
import { WeatherStats } from '../../components/WeatherStats';
import { colors, spacing } from '../../constants/theme';

export default function HomeScreen() {
  return (
    <WeatherProvider>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <WeatherStation />
        <WeatherStats />
      </ScrollView>
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.large,
    gap: spacing.large,
  },
});
