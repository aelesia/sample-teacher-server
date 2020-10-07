import 'dotenv/config'

import { initRepositories } from './db/repository/Repository'
;(async () => {
  await initRepositories()
})()
