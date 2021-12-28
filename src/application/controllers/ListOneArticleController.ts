import { Controller } from './controller'
import { HttpResponse, ok, badRequest, serverError, notFound } from '../helpers'
import { ListOneArticleService } from '../../domain/services'
import { Article } from '../../domain/entities/Article'

type Output = Error | Article

export class ListOneArticleController extends Controller {
  constructor (private readonly listOneArticleService: ListOneArticleService) {
    super()
  }

  async handle (request: any): Promise<HttpResponse<Output>> {
    try {
      const { id } = request

      if (isNaN(id) || id === '' || id === undefined || id === null) return badRequest(new Error('Article id is obligatory and must be a number'))

      const article = await this.listOneArticleService.listOne({ id })

      if (!article) return notFound(new Error('Article not found'))

      return ok(article)
    } catch (error) {
      return serverError(new Error('An error occurred, please try again later'))
    }
  }
}
