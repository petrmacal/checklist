import React from 'react'
import { Layout, Card, Row, Col, Progress, Avatar } from 'antd'
import { gql , useQuery} from '@apollo/client'
import { FetchCards } from './__generated__/FetchCards'
import ListItem from './components/ListItem'

const { Content, Footer } = Layout

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
        }
      }
    }
  }
`

const Cards: React.FC<any> = () => {
  const { data, loading, error } = useQuery<FetchCards>(FETCH_CARDS)

  if (loading) return <Progress />
  if (error || !data) return <p>ERROR</p>

  return (
    <Row gutter={12}>
      {data && data.fetchCards && data.fetchCards.map(card => (
        <Col key={card.id}>
          <Card>
            <h2>{card.label}</h2>
            {card.sections.map((section, i) => (
              <React.Fragment key={section.id}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Avatar>{i + 1}</Avatar>
                  <h3>{section.label}</h3>
                </div>
                {section.items.map(task => <ListItem key={task.id} label={task.label} />)}
              </React.Fragment>
            ))}
          </Card>
        </Col>
      ))}
    </Row>
  )
}

function App() {
  return (
    <Layout>
      <Content>
        <Cards />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App
