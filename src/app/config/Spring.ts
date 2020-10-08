import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { errorHandler, errorProcessing } from '../koa/Koa'
import { Cfg } from './Config'
import { Env } from './env/Env'

export const router = new Router()
export const app = (() => {
  const app = new Koa()

  require('../../controllers/api/APIController')

  app.use(bodyParser()).use(errorHandler).use(router.routes()).use(router.allowedMethods())

  if (Env('ENVIRONMENT') !== 'test') {
    app.on('error', errorProcessing)
    app.listen(Cfg.PORT)
  }

  return app
})()
