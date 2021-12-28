import { mock, MockProxy } from 'jest-mock-extended'
import { ListOneArticleRepository } from '../repositories'
import { ListOneArticleService } from '.'

describe('ListOneArticleService', () => {
  let listOneArticleRepo: MockProxy<ListOneArticleRepository>
  let sut: ListOneArticleService
  let input: ListOneArticleRepository.Input

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
    input = { id: 1 }
    listOneArticleRepo = mock()
    listOneArticleRepo.listOne.mockResolvedValue(articleStub)
  })

  beforeEach(() => {
    sut = new ListOneArticleService(listOneArticleRepo)
  })

  it('should call ListOneArticleRepository with correct input', async () => {
    await sut.listOne(input)

    expect(listOneArticleRepo.listOne).toHaveBeenCalledWith(input)
    expect(listOneArticleRepo.listOne).toHaveBeenCalledTimes(1)
  })

  it('should return an Article on success', async () => {
    const article = await sut.listOne(input)

    expect(article).toEqual(articleStub)
  })

  it('should return null if Article is not found', async () => {
    listOneArticleRepo.listOne.mockResolvedValueOnce(null)
    const article = await sut.listOne(input)

    expect(article).toBeNull()
  })

  it('should rethrow if ListOneArticleRepo throws', async () => {
    listOneArticleRepo.listOne.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.listOne(input)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
