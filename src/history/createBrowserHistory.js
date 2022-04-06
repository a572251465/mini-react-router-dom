/* eslint-disable */
function createBrowserHistory() {
  const globalHistory = window.history
  let listeners = []
  let state

  const listen = (fn) => {
    listeners.push(fn)
    return () => {
      listeners = listeners.filter((item) => item !== fn)
    }
  }

  function go(n) {
    globalHistory.go(n)
  }

  function goBack() {
    go(-1)
  }

  function goForward() {
    go(1)
  }

  function notify(newState) {
    Object.assign(history, newState)
    history.length = globalHistory.length

    listeners.forEach((listener) =>
      listener({ location: history.location, action: history.action })
    )
  }

  // 监听popstate 一旦触发了go/ goBack/ goForWard/ 浏览器前进后退的方法 直接触发notify方法
  window.addEventListener('popstate', () => {
    const location = {
      state: globalHistory.state,
      pathname: window.location.pathname
    }
    notify({ action: 'POP', location })
  })

  function push(pathname, nextState) {
    const action = 'PUSH'
    if (typeof pathname === 'object') {
      state = pathname.state
      pathname = pathname.pathname
    } else {
      state = nextState
    }

    globalHistory.pushState(state, null, pathname)
    const location = { action, pathname }
    notify({ action, location })
  }

  const history =  {
    action: 'POP',
    go,
    goBack,
    goForward,
    push,
    listen,
    location: {
      pathname: window.location.pathname,
      state: window.location.state
    }
  }

  return history
}

export default createBrowserHistory
