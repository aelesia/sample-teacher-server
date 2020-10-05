export class BaseEntity<T> {
  constructor(initialValue?: Partial<T>) {
    if (initialValue) {
      Object.keys(initialValue).forEach((it) => {
        // @ts-ignore
        this[it] = initialValue[it]
      })
    }
  }
}
