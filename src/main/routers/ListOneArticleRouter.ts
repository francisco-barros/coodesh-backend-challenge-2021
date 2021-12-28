import { Router, Express } from 'express'
import { ListOneArticleController } from '../../application/controllers'
import { ListOneArticleService } from '../../domain/services'
import { MongoArticleRepository } from '../../infra/mongo/repositories'
import { adaptExpressRoute as adapt } from '../adapters'

const articleRepository = new MongoArticleRepository()

const listOneArticleService = new ListOneArticleService(articleRepository)
const listOneArticleController = new ListOneArticleController(listOneArticleService)
const router = Router()

export const ListOneArticleRouter = (app: Express) => {
  router.get('/articles/:id', adapt(listOneArticleController))

  app.use('/api/v1/', router)
}
