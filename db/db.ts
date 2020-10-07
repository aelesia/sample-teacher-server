import 'reflect-metadata'

import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {})
  .catch((error) => console.error(error))
