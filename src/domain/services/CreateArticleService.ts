import { CreateArticleRepository } from '../repositories'

export class CreateArticleService {
  constructor (private readonly createArticleRepo: CreateArticleRepository) {}
  async create (input: CreateArticleRepository.Input): Promise<CreateArticleRepository.Output> {
    const article = await this.createArticleRepo.create(input)

    if (!article) return null
    return article
  }
}
