export interface Event {
  id: string
  provider: string
}

export interface Launch {
  id: string
  provider: string
}

export interface Article {
  id: number
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
