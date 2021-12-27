import { ListOneArticleRepository } from 'domain/repositories'
import { ArticleModel } from '../models'

export class MongoArticleRepository implements ListOneArticleRepository {
  async listOne ({ id }: ListOneArticleRepository.Input): Promise<ListOneArticleRepository.Output> {
    const article = await ArticleModel.findById({ _id: id })

    if (article === null) return null

    const {
      id: _id,

      featured,
      title,
      url,
      imageUrl,
      newsSite,
      summary,
      publishedAt,
      launches,
      events
    } = article

    const articleDTO = {
      id,
      featured,
      title,
      url,
      imageUrl,
      newsSite,
      summary,
      publishedAt,
      launches,
      events
    }

    return articleDTO
  }
}
