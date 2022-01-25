import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ArticleModel } from '../../infra/mongo/models'
import { app } from '../../app'
import { articlesStub } from '../mocks'

describe('ListOneArticleRouter', () => {
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' })
  })

  afterAll(async () => {
    await ArticleModel.deleteMany({})
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await ArticleModel.deleteMany({})
  })

  it('should be able to list one Article', async () => {
    const article = await ArticleModel.create(articlesStub[0])

    const response = await request(app)
      .get(`/api/v1/articles/${article.id}`)
      .expect(200)
      .send()

    const articleId = response.body?.id
    expect(articleId).toBe(article.id)
  })

  it('should return error if article id is invalid', async () => {
    const id = 'invalid_id'
    const response = await request(app)
      .get(`/api/v1/articles/${id}`)
      .expect(400)
      .send()

    expect(response.body).toEqual({
      error: 'Article id is obligatory and must be a number'
    })
  })

  it('should return error if article is not found', async () => {
    const id = '1234'
    const response = await request(app)
      .get(`/api/v1/articles/${id}`)
      .expect(404)
      .send()

    expect(response.body).toEqual({
      error: 'Article not found'
    })
  })

  it('should return error on infra/server error', async () => {
    jest.spyOn(ArticleModel, 'findById').mockRejectedValueOnce(new Error('An error occurred, please try again later') as any)

    const id = '123'
    const response = await request(app)
      .get(`/api/v1/articles/${id}`)
      .expect(500)
      .send()

    expect(response.body).toEqual({
      error: 'An error occurred, please try again later'
    })
  })
})
