import { Err, Str } from '@aelesia/commons'

type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]

export function envJSON2(envKey: string): any {
  const envvar = process.env[envKey]
  if (envvar == null || envvar === '') {
    if (process.env['NODE_ENV'] === 'test' || process.env['ENVIRONMENT'] === 'test') {
      return 'TEST_ENV_VAR'
    }
    throw new Err.UninitializedErr(`[Config.${envKey}] Not set in .env`)
  }
  if (
    (envvar[0] === '{' && envvar[envvar.length - 1] === '}') ||
    (envvar[0] === '[' && envvar[envvar.length - 1] === ']')
  ) {
    return JSON.parse(envvar)
  }
  return envvar
}

export function env<T>() {
  return (key: KeysMatching<T, string>): string => {
    const envvar = process.env[key as any]
    if (envvar == null || envvar === '') {
      if (process.env['NODE_ENV'] === 'test' || process.env['ENVIRONMENT'] === 'test') {
        return 'TEST_ENV_VAR'
      }
      throw new Err.UninitializedErr(`[${key}] Not set in .env`)
    }
    return envvar as string
  }
}

export function envJSON<T>() {
  return <K extends keyof T>(key: K): T[K] => {
    const envvar = process.env[key as any]
    if (envvar == null || envvar === '') {
      if (process.env['NODE_ENV'] === 'test' || process.env['ENVIRONMENT'] === 'test') {
        // Force return string only in testing environment
        return 'TEST_ENV_VAR' as any
      }
      throw new Err.UninitializedErr(`[${key}] Not set in .env`)
    }
    if (
      // JSON.parse if item is an object, array, boolean or number
      (envvar[0] === '{' && envvar[envvar.length - 1] === '}') ||
      (envvar[0] === '[' && envvar[envvar.length - 1] === ']') ||
      envvar === 'true' ||
      envvar === 'false' ||
      Str.isNum(envvar)
    ) {
      return JSON.parse(envvar)
    }
    // Return string otherwise
    return envvar as any
  }
}
