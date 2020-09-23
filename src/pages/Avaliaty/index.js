import React, { useCallback, useRef, useState } from 'react'
import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'

import Input from '../../components/Input'
import Button from '../../components/Button'
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
  IconStyledFeather,
  RowSimple
} from './styles'

import img from '../../assets/logo.png'

const Avaliaty = ({ route }) => {
  const { user } = route.params
  const navigation = useNavigation()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [posture, setPosture] = useState(0)
  const [ethic, setEthic] = useState(0)
  const [relashionship, setRelashionship] = useState(0)
  const [higieny, setHigieny] = useState(0)
  const [organization, setOrganization] = useState(0)
  const { token } = useAuth()

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        try {
          await api.post(
            '/paciente/avaliarprofissional',
            {
              profissional: user.profissionalResponsavel._id,
              postura: posture,
              eticaProfissional: ethic,
              relacionamentoFamiliar: relashionship,
              higiene: higieny,
              organização: organization,
              notaGeral: data.note,
              comentarios: data.comment
            },
            {
              headers: {
                auth: `${token}`
              }
            }
          )
          setLoading(false)
        } catch (err) {
          console.log(err)
          setLoading(false)
        }
        setLoading(false)
        Alert.alert('Avaliação enviada.', 'Obrigado!')
        navigation.navigate('Dashboard')
      } catch (err) {
        console.log(err)
        setLoading(false)
        Alert.alert(
          'Erro ao salvar os dados',
          'Ocorreu um erro, cheque os dados'
        )
      }
    },
    [posture, ethic, relashionship, higieny, organization, user]
  )

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#6EE7D3" />
    </View>
  ) : (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Content
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
            <Col style={{ marginLeft: 24 }}>
              <TextTitle>{user.profissionalResponsavel.nomeCompleto}</TextTitle>
              <TextOption>{user.profissionalResponsavel.cargo}</TextOption>
              <TextSmall>{user.horarioDeAtendimento}</TextSmall>
            </Col>
          </Row>
          <Card>
            <TextOptionTwo>Postura</TextOptionTwo>
            <RowSimple style={{ marginTop: 12 }}>
              <TouchableOpacity onPress={() => setPosture(1)}>
                {posture >= 1 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPosture(2)}>
                {posture >= 2 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPosture(3)}>
                {posture >= 3 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPosture(4)}>
                {posture >= 4 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPosture(5)}>
                {posture >= 5 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
            </RowSimple>
          </Card>
          <Card>
            <TextOptionTwo>Ética profissional</TextOptionTwo>
            <RowSimple style={{ marginTop: 12 }}>
              <TouchableOpacity onPress={() => setEthic(1)}>
                {ethic >= 1 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEthic(2)}>
                {ethic >= 2 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEthic(3)}>
                {ethic >= 3 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEthic(4)}>
                {ethic >= 4 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEthic(5)}>
                {ethic >= 5 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
            </RowSimple>
          </Card>
          <Card>
            <TextOptionTwo>Relacionamento com a família</TextOptionTwo>
            <RowSimple style={{ marginTop: 12 }}>
              <TouchableOpacity onPress={() => setRelashionship(1)}>
                {relashionship >= 1 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRelashionship(2)}>
                {relashionship >= 2 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRelashionship(3)}>
                {relashionship >= 3 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRelashionship(4)}>
                {relashionship >= 4 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRelashionship(5)}>
                {relashionship >= 5 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
            </RowSimple>
          </Card>
          <Card>
            <TextOptionTwo>Higiene</TextOptionTwo>
            <RowSimple style={{ marginTop: 12 }}>
              <TouchableOpacity onPress={() => setHigieny(1)}>
                {higieny >= 1 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHigieny(2)}>
                {higieny >= 2 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHigieny(3)}>
                {higieny >= 3 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHigieny(4)}>
                {higieny >= 4 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHigieny(5)}>
                {higieny >= 5 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
            </RowSimple>
          </Card>
          <Card>
            <TextOptionTwo>Organização</TextOptionTwo>
            <RowSimple style={{ marginTop: 12 }}>
              <TouchableOpacity onPress={() => setOrganization(1)}>
                {organization >= 1 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOrganization(2)}>
                {organization >= 2 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOrganization(3)}>
                {organization >= 3 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOrganization(4)}>
                {organization >= 4 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOrganization(5)}>
                {organization >= 5 ? (
                  <IconStyled name="star" size={24} color="#61d53a" />
                ) : (
                  <IconStyledFeather name="star" size={24} color="#61d53a" />
                )}
              </TouchableOpacity>
            </RowSimple>
          </Card>

          <Card>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <Input
                autoCorrect={false}
                name="note"
                icon="hash"
                placeholder="Nota Geral"
                returnKeyType="next"
                keyboardType="numeric"
              />
              <TextOptionTwo style={{ marginBottom: 16 }}>
                Nota geral
              </TextOptionTwo>
              <TextOptionTwo style={{ marginBottom: 16, marginTop: 16 }}>
                0 - Muito insatisfeito
              </TextOptionTwo>
              <TextOptionTwo style={{ marginBottom: 16 }}>
                5 - Insatisfeito
              </TextOptionTwo>
              <TextOptionTwo style={{ marginBottom: 16 }}>
                7 - Satisfeito
              </TextOptionTwo>
              <TextOptionTwo style={{ marginBottom: 24 }}>
                10 - Perfeito!
              </TextOptionTwo>
              <Input
                autoCorrect={false}
                name="comment"
                icon="hash"
                placeholder="Comentários"
                returnKeyType="next"
              />
              <Button
                onPress={() => {
                  formRef.current.submitForm()
                }}
              >
                Avaliar
              </Button>
            </Form>
          </Card>
        </Content>
      </ScrollView>
    </View>
  )
}

export default Avaliaty
