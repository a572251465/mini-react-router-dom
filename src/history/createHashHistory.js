/* eslint-disable */
function createHashHistory() {
  let stack = []
  let index = -1
  let action = 'POP'
  let state
  let listeners = []

  function listen(fn) {
    listeners.push(fn)

    return () => {
      listeners = listeners.filter((listener) => listener !== fn)
    }
  }

  function go(n) {
    action = 'POP'
    index += n
    const nextLocation = stack[index]
    state = nextLocation.state
    window.location.hash = nextLocation.pathname
  }

  function goBack() {
    go(-1)
  }

  function goForWard() {
    go(1)
  }

  function push(pathname, nextState) {
    action = 'PUSH'
    if (typeof pathname === 'object') {
      state = pathname.state
      pathname = pathname.pathname
    } else {
      state = nextState
    }

    window.location.hash = pathname
  }

  function hashChangeHandler() {
    const pathname = window.location.hash.slice(1)
    Object.assign(history, { action, location: { pathname, state } })
    if (action === 'PUSH') {
      stack[++index] = history.location
    }
    listeners.forEach((listener) => listener({ location: history.location }))
  }

  window.addEventListener('hashchange', hashChangeHandler)

  const history = {
    action: 'POP',
    listen,
    go,
    goBack,
    goForWard,
    push,
    location: { pathname: '/', state: undefined }
  }

  if (window.location.hash) {
    action = 'PUSH'
    hashChangeHandler()
  } else {
    window.location.hash = '/'
  }

  return history
}

export default createHashHistory
