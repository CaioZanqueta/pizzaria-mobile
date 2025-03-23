import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const [number, setNumber] = useState('')

  async function openOrder() {
    if (number === '') {
      return;
    }

    const response = await api.post('/order', {
      table: Number(number)
    })

    navigation.navigate('Order', { number: number, order_id: response.data.id })

    setNumber('')
  }

  function handleInputChange(value: string) {
    // Remove caracteres não numéricos
    const sanitizedValue = value.replace(/[^0-9]/g, '')
  
    // Limita o valor entre 1 e 99
    if (sanitizedValue === '') {
      setNumber('')
    } else if (Number(sanitizedValue) >= 1 && Number(sanitizedValue) <= 99) {
      setNumber(sanitizedValue)
    }
  }

  function handleOpenOrdersList() {
    navigation.navigate('OrdersList')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput
        placeholder="Número da mesa"
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={(value) => handleInputChange(value)}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#FF3F4B' }]} 
        onPress={handleOpenOrdersList}
      >
        <Text style={styles.buttonText}>Ver Pedidos Ativos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#FFF'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  }
})