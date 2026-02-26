import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function CharacterDetailScreen({ route }) {
  const { character } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text>Edad: {character.age || "Unknown"}</Text>
      <Text>Género: {character.gender}</Text>
      <Text>Ocupación: {character.occupation}</Text>
      <Text>Estado: {character.status}</Text>

      <Text style={styles.subtitle}>Frases framosas:</Text>
      {character.phrases.map((phrase, index) => (
        <Text key={index} style={styles.phrase}>
          • {phrase}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 370,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 15,
    fontWeight: "bold",
  },
  phrase: {
    marginVertical: 3,
  },
});