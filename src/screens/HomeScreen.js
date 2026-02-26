import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getLocations } from "../services/api";
import LocationCard from "../components/LocationCard";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const user = auth.currentUser; // 🔥 Usuario actual

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getLocations();
    if (data) {
      setLocations(data.results);
      setFiltered(data.results);
    }
    setLoading(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = locations.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

  // 🔥 Confirmación antes de salir
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

      <TextInput
        style={styles.input}
        placeholder="Búsqueda de Ubicación..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LocationCard
            location={item}
            onPress={() => navigation.navigate("Detail", { location: item })}
          />
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
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
