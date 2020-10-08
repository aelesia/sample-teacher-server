import 'reflect-metadata'

import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    console.info('DB Connection Initialized')
  })
  .catch((error) => console.error(error))
