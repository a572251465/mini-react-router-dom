import { BrowserRouter, Routes, Route } from './react-router-dom'

import Home from './components/Home'
import Prefile from './components/Prefile'
import User from './components/User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/prefile" element={<Prefile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
