import React, { useCallback, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/Auth'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  ImageStyled
} from './styles'

import getValidationErros from '../../utils/getValidationErros'

import logoImg from '../../assets/logo.png'

const SignIn = () => {
  const navigation = useNavigation()
  const formRef = useRef(null)
  const passwordInputRef = useRef(null)

  const { signIn, loading } = useAuth()

  const handleSignIn = useCallback(
    async (data) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Digite seu email')
            .email('Digite um email válido'),
          password: Yup.string().required('Digite sua senha')
        })
        await schema.validate(data, {
          abortEarly: false
        })

        await signIn({ email: data.email, senha: data.password })
        // navigation.navigate('Dashboard')
      } catch (err) {
        console.log(err)
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err)
          formRef.current?.setErrors(erros)
          return
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais'
        )
      }
    },
    [signIn]
  )

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <ImageStyled
              source={logoImg}
              style={{ height: 80, resizeMode: 'contain' }}
            />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus()
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus
                }}
              />
              <View>
                <Button
                  onPress={() => {
                    formRef.current.submitForm()
                  }}
                >
                  Entrar
                </Button>
              </View>
            </Form>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignIn
