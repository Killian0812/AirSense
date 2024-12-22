import React from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="About us"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : "#191921"}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          marginTop: 50,
          height: 300,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >

        <Text style={{ fontWeight: 'bold' }}>GROUP 15 - AirSense</Text>
        <Text>Nguyễn Mạnh Cường - 20210144</Text>
        <Text>Tạ Quang Kiên - 20210502</Text>
        <Text>Nguyễn Đức Khoa - 20215599</Text>
        <Text>Trần Đắc Lương - 20215611</Text>
        <Text>Nguyễn Đức Khoa - 20210487</Text>
      </View>
    </Layout>
  );
}
