const actions = {
  CHANGE_CACHEBUSTER: 'CHANGE_CACHEBUSTER',
  CHANGE_COUNTER: 'CHANGE_COUNTER',
}

const changeCounter = data => ({ type: actions.CHANGE_COUNTER, data })

const changeCachebuster = data => ({ type: actions.CHANGE_CACHEBUSTER, data })

export { actions, changeCounter, changeCachebuster }
