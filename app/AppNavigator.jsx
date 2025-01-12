import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "./components/utils/TabBarIcon";
import TabBarText from "./components/utils/TabBarText";

import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";
import News from "./screens/News";
import Lookup from "./screens/Lookup";
import Charts from "./screens/Charts";
import Settings from "./screens/Settings";

const MainStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="AQI Map" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"map"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Charts"
        component={Charts}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Charts" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"stats-chart-sharp"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Lookup"
        component={Lookup}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Lookup" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"analytics"} />
          ),
        }}
      />
      <Tabs.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="News" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"newspaper"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Settings" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"settings"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
    </MainStack.Navigator>
  );
};

export default AppNavigator;
