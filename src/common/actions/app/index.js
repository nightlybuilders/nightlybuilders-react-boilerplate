const actions = {
  CHANGE_CACHEBUSTER: 'CHANGE_CACHEBUSTER',
  CHANGE_COUNTER: 'CHANGE_COUNTER',
}

const changeCounter = data => ({ data, type: actions.CHANGE_COUNTER })

const changeCachebuster = data => ({ data, type: actions.CHANGE_CACHEBUSTER })

export { actions, changeCounter, changeCachebuster }
