import { Controller } from './controller'
import { HttpResponse, badRequest, serverError, noContent, notFound } from '../helpers'
import { UpdateArticleService } from '../../domain/services/UpdateArticleService'
import { Article } from 'domain/entities'

type Output = Error | Article

export class UpdateArticleController extends Controller {
  constructor (private readonly updateArticleService: UpdateArticleService) {
    super()
  }

  async handle (request: any): Promise<HttpResponse<Output>> {
    try {
      if (isNaN(request?.id) || request?.id === '' || request?.id === undefined || request?.id === null) return badRequest(new Error('Article id is obligatory and must be a number'))

      const updateInput: any = {}

      updateInput.id = request?.id

      if (request?.featured) updateInput.featured = request.featured as string
      if (request?.title) updateInput.title = request.title as string
      if (request?.url) updateInput.url = request.url as string
      if (request?.imageUrl) updateInput.imageUrl = request.imageUrl as string
      if (request?.newsSite) updateInput.newsSite = request.newsSite as string
      if (request?.summary) updateInput.summary = request.summary as string
      if (request?.publishedAt) updateInput.publishedAt = request.publishedAt as string
      if (request?.launches) updateInput.launches = request.launches as string
      if (request?.events) updateInput.events = request.events as string

      if (updateInput.publishedAt && isNaN(Date.parse(updateInput.publishedAt as string))) return badRequest(new Error('Article publishedAt field has to be a valid date'))

      const article = await this.updateArticleService.update(updateInput)

      if (!article) return notFound(new Error('Error, article id not found for update'))

      return noContent(article)
    } catch (error) {
      return serverError(new Error('An error occurred, please try again later'))
    }
  }
}
