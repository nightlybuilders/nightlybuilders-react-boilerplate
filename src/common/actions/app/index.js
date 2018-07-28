const actions = {
  CHANGE_COUNTER: 'CHANGE_COUNTER',
}

const changeCounter = change => ({ type: actions.CHANGE_COUNTER, data: { change } })

export { actions, changeCounter }
