// src/useWakeLock.js
import { useEffect } from 'react'

// Define a type for the wakeLock property
type WakeLockNavigator = Navigator & {
  wakeLock?: {
    request: (type: 'screen') => Promise<WakeLockSentinel>
  }
}

// WakeLockSentinel type definition
interface WakeLockSentinel {
  released: boolean
  release: () => Promise<void>
  // You can add more properties/events if needed
}

export default function useWakeLock() {
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null

    const requestWakeLock = async () => {
      try {
        const nav = navigator as WakeLockNavigator
        if (nav.wakeLock) {
          wakeLock = await nav.wakeLock.request('screen')
        }
      } catch (err) {
        console.error('Wake Lock failed:', err)
      }
    }

    requestWakeLock()

    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (wakeLock) wakeLock.release()
    }
  }, [])
}
