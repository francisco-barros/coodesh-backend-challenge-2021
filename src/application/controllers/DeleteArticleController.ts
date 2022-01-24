import { Controller } from './controller'
import { HttpResponse, badRequest, serverError, noContent, notFound } from '../helpers'
import { DeleteArticleService } from '../../domain/services/DeleteArticleService'

type Output = Error | boolean

export class DeleteArticleController extends Controller {
  constructor (private readonly deleteArticleService: DeleteArticleService) {
    super()
  }

  async handle (request: any): Promise<HttpResponse<Output>> {
    try {
      if (isNaN(request?.id) || request?.id === '' || request?.id === undefined || request?.id === null) return badRequest(new Error('Article id is obligatory and must be a number'))

      const id = request?.id

      const result = await this.deleteArticleService.delete({ id })

      if (!result) return notFound(new Error('Error, article id not found for deletion'))

      return noContent(result)
    } catch (error) {
      return serverError(new Error('An error occurred, please try again later'))
    }
  }
}
