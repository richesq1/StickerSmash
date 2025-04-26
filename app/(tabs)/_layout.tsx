import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';
import { Home, CloudSun, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weather',
          tabBarIcon: ({ color, size }) => (
            <CloudSun size={size} color={color} />
          ),
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    height: Platform.select({ ios: 88, android: 60, web: 60 }),
    paddingBottom: Platform.select({ ios: 28, android: 8, web: 8 }),
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});
