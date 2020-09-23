import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 100 : 40}px;
`

export const ImageStyled = styled.Image`
  width: 180px;
  margin-top: 40px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #00d4b1;
  margin: 32px 0 24px;
`

export const ForgotPassword = styled.TouchableOpacity`
  padding: 16px 0 ${16 + getBottomSpace()}px;
`

export const ForgotPasswordText = styled.Text`
  color: #00d4b1;
  font-size: 16px;
`
