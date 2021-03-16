import { gql } from 'apollo-server'

export const TypeDefs = gql`
  type Card {
    label: String
    sections: [Section]
  }

  type Section {
    label: String
    weight: Int
    items: [Item]
  }

  type Item {
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