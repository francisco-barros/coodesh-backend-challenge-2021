import { Controller } from './controller'
import { HttpResponse, ok, badRequest, serverError, notFound } from '../helpers'
import { ListAllArticlesService } from '../../domain/services'
import { Article } from '../../domain/entities/Article'

type Output = Error | Article[]

export class ListAllArticlesController extends Controller {
  constructor (private readonly listAllArticlesService: ListAllArticlesService) {
    super()
  }

  async handle (request: any): Promise<HttpResponse<Output>> {
    try {
      let { page, limit } = request

      if (page && !isNaN(page)) {
        if (page <= 0) {
          page = 0
        } else page = page - 1
      } else page = 0

      if (limit && !isNaN(limit)) {
        if (limit <= 0) limit = 1
      } else limit = 20

      const articles = await this.listAllArticlesService.listAll({ page, limit })

      if (!articles) return notFound(new Error('Articles not found'))

      return ok(articles)
    } catch (error) {
      return serverError(new Error('An error occurred, please try again later'))
    }
  }
}
