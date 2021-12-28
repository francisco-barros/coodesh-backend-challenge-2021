import { Article } from 'domain/entities'

export interface ListOneArticleRepository {
  listOne: (input: ListOneArticleRepository.Input) => Promise<ListOneArticleRepository.Output>
}

export namespace ListOneArticleRepository {
  export interface Input { id: number }
  export type Output = Article | null
}
