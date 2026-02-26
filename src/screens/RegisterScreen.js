import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null); // null = no mostrar, true = coinciden, false = no coinciden
  const [emailValid, setEmailValid] = useState(true); // Validación de correo

  // Validar coincidencia de contraseñas
  useEffect(() => {
    if (confirmPassword.length === 0) {
      setPasswordsMatch(null);
    } else {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  // Validar formato de correo
  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(text));
  };

  const handleRegister = async () => {
    if (!emailValid) {
      Alert.alert("Error", "Correo no válido ❌");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden ❌");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Éxito", "Cuenta creada correctamente ✅");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Logo */}
      <Image
        source={require('../../assets/simpsonsapi-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Registrarse</Text>

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
        placeholder="Contraseña (mínimo 6 caracteres)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Reingrese Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      {/* Mensaje dinámico de coincidencia de contraseñas */}
      {passwordsMatch !== null && (
        <Text style={{ 
          color: passwordsMatch ? "green" : "red", 
          marginBottom: 10,
          textAlign: "center"
        }}>
          {passwordsMatch ? "Las contraseñas coinciden ✅" : "Las contraseñas no coinciden ❌"}
        </Text>
      )}

      <TouchableOpacity 
        style={[
          styles.button, 
          (!passwordsMatch || !emailValid) && { backgroundColor: "#ccc" } // gris si error
        ]} 
        onPress={handleRegister}
        disabled={!passwordsMatch || !emailValid} // deshabilitar si no coinciden o correo inválido
      >
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btnback} 
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btntextback}>Volver al Acceso</Text>
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
  btnback: { backgroundColor: "#6c757d", padding: 12, borderRadius: 8, alignItems: "center" },
  btntextback: { color: "white", fontSize: 14, fontWeight: "bold" },
  buttonText: { fontWeight: "bold" },
});
