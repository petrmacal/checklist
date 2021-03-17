import { Avatar } from 'antd'
import ListItem from './ListItem'
import { FetchCards_fetchCards_sections } from '../__generated__/FetchCards'

export interface Section extends FetchCards_fetchCards_sections {
  done: boolean,
  eligible: boolean
}

export interface SectionProps {
  section: Section,
  index: number,
  cardId: string
}

export default function Section({ section, index, cardId }: SectionProps) {
  return (
    <section style={{marginBottom:20}} key={section.id}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6}}>
      <Avatar
        style={{backgroundColor: section.done && section.eligible && '#000000' || '#aaaaaa', transition: '.5s all'}}>
          {index}
      </Avatar>
      <h3 style={{margin:0}}>{section.label}</h3>
    </div>
    {section.items.map(task => <ListItem key={task.id} cardId={cardId} eligible={section.eligible} task={task} />)}
  </section>    
  )
}