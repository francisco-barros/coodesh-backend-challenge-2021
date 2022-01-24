import express from 'express'
import { urlencoded } from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { ListOneArticleRouter, ListAllArticlesRouter, CreateArticleRouter } from './main/routers'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(urlencoded({ extended: false }))
app.use(helmet())

ListOneArticleRouter(app)
ListAllArticlesRouter(app)
CreateArticleRouter(app)

export { app }
