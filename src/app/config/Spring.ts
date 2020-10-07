import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { Cfg } from './Config'
import { Env } from './env/Env'

export const router = new Router()
export const app = (() => {
  const app = new Koa()

  require('../../controllers/APIController')
  require('../../controllers/StudentsController')

  app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

  if (Env('ENVIRONMENT') !== 'test') {
    app.listen(Cfg.PORT)
  }

  return app
})()
