import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ArticleModel } from '../../infra/mongo/models'
import { app } from '../../app'
import { articlesStub } from '../mocks'

describe('ListAllArticlesRouter', () => {
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

  it('should be able to list all Articles', async () => {
    await ArticleModel.insertMany(articlesStub)

    const response = await request(app)
      .get('/api/v1/articles')
      .query({ page: 1, limit: 2 })
      .expect(200)
      .send()

    const articles = response.body
    expect(articles?.length).toBe(2)
  })

  it('should return error if articles are not found', async () => {
    const input = { page: 1, limit: 2 }
    const response = await request(app)
      .get('/api/v1/articles')
      .query(input)
      .expect(404)
      .send()

    expect(response.body).toEqual({
      error: 'Articles not found'
    })
  })

  it('should return error on infra/server error', async () => {
    jest.spyOn(ArticleModel, 'find').mockImplementationOnce(() => {
      throw new Error('any error')
    })

    const input = { page: 1, limit: 2 }
    const response = await request(app)
      .get('/api/v1/articles')
      .query(input)
      .expect(500)
      .send()

    expect(response.body).toEqual({
      error: 'An error occurred, please try again later'
    })
  })
})
