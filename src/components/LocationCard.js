import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function LocationCard({ location, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: location.image }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.use}>Uso: {location.use || "Unknown"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  use: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});
