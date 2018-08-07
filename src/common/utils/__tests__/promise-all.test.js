import { promiseAll } from '../promise-all'

describe('common/utils promiseAll', () => {
  test('returns the result of the promises, including errors', async () => {
    const promises = [
      Promise.resolve(1),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error('reject')), 2000)),
    ]

    const result = await promiseAll(promises)
    expect(result).toEqual([1, new Error('reject')])
  })
})
