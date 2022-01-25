import 'dotenv/config'
import mongoose from 'mongoose'
import {cronDatabaseUpdate} from './database-seed/updateDatabaseCron'

import { app } from './app'

const MONGO_URI = process.env.MONGO_URI as string

mongoose.connect(MONGO_URI)
  .then(async _result => {
    await cronDatabaseUpdate()
    app.listen(process.env.PORT, () => console.log(`Server running at port ${process.env.PORT}.`))
    }
  )
  .catch(err => console.log(err))
