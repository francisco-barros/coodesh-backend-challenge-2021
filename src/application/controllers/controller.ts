import { HttpResponse } from '../helpers'

export abstract class Controller {
  abstract handle (httpRequest: any): Promise<HttpResponse<any>>
}
