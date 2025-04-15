// import { API_KEY } from "@env";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

// Define a type for the weather data - Array of objects
interface IWeatherData {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  dt_txt: string;
}
[];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const icons: Record<string, string> = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function Index() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState<IWeatherData | []>([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 2 });
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    setCity(location[0]?.city || "Can't find you");
    // * get json structure
    // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    // console.log(url);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
    const json = await response.json();
    setDays(json.list);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city.toUpperCase()}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {Array.isArray(days) && days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          (days as IWeatherData[]).map((day: IWeatherData, index: number) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>{Math.round(day.main.temp)}° </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={100}
                  color="black"
                />
              </View>
              <Text style={styles.weather}>{day.weather[0].main}</Text>
              <Text style={styles.description}>
                {day.weather[0].description.charAt(0).toUpperCase() +
                  day.weather[0].description.slice(1)}
              </Text>
              <Text style={styles.dt}>{day.dt_txt}</Text>
            </View>
          ))
        )}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c55ffc" },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    marginTop: 40,
    fontSize: 38,
    fontWeight: "900",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 49,
  },
  temp: {
    fontSize: 100,
    fontWeight: "600",
    marginBottom: -10,
    paddingRight: 10,
  },
  weather: { fontSize: 50, fontWeight: "600" },
  description: { fontSize: 20, fontWeight: "500" },
  dt: { fontSize: 20, fontWeight: "200", marginTop: 5 },
});
