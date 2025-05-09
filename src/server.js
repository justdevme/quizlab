import express from 'express'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb.js'
import { APIs_V1} from './routes/index.js'
import { env } from './config/environment.js'
import exitHook from 'async-exit-hook'
import cors from 'cors'

// eslint-disable-next-line no-unused-vars
const START_SERVER = () => {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  //app.use(errorHandlingMiddleware)


  app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${ env.LOCAL_DEV_APP_HOST }:${ env.LOCAL_DEV_APP_PORT }/`)
  })
  exitHook(() => {
    console.log('4. Disconnecting from MongoDB Cloud Atlas')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas')
  })
}

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })
