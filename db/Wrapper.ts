import { FindOperator, In as typeormIn } from 'typeorm'

/**
 * Apparently TypeORM doesn't like it when you do an 'In' query with an empty array
 * This function automatically wraps it with a [null] if the length is 0
 */
export function In<T>(value: T[] | FindOperator<T>): FindOperator<T> {
  if (value instanceof Array && value.length === 0) {
    return typeormIn([null as any])
  }
  return typeormIn(value)
}
