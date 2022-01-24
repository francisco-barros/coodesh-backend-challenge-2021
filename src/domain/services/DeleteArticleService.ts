import { DeleteArticleRepository } from '../repositories'

export class DeleteArticleService {
  constructor (private readonly deleteArticleRepository: DeleteArticleRepository) {}
  async delete (input: DeleteArticleRepository.Input): Promise<DeleteArticleRepository.Output> {
    const result = await this.deleteArticleRepository.delete(input)

    return result
  }
}
