import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteArticleRepository } from '../repositories'
import { DeleteArticleService } from './DeleteArticleService'

describe('DeleteArticleService', () => {
  let deleteArticleRepo: MockProxy<DeleteArticleRepository>
  let sut: DeleteArticleService
  let input: DeleteArticleRepository.Input
  const classID = 'any_class_id'

  beforeAll(() => {
    input = {
      id: classID
    }

    deleteArticleRepo = mock()
    deleteArticleRepo.delete.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = new DeleteArticleService(deleteArticleRepo)
  })

  it('should call DeleteArticleRepository with correct input', async () => {
    await sut.delete(input)

    expect(deleteArticleRepo.delete).toHaveBeenCalledWith(input)
    expect(deleteArticleRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('should return true on deletion success', async () => {
    const result = await sut.delete(input)

    expect(result).toBeTruthy()
  })

  it('should return false if Article deletion fails', async () => {
    deleteArticleRepo.delete.mockResolvedValueOnce(false)
    const result = await sut.delete(input)

    expect(result).toBeFalsy()
  })

  it('should rethrow if deleteArticleRepo throws', async () => {
    deleteArticleRepo.delete.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.delete(input)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
