import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ArticleModel } from '../../infra/mongo/models'
import { app } from '../../app'
import { articlesStub } from '../mocks'

describe('CreateArticleRouter', () => {
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

  it('should be able to create one Article', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]

    const response = await request(app)
      .post('/api/v1/articles')
      .expect(201)
      .send({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    const articleId = response.body?.id

    expect(articleId).toBeTruthy()
  })

  it('should return error if any article mandatory field is invalid', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, launches, events } = articlesStub[0]

    const response = await request(app)
      .post('/api/v1/articles')
      .expect(400)
      .send({ publishedAt: 'invalid date', featured, title, url, imageUrl, newsSite, summary, launches, events })

    expect(response.body).toEqual({
      error: 'Article publishedAt field has to be a valid date'
    })
  })

  it('should return error if Article creation fails', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]

    jest.spyOn(ArticleModel, 'create').mockImplementationOnce(async () => {
      return await Promise.resolve(null)
    })

    const response = await request(app)
      .post('/api/v1/articles')
      .expect(422)
      .send({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    expect(response.body).toEqual({
      error: 'Error on Article creation, try again later'
    })
  })

  it('should return error on infra/server error', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]

    jest.spyOn(ArticleModel, 'create').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })

    const response = await request(app)
      .post('/api/v1/articles')
      .expect(500)
      .send({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    expect(response.body).toEqual({
      error: 'An error occurred, please try again later'
    })
  })
})
