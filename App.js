import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { useFonts } from 'expo-font'

import AppData from './src/AppData'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'RobotoSlab-Medium': require('./assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <AppData />
}
