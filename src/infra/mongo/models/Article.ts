import mongoose from 'mongoose'

import UUID from 'uuid-int'

const id = 0
const generator = UUID(id) as any

const Schema = mongoose.Schema

const EventSchema = new Schema({
  id: String,
  provider: String
})

const LaunchSchema = new Schema({
  id: String,
  provider: String
})

const ArticleSchema = new Schema({
  _id: { type: Number, default: generator.uuid },
  featured: Boolean,
  title: String,
  url: String,
  imageUrl: String,
  newsSite: String,
  summary: String,
  publishedAt: {
    type: Date,
    default: new Date()
  },
  launches: [LaunchSchema],
  events: [EventSchema]
})

const ArticleModel = mongoose.model('Article', ArticleSchema)

export { ArticleModel }
