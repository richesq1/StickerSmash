import React from "react";
import renderer, { act } from "react-test-renderer";
import { WeatherStats } from "../components/WeatherStats";
import { WeatherContext } from "../context/WeatherContext";

// Prepare a mock context value with known data
const mockWeatherContext = {
  weatherData: [
    { id: 'test-1', timestamp: Date.now(), temperature: 20, humidity: 60, pressure: 1010, windSpeed: 5 },
    { id: 'test-2', timestamp: Date.now(), temperature: 22, humidity: 65, pressure: 1015, windSpeed: 6 },
    { id: 'test-3', timestamp: Date.now(), temperature: 24, humidity: 70, pressure: 1020, windSpeed: 7 },
  ],
  addWeatherData: () => {},
  getWeatherStats: () => ({
    avgTemperature: (20 + 22 + 24) / 3, // expected average is 22.0
    avgHumidity: (60 + 65 + 70) / 3, // calculate average humidity
    avgPressure: (1010 + 1015 + 1020) / 3, // calculate average pressure
    avgWindSpeed: (5 + 6 + 7) / 3, // calculate average wind speed
  }),
  clearAllData: () => {},
};

describe("WeatherStats", () => {
  it("displays the correct average statistics", () => {
    let testRenderer;
    act(() => {
      testRenderer = renderer.create(
        <WeatherContext.Provider value={mockWeatherContext}>
          <WeatherStats />
        </WeatherContext.Provider>
      );
    });
    const testInstance = testRenderer.root;
    // Calculate expected average temperature: (20 + 22 + 24) / 3 = 22.0°C
    const expectedAverage = ((20 + 22 + 24) / 3).toFixed(1) + "°C";
  
    // Find all text nodes that include "°C"
    const tempNodes = testInstance.findAll((node) =>
      typeof node.props.children === "string" && node.props.children.includes("°C")
    );
  
    // Expect at least one of the nodes to contain the correct average temperature
    const containsExpectedAverage = tempNodes.some(node =>
      node.props.children.includes(expectedAverage)
    );
    expect(containsExpectedAverage).toBe(true);
  });
});