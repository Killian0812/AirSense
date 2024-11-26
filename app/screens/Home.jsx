import React from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';

const data = [
  {
    name: 'Cầu giấy',
    latitude: 21.02744,
    longitude: 105.79026,
    aqi: 40,
  },
  {
    name: 'Hai Bà Trưng',
    latitude: 21.00626,
    longitude: 105.85537,
    aqi: 120,
  }
];

// RGBA color based on AQI level
const getAQIColor = (aqi) => {
  if (aqi <= 50) {
    return 'rgba(0, 255, 0, 0.5)'; // Good (Green)
  } else if (aqi <= 100) {
    return 'rgba(255, 255, 0, 0.5)'; // Moderate (Yellow)
  } else if (aqi <= 150) {
    return 'rgba(255, 126, 0, 0.5)'; // Unhealthy for Sensitive Groups (Orange)
  } else if (aqi <= 200) {
    return 'rgba(255, 0, 0, 0.5)'; // Unhealthy (Red)
  } else if (aqi <= 300) {
    return 'rgba(143, 63, 151, 0.5)'; // Very Unhealthy (Purple)
  } else {
    return 'rgba(126, 0, 35, 0.5)'; // Hazardous (Maroon)
  }
};

export default function ({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
      }}
    >
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 21.028511,
          longitude: 105.804817,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
      >
        {data.map((location, index) => (
          <Circle
            key={index}
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={3000}
            strokeWidth={2}
            strokeColor={getAQIColor(location.aqi)}
            fillColor={getAQIColor(location.aqi)}
          />
        ))}
      </MapView>
    </View>
  );
}