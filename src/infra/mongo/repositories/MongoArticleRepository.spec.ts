import mongoose from 'mongoose'
import { MongoArticleRepository } from './MongoArticleRepository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ArticleModel } from '../models'
import { mock, MockProxy } from 'jest-mock-extended'

describe('MongoArticleRepository', () => {
  let mongoServer: MongoMemoryServer
  let sut: MongoArticleRepository

  const articleStub = {
    featured: false,
    title: 'any_title',
    url: 'any_url',
    imageUrl: 'any_imageUrl',
    newsSite: 'any_newsSite',
    summary: 'any_sumary',
    publishedAt: new Date(),
    launches: [{
      id: 'any_launch_id',
      provider: 'any_provider'
    }],
    events: [{
      id: 'any_event_id',
      provider: 'any_provider'
    }]
  }

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
    sut = new MongoArticleRepository()
  })

  describe('listOne', () => {
    it('should return an article if article exists', async () => {
      await ArticleModel.create(articleStub)

      const article = await sut.listOne({ id: 1 })
      expect(article?.id).toEqual(1)
    })

    it('should return null if article does not exist', async () => {
      const result = await sut.listOne({ id: 1 })
      expect(result).toBeNull()
    })

    it('should rethrow if MongoArticleRepository throws', async () => {
      const mongoArticleRepo: MockProxy<MongoArticleRepository> = mock()
      mongoArticleRepo.listOne.mockRejectedValueOnce(new Error('any_error'))

      const promise = mongoArticleRepo.listOne({ id: 1 })

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
