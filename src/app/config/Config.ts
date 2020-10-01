import { Env } from './env/Env'

export const Cfg = new (class {
  PORT = Env('PORT')
})()
