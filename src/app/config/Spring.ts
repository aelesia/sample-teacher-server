import { Sample } from '../../db/model/Sample'
import { AwsDynamodb } from '@aelesia/commons/dist/src/aws/dynamodb/AwsDynamodb'
import { Cfg } from './Cfg'
import { NoSQLDatabase } from '@aelesia/commons/dist/src/aws/dynamodb/NoSQLDatabase'

export const Spring = {
  DB: new AwsDynamodb<Sample>(Cfg.AWSC_REGION, Cfg.DB_SAMPLE) as NoSQLDatabase<Sample>
}

require('./spring/SpringConfig')

export const DB = Spring.DB
