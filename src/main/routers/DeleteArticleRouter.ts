import { Router, Express } from 'express'
import { DeleteArticleController } from '../../application/controllers'
import { DeleteArticleService } from '../../domain/services/DeleteArticleService'
import { MongoArticleRepository } from '../../infra/mongo/repositories/MongoArticleRepository'
import { adaptExpressRoute as adapt } from '../adapters'

const MongoArticleRepo = new MongoArticleRepository()

const deleteArticleService = new DeleteArticleService(MongoArticleRepo)
const deleteArticleController = new DeleteArticleController(deleteArticleService)
const router = Router()

export const DeleteArticleRouter = (app: Express) => {
  router.delete('/articles/:id', adapt(deleteArticleController))

  app.use('/api/v1/', router)
}
