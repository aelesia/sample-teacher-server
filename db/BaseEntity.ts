type Unpromisify<T> = {
  [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P]
}

export class BaseEntity<T> {
  constructor(initialValue?: Partial<Unpromisify<T>>) {
    if (initialValue) {
      Object.keys(initialValue).forEach((it) => {
        // @ts-ignore
        this[it] = initialValue[it]
      })
    }
  }
}
