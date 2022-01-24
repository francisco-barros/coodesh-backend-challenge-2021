import { mock, MockProxy } from 'jest-mock-extended'
import { CreateArticleRepository } from '../repositories'
import { CreateArticleService } from './CreateArticleService'

describe('CreateArticleService', () => {
  let createArticleRepo: MockProxy<CreateArticleRepository>
  let sut: CreateArticleService
  let input: CreateArticleRepository.Input

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
    input = {
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

    createArticleRepo = mock()
    createArticleRepo.create.mockResolvedValue(articleStub)
  })

  beforeEach(() => {
    sut = new CreateArticleService(createArticleRepo)
  })

  it('should call CreateClassRepository with correct input', async () => {
    await sut.create(input)

    expect(createArticleRepo.create).toHaveBeenCalledWith(input)
    expect(createArticleRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return a Article on success', async () => {
    const article = await sut.create(input)

    expect(article).toEqual(articleStub)
  })

  it('should return null if Article creation fails', async () => {
    createArticleRepo.create.mockResolvedValueOnce(null)
    const article = await sut.create(input)

    expect(article).toBeNull()
  })

  it('should rethrow if createArticleRepo throws', async () => {
    createArticleRepo.create.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.create(input)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
