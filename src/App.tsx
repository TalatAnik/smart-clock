import useWakeLock from './useWakeLock'
import Home from './pages/Home'
import './app.css'
import FlickerLine from './components/FlickerLine'

export default function App() {
  useWakeLock()

  return (
    <>
      <Home />
      <FlickerLine />
      {/* testing */}
    </>
  )
}
