import 'dotenv/config'
import mongoose from 'mongoose'
import { ArticleModel } from '../infra/mongo/models/Article'
import axios from 'axios'

(async () => {
  const MONGO_URI = process.env.MONGO_URI

  mongoose.connect(MONGO_URI!)
    .then(() => console.log('mongodb connection success'))
    .catch(error => console.log(error))

  let resultData: any[]
  let saveCounter = 0

  const countUrl = 'https://api.spaceflightnewsapi.net/v3/articles/count'

  const response = await axios.get(countUrl)

  const totalOfArticles = await response.data

  const url = [`https://api.spaceflightnewsapi.net/v3/articles?_limit=${totalOfArticles}`]

  url.map(async url => {
    try {
      const response = await axios.get(url)
      resultData = await response.data
      console.log(`Starting seeding ${totalOfArticles} articles to database, please wait...`)

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

        article.save(() => {
          console.log(`saved article #${i + 1}`)

          saveCounter++

          if (saveCounter === resultData.length) {
            mongoose.disconnect()
              .then(() => console.log('saved succesfully and mongodb disconnected'))
              .catch(error => console.log(error))
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
