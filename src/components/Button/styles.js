import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 100%;
  min-width: 150px;
  height: 60px;
  background: #1975cf;
  border-radius: 10px;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  color: white;
  font-size: 18px;
`
