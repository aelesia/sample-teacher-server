import { insert, select } from '../src/lambda/Lambda'
import { FakerFactory } from '@aelesia/commons'
import { Sample } from '../src/db/model/Sample'
import faker from 'faker'

const SampleDataFactory = new FakerFactory(
  (): Sample => {
    return {
      id: faker.random.uuid(),
      value: faker.random.word()
    }
  }
)

describe('Lambda', () => {
  const first = SampleDataFactory.new({ id: '1' })
  const second = SampleDataFactory.new({ id: '2' })
  const third = SampleDataFactory.new({ id: '3' })

  test('insert', async () => {
    await insert(first)
    await insert(second)
    await insert(third)
  })

  test('select', async () => {
    expect(await select({ id: '1' })).toEqual(first)
    expect(await select({ id: '2' })).toEqual(second)
    expect(await select({ id: '3' })).toEqual(third)
  })
})
