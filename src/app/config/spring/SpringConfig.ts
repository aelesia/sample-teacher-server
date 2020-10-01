import { Cfg } from '../Cfg'

if (process.env['NODE_ENV'] === 'test' || Cfg.ENVIRONMENT === 'test') {
  require('./Spring.test')
} else if (Cfg.ENVIRONMENT === 'local') {
  require('./Spring.local')
}
