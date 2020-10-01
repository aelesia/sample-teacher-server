import { testUtil } from '../src/utils/Util.test'

describe('Test', () => {
  test('Returns correct value', async () => {
    expect(testUtil()).toEqual('test')
  })

  test('Double check', async () => {
    expect(testUtil()).not.toEqual('tset')
  })
})
