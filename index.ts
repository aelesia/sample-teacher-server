import 'dotenv/config'

import Koa from 'koa'
import Router from 'koa-router'

import { Cfg } from './src/app/config/Config'
import { _200_OKAY } from './src/consts/StatusCodes'

const app = new Koa()
const router = new Router()

app.listen(Cfg.PORT)

router.get('/', (ctx, next) => {
  ctx.status = _200_OKAY
  ctx.body = {
    message: 'hello world',
  }
})

app.use(router.routes()).use(router.allowedMethods())
