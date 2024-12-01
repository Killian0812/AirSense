import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';

const data = [
  {
    name: 'Cầu giấy',
    latitude: 21.02744,
    longitude: 105.79026,
    aqi: 80,
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
    return AQI_LEVELS[0].color; // Green
  } else if (aqi <= 100) {
    return AQI_LEVELS[1].color; // Yellow
  } else if (aqi <= 150) {
    return AQI_LEVELS[2].color; // Orange
  } else if (aqi <= 200) {
    return AQI_LEVELS[3].color; // Red
  } else if (aqi <= 300) {
    return AQI_LEVELS[4].color; // Purple
  } else {
    return AQI_LEVELS[5].color; // Maroon
  }
};

const AQI_LEVELS = [
  { label: 'Good', color: 'rgba(0, 255, 0, 0.5)', aqiRange: '0-50' },
  { label: 'Moderate', color: 'rgba(255, 255, 0, 0.5)', aqiRange: '51-100' },
  { label: 'Sensitive', color: 'rgba(255, 126, 0, 0.5)', aqiRange: '101-150' },
  { label: 'Unhealthy', color: 'rgba(255, 0, 0, 0.5)', aqiRange: '151-200' },
  { label: 'Very Unhealthy', color: 'rgba(143, 63, 151, 0.5)', aqiRange: '201-300' },
  { label: 'Hazardous', color: 'rgba(126, 0, 35, 0.5)', aqiRange: '301+' },
];

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
        showsMyLocationButton
        showsUserLocation
      >
        {data.map((location, index) => (
          <Circle
            key={index}
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={2000}
            strokeWidth={2}
            strokeColor={getAQIColor(location.aqi)}
            fillColor={getAQIColor(location.aqi)}
          />
        ))}
      </MapView>

      <View style={styles.legendContainer}>
        {AQI_LEVELS.map((level, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: level.color }]} />
            <Text style={styles.legendText}>{`${level.label}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  legendContainer: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
});