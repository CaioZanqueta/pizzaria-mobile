import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  FlatList
} from 'react-native';

import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
}

export default function OrdersList(){
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders(){
    const response = await api.get('/orders');
    setOrders(response.data);
  }

  async function handleOpenOrder(id: string, table: string | number){
    navigation.navigate('OrderUpdate', {
      number: table,
      order_id: id
    });
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pedidos Ativos</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => handleOpenOrder(item.id, item.table)}
          >
            <Text style={styles.orderText}>Mesa {item.table}</Text>
          </TouchableOpacity>
        )}
        style={styles.orderList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24,
    textAlign: 'center'
  },
  orderList: {
    flex: 1,
    width: '100%',
  },
  orderItem: {
    backgroundColor: '#101026',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderText: {
    fontSize: 18,
    color: '#FFF',
  }
}); 