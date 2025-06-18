import { useState, useEffect } from 'react'
import useWakeLock from './useWakeLock'
import './App.css'

function App() {
  useWakeLock()

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <h1 className="clock">{time.toLocaleTimeString()}</h1>
    </div>
  )
}

export default App
