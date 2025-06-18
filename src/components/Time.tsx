import { useEffect, useState } from 'react'

export default function Time() {
  const [time, setTime] = useState<{ hour: string; min: string; seconds: string; ampm: string }>({
    hour: '',
    min: '',
    seconds: '',
    ampm: '',
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      const match = timeString.match(/^(\d{2}):(\d{2}):(\d{2})\s*(AM|PM)?$/i)
      if (match) {
        setTime({
          hour: match[1],
          min: match[2],
          seconds: match[3],
          ampm: match[4] ?? '',
        })
      }
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '18vw',
          lineHeight: 1,
          letterSpacing: '0.1em',
          marginRight: '1vw',
        }}
      >
        {time.hour}
      </span>
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '18vw',
          lineHeight: 1,
          letterSpacing: '0.1em',
          marginRight: '1vw',
        }}
      >
        :
      </span>
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '18vw',
          lineHeight: 1,
          letterSpacing: '0.1em',
          marginRight: '2vw',
        }}
      >
        {time.min}
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '0.1em',
        }}
      >
        <span
          style={{
            fontSize: '5vw',
            fontWeight: 'normal',
            marginBottom: '0.2em',
            marginLeft: '0.5vw',
          }}
        >
          {time.ampm}
        </span>
        <span
          style={{
            fontSize: '5vw',
            fontWeight: 'normal',
            alignSelf: 'flex-end',
            marginLeft: '0.5vw',
          }}
        >
          {time.seconds}
        </span>
      </span>
    </div>
  )
}