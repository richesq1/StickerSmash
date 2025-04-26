export interface WeatherData {
    id: string;
    timestamp: number;
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
  }
  
  export interface WeatherStats {
    avgTemperature: number;
    avgHumidity: number;
    avgPressure: number;
    avgWindSpeed: number;
  }