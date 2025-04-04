import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [celsius, setCelsius] = useState(null);
  const [convertedTemp, setConvertedTemp] = useState(null);
  const [scale, setScale] = useState('fahrenheit');
  const [message, setMessage] = useState("Digite a temperatura em Celsius");
  const [textButton, setTextButton] = useState("Converter");

  function converterTemperatura() {
    if (celsius != null) {
      Keyboard.dismiss();
      
      let temp;
      let unit;
      
      if (scale === 'fahrenheit') {
        temp = (celsius * 9/5 + 32).toFixed(1);
        unit = '°F';
      } else {
        temp = (parseFloat(celsius) + 273.15).toFixed(1);
        unit = 'K';
      }
      
      setConvertedTemp({ value: temp, unit });
      setMessage("Temperatura convertida:");
      setTextButton("Novo cálculo");
    } else {
      setConvertedTemp(null);
      setMessage("Digite a temperatura em Celsius");
      setTextButton("Converter");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cold2Fire</Text>
        <Text style={styles.subtitle}>Conversor de Temperatura</Text>
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

        <View style={styles.scaleSelector}>
          <TouchableOpacity
            style={[styles.scaleButton, scale === 'fahrenheit' && styles.scaleButtonActive]}
            onPress={() => setScale('fahrenheit')}
          >
            <Text style={[styles.scaleButtonText, scale === 'fahrenheit' && styles.scaleButtonTextActive]}>Fahrenheit (°F)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.scaleButton, scale === 'kelvin' && styles.scaleButtonActive]}
            onPress={() => setScale('kelvin')}
          >
            <Text style={[styles.scaleButtonText, scale === 'kelvin' && styles.scaleButtonTextActive]}>Kelvin (K)</Text>
          </TouchableOpacity>
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
          {convertedTemp && (
            <View style={styles.resultDisplay}>
              <Text style={styles.resultValue}>{convertedTemp.value}</Text>
              <Text style={styles.resultUnit}>{convertedTemp.unit}</Text>
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
    color: '#FB5012',
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
  scaleSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scaleButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#1A2E35',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E4A53',
  },
  scaleButtonActive: {
    backgroundColor: '#FF7D45',
    borderColor: '#FF7D45',
  },
  scaleButtonText: {
    color: '#6DD3D6',
    fontSize: 14,
  },
  scaleButtonTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
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
    color: '#FB5012',
    fontSize: 48,
    fontWeight: '700',
  },
  resultUnit: {
    color: '#FB5012',
    fontSize: 32,
    fontWeight: '600',
    marginLeft: 5,
  },
});