import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

import { _400_CLIENT_ERROR, _409_CONFLICT, _500_SERVER_ERROR } from '../../consts/StatusCodes'
import { IllegalActionError } from '../../errors/Error'
import { Cfg } from './Config'
import { Env } from './env/Env'

export const router = new Router()
export const app = (() => {
  const app = new Koa()

  require('../../controllers/APIController')
  require('../../controllers/StudentsController')

  app
    .use(bodyParser())
    .use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        if (err instanceof EntityNotFoundError) {
          ctx.status = _400_CLIENT_ERROR
          ctx.body = {
            error: {
              name: err.name,
              message: err.message.split('\n')[0],
            },
          }
        } else if (err instanceof IllegalActionError) {
          ctx.status = _409_CONFLICT
          ctx.body = {
            error: {
              name: err.name,
              message: err.message,
            },
          }
        } else {
          ctx.status = _500_SERVER_ERROR
          ctx.body = {
            error: {
              name: err.name,
              message: err.message,
            },
          }
        }
        ctx.app.emit('error', err, ctx)
      }
    })
    .use(router.routes())
    .use(router.allowedMethods())

  app.on('error', (err, ctx) => {
    console.error(err.message)
  })

  if (Env('ENVIRONMENT') !== 'test') {
    app.listen(Cfg.PORT)
  }

  return app
})()
