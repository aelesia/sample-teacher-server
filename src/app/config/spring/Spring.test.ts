import { Sample } from '../../../db/model/Sample'
import { Cfg } from '../Cfg'
import { Spring } from '../Spring'
import { HashDatabase } from '@aelesia/commons/dist/src/aws/dynamodb/HashDatabase'

Spring.DB = new HashDatabase<Sample>(Cfg.DB_SAMPLE)
