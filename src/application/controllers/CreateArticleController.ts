import { Controller } from './controller'
import { HttpResponse, badRequest, serverError, unprocessableEntity, created } from '../helpers'
import { CreateArticleService } from '../../domain/services/CreateArticleService'
import { Article } from 'domain/entities'

type Output = Error | Article

export class CreateArticleController extends Controller {
  constructor (private readonly createArticleService: CreateArticleService) {
    super()
  }

  async handle (request: any): Promise<HttpResponse<Output>> {
    try {
      const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = request

      if (featured === '' || featured === undefined || featured === null) return badRequest(new Error('Article featured is obligatory'))
      if (title === '' || title === undefined || title === null) return badRequest(new Error('Article title is obligatory'))
      if (url === '' || url === undefined || url === null) return badRequest(new Error('Article url is obligatory'))
      if (imageUrl === '' || imageUrl === undefined || imageUrl === null) return badRequest(new Error('Article imageUrl is obligatory'))
      if (newsSite === '' || newsSite === undefined || newsSite === null) return badRequest(new Error('Article newsSite is obligatory'))
      if (summary === '' || summary === undefined || summary === null) return badRequest(new Error('Article summary is obligatory'))
      if (publishedAt === '' || publishedAt === undefined || publishedAt === null) return badRequest(new Error('Article publishedAt is obligatory'))
      if (launches === '' || launches === undefined || launches === null) return badRequest(new Error('Article launches is obligatory'))
      if (events === '' || events === undefined || events === null) return badRequest(new Error('Article events is obligatory'))

      if (isNaN(Date.parse(publishedAt as string))) return badRequest(new Error('Article publishedAt field has to be a valid date'))

      const article = await this.createArticleService.create({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

      if (!article) return unprocessableEntity(new Error('Error on Article creation, try again later'))

      return created(article)
    } catch (error) {
      return serverError(new Error('An error occurred, please try again later'))
    }
  }
}
