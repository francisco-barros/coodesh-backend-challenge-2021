import mongoose from 'mongoose'
import { MongoArticleRepository } from './MongoArticleRepository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ArticleModel } from '../models'
import { mock, MockProxy } from 'jest-mock-extended'

describe('MongoArticleRepository', () => {
  let mongoServer: MongoMemoryServer
  let sut: MongoArticleRepository

  const input = { page: 1, limit: 1 }

  const articlesStub = [{
    featured: false,
    title: 'any_title',
    url: 'any_url',
    imageUrl: 'any_imageUrl',
    newsSite: 'any_newsSite',
    summary: 'any_sumary',
    publishedAt: new Date('2022-01-13T02:57:04.680Z'),
    launches: [{
      id: 'any_launch_id',
      provider: 'any_provider'
    }],
    events: [{
      id: 'any_event_id',
      provider: 'any_provider'
    }]
  }, {
    featured: false,
    title: 'other_title',
    url: 'other_url',
    imageUrl: 'other_imageUrl',
    newsSite: 'other_newsSite',
    summary: 'other_sumary',
    publishedAt: new Date('2022-01-14T02:57:04.680Z'),
    launches: [{
      id: 'other_launch_id',
      provider: 'other_provider'
    }],
    events: [{
      id: 'other_event_id',
      provider: 'other_provider'
    }]
  }]

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
      const createdArticle = await ArticleModel.create(articlesStub[0])
      const articleID = createdArticle._id

      const article = await sut.listOne({ id: articleID })

      expect(article?.id).toBeTruthy()
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

  describe('listAll', () => {
    it('should return articles according to pagination', async () => {
      await ArticleModel.insertMany(articlesStub)

      const articles = await sut.listAll(input)
      expect(articles?.length).toBe(1)
    })

    it('should return null if articles do not exist', async () => {
      const result = await sut.listAll(input)
      expect(result).toBeNull()
    })

    it('should rethrow if MongoArticleRepository throws', async () => {
      const mongoClassRepo: MockProxy<MongoArticleRepository> = mock()
      mongoClassRepo.listAll.mockRejectedValueOnce(new Error('any_error'))

      const promise = mongoClassRepo.listAll(input)

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })

  describe('create', () => {
    it('should return an article if article creation succeeds', async () => {
      const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]
      const article = await sut.create({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

      expect(article?.id).toBeTruthy()
    })

    it('should return null if article creation fails', async () => {
      const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]

      const mongoArticleRepo: MockProxy<MongoArticleRepository> = mock()
      mongoArticleRepo.create.mockResolvedValueOnce(null)

      const result = await mongoArticleRepo.create({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })
      expect(result).toBeNull()
    })

    it('should rethrow if MongoArticleRepository throws', async () => {
      const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]
      const mongoArticleRepo: MockProxy<MongoArticleRepository> = mock()

      mongoArticleRepo.create.mockRejectedValueOnce(new Error('any_error'))

      const promise = mongoArticleRepo.create({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })

  describe('delete', () => {
    it('should return true if article deletion succeeds', async () => {
      const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articlesStub[0]

      const createdArticle = await ArticleModel.create({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })
      const articleID = createdArticle._id

      const result = await sut.delete({ id: articleID })

      expect(result).toBeTruthy()
    })

    it('should return false if article deletion fails', async () => {
      const mongoArticleRepo: MockProxy<MongoArticleRepository> = mock()
      mongoArticleRepo.delete.mockResolvedValueOnce(false)

      const result = await sut.delete({ id: '1' })

      expect(result).toBeFalsy()
    })

    it('should rethrow if MongoArticleRepository throws', async () => {
      const mongoArticleRepo: MockProxy<MongoArticleRepository> = mock()
      mongoArticleRepo.delete.mockRejectedValueOnce(new Error('any_error'))

      const promise = mongoArticleRepo.delete({ id: '1' })

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })

  describe('update', () => {
    it('should return an article if article update succeeds', async () => {
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

      const articleID = createdArticle._id
      const newEvents = [{
        id: 'any_event_id',
        provider: 'new_event_provider'
      }]

      const updatedArticle = await sut.update({ id: articleID, events: newEvents })

      expect(updatedArticle!.id).toBeTruthy()
      expect(updatedArticle!.events[0]?.provider).toBe(newEvents[0].provider)
    })

    it('should return null if article update fails', async () => {
      const mongoArticleRepo: MockProxy<MongoArticleRepository> = mock()
      mongoArticleRepo.update.mockResolvedValueOnce(null)

      const result = await sut.update({ id: 1, title: 'new_title' })
      expect(result).toBeNull()
    })

    it('should rethrow if MongoArticleRepository throws', async () => {
      const mongoArticleRepo: MockProxy<MongoArticleRepository> = mock()
      mongoArticleRepo.update.mockRejectedValueOnce(new Error('any_error'))

      const promise = mongoArticleRepo.update({ id: 1, title: 'new_title' })

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
