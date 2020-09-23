import React from 'react'

import {
  Header,
  HeaderLogo,
  HeaderNotification,
  Icon,
  HeaderDrawer
} from './styles'

import logoImg from '../../assets/logo_header.png'
const Dashboard = () => {
  return (
    <Header style={{ borderRadius: 2, elevation: 1, borderWidth: 1 }}>
      <HeaderDrawer />
      <HeaderLogo source={logoImg} />
      <HeaderNotification>
        <Icon name="bell" size={28} color="#1975CF" />
      </HeaderNotification>
    </Header>
  )
}

export default Dashboard
