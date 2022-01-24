import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from './controller'
import { DeleteArticleController } from './DeleteArticleController'
import { DeleteArticleService } from '../../domain/services/DeleteArticleService'

describe('DeleteArticleController', () => {
  let sut: DeleteArticleController
  let deleteArticleService: MockProxy<DeleteArticleService>

  beforeAll(() => {
    deleteArticleService = mock()
  })

  beforeEach(() => {
    sut = new DeleteArticleController(deleteArticleService)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call deleteArticleService with correct input', async () => {
    const id = '1'
    await sut.handle({ id })

    expect(deleteArticleService.delete).toHaveBeenCalledWith({ id })
    expect(deleteArticleService.delete).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if Article id field is invalid', async () => {
    const httpResponse = await sut.handle({ id: 'invalid id' })

    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 404 if Article id for deletion is not found', async () => {
    const id = '1'
    const httpResponse = await sut.handle({ id })

    expect(httpResponse.statusCode).toEqual(404)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 500 on infra/server error', async () => {
    const id = '1'
    const error = new Error('any_error')

    deleteArticleService.delete.mockRejectedValueOnce({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({ id })

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.data).toBeInstanceOf(Error)
  })

  it('should return 204 if deleteArticleService succeeds', async () => {
    const id = '1'
    deleteArticleService.delete.mockResolvedValueOnce(true)
    const httpResponse = await sut.handle({ id })

    expect(httpResponse.data).toBeTruthy()
    expect(httpResponse.statusCode).toBe(204)
  })
})
