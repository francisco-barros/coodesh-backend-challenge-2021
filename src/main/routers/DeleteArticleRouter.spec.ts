import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ArticleModel } from '../../infra/mongo/models'
import { app } from '../../app'
import { articlesStub } from '../mocks'

describe('DeleteClassRouter', () => {
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

  it('should be able to delete one Class', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]
    const createdArticle = await ArticleModel.create({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    const id = createdArticle._id

    const response = await request(app)
      .delete(`/api/v1/articles/${id}`)
      .expect(204)
      .send()

    expect(response.body).toEqual({})
  })

  it('should return error if article id field is invalid', async () => {
    const id = 'invalid_id'
    const response = await request(app)
      .delete(`/api/v1/articles/${id}`)
      .expect(400)
      .send()

    expect(response.body).toEqual({
      error: 'Article id is obligatory and must be a number'
    })
  })

  it('should return error if article deletion fails', async () => {
    jest.spyOn(ArticleModel, 'deleteOne').mockResolvedValueOnce({
      acknowledged: true,
      deletedCount: 0
    })

    const id = '1'
    const response = await request(app)
      .delete(`/api/v1/articles/${id}`)
      .expect(404)
      .send()

    expect(response.body).toEqual({
      error: 'Error, article id not found for deletion'
    })
  })

  it('should return error on infra/server error', async () => {
    jest.spyOn(ArticleModel, 'deleteOne').mockImplementationOnce(() => {
      throw new Error('any error')
    })

    const id = '1'
    const response = await request(app)
      .delete(`/api/v1/articles/${id}`)
      .expect(500)
      .send()

    expect(response.body).toEqual({
      error: 'An error occurred, please try again later'
    })
  })
})
