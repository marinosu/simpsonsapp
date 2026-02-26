import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { location } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: location.image }}
        style={styles.image}
      />

      <Text style={styles.title}>{location.name}</Text>
      <Text style={styles.text}>Ciudad: {location.town || "Unknown"}</Text>
      <Text style={styles.text}>Uso: {location.use || "Unknown"}</Text>
      <Text style={styles.text}>ID: {location.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
