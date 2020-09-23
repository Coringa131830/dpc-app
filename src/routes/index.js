import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import AuthRoutes from './AuthRoutes'
import AppRoutes from './AppRoutes'

import { useAuth } from '../hooks/Auth'

const Routes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size="large" color="#6EE7D3" />
      </View>
    )
  }

  return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
