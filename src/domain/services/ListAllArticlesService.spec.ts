import { mock, MockProxy } from 'jest-mock-extended'
import { ListAllArticlesRepository } from '../repositories'
import { ListAllArticlesService } from '.'

describe('ListAllArticlesService', () => {
  let listAllArticlesRepo: MockProxy<ListAllArticlesRepository>
  let sut: ListAllArticlesService
  let input: ListAllArticlesRepository.Input

  const articlesStub = [{
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
  }, {
    id: 2,
    featured: false,
    title: 'other_title',
    url: 'other_url',
    imageUrl: 'other_imageUrl',
    newsSite: 'other_newsSite',
    summary: 'other_sumary',
    publishedAt: new Date(),
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
    input = { page: 1, limit: 1 }
    listAllArticlesRepo = mock()
    listAllArticlesRepo.listAll.mockResolvedValue(articlesStub)
  })

  beforeEach(() => {
    sut = new ListAllArticlesService(listAllArticlesRepo)
  })

  it('should call ListAllArticlesRepository with correct input', async () => {
    await sut.listAll(input)

    expect(listAllArticlesRepo.listAll).toHaveBeenCalledWith(input)
    expect(listAllArticlesRepo.listAll).toHaveBeenCalledTimes(1)
  })

  it('should return Articles on success', async () => {
    const articles = await sut.listAll(input)

    expect(articles).toEqual(articlesStub)
  })

  it('should return null if Articles are not found', async () => {
    listAllArticlesRepo.listAll.mockResolvedValueOnce(null)
    const articles = await sut.listAll(input)

    expect(articles).toBeNull()
  })

  it('should rethrow if listAllArticlesRepo throws', async () => {
    listAllArticlesRepo.listAll.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.listAll(input)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
