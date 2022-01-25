import 'dotenv/config'
import mongoose from 'mongoose'
import { ArticleModel } from '../infra/mongo/models/Article'
import axios from 'axios'
import date from 'date-and-time'

export const updateDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI

  mongoose.connect(MONGO_URI!)
    .then(() => console.log('mongodb connection success'))
    .catch(error => console.log(error))

  let resultData: any[]

  const countUrl = 'https://api.spaceflightnewsapi.net/v3/articles/count'

  const response = await axios.get(countUrl)

  const totalOfArticles = await response.data

  const url = [`https://api.spaceflightnewsapi.net/v3/articles?_limit=${totalOfArticles}`]

  const lastSavedArticle = await ArticleModel.find().sort({ publishedAt: -1 }).limit(1)

  url.map(async url => {
    try {
      const response = await axios.get(url)
      resultData = await response.data
      console.log(`Starting checking ${totalOfArticles} articles, please wait...`)

      for (let i = 0; i < resultData.length; i++) {
        const article = new ArticleModel({
          id: resultData[i].id,
          featured: resultData[i].featured,
          title: resultData[i].title,
          url: resultData[i].url,
          imageUrl: resultData[i].imageUrl,
          newsSite: resultData[i].newsSite,
          summary: resultData[i].summary,
          publishedAt: resultData[i].publishedAt,
          launches: resultData[i].launches,
          events: resultData[i].events
        })

        const apiDate = new Date(resultData[i].publishedAt)
        const lastSavedDate = new Date(lastSavedArticle[0].publishedAt)
        const diff = date.subtract(apiDate, lastSavedDate).toMilliseconds()

        if (diff > 0) {
          article.save(() => {
            console.log(`saved article #${i + 1}`)
          })
        }
      }
      mongoose.disconnect()
        .then(() => console.log('Operation ended successfully and mongodb disconnected'))
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  })
}
