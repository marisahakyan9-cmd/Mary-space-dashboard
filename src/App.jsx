import './App.css'
import { useEffect, useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button className="counter-btn" onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}

function ISSTracker() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(r => r.json())
      .then(data => setLocation(data))
  }, [])

  return (
    <div className='card'>
      <h2>
        ISS Position <span className="live-dot"></span>
      </h2>
      {location ? (
        <p className="coordinates">{location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°</p>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  )
}

function PeopleSpace() {
  const [people, setPeople] = useState(null)

  useEffect(() => {
    fetch('https://api.open-notify.org/astros.json')
      .then(r => r.json())
      .then(data => setPeople(data.people))
  }, [])

  return (
    <div className='card'>
      <h2>People in Space</h2>
      {people ? (
        <ul>
          {people.map(person => (
            <li key={person.name}>
              {person.name} - <span className="craft-badge">{person.craft}</span>
            </li>
          ))}
        </ul>
      ) : <p>Loading ...</p>
      }
    </div>
  )
}

function ISSCard() {
  return (
    <div className="card">
      <h2>ISS Location Specs</h2>
      <p>Latitude: 42.36</p>
      <p>Longitude: -71.05</p>
    </div>
  )
}

function MissionBadge() {
  return (
    <div className="card">
      <h2>Mission Badge Info</h2>
      <p>Latitude: 44.34</p>
    </div>
  )
}

function APOD() {
  const [pic, setPic] = useState(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_NASA_KEY || 'DEMO_KEY'; 
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then(r => r.json())
      .then(data => setPic(data))
  }, [])

  return (
    <div className="info-box content-fade-in">
      {pic ? (
        <div>
          <h2>{pic.title}</h2>
          <div className="apod-container" style={{ textAlign: 'center', marginTop: '15px' }}>
            {pic.media_type === 'image' ? (
              <img src={pic.url} alt={pic.title} className="apod-img" style={{ width: '100%', borderRadius: '12px' }} />
            ) : (
              /* Եթե վիդեո է, ցույց է տալիս կոճակ, որպեսզի դատարկ էկրան չմնա */
              <div className="video-fallback-box">
                <p>Today's content is a featured video/eclipse transit.</p>
                <a href={pic.url} target="_blank" rel="noreferrer" className="watch-video-btn">
                  ▶ Watch Video on NASA APOD
                </a>
              </div>
            )}
            {/* ԵՐԿԱՐ ՏԵՔՍՏԻ ԲԱԺԻՆԸ (pic.explanation) ԱՅՍՏԵՂԻՑ ԱՄԲՈՂՋՈՒԹՅԱՄԲ ՀԱՆՎԱԾ Է */}
          </div>
        </div>
      ) : (
        <p>Loading Picture of the Day...</p>
      )}
    </div>
  )
}

export default function App() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardName) => {
    setActiveCard(activeCard === cardName ? null : cardName);
  };

  return (
    <div className="dashboard">
      <h1>Mary-space-dashboard</h1>
      <p className="date-sub">20.05.2026</p>
      
      <div className="top-stats">
        <ISSCard />
        <MissionBadge />
        <div className="card counter-card">
          <h2>Action Counter</h2>
          <Counter />
        </div>
        <ISSTracker />
        <PeopleSpace />
      </div>

      <div className="space-grid">
        <div 
          className={`space-card ${activeCard === 'apod' ? 'active' : ''}`}
          onClick={() => handleCardClick('apod')}
        >
          <div className="card-content">
            <h3>PICTURE OF THE DAY</h3>
            <p>ՆԱՍԱ-ի օրվա լուսանկարը կամ տեսանյութը</p>
          </div>
          <span className="arrow-btn">→</span>
        </div>

        <div 
          className={`space-card ${activeCard === 'news' ? 'active' : ''}`}
          onClick={() => handleCardClick('news')}
        >
          <div className="card-content">
            <h3>FEATURED NEWS</h3>
            <p>ՆԱՍԱ-ն հայտարարում է վերակազմավորման մասին...</p>
          </div>
          <span className="arrow-btn">→</span>
        </div>
      </div>

      <div className="info-display-container">
        {activeCard === 'apod' && <APOD />}

        {activeCard === 'news' && (
          <div className="info-box content-fade-in">
            <h2>ՆԱՍԱ-ն հայտարարում է վերակազմավորման մասին</h2>
            <div className="news-content">
              <img 
                src='https://www.nasa.gov/wp-content/uploads/2026/04/nasa-meatball-1.webp' 
                alt="NASA Logo" 
                className="news-img"
              />
              <p>
                ՆԱՍԱ-ն հայտարարել է գործակալության վերակազմավորման մասին՝ արագացնելու տիեզերական առաքելությունները և ավելի արդյունավետ օգտագործելու ռեսուրսները։
              </p>
              <p>
                Նոր ծրագրի շրջանակում ՆԱՍԱ-ն կենտրոնանալու է «Արտեմիս» ծրագրի արագացման, Լուսնի վրա բազայի ստեղծման, տիեզերական նոր տեխնոլոգիաների զարգացման և գիտական հետազոտությունների ընդլայնման վրա։
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}