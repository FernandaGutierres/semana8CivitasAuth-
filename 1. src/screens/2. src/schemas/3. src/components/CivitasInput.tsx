import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const CivitasInput = ({ label, error, ...props }: any) => {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={[styles.input, error && styles.inputError]} 
        {...props} 
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text> 
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  group: { marginBottom: 15 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: { borderBottomWidth: 1, padding: 8 },
  inputError: { borderColor: '#e74c3c' },
  errorContainer: { flexDirection: 'row', marginTop: 5 },
  errorIcon: { marginRight: 5 },
  errorText: { color: '#e74c3c', fontSize: 12 }
});
