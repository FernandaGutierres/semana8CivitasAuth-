import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏛️ CivitasAuth</Text>
      <Text style={styles.title}>Seguridad Ciudadana Digital</Text>
      <Text style={styles.body}>Protege tu identidad y accede a servicios globales.</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Siguiente" onPress={() => navigation.navigate('Register')} />
        <Button title="Saltar" color="#7f8c8d" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  logo: { fontSize: 32, textAlign: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  body: { textAlign: 'center', marginVertical: 20 },
  buttonContainer: { gap: 10 }
});
