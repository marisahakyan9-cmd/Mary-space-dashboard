import './App.css'
export default function App(){
  return (
    
    <div className= "dashboard">
      <h1>Mary-space-dashboard</h1>
      <p>20.05.2026</p>
      <ISSCard/>
        <MissionBadge/>
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
