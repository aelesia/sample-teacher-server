import { Sample } from '../../../db/model/Sample'
import { Cfg } from '../Cfg'
import { Spring } from '../Spring'
import { FileSystemDatabase } from '@aelesia/commons/dist/src/aws/dynamodb/FileSystemDatabase'

Spring.DB = new FileSystemDatabase<Sample>(Cfg.DB_SAMPLE)
