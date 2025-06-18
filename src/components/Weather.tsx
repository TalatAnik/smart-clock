import { useEffect, useState } from 'react'
import DateComponent from './Date'

// Make sure to install Font Awesome solid icons: 
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSun,
  faCloud,
  faCloudRain,
  faBolt,
} from '@fortawesome/free-solid-svg-icons'

type WeatherData = {
  icon: 'sun' | 'cloud' | 'rain' | 'storm'
  temp: number
  hour: string
}

const ICONS: Record<WeatherData['icon'], any> = {
  sun: faSun,
  cloud: faCloud,
  rain: faCloudRain,
  storm: faBolt,
}

export default function Weather() {
  // Replace this with real weather API data fetching
  const [weather, setWeather] = useState<WeatherData[]>(
    [
      { icon: 'sun', temp: 28, hour: 'Now' },
      { icon: 'cloud', temp: 27, hour: '13:00' },
      { icon: 'rain', temp: 25, hour: '14:00' },
      { icon: 'storm', temp: 24, hour: '15:00' },
    ]
  )

  useEffect(() => {
    // Fetch and set weather data from your API here
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3vw',
        width: '100%',
        justifyContent: 'center',
        color: '#fff',
        marginTop: '2vh',
      }}
    >
      <DateComponent />
      {weather.map((w, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '80px',
          }}
        >
          <span style={{ fontSize: '2vw', marginBottom: '0.5vw' }}>{w.hour}</span>
          <FontAwesomeIcon
            icon={ICONS[w.icon]}
            style={{
              fontSize: '3vw',
              margin: '0.5vw 0',
              color: '#fff',
            }}
          />
          <span style={{ fontSize: '2.5vw', marginTop: '0.5vw', fontWeight: 'bold' }}>
            {w.temp}°C
          </span>
        </div>
      ))}
    </div>
  )
}