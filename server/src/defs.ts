import { gql } from 'apollo-server'

export const TypeDefs = gql`
  type Card {
    id: ID
    label: String
    sections: [Section]
  }

  type Section {
    id: ID
    label: String
    weight: Int
    items: [Item]
  }

  type Item {
    id: ID
    label: String
    status: Status
  }

  enum Status {
    IN_PROGRESS,
    DONE
  }

  type Query {
    fetchCards: [Card]
  }
`