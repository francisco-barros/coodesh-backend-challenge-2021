import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from './controller'
import { ListOneArticleController } from '.'
import { ListOneArticleService } from '../../domain/services'

describe('ListOneArticleController', () => {
  let sut: ListOneArticleController
  let listOneArticleService: MockProxy<ListOneArticleService>

  const articleStub = {
    id: 1,
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

  beforeAll(() => {
    listOneArticleService = mock()
  })

  beforeEach(() => {
    sut = new ListOneArticleController(listOneArticleService)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call listOneArticleService with correct input', async () => {
    const id = 1
    await sut.handle({ id })

    expect(listOneArticleService.listOne).toHaveBeenCalledWith({ id })
    expect(listOneArticleService.listOne).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if article id is empty', async () => {
    const httpResponse = await sut.handle({ id: '' })

    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 404 if article is not found', async () => {
    const httpResponse = await sut.handle({ id: '1234' })

    expect(httpResponse.statusCode).toEqual(404)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 500 on infra/server error', async () => {
    const error = new Error('any_error')
    listOneArticleService.listOne.mockRejectedValue({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({ id: '1234' })

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 200 if listOneArticleService succeeds', async () => {
    listOneArticleService.listOne.mockResolvedValueOnce(articleStub)
    const httpResponse = await sut.handle({ id: '1' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: articleStub
    })
  })
})
