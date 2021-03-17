import React from 'react'
import { Layout, Card, Row, Col, Spin } from 'antd'
import { gql , useQuery} from '@apollo/client'
import { FetchCards } from './__generated__/FetchCards'
import Section from './components/Section'
import Quote from './components/Quote'
import CreateStartup from './components/CreateStartup'

const { Content } = Layout

const FETCH_CARDS = gql`
  query FetchCards {
    fetchCards {
      id
      label
      sections {
        id
        label
        items {
          id
          label
          status
        }
      }
    }
  }
`

const Cards: React.FC<any> = () => {
  const { data, loading, error } = useQuery<FetchCards>(FETCH_CARDS)

  if (loading) return <Spin />
  if (error || !data) return <p>ERROR</p>

  const modifiedData = data.fetchCards?.map(({ sections, ...rest }) => {
    return { ...rest, sections: sections.map((section, i) => ({
      ...section,
      eligible: sections.slice(0, i).every(s => s.items.every(task => task.status)),
      done: section.items.every(task => task.status)
    })) }
  }) || []

  return (
    <Row gutter={[24, 24]}>
      {modifiedData.map(card => (
        <Col key={card.id} xs={{span: 24}} md={{span: 12}} lg={{span:6}}>
          <Card title={<h3 style={{margin:0, fontWeight: 700}}>{card.label}</h3>}>
            <React.Fragment>
              {card.sections.map((section, i) => (
                <Section key={section.id} section={section} index={i+1} cardId={card.id} />
              ))}
              {card.sections.every(section => section.done) && card.sections.reduce((acc, s) => acc + s.items.length, 0) > 0 && (
                <Quote />
              )}
            </React.Fragment>
          </Card>
        </Col>
      ))}
      <Col span={6}>
        <CreateStartup />
      </Col>
    </Row>
  )
}

function App() {
  return (
    <Layout>
      <Content style={{padding:32}}>
        <Cards />
      </Content>
    </Layout>
  )
}

export default App
