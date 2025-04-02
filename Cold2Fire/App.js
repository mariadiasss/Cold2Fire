import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [celsius, setCelsius] = useState(null);
  const [fahrenheit, setFahrenheit] = useState(null);
  const [message, setMessage] = useState("Digite a temperatura em Celsius");
  const [textButton, setTextButton] = useState("Converter");

  function converterTemperatura() {
    if (celsius != null) {
      Keyboard.dismiss();
      setFahrenheit((celsius * 9/5 + 32).toFixed(1));
      setMessage("Temperatura convertida:");
      setTextButton("Novo cálculo");
    } else {
      setFahrenheit(null);
      setMessage("Digite a temperatura em Celsius");
      setTextButton("Converter");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cold2Fire</Text>
        <Text style={styles.subtitle}>Conversor C° → F°</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Temperatura em Celsius</Text>
          <TextInput
            style={styles.input}
            value={celsius ?? ''}
            onChangeText={setCelsius}
            placeholder='Ex: 25'
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity 
          style={styles.convertButton}
          onPress={converterTemperatura}
        >
          <Ionicons name="flash" size={24} color="#fff" />
          <Text style={styles.buttonText}>{textButton}</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.message}>{message}</Text>
          {fahrenheit && (
            <View style={styles.resultDisplay}>
              <Text style={styles.resultValue}>{fahrenheit}</Text>
              <Text style={styles.resultUnit}>°F</Text>
            </View>
          )}
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1A20',
  },
  header: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A2E35',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
  },
  title: {
    color: '#FF7D45',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  subtitle: {
    color: '#6DD3D6',
    fontSize: 18,
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: '#6DD3D6',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1A2E35',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFF',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#2E4A53',
  },
  convertButton: {
    backgroundColor: '#FF7D45',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  message: {
    color: '#6DD3D6',
    fontSize: 18,
  },
  resultDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 15,
  },
  resultValue: {
    color: '#FF7D45',
    fontSize: 48,
    fontWeight: '700',
  },
  resultUnit: {
    color: '#FF7D45',
    fontSize: 32,
    fontWeight: '600',
    marginLeft: 5,
  },
});