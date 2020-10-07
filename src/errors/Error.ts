import { NotImplementedErr } from '@aelesia/commons/dist/src/error/Error'
import { EntityTarget } from 'typeorm'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

/**
 * Errors in this class are due to bad user inputs
 */
export class ClientError extends Error {
  constructor(msg?: string) {
    super(`${msg ?? ''}`)
    this.name = 'ClientError'
    Object.setPrototypeOf(this, NotImplementedErr.prototype)
  }
}

/**
 * The action cannot be completed in its present state
 * (eg. a post cannot be edited after it has been locked)
 */
export class IllegalActionError extends ClientError {
  constructor(msg?: string) {
    super(`IllegalActionError: ${msg ?? ''}`)
    this.name = 'IllegalActionError'
    Object.setPrototypeOf(this, IllegalActionError.prototype)
  }
}

export class EntityOneOrMoreNotFoundError<T extends EntityTarget<any>> extends EntityNotFoundError {
  constructor(entityClass: EntityTarget<any>, message: string) {
    super(entityClass, message)
    this.name = 'EntityOneOrMoreNotFoundError'
    // @ts-ignore
    this.message = `Entity ${entityClass['name']}: ${message}`
    Object.setPrototypeOf(this, EntityNotFoundError.prototype)
  }
}
