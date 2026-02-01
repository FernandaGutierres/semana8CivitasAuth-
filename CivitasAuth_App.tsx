import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  ScrollView, ActivityIndicator, StyleSheet, Alert, SafeAreaView 
} from 'react-native';
import { z } from 'zod';

// ==========================================
// LITERAL C: ESQUEMA DE VALIDACIÓN (ZOD)
// ==========================================
const civitasSchema = z.object({
  fullName: z.string().min(3, "El nombre debe ser completo"),
  email: z.string().email("Formato de correo ciudadano inválido"),
  password: z.string()
    .min(8, "La clave debe tener al menos 8 caracteres")
    .regex(/[0-9]/, "Debe incluir al menos un número"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export default function CivitasAuthApp() {
  const [currentStep, setCurrentStep] = useState(1); // Onboarding (Literal A)
  const [isValidatingEmail, setIsValidatingEmail] = useState(false); // Debounce (Literal C)
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // ==========================================
  // LITERAL C: VALIDACIÓN ASÍNCRONA (DEBOUNCE)
  // ==========================================
  useEffect(() => {
    if (form.email.includes('@')) {
      setIsValidatingEmail(true);
      const delay = setTimeout(() => {
        setIsValidatingEmail(false); // Simula verificación en base de datos Civitas
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [form.email]);

  const handleRegister = () => {
    const result = civitasSchema.safeParse(form);
    if (!result.success) {
      // LITERAL D: Mover foco / Error accionable
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      Alert.alert("Revisión Necesaria", "Hay campos que no cumplen los requisitos de seguridad.");
    } else {
      Alert.alert("Éxito", "Bienvenido a CivitasAuth. Tu identidad ha sido registrada.");
    }
  };

  // ==========================================
  // LITERAL A: FLUJO DE ONBOARDING (PANTALLAS)
  // ==========================================
  if (currentStep < 3) {
    return (
      <View style={styles.onboardingContainer}>
        <Text style={styles.appLogo}>🏛️ CivitasAuth</Text>
        <Text style={styles.title}>
          {currentStep === 1 ? "Tu Identidad Digital" : "Seguridad Ciudadana"}
        </Text>
        <Text style={styles.desc}>
          {currentStep === 1 
            ? "Accede a trámites y servicios de forma segura y rápida." 
            : "Validaciones biométricas y protección de datos avanzada."}
        </Text>
        <TouchableOpacity style={styles.mainBtn} onPress={() => setCurrentStep(currentStep + 1)}>
          <Text style={styles.btnText}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentStep(3)}>
          <Text style={styles.skipLink}>Saltar Introducción</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ==========================================
  // LITERAL B y D: REGISTRO Y FEEDBACK ACCESIBLE
  // ==========================================
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.formTitle}>Registro de Ciudadano</Text>
        
        {/* Campo Nombre */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Nombres Completos</Text>
          <TextInput 
            style={[styles.input, errors.fullName && styles.inputError]} 
            placeholder="Ej. María Fernanda Reyes"
            onChangeText={(val) => setForm({...form, fullName: val})}
          />
          {errors.fullName && <Text style={styles.errorText}>⚠️ {errors.fullName._errors[0]}</Text>}
        </View>

        {/* Campo Email con Spinner (Literal C) */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <View style={styles.row}>
            <TextInput 
              style={[styles.input, {flex: 1}, errors.email && styles.inputError]} 
              keyboardType="email-address" // Configuración Teclado (Literal B)
              autoCapitalize="none"
              placeholder="nombre@ciudadano.com"
              onChangeText={(val) => setForm({...form, email: val})}
            />
            {isValidatingEmail && <ActivityIndicator size="small" color="#27ae60" style={{marginLeft: 5}} />}
          </View>
          {errors.email && <Text style={styles.errorText}>⚠️ {errors.email._errors[0]}</Text>}
        </View>

        {/* Campo Password */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Contraseña de Seguridad</Text>
          <TextInput 
            style={[styles.input, errors.password && styles.inputError]} 
            secureTextEntry 
            placeholder="••••••••"
            onChangeText={(val) => setForm({...form, password: val})}
          />
          {errors.password && <Text style={styles.errorText}>⚠️ {errors.password._errors[0]}</Text>}
        </View>

        {/* Confirmación con Validación Cruzada */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput 
            style={[styles.input, errors.confirmPassword && styles.inputError]} 
            secureTextEntry 
            placeholder="••••••••"
            onChangeText={(val) => setForm({...form, confirmPassword: val})}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>⚠️ {errors.confirmPassword._errors[0]}</Text>
          )}
        </View>

        <TouchableOpacity style={[styles.mainBtn, {backgroundColor: '#27ae60'}]} onPress={handleRegister}>
          <Text style={styles.btnText}>Crear Mi Identidad</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  onboardingContainer: { flex: 1, padding: 40, justifyContent: 'center', backgroundColor: '#fff' },
  appLogo: { fontSize: 50, textAlign: 'center', marginBottom: 20 },
  formContainer: { padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' },
  formTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#2c3e50' },
  desc: { textAlign: 'center', marginVertical: 20, fontSize: 16, color: '#95a5a6' },
  inputBox: { marginBottom: 20 },
  label: { fontWeight: '700', color: '#34495e', marginBottom: 8 },
  input: { borderBottomWidth: 2, borderColor: '#ecf0f1', paddingVertical: 8, fontSize: 16 },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 13, marginTop: 5, fontWeight: '600' }, // Literal D
  mainBtn: { backgroundColor: '#2980b9', padding: 18, borderRadius: 12, marginTop: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  skipLink: { textAlign: 'center', marginTop: 20, color: '#95a5a6' },
  row: { flexDirection: 'row', alignItems: 'center' }
});
