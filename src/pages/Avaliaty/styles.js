import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`

export const Content = styled.View`
  align-items: center;
  padding: 24px;
  max-width: 100%;
  justify-content: center;
`

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

export const RowSimple = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`

export const Col = styled.View`
  flex-direction: column;
`

export const IconStyled = styled(FontAwesome)`
  margin-right: 16px;
`

export const IconStyledFeather = styled(FeatherIcon)`
  margin-right: 16px;
`

export const ImageStyled = styled.Image``

export const TextTitle = styled.Text`
  color: grey;
  font-size: 17px;
`

export const TextOption = styled.Text`
  color: grey;
  font-size: 15px;
`

export const TextSmall = styled.Text`
  color: grey;
  font-size: 13px;
  width: 100%;
  text-align: right;
`

export const OptionButton = styled.TouchableOpacity`
  background: #61d53a;
  padding: 16px;
  max-width: 250px;
  border-radius: 10px;
  margin-top: 12px;
  align-self: center;
`

export const TextButton = styled.Text`
  color: white;
  font-size: 17px;
  width: 100%;
  text-align: center;
`

export const Card = styled.View`
  align-self: center;
  width: 95%;
  margin-top: 12px;
  padding: 20px;
  border-width: 2px;
  border-color: #e8e8e8;
  border-radius: 10px;
`

export const TextOptionTwo = styled.Text`
  color: black;
  font-size: 17px;
  width: 100%;
`

export const TextTime = styled.Text`
  color: black;
  font-size: 17px;
`
