/* eslint-disable */
import React from 'react'
import { createBrowserHistory, createHashHistory } from 'history'
export * from './react-router'
import { Router } from './react-router'

/**
 * @author lihh
 * @description hash路由的实现方式
 * @param {*} children 传递的子类
 */
export function HashRouter({ children }) {
  const historyRef = React.useRef()
  // 直接创建hash路由模式
  if (!historyRef.current) {
    historyRef.current = createHashHistory()
  }
  const history = historyRef.current

  // 设置路由的action/ location状态
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  })

  // 直接监听函数
  React.useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

/**
 * @author lihh
 * @description 直接是基于h5 historyAPI来创建路由
 * @param {*} children 创建路由传递的子元素
 */
export function BrowserRouter({ children }) {
  const historyRef = React.useRef()
  if (!historyRef.current) {
    historyRef.current = createBrowserHistory()
  }

  const history = historyRef.current
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  })

  React.useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}
