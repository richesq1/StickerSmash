import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData, WeatherStats } from '../types/weather';
import { generateUniqueId } from '../utils/idUtils';

interface WeatherContextType {
  weatherData: WeatherData[];
  addWeatherData: (data: Omit<WeatherData, 'id' | 'timestamp'>) => void;
  getWeatherStats: () => WeatherStats;
  clearAllData: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const initialData = [
    {
      id: 'initial-1',
      timestamp: Date.now() - 86400000, // 24 hours ago
      temperature: 22.5,
      humidity: 65,
      pressure: 1013.2,
      windSpeed: 12.4,
    },
    {
      id: 'initial-2',
      timestamp: Date.now() - 43200000, // 12 hours ago
      temperature: 25.8,
      humidity: 58,
      pressure: 1012.8,
      windSpeed: 8.7,
    },
    {
      id: 'initial-3',
      timestamp: Date.now() - 21600000, // 6 hours ago
      temperature: 20.3,
      humidity: 72,
      pressure: 1014.5,
      windSpeed: 15.2,
    },
    {
      id: 'initial-4',
      timestamp: Date.now() - 7200000, // 2 hours ago
      temperature: 23.7,
      humidity: 63,
      pressure: 1013.9,
      windSpeed: 10.8,
    },
  ];

  const [weatherData, setWeatherData] = useState<WeatherData[]>(initialData);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('weatherData');
        if (storedData) {
          setWeatherData(JSON.parse(storedData));
        } else {
          // If no stored data, save initial data
          await AsyncStorage.setItem('weatherData', JSON.stringify(initialData));
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load weather data:', error);
      }
    };

    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      if (!isInitialized) return;
      
      try {
        await AsyncStorage.setItem('weatherData', JSON.stringify(weatherData));
      } catch (error) {
        console.error('Failed to save weather data:', error);
      }
    };

    saveData();
  }, [weatherData, isInitialized]);

  const addWeatherData = (data: Omit<WeatherData, 'id' | 'timestamp'>) => {
    const newData: WeatherData = {
      ...data,
      id: generateUniqueId(),
      timestamp: Date.now(),
    };
    setWeatherData(prev => [...prev, newData]);
  };

  const getWeatherStats = (): WeatherStats => {
    if (weatherData.length === 0) {
      return {
        avgTemperature: 0,
        avgHumidity: 0,
        avgPressure: 0,
        avgWindSpeed: 0,
      };
    }

    const sum = weatherData.reduce(
      (acc, curr) => ({
        temperature: acc.temperature + curr.temperature,
        humidity: acc.humidity + curr.humidity,
        pressure: acc.pressure + curr.pressure,
        windSpeed: acc.windSpeed + curr.windSpeed,
      }),
      { temperature: 0, humidity: 0, pressure: 0, windSpeed: 0 }
    );

    return {
      avgTemperature: sum.temperature / weatherData.length,
      avgHumidity: sum.humidity / weatherData.length,
      avgPressure: sum.pressure / weatherData.length,
      avgWindSpeed: sum.windSpeed / weatherData.length,
    };
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.removeItem('weatherData');
      setWeatherData([]);
    } catch (error) {
      console.error('Failed to clear weather data:', error);
    }
  };

  return (
    <WeatherContext.Provider 
      value={{ 
        weatherData, 
        addWeatherData, 
        getWeatherStats,
        clearAllData 
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};