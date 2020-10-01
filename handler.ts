import { LambdaAPI } from '@aelesia/commons/dist/src/aws/lambda/LambdaAPI'
import * as lambda from './src/lambda/Lambda'

export const _insert = LambdaAPI(lambda.insert)
export const _update = LambdaAPI(lambda.update)
export const _del = LambdaAPI(lambda.del)
export const _select = LambdaAPI(lambda.select)
export const _scan = LambdaAPI(lambda.scan)
