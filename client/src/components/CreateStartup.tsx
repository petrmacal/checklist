import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { gql, useMutation } from '@apollo/client'

const FRAGMENT = gql`
  fragment CardProps on Card {
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
`

const CREATE_CARD = gql`
${FRAGMENT}
mutation CreateCard($label: String) {
    createCard(label: $label) {
      ...CardProps
    }
  }
`

const CREATE_STARTUP = gql`
${FRAGMENT}
mutation CreateStartup($label: String) {
    createStartup(label: $label) {
      ...CardProps
    }
  }
`

const updater = (mutationName: string) => (cache: any, { data }: any) => {
  const newItem = data[mutationName]

  cache.modify({
    fields: {
      fetchCards(existingCards = []) {
        const newCardRef = cache.writeFragment({
          data: newItem,
          fragment: FRAGMENT
        })
        return [...existingCards, newCardRef]
      }
    }
  })
}

export default function CreateStartup() {
  const [createStartup] = useMutation(CREATE_STARTUP, {
    variables: { label: 'Cool&New Startup' },
    update: updater('createStartup')
  })
  const [createCard] = useMutation(CREATE_CARD, {
    variables: { label: 'Cool&Empty Startup' },
    update: updater('createCard')
  })


  return (
    <React.Fragment>
      <Button type="primary" block style={{marginBottom:12}} onClick={async () => await createStartup()}>
        <PlusCircleOutlined></PlusCircleOutlined> Add startup from template
      </Button>
      <Button block onClick={async () => await createCard()}>
          <PlusCircleOutlined></PlusCircleOutlined> Add empty startup
      </Button>      
    </React.Fragment>
  )
}
