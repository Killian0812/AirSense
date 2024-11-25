import React from "react";
import { ThemeProvider } from "react-native-rapi-ui";
import AppNavigator from "./AppNavigator";

export default function Index() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
