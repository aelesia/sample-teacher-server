import 'dotenv/config'

import express from 'express'

import { _200_OKAY } from './src/consts/StatusCodes'

const app = express()
app.listen(3000, () => console.info(`Server started: 3000`))

app.get('/helloworld', (req, res) => {
  return res.status(_200_OKAY).send({
    message: 'Hello World'
  })
})
