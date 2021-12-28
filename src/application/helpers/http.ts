
export interface HttpResponse<T = any> {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const created = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 201,
  data
})

export const noContent = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 204,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  data: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: error
})
