import { Env } from './env/Env'

export const Cfg = new (class {
  DB_NAME = 'sample-teacher-server'
  PORT = Env('PORT')
})()
