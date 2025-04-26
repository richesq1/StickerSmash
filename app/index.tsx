import { ScrollView, StyleSheet } from 'react-native';
import { WeatherProvider } from '../context/WeatherContext';
import { WeatherStation } from '../components/WeatherStation';
import { WeatherStats } from '../components/WeatherStats';

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
    backgroundColor: '#ffffff', // Replace with your desired color or import colors
  },
  content: {
    padding: 16, // Replace 16 with your desired padding value
    gap: 16, // Replace 16 with your desired gap value
  },
});