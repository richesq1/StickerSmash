import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { colors, spacing } from '../constants/theme';
import { useWeather } from '../context/WeatherContext';

export function WeatherStation() {
  const { addWeatherData } = useWeather();
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [pressure, setPressure] = useState('');
  const [windSpeed, setWindSpeed] = useState('');

  const handleSubmit = () => {
    if (!temperature || !humidity || !pressure || !windSpeed) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    addWeatherData({
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      pressure: parseFloat(pressure),
      windSpeed: parseFloat(windSpeed),
    });

    // Clear inputs
    setTemperature('');
    setHumidity('');
    setPressure('');
    setWindSpeed('');

    Alert.alert('Success', 'Weather data recorded successfully');
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Weather Station</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Temperature (°C)"
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
          placeholderTextColor={colors.text.secondary}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Humidity (%)"
          value={humidity}
          onChangeText={setHumidity}
          keyboardType="numeric"
          placeholderTextColor={colors.text.secondary}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Pressure (hPa)"
          value={pressure}
          onChangeText={setPressure}
          keyboardType="numeric"
          placeholderTextColor={colors.text.secondary}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Wind Speed (km/h)"
          value={windSpeed}
          onChangeText={setWindSpeed}
          keyboardType="numeric"
          placeholderTextColor={colors.text.secondary}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <ThemedText style={styles.buttonText}>Record Data</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.large,
    paddingTop: spacing.xxlarge, // Add this line to increase top padding
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
  inputContainer: {
    gap: spacing.medium,
  },
  input: {
    backgroundColor: colors.cardAlt,
    padding: spacing.medium,
    borderRadius: 8,
    fontSize: 16,
    color: colors.text.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 8,
    marginTop: spacing.large,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});