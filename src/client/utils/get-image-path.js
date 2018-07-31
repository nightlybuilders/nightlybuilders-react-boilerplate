const cachebuster = Math.random()

export const getImagePath = src => {
  // if the src contains http, we assume it is pointing to an external host and
  // return the src right away
  if (src.indexOf('http') >= 0) {
    return src
  }

  // TODO:
  // - find proper way to keep cachebuster in sync with client and ssr
  //   eg. on window.__GLOBALS__.currentVersion or in the redux store
  // - find way to fix url in storybook stories
  return `/__static__/${cachebuster}/images/${src}`
}
