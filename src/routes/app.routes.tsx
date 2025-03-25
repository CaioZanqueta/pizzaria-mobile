import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";
import OrdersList from "../pages/OrdersList";
import OrderUpdate from "../pages/OrderUpdate";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: number | string;
    order_id: string
  };
  OrderUpdate: {
    number: number | string;
    order_id: string
  };
  FinishOrder: {
    number: number | string;
    order_id: string
  };
  OrdersList: undefined;
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderUpdate"
        component={OrderUpdate}
        options={{
          title: "Incluir item no pedido",
          headerStyle: {
            backgroundColor: '#1d1d2e'
          },
          headerTintColor: '#FFF'
        }}
      />
      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: "Finalizando",
          headerStyle: {
            backgroundColor: '#1d1d2e'
          },
          headerTintColor: '#FFF'
        }}
      />
      <Stack.Screen
        name="OrdersList"
        component={OrdersList}
        options={{
          title: 'Pedidos Ativos',
          headerStyle: {
            backgroundColor: '#1d1d2e'
          },
          headerTintColor: '#FFF'
        }}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;