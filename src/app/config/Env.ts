import { Cfg } from './Cfg'

require('dotenv')

export const Env = {
  AWSC_REGION: env('AWSC_REGION'),
  ENVIRONMENT: env('ENVIRONMENT'),
  DB_SAMPLE: envAWSResource('DB_SAMPLE')
}

export function envAWSResource(resource: string): string {
  return `${env('SERVICE')}-${env('ENVIRONMENT')}-${env(resource)}`
}

export function env(env: string): string {
  const envvar = process.env[env]
  if (envvar == null || envvar === '') {
    if (process.env['NODE_ENV'] === 'test' || Cfg.ENVIRONMENT === 'test') {
      return 'TEST_ENV_VAR'
    }
    console.warn(`[Config.${env}] Not set in .env`)
  }
  return envvar as string
}
