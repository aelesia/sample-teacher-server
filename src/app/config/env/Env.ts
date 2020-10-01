import { env, envJSON } from './_Env'

type EnvType = {
  PORT: number
  DEBUG: boolean
  TEST: string
}

export const EnvStr = env<EnvType>()
export const Env = envJSON<EnvType>()
