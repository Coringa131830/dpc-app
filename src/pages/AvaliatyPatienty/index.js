import React, { useCallback, useRef, useState, useEffect } from 'react';

import {
  View,
  ScrollView,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { Table, Row, Rows, Share } from 'react-native-table-component'

import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/Auth'
import api from '../../services/api'

import {
  Content,
  ImageStyled,
  TextOption,
  TextTitle,
  TextSmall,
  TextButton,
  OptionButton,
  TextSmallTwo,
  Card,
  TextOptionTwo,
  IconStyled,
  TextTime,
  RowSimple
} from './styles'

import img from '../../assets/logo.png'

const AvaliatyPatienty = ({ route }) => {
  const { user } = route.params
  const navigation = useNavigation()
  const formRef = useRef(null)
  const formRefObs = useRef(null)
  const [loading, setLoading] = useState(false)
  const [signais, setSignais] = useState({})
  const [line, setLine] = useState([])
  const { token } = useAuth()
  const [pdf, setPdf] = useState('');
  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        const resp = await api.get(
          `/profissional/buscarsinaisvitais/${user.paciente._id}`,
          {
            headers: {
              auth: `${token}`
            }
          }
        )
        setSignais(resp.data)
        if (resp.data && resp.data.length) {
          let lineData = []
          resp.data.map((da) => {
            const newLine = [da.horario, da.pa, da.temp, da.fc, da.spo2, da.fr]
            lineData.push(newLine)
          })
          setLine(lineData)
        }
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    getData()
  }, [token])

  const dataTable = {
    tableHead: ['H', 'P.A', 'T', 'F.C', 'Sp02', 'F.R'],
    tableData: line
  }

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        try {
          await api.post(
            '/profissional/cadastrarSinaisVitais',
            {
              paciente: user.paciente._id,
              dados: { ...data }
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
    [user]
  )

  const handleSubmitObs = useCallback(
    async (data) => {
      setLoading(true)
      try {
        await api.post(
          '/profissional/observacaodiaria',
          {
            paciente: user.paciente._id,
            observacaoDiaria: data.observacao
          },
          {
            headers: {
              auth: `${token}`
            }
          }
        )
        setLoading(false)
        Alert.alert('Observação enviada.', 'Obrigado!')
      } catch (err) {
        console.log(err)
        setLoading(false)
        Alert.alert('Erro ao enviar observação', 'Tente novamente')
      }
    },
    [user]
  )
  useEffect(() =>{
    async function getPrecicao(){
      try {
        const result = await api.get(`/paciente/prescricao/${user._id}`)
        setPdf(result.data.prescricao_medica)
      } catch (error) {
        console.log(error)
        
      }
    }
    getPrecicao();
  },[])

  const handleOpenPdf = () => {

  }
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
          <ImageStyled
            source={img}
            style={{
              marginTop: 30,
              width: 120,
              borderRadius: 60,
              height: 120,
              resizeMode: 'contain'
            }}
          />
          <OptionButton onPress={ ()=> Linking.openURL(pdf)}>
               <TextButton>Visualizar Prescrição</TextButton>
          </OptionButton>
          <TextTitle>{user.paciente.nomeCompleto}</TextTitle>
          <TextOption>{user.paciente.endereco}</TextOption>
          <TextSmall>{user.horarioDeAtendimento}</TextSmall>
          <Card>
            <TextOptionTwo>Sobre</TextOptionTwo>
            <TextSmallTwo style={{ marginTop: 12 }}>
              Idade - {user.paciente.idade}
            </TextSmallTwo>
            <TextSmallTwo>
              Diagnóstico - {user.paciente.diagnostico}
            </TextSmallTwo>
            <TextSmallTwo>
              História simplificada - {user.paciente.histSimplificada}
            </TextSmallTwo>
          </Card>
          <Card>
            <TextOptionTwo>Metas diárias</TextOptionTwo>
            <RowSimple>
              {user.paciente.metDiarias && user.paciente.metDiarias.length ? (
                user.paciente.metDiarias.map((met) => (
                  <TextSmallTwo key={met}>{met}</TextSmallTwo>
                ))
              ) : (
                <RowSimple> </RowSimple>
              )}
            </RowSimple>
          </Card>
          <Card>
            <TextOptionTwo>Dispositivos</TextOptionTwo>
            <RowSimple>
              {user.paciente.dispositivos &&
              user.paciente.dispositivos.length ? (
                user.paciente.dispositivos.map((disp) => (
                  <TextSmallTwo key={disp}>{disp}</TextSmallTwo>
                ))
              ) : (
                <RowSimple> </RowSimple>
              )}
            </RowSimple>
          </Card>

          <Card>
            <TextOptionTwo>Procedimentos do dia</TextOptionTwo>
            {user.procedimentos.length &&
              user.procedimentos.map((proc) => (
                <RowSimple style={{ marginTop: 12 }} key={proc._id}>
                  <IconStyled name="calendar" size={24} color="#61d53a" />
                  <TextTime style={{ marginLeft: 16 }}>
                    {proc.horario} - {proc.descricao}
                  </TextTime>
                </RowSimple>
              ))}
          </Card>
          <Card>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={dataTable.tableHead} />
                <Rows data={dataTable.tableData} />
              </Table>
              <RowSimple style={{ marginTop: 24, marginBottom: 12 }}>
                <Input
                  autoCorrect={false}
                  name="pa"
                  icon="hash"
                  placeholder="P.A"
                  returnKeyType="next"
                  keyboardType="numeric"
                />
              </RowSimple>
              <RowSimple style={{ marginBottom: 12 }}>
                <Input
                  autoCorrect={false}
                  name="temp"
                  icon="hash"
                  placeholder="Temperatura"
                  returnKeyType="next"
                  keyboardType="numeric"
                />
              </RowSimple>
              <RowSimple style={{ marginBottom: 12 }}>
                <Input
                  autoCorrect={false}
                  name="fc"
                  icon="hash"
                  placeholder="F.C"
                  returnKeyType="next"
                  keyboardType="numeric"
                />
              </RowSimple>
              <RowSimple style={{ marginBottom: 12 }}>
                <Input
                  autoCorrect={false}
                  name="spo2"
                  icon="hash"
                  placeholder="Sp02"
                  returnKeyType="next"
                  keyboardType="numeric"
                />
              </RowSimple>
              <RowSimple style={{ marginBottom: 12 }}>
                <Input
                  autoCorrect={false}
                  name="fr"
                  icon="hash"
                  placeholder="F.R"
                  returnKeyType="next"
                  keyboardType="numeric"
                />
              </RowSimple>
              <Button
                onPress={() => {
                  formRef.current.submitForm()
                }}
              >
                Enviar
              </Button>
            </Form>
          </Card>
          <Card>
            <Form onSubmit={handleSubmitObs} ref={formRefObs}>
              <Input
                autoCorrect={false}
                name="observacao"
                icon="hash"
                placeholder="Observações"
                returnKeyType="next"
              />
              <Button
                onPress={() => {
                  formRefObs.current.submitForm()
                }}
              >
                Enviar
              </Button>
            </Form>
          </Card>
        </Content>
      </ScrollView>
    </View>
  )
}

export default AvaliatyPatienty
