import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import CharactersScreen from "./src/screens/CharactersScreen";
import CharacterDetailScreen from "./src/screens/CharacterDetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import { useWindowDimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* 🔥 STACK DE PERSONAJES */
function CharactersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Characters"
        component={CharactersScreen}
        options={{ title: "Personajes Simpsons" }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: "Detalle del Personaje" }}
      />
    </Stack.Navigator>
  );
}

/* 🔥 STACK DE LUGARES */
function LocationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Locations"
        component={HomeScreen}
        options={{ title: "Ubicaciones Simpsons" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Detalle de la ubicación" }}
      />
    </Stack.Navigator>
  );
}

/* 🔥 TABS PRINCIPALES */
function MainTabs() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "CharactersTab") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "LocationsTab") {
            iconName = focused ? "location" : "location-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f2a900",
        tabBarInactiveTintColor: "#555555",

        // 👇 altura dinámica
        tabBarStyle: {
          height: isLandscape ? 60 : 100,
          paddingBottom: isLandscape ? 5 : 10,
          paddingTop: isLandscape ? 5 : 5,
        },
      })}
    >
      <Tab.Screen
        name="CharactersTab"
        component={CharactersStack}
        options={{ headerShown: false, title: "Personajes" }}
      />
      <Tab.Screen
        name="LocationsTab"
        component={LocationsStack}
        options={{ headerShown: false, title: "Ubicaciones" }}
      />
    </Tab.Navigator>
  );
}

/* 🔐 AUTH */
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Acceso" }}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Registro" }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
