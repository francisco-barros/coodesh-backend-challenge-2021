import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ArticleModel } from '../../infra/mongo/models'
import { app } from '../../app'
import { articlesStub } from '../mocks'

describe('UpdateArticleRouter', () => {
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

  it('should be able to update one Article', async () => {
    const {
      featured,
      title,
      url,
      imageUrl,
      newsSite,
      summary,
      publishedAt,
      launches,
      events
    } = articlesStub[0]

    const createdArticle = await ArticleModel.create({
      featured,
      title,
      url,
      imageUrl,
      newsSite,
      summary,
      publishedAt,
      launches,
      events
    })

    const response = await request(app)
      .put(`/api/v1/articles/${createdArticle._id}`)
      .expect(204)
      .send({ title: 'new_title' })

    expect(response.body).toEqual({})
  })

  it('should return error if any field is invalid', async () => {
    const invalidId = 'invalid_id'

    const response = await request(app)
      .put(`/api/v1/articles/${invalidId}`)
      .expect(400)
      .send({ title: 'new_title' })

    expect(response.body).toEqual({
      error: 'Article id is obligatory and must be a number'
    })
  })

  it('should return error if article update fails', async () => {
    jest.spyOn(ArticleModel, 'findOneAndUpdate').mockReturnThis()
      .mockImplementation((): any => ({
        select: jest.fn().mockResolvedValueOnce(null)
      }))

    const id = 1
    const response = await request(app)
      .put(`/api/v1/articles/${id}`)
      .expect(404)
      .send({ title: 'new_title' })

    expect(response.body).toEqual({
      error: 'Error, article id not found for update'
    })
  })

  it('should return error on infra/server error', async () => {
    jest.spyOn(ArticleModel, 'findOneAndUpdate').mockImplementationOnce(() => {
      throw new Error('any error')
    })

    const id = 1
    const response = await request(app)
      .put(`/api/v1/articles/${id}`)
      .expect(500)
      .send({ title: 'new_title' })

    expect(response.body).toEqual({
      error: 'An error occurred, please try again later'
    })
  })
})
