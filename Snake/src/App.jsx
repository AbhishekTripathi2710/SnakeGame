import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import GameBoard from './components/GameBoard'
import GameOver from './components/GameOver'

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/gameover" element={<GameOver />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
