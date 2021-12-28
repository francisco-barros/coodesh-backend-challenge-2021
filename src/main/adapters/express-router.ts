import { Controller } from '../../application/controllers'

import { RequestHandler, Request, Response } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req: Request, res: Response) => {
  const { statusCode, data } = await controller.handle({ ...req.params, ...req.body, ...req.query })

  const json = [200, 204, 201].includes(statusCode) ? data : { error: data.message }

  res.status(statusCode).json(json)
}
