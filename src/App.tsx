import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EditorPage } from './pages/EditorPage'

function App() {
  return (
    <Router basename="/VyapaarPost">
      <div className="min-h-screen min-h-dvh bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor/:templateId" element={<EditorPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
