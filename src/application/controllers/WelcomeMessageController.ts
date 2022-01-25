import { Controller } from './controller'
import { HttpResponse, ok, serverError } from '../helpers'

type Output = Error | String

export class WelcomeMessageController extends Controller {
  constructor () {
    super()
  }

  async handle (_request: any): Promise<HttpResponse<Output>> {
    try {
      const welcomeMessage = 'Back-end Challenge 2021 🏅 - Space Flight News'

      return ok(welcomeMessage)
    } catch (error) {
      return serverError(new Error('An error occurred, please try again later'))
    }
  }
}
