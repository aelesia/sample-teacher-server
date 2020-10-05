import { UninitializedErr } from '@aelesia/commons/dist/src/error/Error'
import { Repository } from 'typeorm'

export class UninitiatedRepository extends Repository<any> {
  createQueryBuilder(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  hasId(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  getId(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  create(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  merge(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  preload(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  save(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  remove(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  softRemove(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  recover(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  insert(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  update(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  delete(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  softDelete(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  restore(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  count(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  find(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  findAndCount(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  findByIds(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  findOne(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  findOneOrFail(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  query(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  clear(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  increment(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }

  decrement(): never {
    throw new UninitializedErr("Repository not initialized. Did you forget to await 'initRepositories()' first?")
  }
}
