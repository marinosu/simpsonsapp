import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Errores de login
  const [emailValid, setEmailValid] = useState(true); // Validación de correo

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    if (!emailValid) {
      setErrorMessage("Correo no válido ❌");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage(""); // Login exitoso
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setErrorMessage("Correo o contraseña incorrectos ❌");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Correo no válido ❌");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  // Validar correo en tiempo real
  const handleEmailChange = (text) => {
    setEmail(text);
    setErrorMessage(""); // Limpiar errores mientras escribe

    // Regex simple para validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(text));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errorMessage) setErrorMessage("");
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Logo */}
      <Image
        source={require('../../assets/simpsonsapi-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Bienvenido</Text>

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={handleEmailChange}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Mensaje de correo inválido en tiempo real */}
      {!emailValid && email.length > 0 && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          Formato de correo no válido ❌
        </Text>
      )}

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        style={styles.input}
      />

      {/* Mensaje de error dinámico */}
      {errorMessage.length > 0 && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          {errorMessage}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btncuenta} 
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.btntextcuenta}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  logo: { width: 200, height: 200, alignSelf: 'center' },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginBottom: 10 },
  subtitle: { fontSize: 20, textAlign: "center", color: "#666", marginBottom: 40 },
  button: { backgroundColor: "#FFD90F", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  btncuenta: { backgroundColor: "#6c757d", padding: 12, borderRadius: 8, alignItems: "center" },
  btntextcuenta: { color: "white", fontSize: 14, fontWeight: "bold" },
  buttonText: { fontWeight: "bold" },
});
