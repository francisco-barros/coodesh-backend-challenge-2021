import { ListOneArticleRepository, ListAllArticlesRepository, CreateArticleRepository } from 'domain/repositories'
import { ArticleModel } from '../models'

export class MongoArticleRepository implements ListOneArticleRepository,
ListAllArticlesRepository,
CreateArticleRepository {
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

  async listAll ({ page, limit }: ListAllArticlesRepository.Input): Promise<ListAllArticlesRepository.Output> {

    const skipParam = page! * limit!
    const articles = await ArticleModel.find().sort({ publishedAt: -1 }).skip(skipParam).limit(limit!)

    if (!articles.length) return null

    const articlesDTO: any[] = articles.map(async (article) => {
      const {
        _id,
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
      }

      return articleDTO
    })

    return await Promise.all(articlesDTO)
  }

  async create ({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events }: CreateArticleRepository.Input): Promise<CreateArticleRepository.Output> {
    const article = await ArticleModel.create({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    if (article === null) return null

    const {
      _id
    } = article

    const articleDTO = {
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
    }

    return articleDTO
  }
}
