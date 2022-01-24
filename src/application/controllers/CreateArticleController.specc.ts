import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from './controller'
import { CreateArticleService } from '../../domain/services/CreateArticleService'
import { CreateArticleController } from './CreateArticleController'

describe('CreateArticleController', () => {
  let sut: CreateArticleController
  let createArticleService: MockProxy<CreateArticleService>

  const articleStub = {
    id: 1,
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
  }

  beforeAll(() => {
    createArticleService = mock()
  })

  beforeEach(() => {
    sut = new CreateArticleController(createArticleService)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call createArticleService with correct input', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articleStub
    await sut.handle({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    expect(createArticleService.create).toHaveBeenCalledWith({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })
    expect(createArticleService.create).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if any mandatory fields is invalid', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, launches, events } = articleStub
    const httpResponse = await sut.handle({ publishedAt: 'invalid date', featured, title, url, imageUrl, newsSite, summary, launches, events })

    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 422 if article creation fails', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articleStub

    createArticleService.create.mockResolvedValueOnce(null)

    const httpResponse = await sut.handle({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    expect(httpResponse.statusCode).toEqual(422)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 500 on infra/server error', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articleStub
    const error = new Error('any_error')

    createArticleService.create.mockRejectedValueOnce({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 201 if createArticleService succeeds', async () => {
    const { featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events } = articleStub
    createArticleService.create.mockResolvedValueOnce(articleStub)
    const httpResponse = await sut.handle({ featured, title, url, imageUrl, newsSite, summary, publishedAt, launches, events })

    expect(httpResponse.data).toEqual(articleStub)
    expect(httpResponse.statusCode).toBe(201)
  })
})
