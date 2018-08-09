describe('middleware/history', () => {
  let history
  const mockPush = jest.fn()
  const nextMock = jest.fn()
  const storeMock = {
    dispatch: jest.fn(),
  }

  beforeEach(() => {
    mockPush.mockReset()
    nextMock.mockReset()
    storeMock.dispatch.mockReset()

    jest.mock('connected-react-router', () => ({
      push: mockPush,
    }))

    history = require('../history').default
  })

  afterEach(() => {
    history = null
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('dispatches next action by default', () => {
    const action = {
      type: 'some-type',
    }
    history(storeMock)(nextMock)(action)
    expect(nextMock).toHaveBeenCalledTimes(1)
  })

  test('dispatches next action after pushing a new history', () => {
    const action = {
      args: { hash: '#some-hash' },
      path: '/path-1',
      type: 'NAVIGATE',
    }
    history(storeMock)(nextMock)(action)
    expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith({ hash: '#some-hash', pathname: '/path-1' })
    expect(nextMock).toHaveBeenCalledTimes(1)
  })

  test('adds a slash to an "invalid" path', () => {
    const action = {
      path: 'path-1',
      type: 'NAVIGATE',
    }
    history(storeMock)(nextMock)(action)
    expect(mockPush).toHaveBeenCalledWith({ pathname: '/path-1' })
  })

  test('does not dispach when path is not set', () => {
    const action = {
      path: undefined,
      type: 'NAVIGATE',
    }
    history(storeMock)(nextMock)(action)
    expect(storeMock.dispatch).toHaveBeenCalledTimes(0)
    expect(nextMock).toHaveBeenCalledTimes(1)
  })
})
