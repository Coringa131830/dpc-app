import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

export const Header = styled.View`
  width: 100%;
  height: 90px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-color: #ddd;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
export const HeaderLogo = styled.Image``
export const HeaderDrawer = styled.View`
  flex-basis: 30%;
  width: 100%;
  align-items: flex-end;
`
export const HeaderNotification = styled.View`
  flex-basis: 30%;
  width: 100%;
  align-items: flex-end;
`
