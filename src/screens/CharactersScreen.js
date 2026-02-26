import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { getCharacters } from "../services/charactersApi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function CharactersScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser; // 🔥 Usuario actual
  
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const data = await getCharacters();
    if (data) {
      setCharacters(data.results);
    }
    setLoading(false);
  };

  // 🔥 Confirmación antes de cerrar sesión
  const confirmLogout = () => {
    Alert.alert(
      "Salir de SimpsonsApp",
      "¿Deseas cerrar sesión?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: async () => {
            await signOut(auth);
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD90F" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔥 Usuario Logueado */}
      <View style={styles.userContainer}>
        <Text style={styles.userText}>
          👤 Usuario: {user?.email}
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterDetail", { character: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.occupation}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F4F6F6",
  },
  userContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  userText: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
