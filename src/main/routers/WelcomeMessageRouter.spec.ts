import request from 'supertest'
import { app } from '../../app'

describe('WelcomeMessageRouter', () => {
  it('should be able to show welcome message', async () => {
    const welcomeMessage = 'Back-end Challenge 2021 🏅 - Space Flight News'

    const response = await request(app)
      .get('/api/v1/')
      .expect(200)
      .send()

    expect(response?.body).toBe(welcomeMessage)
  })
})
