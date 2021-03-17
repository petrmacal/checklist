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
  id: number | string
  label: string
  status: boolean
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
              { id: uuid(), label: 'Setup virtual office', status: false },
              { id: uuid(), label: 'Set mission & vision', status: false },
              { id: uuid(), label: 'Select business name', status: false },
              { id: uuid(), label: 'Buy domains', status: false }
            ]
          },
          {
            id: uuid(),
            label: 'Discovery',
            weight: 1,
            items: [
              { id: uuid(), label: 'Create roadmap', status: false },
              { id: uuid(), label: 'Competitor analysis', status: false }
            ]
          },
          {
            id: uuid(),
            label: 'Delivery',
            weight: 1,
            items: [
              { id: uuid(), label: 'Release marketing website', status: false },
              { id: uuid(), label: 'Release MVP', status: false }
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
    },
    async toggleTask(_: any, args: any) {
      const card = cards.find(card => card.id === args.cardId)
      if (!card) return
  
      let task: Item | undefined
      card.sections.some(section => {
        const found = section.items.find(item => item.id === args.taskId)
        if (found) {
          task = found
          return task
        }
      })
  
      if (task) {
        task.status = !task.status
        return task
      }
  
      return task
    }
  }
}