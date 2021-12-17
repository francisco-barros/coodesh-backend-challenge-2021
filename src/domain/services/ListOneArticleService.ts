import { ListOneArticleRepository } from '../repositories'

export class ListOneArticleService {
  constructor (private readonly listOneArticleRepo: ListOneArticleRepository) {}
  async listOne (input: ListOneArticleRepository.Input): Promise<ListOneArticleRepository.Output> {
    const article = await this.listOneArticleRepo.listOne(input)

    if (!article) return null
    return article
  }
}
