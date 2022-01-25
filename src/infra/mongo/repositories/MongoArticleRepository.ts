import {
  ListOneArticleRepository,
  ListAllArticlesRepository,
  CreateArticleRepository,
  DeleteArticleRepository,
  UpdateArticleRepository
} from 'domain/repositories'

import { ArticleModel } from '../models'

export class MongoArticleRepository implements
ListOneArticleRepository,
ListAllArticlesRepository,
CreateArticleRepository,
DeleteArticleRepository,
UpdateArticleRepository {
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

  async create ({
    featured,
    title,
    url,
    imageUrl,
    newsSite,
    summary,
    publishedAt,
    launches,
    events
  }: CreateArticleRepository.Input): Promise<CreateArticleRepository.Output> {
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

  async delete ({ id }: DeleteArticleRepository.Input): Promise<DeleteArticleRepository.Output> {
    const result = await ArticleModel.deleteOne({ _id: id })

    if (result.deletedCount === 0) return false

    return true
  }

  async update ({
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
  }: UpdateArticleRepository.Input): Promise<UpdateArticleRepository.Output> {
    const opts = {
      new: true
    }

    const filter = { id }

    const fieldsToUpdate: any = {}

    if (featured) fieldsToUpdate.featured = featured
    if (title) fieldsToUpdate.title = title
    if (url) fieldsToUpdate.url = url
    if (imageUrl) fieldsToUpdate.imageUrl = imageUrl
    if (newsSite) fieldsToUpdate.newsSite = newsSite
    if (summary) fieldsToUpdate.summary = summary
    if (publishedAt) fieldsToUpdate.publishedAt = publishedAt
    if (launches) fieldsToUpdate.launches = launches
    if (events) fieldsToUpdate.events = events

    const article = await ArticleModel.findOneAndUpdate(filter, fieldsToUpdate, opts).select('-__v')

    if (article === null) return null

    const { _id, ...rest } = article._doc

    const articleDTO = {
      id: _id,
      ...rest
    }

    return articleDTO
  }
}
