import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from './controller'
import { UpdateArticleController } from './UpdateArticleController'
import { UpdateArticleService } from '../../domain/services/UpdateArticleService'

describe('UpdateArticleController', () => {
  let sut: UpdateArticleController
  let updateArticleService: MockProxy<UpdateArticleService>

  const articlesStub = {
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
    updateArticleService = mock()
  })

  beforeEach(() => {
    sut = new UpdateArticleController(updateArticleService)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call updateArticleService with correct input', async () => {
    const { id } = articlesStub
    await sut.handle({ id, title: 'new_title' })

    expect(updateArticleService.update).toHaveBeenCalledWith({ id, title: 'new_title' })
    expect(updateArticleService.update).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if any field is invalid', async () => {
    const httpResponse = await sut.handle({ id: 'invalid uuid', title: 'new_title' })

    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 404 if article id for update is not found', async () => {
    const httpResponse = await sut.handle({ id: 1, title: 'new_title' })

    expect(httpResponse.statusCode).toEqual(404)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 500 on infra/server error', async () => {
    const error = new Error('any_error')

    updateArticleService.update.mockRejectedValueOnce({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({ id: 1, title: 'new_title' })

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 204 if updateArticleService succeeds', async () => {
    const { id } = articlesStub
    updateArticleService.update.mockResolvedValueOnce(articlesStub)
    const httpResponse = await sut.handle({ id, name: 'new_name' })

    expect(httpResponse.data).toEqual(articlesStub)
    expect(httpResponse.statusCode).toBe(204)
  })
})
