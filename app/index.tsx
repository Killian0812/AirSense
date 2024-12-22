import React from "react";
import { ThemeProvider } from "react-native-rapi-ui";
import { NotificationProvider } from "./NotificationProvider";
import { useEffect } from "react";
import axios from 'axios';
import AppNavigator from "./AppNavigator";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: { data: any, error: any }) => {
  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    const { locations } = data;
    const location = locations[0];

    try {
      let response = await axios.post('https://airquality-bor1.onrender.com/api/v1/locations', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error('Error sending location:', err);
    }
  }
});

export default function Index() {
  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Request background location permissions
      const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus.status !== 'granted') {
        console.error('Permission to access background location was denied');
        return;
      }

      // Start the background location task
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 20, // Update every 20 meters
        deferredUpdatesInterval: 1000 * 15, // Update every 15 secs
      });
    })();
  }, []);

  return (
    <NotificationProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </NotificationProvider>
  );
}
