import { Router, Express } from 'express'
import { ListAllArticlesController } from '../../application/controllers'
import { ListAllArticlesService } from '../../domain/services'
import { MongoArticleRepository } from '../../infra/mongo/repositories'
import { adaptExpressRoute as adapt } from '../adapters'

const articleRepository = new MongoArticleRepository()

const listAllArticlesService = new ListAllArticlesService(articleRepository)
const listAllArticlesController = new ListAllArticlesController(listAllArticlesService)
const router = Router()

export const ListAllArticlesRouter = (app: Express) => {
  router.get('/articles', adapt(listAllArticlesController))

  app.use('/api/v1/', router)
}
