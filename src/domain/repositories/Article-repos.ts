import { Article, Event, Launch } from 'domain/entities'

export interface ListOneArticleRepository {
  listOne: (input: ListOneArticleRepository.Input) => Promise<ListOneArticleRepository.Output>
}

export namespace ListOneArticleRepository {
  export interface Input { id: number }
  export type Output = Article | null
}

export interface ListAllArticlesRepository {
  listAll: (input: ListAllArticlesRepository.Input) => Promise<ListAllArticlesRepository.Output>
}

export namespace ListAllArticlesRepository {
  export interface Input { page?: number, limit?: number }
  export type Output = Article[] | null
}

export interface CreateArticleRepository {
  create: (input: CreateArticleRepository.Input) => Promise<CreateArticleRepository.Output>
}

export namespace CreateArticleRepository {
  export type Input = Omit<Article, 'id'>
  export type Output = Article | null
}

export interface DeleteArticleRepository {
  delete: (input: DeleteArticleRepository.Input) => Promise<DeleteArticleRepository.Output>
}

export namespace DeleteArticleRepository {
  export interface Input { id: string }
  export type Output = boolean // true = deletion success | false = deletion fails
}

export interface UpdateArticleRepository {
  update: (input: UpdateArticleRepository.Input) => Promise<UpdateArticleRepository.Output>
}

export namespace UpdateArticleRepository {
  export interface Input {
    id: number
    featured?: boolean
    title?: string
    url?: string
    imageUrl?: string
    newsSite?: string
    summary?: string
    publishedAt?: Date
    launches?: Launch[]
    events?: Event[]
  }

  export type Output = Article | null
}
