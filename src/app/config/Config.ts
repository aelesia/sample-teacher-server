import { Env, EnvStr } from './env/Env'

export const Cfg = new (class {
  DEBUG = Env('DEBUG')
  ENVIRONMENT = EnvStr('ENVIRONMENT')
  PORT = Env('PORT')
})()
