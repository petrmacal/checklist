import React, { useState } from 'react'
import { Checkbox, Avatar } from 'antd'
import { FetchCards_fetchCards_sections_items } from '../__generated__/FetchCards'
import { useMutation, gql } from '@apollo/client'
import { ToggleTask, ToggleTaskVariables } from './__generated__/ToggleTask'


interface ListItemProps {
  task: FetchCards_fetchCards_sections_items,
  cardId: string,
  eligible: boolean
}

const TOGGLE_TASK = gql`
mutation ToggleTask($cardId: ID!, $taskId: ID!) {
    toggleTask(cardId: $cardId, taskId: $taskId) {
      status
      id
    }
  }
`

export default ({ task, cardId, eligible }: ListItemProps) => {
  const [status, setStatus] = useState(task.status)
  const [markAsDone, { data }] = useMutation<ToggleTask, ToggleTaskVariables>(TOGGLE_TASK, {
    variables: { cardId, taskId: task.id }
  })

  const handleClick = async () => {
    if (!eligible) return
    setStatus(!status)
    await markAsDone()
  }

  return (
    <div style={{display: 'flex', alignContent: 'center', alignItems: 'center', cursor: 'pointer', gap: 12}} onClick={() => handleClick()}>
      <Checkbox
        checked={status}
        disabled={!eligible}
      />
      { task.label }
    </div>
  )
}