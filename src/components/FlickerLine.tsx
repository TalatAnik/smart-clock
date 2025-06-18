import { useEffect, useRef, useState } from 'react'

export default function FlickerLine() {
  const [active, setActive] = useState(false)
  const [top, setTop] = useState(0)
  const animationRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Flicker effect: toggles opacity rapidly
  const [flicker, setFlicker] = useState(true)

  useEffect(() => {
    let flickerInterval: NodeJS.Timeout | null = null
    if (active) {
      flickerInterval = setInterval(() => {
        setFlicker(f => !f)
      }, 40)
    } else {
      setFlicker(true)
    }
    return () => {
      if (flickerInterval) clearInterval(flickerInterval)
    }
  }, [active])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let start: number | null = null
    let height = window.innerHeight

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      // Moderate speed: 1000ms for full screen
      const progress = Math.min(elapsed / 1000, 1)
      setTop(progress * height)
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setActive(false)
        setTop(0)
        // Schedule next run randomly between 2s and 6s
        timeout = setTimeout(() => setActive(true), 2000 + Math.random() * 4000)
      }
    }

    if (active) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Start the first run after a short delay
      timeout = setTimeout(() => setActive(true), 2000 + Math.random() * 4000)
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      clearTimeout(timeout)
    }
  }, [active])

  // Responsive: update height on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setTop(0)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 100 }}>
      {active && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: '100vw',
            height: '10px',
            top: `${top}px`,
            // background: 'linear-gradient(90deg, #fff 0%, #aaa 50%, #fff 100%)',
            background: '#000000',
            opacity: flicker ? 1 : 0.3,
            transition: 'opacity 0.05s',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}