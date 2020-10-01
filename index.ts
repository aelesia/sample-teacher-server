import 'dotenv/config'

import express from 'express'

import { Cfg } from './src/app/config/Config'
import { _200_OKAY } from './src/consts/StatusCodes'

const app = express()

app.listen(Cfg.PORT, () => console.info(`Server started: ${Cfg.PORT}`))

app.get('/helloworld', (req, res) => {
  return res.status(_200_OKAY).send({
    message: 'Hello World',
  })
})
