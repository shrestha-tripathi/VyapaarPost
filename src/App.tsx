import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EditorPage } from './pages/EditorPage'

// Use basename for GitHub Pages deployment, empty for local dev
const basename = import.meta.env.BASE_URL

function App() {
  return (
    <Router basename={basename}>
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
