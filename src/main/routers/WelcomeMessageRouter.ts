import { Router, Express } from 'express'
import { WelcomeMessageController } from '../../application/controllers'

import { adaptExpressRoute as adapt } from '../adapters'

const welcomeMessageController = new WelcomeMessageController()
const router = Router()

export const WelcomeMessageRouter = (app: Express) => {
  router.get('/', adapt(welcomeMessageController))

  app.use('/api/v1/', router)
}
