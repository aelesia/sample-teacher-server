import { Regex } from '@aelesia/commons'

import { CreateStudent } from '../controllers/StudentsController'

type uuid = string
type email = string
type name = string

export function validateStudent(params: Partial<CreateStudent>): params is CreateStudent {
  return validateEmail(params.email) && validateName(params.first_name) && validateName(params.last_name)
}

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
