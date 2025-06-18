import Time from '../components/Time'

export default function Home() {
  return (
    <div
      className="dot-matrix-bg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <section
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Time />
      </section>
      {/* Add more <section> elements here for additional vertical sections */}
    </div>
  )
}