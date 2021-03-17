import { gql } from 'apollo-server'

export const TypeDefs = gql`
  type Card {
    id: ID!
    label: String!
    sections: [Section!]!
  }

  type Section {
    id: ID!
    label: String!
    weight: Int
    items: [Item!]!
  }

  type Item {
    id: ID!
    label: String!
    status: Boolean!
  }

  type Query {
    fetchCards: [Card!]
  }

  type Mutation {
    createStartup(label: String): Card
    createCard(label: String): Card
    toggleTask(cardId: ID!, taskId: ID!): Item!
    createTask(cardId: ID!, sectionId: ID!, label: String): Item!
  }
`