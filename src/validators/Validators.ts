import { Regex } from '@aelesia/commons'
import { IllegalArgumentErr } from '@aelesia/commons/dist/src/error/Error'

export function validateUUID(value: string): void
export function validateUUID(value: unknown): void {
  if (typeof value !== 'string' || value.length !== 36) {
    throw new IllegalArgumentErr(`${value} is not a uuid`)
  }
}

export function validateEmail(value: string): void
export function validateEmail(value: unknown): void {
  if (typeof value !== 'string' || !Regex.is.email(value)) {
    throw new IllegalArgumentErr(`${value} is not a valid email address`)
  }
  return
}

export function validateString(value: string): void
export function validateString(value: unknown): void {
  if (typeof value !== 'string') {
    throw new IllegalArgumentErr(`${value} is not a valid string`)
  }
  return
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function validateRequired(value: string | number | boolean | Object): void
export function validateRequired(value: unknown): void {
  if (value == null) {
    throw new IllegalArgumentErr(`${value} is required`)
  }
  return
}

export function validateNotEmpty(value: Array<any>, validateFn?: (unknown: any) => void): void
export function validateNotEmpty(value: unknown, validateFn?: (unknown: unknown) => void): void {
  if (!(value instanceof Array)) {
    throw new IllegalArgumentErr(`${value} is not an array`)
  }
  if (value.length < 1) {
    throw new IllegalArgumentErr(`${value} must not be empty`)
  }
  value.forEach((it) => validateFn?.(it))
}
