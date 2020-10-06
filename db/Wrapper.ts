import { FindOperator, In as typeormIn } from 'typeorm'

export function In<T>(value: T[] | FindOperator<T>): FindOperator<T> {
  if (value instanceof Array && value.length === 0) {
    return typeormIn([null as any])
  }
  return typeormIn(value)
}
