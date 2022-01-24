import { Article } from 'domain/entities'

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
  export type Input =  Omit<Article, 'id'>
  export type Output = Article | null
}
