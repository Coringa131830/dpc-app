import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: white;
  border-width: 2px;
  border-color: #00d4b1;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #1975cf;
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #6ee7d3;
  font-size: 18px;
  font-family: 'Roboto-Regular';
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
