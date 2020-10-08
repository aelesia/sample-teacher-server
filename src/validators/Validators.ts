import { Regex } from '@aelesia/commons'
import { IllegalArgumentErr } from '@aelesia/commons/dist/src/error/Error'

export function validateUUID(value: unknown): void {
  if (typeof value !== 'string' || value.length !== 36) {
    throw new IllegalArgumentErr(`${value} is not a uuid`)
  }
}

export function validateEmail(value: unknown): void {
  if (typeof value !== 'string' || !Regex.is.email(value)) {
    throw new IllegalArgumentErr(`${value} is not a valid email address`)
  }
  return
}

export function isString(value: unknown): void {
  if (typeof value !== 'string') {
    throw new IllegalArgumentErr(`${value} is not a valid string`)
  }
  return
}

export function isRequired(value: unknown): void {
  if (value == null) {
    throw new IllegalArgumentErr(`${value} is required`)
  } else if (value instanceof Array && value.length > 0) {
    throw new IllegalArgumentErr(`${value} is required`)
  }
  return
}

export function isArray(value: unknown): void {
  if (!(value instanceof Array)) {
    throw new IllegalArgumentErr(`${value} is not an array`)
  }
}
