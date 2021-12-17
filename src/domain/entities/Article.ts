export type Event = {
  id: string
  provider: string
}

export type Launch = {
  id: string
  provider: string
}

export interface Article {
  id: string
  featured: boolean
  title: string
  url: string
  imageUrl: string
  newsSite: string
  summary: string
  publishedAt: Date
  launches: Launch[]
  events: Event[]
}
