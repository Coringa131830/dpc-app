import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

const AuthContext = createContext({})

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoragedData() {
      const [token, user, userType] = await AsyncStorage.multiGet([
        '@delta:token',
        '@delta:user',
        '@delta:userType'
      ])

      if (token[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
          userType: userType[1]
        })
      }
      setLoading(false)
    }

    loadStoragedData()
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@delta:token',
      '@delta:user',
      '@delta:userType'
    ])
    setData({})
  }, [])

  const signIn = useCallback(async ({ email, senha }) => {
    setLoading(true)
    try {
      const response = await api.post('/auth/login', {
        email,
        senha
      })
      const { token, user, user_type } = response.data

      await AsyncStorage.multiSet([
        ['@delta:token', token],
        ['@delta:user', JSON.stringify(user)],
        ['@delta:userType', user_type]
      ])

      setData({ token, user, userType: user_type })
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
        loading,
        userType: data.userType
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
