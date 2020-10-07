import * as Router from 'koa-router'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

import { _400_CLIENT_ERROR, _409_CONFLICT, _500_SERVER_ERROR } from '../../consts/StatusCodes'
import { IllegalActionError } from '../../errors/Error'

export function errorProcessing(err: Error) {
  console.error(err.message)
}

export const errorHandler: Router.IMiddleware = async (ctx, next) => {
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
}
