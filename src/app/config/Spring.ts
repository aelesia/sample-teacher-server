import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { errorHandler, errorProcessing } from '../koa/Koa'
import { Cfg } from './Config'

export const router = new Router()
export const app = (() => {
  const koa = new Koa()

  require('../../controllers/api/APIController')

  koa.use(bodyParser()).use(errorHandler).use(router.routes()).use(router.allowedMethods())

  if (Cfg.ENVIRONMENT !== 'test') {
    koa.on('error', errorProcessing)
  }

  return koa
})()
