import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { colors, spacing } from '../constants/theme';
import { useWeather } from '../context/WeatherContext';

export function WeatherStats() {
  const { getWeatherStats } = useWeather();
  const stats = getWeatherStats();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Weather Statistics</ThemedText>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <ThemedText style={styles.label}>Avg Temperature</ThemedText>
          <ThemedText style={styles.value}>
            {`${stats.avgTemperature.toFixed(1)}°C`}
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText style={styles.label}>Avg Humidity</ThemedText>
          <ThemedText style={styles.value}>
            {`${stats.avgHumidity.toFixed(1)}%`}
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText style={styles.label}>Avg Pressure</ThemedText>
          <ThemedText style={styles.value}>
            {`${stats.avgPressure.toFixed(1)} hPa`}
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText style={styles.label}>Avg Wind Speed</ThemedText>
          <ThemedText style={styles.value}>
            {`${stats.avgWindSpeed.toFixed(1)} km/h`}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.large,
    backgroundColor: colors.card,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  statsContainer: {
    gap: spacing.medium,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium,
    backgroundColor: colors.cardAlt,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});