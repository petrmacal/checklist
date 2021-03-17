import React from 'react'
import { Layout, Card, Row, Col, Spin, Avatar } from 'antd'
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

  if (loading) return <Spin />
  if (error || !data) return <p>ERROR</p>

  const modifiedData = data.fetchCards?.map(({ sections, ...rest }) => {
    return { ...rest, sections: sections.map((section, i) => ({
      ...section,
      eligible: i > 0 ? sections[i-1].items.every(task => task.status) : true,
      done: section.items.every(task => task.status)
    })) }
  }) || []

  return (
    <Row gutter={[24, 24]}>
      {modifiedData.map(card => (
        <Col key={card.id} span={6}>
          <Card title={<h3 style={{margin:0}}>{card.label}</h3>}>
            <React.Fragment>
              {card.sections.map((section, i, sections) => (
                <section style={{marginBottom:20}} key={section.id}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6}}>
                    <Avatar
                      style={{backgroundColor: section.done && sections.slice(0, i).every(s => s.eligible) && section.eligible && '#000000' || '#aaaaaa', transition: '.5s all'}}>
                        {i + 1}
                    </Avatar>
                    <h3 style={{margin:0}}>{section.label}</h3>
                  </div>
                  {section.items.map(task => <ListItem key={task.id} cardId={card.id} eligible={sections.slice(0, i).every(s => s.eligible) && section.eligible} task={task} />)}
                </section>
              ))}
              {card.sections.every(section => section.done) && (
                <Quote />
              )}
            </React.Fragment>
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
      <Content style={{padding:32}}>
        <Cards />
      </Content>
    </Layout>
  )
}

export default App
