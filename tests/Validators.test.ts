import {
  validateEmail,
  validateNotEmpty,
  validateRequired,
  validateString,
  validateUUID,
} from '../src/validators/Validators'

describe('Validators', () => {
  test('validateUUID', () => {
    expect(() => validateUUID('3ffc6ab8-a475-4c92-977d-beda44eb8fc9')).not.toThrowError()
    expect(() => validateUUID('3FFC6AB8-A475-4C92-977D-BEDA44EB8FC9')).not.toThrowError()
    expect(() => validateUUID('3FFC6AB8-A475-4C92-977D-BEDA44EB8FC')).toThrowError()
    expect(() => validateUUID('FFC6AB8-A475-4C92-977D-BEDA44EB8FC9')).toThrowError()
    expect(() => validateUUID(123456 as any)).toThrowError()
  })

  test('validateEmail', () => {
    expect(() => validateEmail('someone@gmail.com')).not.toThrowError()
    expect(() => validateEmail('someoneatgmail.com')).toThrowError()
    expect(() => validateEmail(123456 as any)).toThrowError()
  })

  test('validateString', () => {
    expect(() => validateString('someone@gmail.com')).not.toThrowError()
    expect(() => validateString('')).not.toThrowError()
    expect(() => validateString('someoneatgmail.com')).not.toThrowError()
    expect(() => validateString(123456 as any)).toThrowError()
    expect(() => validateString(true as any)).toThrowError()
    expect(() => validateString(false as any)).toThrowError()
    expect(() => validateString(undefined as any)).toThrowError()
    expect(() => validateString(null as any)).toThrowError()
    expect(() => validateString([] as any)).toThrowError()
    expect(() => validateString({} as any)).toThrowError()
    expect(() => validateString((() => {}) as any)).toThrowError()
  })

  test('validateRequired', () => {
    const value = {
      string: 'string',
      number: 0,
      float: 3.14159265,
      booleanTrue: true,
      booleanFalse: false,
      null: null,
      undefined: undefined,
      func: () => {},
      object: {},
      array: [],
    }
    expect(() => validateRequired(value, 'string')).not.toThrowError()
    expect(() => validateRequired(value, 'number')).not.toThrowError()
    expect(() => validateRequired(value, 'float')).not.toThrowError()
    expect(() => validateRequired(value, 'booleanTrue')).not.toThrowError()
    expect(() => validateRequired(value, 'booleanFalse')).not.toThrowError()
    expect(() => validateRequired(value, 'object')).not.toThrowError()
    expect(() => validateRequired(value, 'array')).not.toThrowError()
    expect(() => validateRequired(value, 'func')).not.toThrowError()
    expect(() => validateRequired(value, 'null')).toThrowError()
    expect(() => validateRequired(value, 'undefined')).toThrowError()
    // @ts-ignore
    expect(() => validateRequired(value, 'doesnotexist')).toThrowError()
  })

  test('validateNotEmpty', () => {
    expect(() => validateNotEmpty(['string'])).not.toThrowError()
    expect(() => validateNotEmpty([0, 1, 2, 3])).not.toThrowError()
    expect(() => validateNotEmpty([true, false])).not.toThrowError()
    expect(() => validateNotEmpty([['string'], [0, 1, 2, 3]])).not.toThrowError()
    expect(() => validateNotEmpty([{}])).not.toThrowError()
    expect(() => validateNotEmpty([null])).not.toThrowError()
    expect(() => validateNotEmpty([undefined])).not.toThrowError()
    expect(() => validateNotEmpty([{}])).not.toThrowError()
    expect(() => validateNotEmpty([])).toThrowError()
    expect(() => validateNotEmpty({} as any)).toThrowError()
    expect(() => validateNotEmpty('string' as any)).toThrowError()

    expect(() => validateNotEmpty(['string'], validateString)).not.toThrowError()
    expect(() => validateNotEmpty([0, 1, 2, 3], validateString)).toThrowError()
    expect(() => validateNotEmpty(['a', 'b', 'c', 1, 2, 3], validateString)).toThrowError()
  })
})
