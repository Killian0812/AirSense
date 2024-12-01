import React from "react";
import { ThemeProvider } from "react-native-rapi-ui";
import { NotificationProvider } from "./NotificationProvider";
import { useEffect } from "react";
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
      await fetch('https://first-shepherd-legible.ngrok-free.app/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      });
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
        distanceInterval: 50, // Update every 50 meters
        deferredUpdatesInterval: 1000 * 30, // Update every 30 secs
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
