import fetch from 'cross-fetch'
import assign from 'lodash.assign'
import dbg from 'debug'

const debug = dbg('nb:client')

const defaultOptions = {
  method: 'GET',
}

export class ApiClient {
  constructor(basePath) {
    this.basePath = basePath
  }

  fetch = async (path = '/', options) => {
    try {
      const requestOptions = assign({}, defaultOptions, options)
      const res = await fetch(`${this.basePath}${path}`, requestOptions)

      if (res.status >= 400) {
        debug(`Bad response from server ${this.basePath}${path}`, res.status)
        throw new Error(`Bad response from server ${this.basePath}${path}`, res.status)
      }

      const result = await res.json()
      return { [path.slice(1)]: result }
    } catch (e) {
      debug(e)
      return e
    }
  }
}
