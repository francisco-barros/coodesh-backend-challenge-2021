import { Router, Express } from 'express'
import { UpdateArticleController } from '../../application/controllers'
import { UpdateArticleService } from '../../domain/services/UpdateArticleService'
import { MongoArticleRepository } from '../../infra/mongo/repositories/MongoArticleRepository'
import { adaptExpressRoute as adapt } from '../adapters'

const articleRepository = new MongoArticleRepository()

const updateArticleService = new UpdateArticleService(articleRepository)
const updateArticleController = new UpdateArticleController(updateArticleService)
const router = Router()

export const UpdateArticleRouter = (app: Express) => {
  router.put('/articles/:id', adapt(updateArticleController))

  app.use('/api/v1/', router)
}
