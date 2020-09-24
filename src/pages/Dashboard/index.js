import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Calendar } from 'react-native-calendars'
import AsyncStorage from '@react-native-community/async-storage'

import { useAuth } from '../../hooks/Auth'
import api from '../../services/api'

import {
  Content,
  Row,
  Col,
  ImageStyled,
  TextOption,
  TextTitle,
  TextSmall,
  OptionButton,
  TextButton,
  Card,
  TextOptionTwo,
  IconStyled,
  TextTime,
  RowSimple,
  CardTwo
} from './styles'

import img from '../../assets/logo.png'

const Dashboard = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const { signOut, userType, token } = useAuth()
  const [scales, setScales] = useState([])
  const [latitude, setLatitude] = useState('');
  const [longitude, setLogitude] = useState('');
  const handleLogout = async () => {
    signOut()
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( position => {
    
        setLatitude(String(position.coords.latitude))
        setLogitude(String(position.coords.longitude))
    });
  },[]);
  const handleCheck = useCallback(
    async (scal, type) => {
      setLoading(true)
      try {
        const geolocation =  `{"lat":"${latitude}", "log":"${longitude}"}`;
         
        if (userType === 'paciente') {
          if (scal.checkin.paciente) {
            await api.post(
              `/${type}/checkout`,
              {
                escala: scal._id,
                geolocation
                
              },
              {
                headers: {
                  auth: `${token}`
                }
              }
            )
          } else {
            await api.post(
              `/${type}/checkin`,
              {
                escala: scal._id,
                geolocation
              },
              {
                headers: {
                  auth: `${token}`
                }
              }
            )
          }
        } else {
          if (scal.checkin && scal.checkin.profissional) {
            await api.post(
              `/${type}/checkout`,
              {
                escala: scal._id,
                geolocation
              },
              {
                headers: {
                  auth: `${token}`
                }
              }
            )
          } else {
            await api.post(
              `/${type}/checkin`,
              {
                escala: scal._id,
                geolocation
              },
              {
                headers: {
                  auth: `${token}`
                }
              }
            )
          }
        }
        getData()
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    },
    [userType, getData, token]
  )

  async function getData() {
    setLoading(true)
    try {
      if (userType === 'paciente') {
        const resp = await api.get('/paciente/escalas/hoje', {
          headers: {
            auth: `${token}`
          }
        })
        setScales(resp.data)
      }
      if (userType === 'profissional') {
        const resp = await api.get('/profissional/escalas/hoje', {
          headers: {
            auth: `${token}`
          }
        })
        setScales(resp.data)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const getCheck = (scal) => {
    if (
      scal.checkin &&
      scal.checkin.profissional &&
      scal.checkout &&
      !scal.checkout.profissional
    ) {
      return 'Check-Out'
    } else if (scal.checkin && !scal.checkin.profissional) {
      return 'Check-In'
    } else if (
      scal.checkin &&
      scal.checkin.profissional &&
      scal.checkout &&
      scal.checkout.profissional
    ) {
      return 'Escala concluída'
    }
  }

  const getCheckPatient = (scal) => {
    if (
      scal.checkin &&
      scal.checkin.paciente &&
      scal.checkout &&
      !scal.checkout.paciente
    ) {
      return 'Check-Out'
    } else if (scal.checkin && !scal.checkin.paciente) {

      return 'Check-In'
    } else if (
      scal.checkin &&
      scal.checkin.paciente &&
      scal.checkout &&
      scal.checkout.paciente
    ) {
      return 'Escala concluída'
    }
  }

  useEffect(() => {
    getData()
  }, [token])

  if (userType === 'paciente') {
    return loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6EE7D3" />
      </View>
    ) : (
      <View>
        {/* <Header /> */}
        <ScrollView keyboardShouldPersistTaps="handled">
          <Content
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Calendar current={new Date()} monthFormat={'MM/yyyy'} />
            {scales && scales.length ? (
              scales.map((scal) => (
                <CardTwo key={scal._id}>
                  <Row style={{ marginTop: 30, marginBottom: 20 }}>
                    <Col>
                      <ImageStyled
                        source={img}
                        style={{
                          width: 80,
                          borderRadius: 40,
                          height: 80,
                          resizeMode: 'contain'
                        }}
                      />
                    </Col>
                    <Col style={{ marginLeft: 24}}>
                      <TextTitle>
                        {scal.profissionalResponsavel.nomeCompleto}
                      </TextTitle>
                      <TextOption >
                        {scal.profissionalResponsavel.cargo}
                      </TextOption>
                      <TextSmall>{scal.horarioDeAtendimento}</TextSmall>
                    </Col>
                  </Row>
                  <OptionButton
                    onPress={() => handleCheck(scal, 'paciente')}
                    disabled={scal.checkout && scal.checkout.paciente}
                  >
                    <TextButton>{getCheckPatient(scal)}</TextButton>
                  </OptionButton>
                  <OptionButton
                    onPress={() => {
                      navigation.navigate('Avaliaty', {
                        user: scal
                      })
                    }}
                  >
                    <TextButton>Avaliar Profissonal</TextButton>
                  </OptionButton>
                  <Card>
                    <TextOptionTwo>Procedimentos do dia</TextOptionTwo>
                    {scal.procedimentos.length &&
                      scal.procedimentos.map((proc) => (
                        <RowSimple style={{ marginTop: 12 }} key={proc._id}>
                          <IconStyled
                            name="calendar"
                            size={24}
                            color="#61d53a"
                          />
                          <TextTime style={{ marginLeft: 16 }}>
                            {proc.horario} - {proc.descricao}
                          </TextTime>
                        </RowSimple>
                      ))}
                  </Card>
                </CardTwo>
              ))
            ) : (
              <View></View>
            )}
            <OptionButton onPress={handleLogout}>
              <TextButton>Sair</TextButton>
            </OptionButton>
          </Content>
        </ScrollView>
      </View>
    )
  } else {
    return loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6EE7D3" />
      </View>
    ) : (
      <View>
        {/* <Header /> */}
        <ScrollView keyboardShouldPersistTaps="handled">
          <Content
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Calendar current={new Date()} monthFormat={'MM/yyyy'} />
            {scales && scales.length ? (
              scales.map((scal) => (
                <CardTwo key={scal._id}>
                  <Row style={{ marginTop: 30, marginBottom: 20 }}>
                    <Col>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('AvaliatyPatienty', {
                            user: scal
                          })
                        }}
                      >
                        <ImageStyled
                          source={img}
                          style={{
                            width: 80,
                            borderRadius: 40,
                            height: 80,
                            resizeMode: 'contain'
                          }}
                        />
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ marginLeft: 24 }}>
                      <TextTitle>
                        {scal.paciente ? scal.paciente.nomeCompleto : ''}
                      </TextTitle>
                      <TextOption>
                        {scal.paciente ? scal.paciente.endereco : ''}
                      </TextOption>
                      <TextSmall>
                        {scal.paciente ? scal.horarioDeAtendimento : ''}
                      </TextSmall>
                    </Col>
                  </Row>
                  <OptionButton
                    onPress={() => handleCheck(scal, 'profissional')}
                    disabled={scal.checkout && scal.checkout.profissional}
                  >
                    <TextButton>{getCheck(scal)}</TextButton>
                  </OptionButton>
                  <Card>
                    <TextOptionTwo>Procedimentos do dia</TextOptionTwo>
                    {scal.procedimentos.length &&
                      scal.procedimentos.map((proc) => (
                        <RowSimple style={{ marginTop: 12 }} key={proc._id}>
                          <IconStyled
                            name="calendar"
                            size={24}
                            color="#61d53a"
                          />
                          <TextTime style={{ marginLeft: 16 }}>
                            {proc.horario} - {proc.descricao}
                          </TextTime>
                        </RowSimple>
                      ))}
                  </Card>
                </CardTwo>
              ))
            ) : (
              <View></View>
            )}
            <OptionButton onPress={handleLogout}>
              <TextButton>Sair</TextButton>
            </OptionButton>
          </Content>
        </ScrollView>
      </View>
    )
  }
}

export default Dashboard
