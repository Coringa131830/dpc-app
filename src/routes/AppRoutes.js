import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import logoImg from '../assets/logo_header.png'
import Dashboard from '../pages/Dashboard'
import Avaliaty from '../pages/Avaliaty'
import AvaliatyPatienty from '../pages/AvaliatyPatienty'

const App = createStackNavigator()

const AppRoutes = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        title: (
          <Image
            source={logoImg}
            style={{ height: 60, resizeMode: 'contain' }}
          />
        ),
        headerStyle: {
          height: 100
        },
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="Avaliaty" component={Avaliaty} />
      <App.Screen name="AvaliatyPatienty" component={AvaliatyPatienty} />
    </App.Navigator>
  )
}

export default AppRoutes
