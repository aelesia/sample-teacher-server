type uuid = string
type email = string
type name = string

export function validateUUID(value: unknown): value is uuid {
  if (typeof value === 'string' && value.length === 36) {
    return true
  }
  return false
}

export function validateEmail(value: unknown): value is email {
  if (typeof value === 'string' && value.includes('@') && value.includes('.')) {
    return true
  }
  return false
}

export function validateName(value: unknown): value is name {
  if (typeof value === 'string') {
    return true
  }
  return false
}

export function isString(value: unknown): value is string {
  if (typeof value === 'string') {
    return true
  }
  return false
}

export function isStringArray(value: unknown): value is string[] {
  if (!(value instanceof Array)) {
    return false
  } else if (value.length > 0 && typeof value[0] !== 'string') {
    return false
  }
  return true
}
