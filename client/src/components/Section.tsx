import { Avatar, Input } from 'antd'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ListItem from './ListItem'
import { FetchCards_fetchCards_sections } from '../__generated__/FetchCards'
import { CreateTask, CreateTaskVariables } from './__generated__/CreateTask'
import { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

export interface EnrichedSection extends FetchCards_fetchCards_sections {
  done: boolean,
  eligible: boolean
}

export interface SectionProps {
  section: EnrichedSection,
  index: number,
  cardId: string
}

const CREATE_TASK = gql`
mutation CreateTask($cardId: ID!, $sectionId: ID!, $label: String) {
    createTask(cardId: $cardId, sectionId: $sectionId, label: $label) {
      label
      status
      id
    }
  }
`

export default function Section({ section, index, cardId }: SectionProps) {
  const [isExpanded, setExpand] = useState(false)
  const [addTask, { data }] = useMutation<CreateTask, CreateTaskVariables>(CREATE_TASK, {
    update(cache, { data }) {
      const createTask = data?.createTask

      cache.modify({
        id: cache.identify({ __typename: 'Section', id: section.id }),
        fields: {
          items(existingTasks = []) {
            const newTaskRef = cache.writeFragment({
              data: createTask,
              fragment: gql`
                fragment NewItem on Item {
                  id
                  label
                  status
                }
              `
            })
            return [...existingTasks, newTaskRef]
          }
        }
      })
    }
  })
  useEffect(() => { setExpand(false) }, [data])

  const Icon = isExpanded ? CloseCircleOutlined : PlusCircleOutlined

  const handleSubmit = async (e: any) => {
    if (e.key === 'Enter') {
      await addTask({
        variables: { cardId, sectionId: section.id, label: e.target.value }
      })
    }

    if (e.key === 'Escape') {
      setExpand(false)
    }
  }

  return (
    <section style={{marginBottom:20}} key={section.id}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6}}>
      <Avatar
        style={{backgroundColor: section.done && section.eligible && '#000000' || '#aaaaaa', transition: '.5s all'}}>
          {index}
      </Avatar>
      <h3 style={{margin:0}}>{section.label}</h3>
      <div style={{flexGrow: 1}}></div>
      <Icon style={{fontSize: 24}} onClick={() => setExpand(!isExpanded)} />
    </div>
    {isExpanded && <Input onKeyUp={handleSubmit} />}
    {section.items.map(task => <ListItem key={task.id} cardId={cardId} eligible={section.eligible} task={task} />)}
  </section>    
  )
}