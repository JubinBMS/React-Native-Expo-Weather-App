import { Text, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { API_KEY } from "@/utils/WeatherAPIKey";
import { weatherConditions } from "@/utils/WeatherConditions";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      await fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchWeather = async (lat = 25, lon = 25) => {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    );
    const json: any = await res.json();

    setTemperature(json.main.temp);
    setWeatherCondition(json.weather[0].main);
    setIsLoading(false);
  };

  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
    //     <Text style={styles.header}>Wheather in your Area</Text>
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weatherCondition]?.color },
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[weatherCondition]?.icon}
          color={"#fff"}
        />
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>
          {weatherConditions[weatherCondition]?.title}
        </Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weatherCondition]?.subtitle}
        </Text>
      </View>
    </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  weatherContainer: {
    flex: 2,
    backgroundColor: "#f7b733",
  },
  headerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tempText: {
    fontSize: 48,
    color: "#fff",
  },
  bodyContainer: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default Page;
