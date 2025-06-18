import useWakeLock from './useWakeLock'
import Home from './pages/Home'
import './app.css'

export default function App() {
  useWakeLock()

  return <Home />
}
