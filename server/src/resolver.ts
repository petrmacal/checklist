import { v4 as uuid } from 'uuid'

interface Card {
  id: number | string,
  label: string,
  sections: Section[]
}

interface Section {
  label: string,
  weight: number,
  items: Item[]
}

interface Item {
  label: string
  status: number
}

const cards: Card[] = []

export const Resolvers = {
  Query: {
    async fetchCards(_: any, args: any) {
      return cards
    }
  },
  Mutation: {
    async createStartup(_: any, args: any) {
      const card = {
        id: uuid(),
        label: args.label,
        sections: [
          {
            id: uuid(),
            label: 'Foundation',
            weight: 1,
            items: [
              { id: uuid(), label: 'Setup virtual office', status: 0 },
              { id: uuid(), label: 'Set mission & vision', status: 0 },
              { id: uuid(), label: 'Select business name', status: 0 },
              { id: uuid(), label: 'Buy domains', status: 0 }
            ]
          },
          {
            id: uuid(),
            label: 'Discovery',
            weight: 1,
            items: [
              { id: uuid(), label: 'Create roadmap', status: 0 },
              { id: uuid(), label: 'Competitor analysis', status: 0 }
            ]
          },
          {
            id: uuid(),
            label: 'Delivery',
            weight: 1,
            items: [
              { id: uuid(), label: 'Release marketing website', status: 0 },
              { id: uuid(), label: 'Release MVP', status: 0 }
            ]
          }
        ]
      }

      cards.push(card)
      return card
    },
    async createCard(_: any, args: any) {
      const card = {
        id: uuid(),
        label: args.label,
        sections: []
      }

      cards.push(card)
      return card
    }
  }
}