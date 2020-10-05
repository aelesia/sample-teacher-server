import 'dotenv/config'

import bodyParser from 'koa-bodyparser'

import { initRepositories } from './db/repository/Repository'
import { Cfg } from './src/app/config/Config'
import { app, router } from './src/app/config/Spring'

require('./src/controllers/StudentsController')
;(async () => {
  await initRepositories()
  app.listen(Cfg.PORT)
  app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())
})()
