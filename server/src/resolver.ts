interface Card {
  label: string,
  sections: Section[]
}

interface Section {

}

const cards: Card[] = []

export const Resolvers = {
  Query: {
    async fetchCards(_: any, args: any) {
      return cards
    }
  }
}