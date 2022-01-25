import { UpdateArticleRepository } from '../repositories'

export class UpdateArticleService {
  constructor (private readonly updateArticleRepo: UpdateArticleRepository) {}
  async update (input: UpdateArticleRepository.Input): Promise<UpdateArticleRepository.Output> {
    const article = await this.updateArticleRepo.update(input)

    if (!article) return null
    return article
  }
}
