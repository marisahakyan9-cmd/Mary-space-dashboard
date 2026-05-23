import './App.css'
import { useEffect, useState } from 'react'
function Counter(){
  const [count,setCount]=useState(0)

  return (
    <button onClick={()=>setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
function ISSTracker(){
  const [location,setLocation] = useState(null)

  useEffect(() => {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then(r=> r.json())
  .then(data => setLocation(data))
  }, [])
  return (
    <div className='card'>
      <h2>ISS Position</h2>
      { location ?(
        <p>{location.latitude.toFixed(2)}°,{location.longitude.toFixed(2)}°</p>
      ):(
        <p>Loading ...</p>
      )}
    </div>
  )
}
function PeopleSpace(){
  const [people,setPeople] = useState(null)

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
    .then(r => r.json())
    .then(data => setPeople(data.people))
  },[])
  return(
    <div className='card'>
  <h2>People in Space</h2>
  {people ? (
    <ul>
      {people.map(person =>(
        <li key={person.name}>
          {person.name} - {person.craft}
        </li>
      ))}
    </ul>
  ) :<p>Loading ...</p>
  }
  </div>
)
}
function APOD () {
  const[pic,setPic] = useState(null)
  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(r =>r.json())
    .then(data =>setPic(data))
  },[])
  return (
    <div className='card'>
      <h2>Picture of the Day </h2>
      {pic ? (
        <div>
          <h3>{pic.title}</h3>
          {pic.media_type === 'image'
          ?<img src={pic.url} alt = {pic.title} stayle={{white:'100%'}}/>
        :<a href ={pic.url} target="_blank">Whatch Video</a>
        }
        
        </div>
      ):<p>Loading ...</p>
}
    </div>
  )
}

export default function App(){
  return (
    
    <div className= "dashboard">
      <h1>Mary-space-dashboard</h1>
      <p>20.05.2026</p>
      <ISSCard/>
        <MissionBadge/>
        <Counter/>
        <ISSTracker/>
        <PeopleSpace/>
        <APOD/>
    </div>
  )
}

function ISSCard (){
  return (
  <div className="dashboard">
    <h2>Iss Position</h2>
    <p>Latitude: 42.36</p>
    <p>Longitude: -71.05</p>
  </div>
)
}

function MissionBadge (){
 return(
  <div className="dashboard">
      <h3>Iss Position</h3>
  

 <p>Latitude: 44.34</p>
    <p>Longitude: -54.09</p>
  </div>
 )
}

<ISSCard latitude = "42.36" longitude="-71.05"/>

 