import React from 'react'
import { Layout, Card, Row, Col, Progress, Avatar } from 'antd'
import { gql , useQuery} from '@apollo/client'
import { FetchCards } from './__generated__/FetchCards'
import ListItem from './components/ListItem'
import Quote from './components/Quote'
import CreateStartup from './components/CreateStartup'

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
          status
        }
      }
    }
  }
`

const Cards: React.FC<any> = () => {
  const { data, loading, error } = useQuery<FetchCards>(FETCH_CARDS)

  if (loading) return <Progress />
  if (error || !data) return <p>ERROR</p>

  const modifiedData = data.fetchCards?.map(({ sections, ...rest }) => {
    return { ...rest, sections: sections.map((section, i) => ({
      ...section,
      eligible: i > 0 ? sections[i-1].items.every(task => task.status) : true,
      done: section.items.every(task => task.status)
    })) }
  }) || []

  return (
    <Row gutter={24}>
      {modifiedData.map(card => (
        <Col key={card.id}>
          <Card>
            <h2>{card.label}</h2>
            {card.sections.map((section, i, sections) => (
              <React.Fragment key={section.id}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    style={{backgroundColor: section.done && section.eligible && '#000000' || '#aaaaaa', transition: '.5s all'}}>
                      {i + 1}
                  </Avatar>
                  <h3>{section.label}</h3>
                </div>
                {section.items.map(task => <ListItem key={task.id} cardId={card.id} eligible={sections.slice(0, i).every(s => s.eligible) && section.eligible} task={task} />)}
              </React.Fragment>
            ))}
            {card.sections.every(section => section.done) && (
              <Quote />
            )}
          </Card>
        </Col>
      ))}

      {data && data.fetchCards?.length === 0 && (
        <CreateStartup />
      )}
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
