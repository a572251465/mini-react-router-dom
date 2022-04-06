import { BrowserRouter, Routes, Route, HashRouter } from './react-router-dom'

import Home from './components/Home'
import Prefile from './components/Prefile'
import User from './components/User'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/prefile" element={<Prefile />} />
      </Routes>
    </HashRouter>
  )
}

export default App
