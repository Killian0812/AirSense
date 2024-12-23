import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import { getAQIColor, AQI_LEVELS } from "../components/utils/AqiLevelColor";
import axios from 'axios';

const data = [
  {
    name: 'Cầu giấy',
    latitude: 21.02744,
    longitude: 105.79026,
    aqi: 120,
  },
  {
    name: 'Hai Bà Trưng',
    latitude: 21.00626,
    longitude: 105.85537,
    aqi: 160,
  }
];

export default function ({ navigation }) {
  const [currentConditions, setCurrentConditions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ha%20Noi/today?unitGroup=metric&include=current&key=VRUSEQCFM64T7NM8V8CFT4ADS&contentType=json');
        console.log(response.data.currentConditions);
        setCurrentConditions(response.data.currentConditions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

      {currentConditions && (
        <View style={styles.conditionsContainer}>
          <Text style={styles.conditionsText}>
            <Icon name="thermometer" size={15} /> Temperature: {currentConditions.temp}°C
          </Text>
          <Text style={styles.conditionsText}>
            <Icon name="water-percent" size={15} /> Humidity: {currentConditions.humidity}%
          </Text>
          <Text style={styles.conditionsText}>
            <Icon name="weather-windy" size={15} /> Wind Speed: {currentConditions.windspeed} km/h
          </Text>
          <Text style={styles.conditionsText}>
            <Icon name="weather-cloudy" size={15} /> Conditions: {currentConditions.conditions}
          </Text>
        </View>
      )}
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
  conditionsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  conditionsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});