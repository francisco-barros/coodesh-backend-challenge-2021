/* eslint @typescript-eslint/no-var-requires: "off" */
import mongoose from 'mongoose'
const AutoIncrement = require('mongoose-sequence')(mongoose) // mongoose-sequence has no @types

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
  _id: Number,
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

ArticleSchema.plugin(AutoIncrement)

const ArticleModel = mongoose.model('Article', ArticleSchema)

export { ArticleModel }
