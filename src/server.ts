import 'dotenv/config'
import mongoose from 'mongoose'

import { app } from './app'

const MONGO_URI = process.env.MONGO_URI as string

mongoose.connect(MONGO_URI)
  .then(_result => app.listen(process.env.PORT, () => console.log(`Server running at port ${process.env.PORT}.`)))
  .catch(err => console.log(err))
