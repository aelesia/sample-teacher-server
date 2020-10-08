import 'dotenv/config'

import { initRepositories } from './db/repository/Repository'
import { Cfg } from './src/app/config/Config'
import { app } from './src/app/config/Spring'
;(async () => {
  await initRepositories()
  app.listen(Cfg.PORT)
  console.info(`Server started on port ${Cfg.PORT}`)
})()
