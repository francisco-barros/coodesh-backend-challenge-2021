import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from './controller'
import { ListAllArticlesController } from '.'
import { ListAllArticlesService } from '../../domain/services'

describe('ListOneArticleController', () => {
  let sut: ListAllArticlesController
  let listAllArticlesService: MockProxy<ListAllArticlesService>

  const articlesStub = [{
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
  }, {
    id: 2,
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

  beforeAll(() => {
    listAllArticlesService = mock()
  })

  beforeEach(() => {
    sut = new ListAllArticlesController(listAllArticlesService)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should return 404 if articles are not found', async () => {
    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toEqual(404)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 500 on infra/server error', async () => {
    const error = new Error('any_error')
    listAllArticlesService.listAll.mockRejectedValue({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({ page: 1, limit: 1 })

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 200 if listAllArticlesService succeeds', async () => {
    listAllArticlesService.listAll.mockResolvedValueOnce(articlesStub)
    const httpResponse = await sut.handle({ page: 1, limit: 2 })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: articlesStub
    })
  })
})
