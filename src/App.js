import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
  Link
} from './react-router-dom'

import Home from './components/Home'
import Prefile from './components/Prefile'
import User from './components/User'
import Post from './components/Post'

function App() {
  return (
    <HashRouter>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/user">用户管理</Link>
        </li>
        <li>
          <Link to="/prefile">个人中心</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/prefile" element={<Prefile />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </HashRouter>
  )
}

export default App
