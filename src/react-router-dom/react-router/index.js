import React from 'react'

// 导航上下文
const NavigationContext = React.createContext({})
// 路径上下文
const LocationContext = React.createContext({})
// 路由上下文
const RouteContext = React.createContext({})

export { NavigationContext, LocationContext, RouteContext }

/**
 * @author lihh
 * @description 路由的实现方式
 * @param {*} children 传递的children子类
 * @param {*} location 路径地址
 * @param {*} navigator 导航对象
 */
export function Router({ children, location, navigator }) {
  const navigatorContext = React.useMemo(() => ({ navigator }), [navigator])
  const locationContext = React.useMemo(() => ({ location }), [location])

  // 通过如下写法 子组件获取到父类设置的navigator 以及location
  return (
    <NavigationContext.Provider value={navigatorContext}>
      <LocationContext.Provider value={locationContext} children={children} />
    </NavigationContext.Provider>
  )
}

export function Routes({ children }) {
  return useRoutes(createRoutesFromChildren(children))
}

export function useLocation() {
  return React.useContext(LocationContext).location
}

export function useRoutes(routes) {
  const location = useLocation()
  const pathname = location.pathname || '/'

  let i = 0
  for (; i < routes.length; i += 1) {
    const { path, element } = routes[i]
    const match = matchPath(path, pathname)
    if (match) return element
  }

  return null
}

/**
 * @author lihh
 * @description 将所有的路径以及组件 放置到数组中
 * @param {*} children 组件
 * @returns
 */
export function createRoutesFromChildren(children) {
  const routes = []
  React.Children.forEach(children, (element) => {
    routes.push({
      path: element.props.path,
      element: element.props.element
    })
  })

  return routes
}

export function Route(props) {}

/**
 * @author lihh
 * @description 这个方法主要是为了匹配路径是否正确的
 * @param {*} path 匹配的路径地址
 * @returns
 */
function compilePath(path) {
  let paramNames = []
  let regexpSource =
    '^' +
    path.replace(/:(\w+)/g, (_, key) => {
      paramNames.push(key)
      return '([^\\/]+)'
    })
  regexpSource += '$'
  let matcher = new RegExp(regexpSource)
  return [matcher, paramNames]
}

/**
 * @author lihh
 * @description 用来匹配路径的
 * @param {*} path 组件中传递的参数path
 * @param {*} pathname 真实的路由地址
 */
export function matchPath(path, pathname = '') {
  const [matcher, paramNames] = compilePath(path)
  const match = pathname.match(matcher)

  if (!match) return null
  const matchedPathname = match[0]
  const values = match.slice(1)
  const params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = values[index]
    return memo
  }, {})
  return {
    params,
    pathname: matchedPathname,
    path
  }
}

/**
 * @author lihh
 * @description 获取路由使用的history
 * @returns {(function(*): void)|*}
 */
export function useNavigate() {
  const { navigator } = React.useContext(NavigationContext)
  const navigate = React.useCallback(
    (to) => {
      navigator.push(to)
    },
    [navigator]
  )
  return navigate
}
