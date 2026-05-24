import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SplashScreen from './pages/SplashScreen'
import Dashboard from './pages/Dashboard'
import SkinAnalysis from './pages/SkinAnalysis'
import VaccineTracker from './pages/VaccineTracker'
import Chatbot from './pages/Chatbot'
import AshaWorker from './pages/AshaWorker'
import Profile from './pages/Profile'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <SplashScreen onGetStarted={() => setShowSplash(false)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<SkinAnalysis />} />
          <Route path="vaccines" element={<VaccineTracker />} />
          <Route path="chat" element={<Chatbot />} />
          <Route path="asha" element={<AshaWorker />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
