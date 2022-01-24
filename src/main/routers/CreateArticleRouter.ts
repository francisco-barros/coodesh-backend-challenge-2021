import { Router, Express } from 'express'
import { CreateArticleController } from '../../application/controllers'
import { CreateArticleService } from '../../domain/services/CreateArticleService'
import { MongoArticleRepository } from '../../infra/mongo/repositories/MongoArticleRepository'
import { adaptExpressRoute as adapt } from '../adapters'

const mongoArticleRepository = new MongoArticleRepository()

const createArticleService = new CreateArticleService(mongoArticleRepository)
const createArticleController = new CreateArticleController(createArticleService)
const router = Router()

export const CreateArticleRouter = (app: Express) => {
  router.post('/articles', adapt(createArticleController))

  app.use('/api/v1/', router)
}
