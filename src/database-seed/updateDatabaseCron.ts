import {updateDatabase} from './updateDatabase'
import cron from 'node-cron'

export const cronDatabaseUpdate = async () =>{
  cron.schedule('0 9 * * *', async () => {
    console.log('Running database update task every 9am')
    await updateDatabase()
  },{
    scheduled: true,
    timezone: "America/Sao_Paulo"
  })
}

