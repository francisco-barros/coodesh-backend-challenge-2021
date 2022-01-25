import { mock, MockProxy } from 'jest-mock-extended'
import { UpdateArticleRepository } from '../repositories'
import { UpdateArticleService } from './UpdateArticleService'

describe('UpdateArticleService', () => {
  let updateArticleRepo: MockProxy<UpdateArticleRepository>
  let sut: UpdateArticleService
  let input: UpdateArticleRepository.Input

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
    input = { id: 1, title: 'new_title' }

    updateArticleRepo = mock()
    updateArticleRepo.update.mockResolvedValue(articleStub)
  })

  beforeEach(() => {
    sut = new UpdateArticleService(updateArticleRepo)
  })

  it('should call UpdateArticleRepository with correct input', async () => {
    await sut.update(input)

    expect(updateArticleRepo.update).toHaveBeenCalledWith(input)
    expect(updateArticleRepo.update).toHaveBeenCalledTimes(1)
  })

  it('should return an article on success', async () => {
    const article = await sut.update(input)

    expect(article).toEqual(articleStub)
  })

  it('should return null if Article update fails', async () => {
    updateArticleRepo.update.mockResolvedValueOnce(null)
    const article = await sut.update(input)

    expect(article).toBeNull()
  })

  it('should rethrow if updateArticleRepo throws', async () => {
    updateArticleRepo.update.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.update(input)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
