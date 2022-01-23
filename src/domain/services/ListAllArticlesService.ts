import { ListAllArticlesRepository } from '../repositories'

export class ListAllArticlesService {
  constructor (private readonly listAllArticlesRepo: ListAllArticlesRepository) {}
  async listAll (input: ListAllArticlesRepository.Input): Promise<ListAllArticlesRepository.Output> {
    const articles = await this.listAllArticlesRepo.listAll(input)

    if (!articles?.length) return null
    return articles
  }
}
