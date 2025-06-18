import { useEffect, useState } from 'react'

export default function DateComponent() {
  const [date, setDate] = useState({
    dayNum: '',
    monthLong: '',
    dayLong: '',
    year: '',
  })

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const dayNum = now.getDate().toString()
      const monthLong = now.toLocaleDateString(undefined, { month: 'long' })
      const dayLong = now.toLocaleDateString(undefined, { weekday: 'long' })
      const year = now.getFullYear().toString()
      setDate({ dayNum, monthLong, dayLong, year })
    }
    updateDate()
    const interval = setInterval(updateDate, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: '2vw', // Added left margin
        marginTop: '2vh', // Added top margin
        marginRight: '3vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: 'max-content',
        lineHeight: 1.1,
      }}
    >
      <span style={{ fontSize: '7vw', letterSpacing: '0.05em' }}>
        {date.dayNum} {date.monthLong}
      </span>
      <span style={{ fontSize: '3.5vw', opacity: 0.8 }}>
        {date.dayLong} {date.year}
      </span>
    </div>
  )
}