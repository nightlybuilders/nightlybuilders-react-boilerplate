// NOTE: even when one promise fails, the other will still execute.
// https://gist.github.com/natterstefan/f8bd542713b8a65256c8d887a45376f8
export const promiseAll = async promiseArray => Promise.all(promiseArray.map(p => p.catch(e => e)))
