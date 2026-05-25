import './App.css'
import { useEffect, useState } from 'react'
function ClickToPlayVideo({ videoUrl }) {
  const [play, setPlay] = useState(false);

  return (
    <div style={{ marginTop: '15px', textAlign: 'left' }}>
      {!play ? (
        <button 
          onClick={() => setPlay(true)}
          style={{
            background: '#ff3b30',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 59, 48, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ▶ Click to watch the video
        </button>
      ) : (
        <div className="content-fade-in" style={{ marginTop: '10px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src={`${videoUrl}?autoplay=1`} 
            title="Space Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ maxWidth: '550px', borderRadius: '8px', border: '1px solid #00bfff' }}
          ></iframe>
          <br />
          <button 
            onClick={() => setPlay(false)}
            style={{ 
              background: 'none', 
              color: '#6c7a9c', 
              border: '1px solid #6c7a9c', 
              padding: '4px 10px', 
              borderRadius: '4px', 
              marginTop: '8px', 
              cursor: 'pointer', 
              fontSize: '0.8rem' 
            }}
          >
           Close the video
          </button>
        </div>
      )}
    </div>
  );
}
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
      <h2>ISS Position <span className="live-dot"></span></h2>
      {location ? (
        <p className="coordinates">{location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°</p>
      ) : <p>Loading ...</p>}
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
            <li key={person.name}>{person.name} - <span className="craft-badge">{person.craft}</span></li>
          ))}
        </ul>
      ) : <p>Loading ...</p>}
    </div>
  )
}

function ISSCard() { return <div className="card"><h2>ISS Location Specs</h2><p>Latitude: 42.36</p><p>Longitude: -71.05</p></div> }
function MissionBadge() { return <div className="card"><h2>Mission Badge Info</h2><p>Latitude: 44.34</p></div> }

function APOD() {
  const [pic, setPic] = useState(null)
  
  useEffect(() => {
    const apiKey = import.meta.env.VITE_NASA_KEY || 'DEMO_KEY'; 
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then(r => r.json())
      .then(data => setPic(data))
  }, [])
  
  
  return (
    <div className="apod-container" style={{ textAlign: 'center', marginTop: '15px' }}>
      {pic ? (
        <div>
          <h2>{pic.title}</h2>
          {pic.media_type === 'image' ? (
            <img src={pic.url} alt={pic.title} className="apod-img" style={{ width: '100%', borderRadius: '12px', maxHeight: '500px', objectFit: 'cover' }} />
          ) : (
            <div className="video-fallback-box">
              <p>Today's content is a featured video/eclipse transit.</p>
              <a href={pic.url} target="_blank" rel="noreferrer" className="watch-video-btn">▶ Watch Video on NASA APOD</a>
            </div>
          )}
        </div>
      ) : <p>Loading Picture of the Day...</p>}
    </div>
  )
}

const spaceCardsData = [
  {
    id: 'apod',
    title: 'PICTURE OF THE DAY',
    desc: 'ՆԱՍԱ-ի օրվա լուսանկարը կամ տեսանյութը',
    isComponent: true
  },
  {
    id: 'news',
    title: 'FEATURED NEWS',
    desc: 'NASA Announces Realignment to Accelerate Mission Delivery',
    content: (
      <div>
       <h2>NASA Announces Agencywide Realignment</h2>
 <img src ="https://www.nasa.gov/wp-content/uploads/2026/04/nasa-meatball-1.webp"width="200" height="128" />
<p>
  NASA announced an agencywide restructuring to improve mission focus and
  support the U.S. National Space Policy.
</p>

<h3>Main priorities:</h3>
<ul>
  <li>Accelerating the Artemis program</li>
  <li>Establishing a Moon Base</li>
  <li>Developing nuclear space technology</li>
  <li>Expanding the orbital economy</li>
  <li>Strengthening science and discovery missions</li>
</ul>

<h3>Key changes:</h3>
<ul>
  <li>NASA center directors will continue reporting to Associate Administrator Amit Kshatriya.</li>
  <li>Mission directorates will report directly to Administrator Jared Isaacman.</li>
  <li>The associate administrator will also serve as NASA’s chief engineer.</li>
  <li>NASA will continue hiring and strengthening its workforce.</li>
</ul>

<h3>New mission structure:</h3>
<ul>
  <li><strong>Human Spaceflight Mission Directorate (HSMD)</strong></li>
  <li><strong>Research and Technology Mission Directorate (RTMD)</strong></li>
  <li><strong>Science Mission Directorate (SMD)</strong> – remains unchanged</li>
</ul>

<p>
  NASA said there will be no layoffs, program cancellations, or center closures.
</p>

<p>
  The agency also announced the retirement of longtime NASA leader Bob Pearce.
</p>
      </div>
    )
  },
  { id: 'tech-innovation', title: 'TECHNOLOGY AND INNOVATION', desc: 'Տեխնոլոգիաներ և նորարարություններ', content: 
  <div>
    <img src ="https://assets.science.nasa.gov/dynamicimage/assets/science/esd/explainers/tech-and-innovation/Picture1.jpg?w=1430&h=804&fit=crop&crop=faces%2Cfocalpoint"width="200" height="128" />
    <h2>Technology and Innovation</h2>
    <p>NASA pushes the frontiers of engineering, taking smart risks and pursuing innovative ways to explore our planet and the solar system. As an innovation hub for Earth science, we develop new technologies to observe the unseen and answer critical questions about our planet.
Together with industry partners, we conceive and build the next generation of remote sensing tools, enabling NASA missions and charting a path for operational agencies and businesses. By testing and proving cutting-edge technologies — from advanced sensors to predictive models — NASA Earth Science creates jobs, drives innovation, and sustains U.S. leadership in the exploration of Earth and other planets.</p>
  <h2>Why it matters</h2>
  <p>By investing in Earth observation technology, we're strengthening America's industrial base and creating new opportunities in the rapidly growing commercial space sector. These innovations <b>protect American lives and property</b> while maintaining our nation's technological edge over global competitors.

These investments also advance America's space exploration goals. The same satellite technologies that track Earth's weather and surface features today are proving grounds for systems we’ll need for<b> sustainable presence on Mars.</b>

</p>
  </div> },
  { 
    id: 'earth-science-work', 
    title: 'EARTH SCIENCE AT WORK',
     desc: 'Երկրագնդի ուսումնասիրությունը գործնականում', 
     content: 
     <div>
      <img src="https://science.nasa.gov/wp-content/uploads/2024/03/es2a-banner-white.png"width="500" height="300"/>
      <h2>Earth Science at Work</h2>
      <p>NASA Earth Science <b>helps Americans respond to challenges and societal needs</b> — such as wildland fires, hurricanes, and water supplies for farming — by putting actionable satellite information into the hands of decisionmakers. NASA conceives, builds, and flies cutting-edge satellites and instruments; harvests data from those tools and from commercial partners; combines it with expert insights and the worlds most advanced models — all to advance solutions for monitoring, prediction, and management.</p>
      <h2>Why it matters</h2>
      <h2>NASA’s Earth Science Mission</h2>

<p>
  Using the power of space-based observations, innovative technologies,
  engineering, science, and partnerships, NASA provides a comprehensive
  digital view of Earth as one connected system.
</p>

<p>
  NASA works with commercial and industrial sectors, as well as federal and
  international agencies, to:
</p>

<ul>
  <li>
    Generate scientific data to support decisions at local, state,
    federal, and international levels.
  </li>

  <li>
    Leverage innovation from universities and the private sector to create
    new Earth science applications.
  </li>

  <li>
    Develop products and analyses that directly address societal needs.
  </li>

  <li>
    Connect technology, research, and actionable science to ensure rapid
    transfer from innovation to real-world impact.
  </li>

  <li>
    Advance America’s space exploration goals by using Earth science tools
    and knowledge to support a sustainable presence on the Moon and Mars.
  </li>
</ul>
      </div> 
      },
  { 
    id: 'more-nasa-images', 
    title: 'MORE NASA IMAGES',
     desc: 'Ավելի շատ պատկերներ ՆԱՍԱ-ի արխիվներից',
      content: 
      <div>
        <h2>More NASA Images</h2>
       <img src="https://www.nasa.gov/wp-content/uploads/2026/05/55252854454-c4ed9aa664-o.jpg" width="500" height="300"/>
       <img src="https://www.nasa.gov/wp-content/uploads/2026/04/55205768700-7d3f580146-o.jpg"width="500" height="300"/>
       <img src="https://www.nasa.gov/wp-content/uploads/2026/04/art002e023345-o.jpg"width="500" height="300"/>
       <img src="https://www.nasa.gov/wp-content/uploads/2026/04/art002e015228orig.jpg"  width="500" height="300"/>
       <img src="https://www.nasa.gov/wp-content/uploads/2026/04/55182924516-9d78d1e3ef-o.jpg"width="500" height="300"  />
       <img src="https://www.nasa.gov/wp-content/uploads/2026/04/art002e009057orig.jpg"width="500" height="300" />
       <img src="https://www.nasa.gov/wp-content/uploads/2026/04/xraydot-illus-1.jpg"width="500" height="300" />
            <img src="https://www.nasa.gov/wp-content/uploads/2026/04/full-res-for-display-3.png"width="500" height="300" />
        </div> 
        },
  
  {
     id: 'missions', 
     title: 'MISSIONS', 
     desc: 'Ընթացիկ և ապագա տիեզերական առաքելությունները', 
     content: 
     <div>
      <img src="https://assets.science.nasa.gov/dynamicimage/assets/science/missions/a-train/images/A-Train_2024_UPDATE.jpg?w=2000&h=1352&fit=crop&crop=faces%2Cfocalpoint"width="500" height="300"/>
      <h2>Missions</h2>
      <h3>A-Train: The Afternoon Constellation</h3>
      <h3>What is the A-Train?</h3>

      <p>From their vantage point high above the Earths surface, NASAs Earth-observing satellite missions are uniquely positioned to obtain comprehensive global observations of our home planet. NASA’s Earth Science Division freely and openly shares these Earth Science data with various federal, state, local, and international partners, who use the data for scientific research as well as a variety of practical societal applications that policy makers can use to help craft environmental policy.
NASA satellite constellations are groups of satellites that fly in close proximity to each other in a carefully planned coordination that allows for measurement synergy between the missions—synergy means that more information about the Earth environment is obtained from the combined observations than would be possible from the sum of the observations taken independently.</p>
      <h3><b>The Afternoon Constellation</b></h3>
      <h2>NASA’s Afternoon Constellation (A-Train)</h2>

<p>
  NASA’s Afternoon Constellation, also known as the A-Train, is a group of
  Earth-observing satellites that travel in nearly the same orbit and pass
  over the equator within minutes of one another.
</p>

<p>
  This allows scientists to collect observations at almost the same time and
  combine data to study clouds, aerosols, the atmosphere, and climate change.
</p>

<h3>Formation of the A-Train</h3>

<p>
  The A-Train officially formed in 2006 with Aqua, Aura, CloudSat,
  CALIPSO, and PARASOL.
</p>

<p>
  Later additions included:
</p>

<ul>
  <li>GCOM-W1 (Japan, 2012)</li>
  <li>OCO-2 (NASA, 2014)</li>
</ul>

<h3>Satellites that ended operations</h3>

<ul>
  <li>PARASOL ended its mission in 2013.</li>
  <li>CloudSat and CALIPSO ended operations in 2023.</li>
</ul>

<h3>Active satellites (Summer 2025)</h3>

<ul>
  <li>Aqua</li>
  <li>Aura</li>
  <li>GCOM-W1</li>
  <li>OCO-2</li>
</ul>

<p>
  Aqua and Aura are still active but are slowly drifting from the original
  orbital formation.
</p>

<p>
  Together, the A-Train satellites provide valuable information about Earth’s
  environment and the changing climate.
</p>
      </div> 
      },
      
  { 
   
    id: 'humans-in-space', 
    title: 'HUMANS IN SPACE',
     desc: 'Մարդիկ տիեզերքում և տիեզերագնացների կյանքը',
      content: 
      <div>
      
        <h2>Humans in Space</h2>
        <img src="https://www.nasa.gov/wp-content/uploads/2022/12/51476067951-e10dfb6875-o-1.jpg"width="500" height="300"/>
        <p>For more than two decades, people have lived and worked continuously aboard the International Space Station, advancing scientific knowledge, and making research breakthroughs that are not possible on Earth.</p>
       <h2>Why go to space?</h2>
       <p>At NASA, we explore the secrets of the universe for the benefit of all, creating new opportunities and inspiring the world through discovery.

NASAs exploration vision is anchored in providing value for humanity by answering some of the most fundamental questions: Why are we here? How did it all begin? Are we all alone? What comes next? And, as an addendum to that: How can we make our lives better?

NASA was created more than half a century ago to begin answering some of these questions. Since then, space exploration has been one of the most unifying, borderless human endeavors to date. An international partnership of five space agencies from 15 countries operates the International Space Station, and two dozen countries have signed the Artemis Accords, signaling their commitment to shared values for long-term human exploration and research at the Moon. Through space exploration, we gain a new perspective to study Earth and the solar system. We advance new technologies that improve our daily lives, and we inspire a new generation of artists, thinkers, tinkerers, engineers, and scientists.  
</p>
<h2>Benefits to Humanity</h2>
<p><b>Space exploration unites the world to inspire the next generation, make ground-breaking discoveries, and create new opportunities.</b></p>
<p>Technologies and missions we develop for human spaceflight have thousands of applications on Earth, boosting the economy, creating new career paths, and advancing everyday technologies all around us.</p>
       <h2>Down to Earth: The Astronaut’s Perspective</h2>
       <p>NASA’s astronauts will take you on a journey to the International Space Station, exploring the life-changing experience of an orbital perspective.

</p>
  {/* Կանչում ենք կոճակը հենց այստեղ */}
      <ClickToPlayVideo videoUrl="https://www.youtube.com/embed/DIkqs9_FK28" />
      <h2>Destinations</h2>
      <p>NASA is taking a steppingstone approach to human exploration in space. Building on NASAs 60 years of exploration experience and more than 20 years of continuous human presence on the International Space Station in low Earth orbit, we will extend humanity farther into space than ever before. The International Space Station has built the foundation to conduct complex operations in space, perform research in a microgravity environment, foster a growing space economy, and forge international partnerships toward a common goal. Artemis missions will establish our long-term presence at the Moon as astronauts explore more of the lunar surface than ever before to learn about the origins of the solar system and prepare for humanitys next giant leap: human missions to Mars.</p>
<h2>Moon to Mars Architecture</h2>
<img src="https://www.nasa.gov/wp-content/uploads/2022/12/triplets-m2m-architecture.jpg"width="500" height="300"/>
<p><b>NASA's Moon to Mars architecture represents the hardware and operations needed for human missions to the Moon and Mars, and how they function together as a system.</b></p>
<p>The architecture is not a mission, a manifest, or a set of requirements, but it does define the elements — rockets, spacecraft, rovers, spacesuits, communications relays, and more — that will be incrementally developed and delivered to the Moon and Mars for long-term, human-led scientific discovery in deep space. </p>
       
       
        </div> 
        },
  { 
    id: 'earth-universe',
     title: 'EARTH & UNIVERSE', 
     desc: 'Մեր մոլորակը և անհուն տիեզերքը',
      content: 
      <div>
        <h2>Earth & Universe</h2>
             <img src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRyGKUFIGiPJypGO8f2xtHD5-iiFSG6bbnUWBlFW4_tKs_TUb18NrQP-Ya1vtTGSyodHN-3uYpQLv1ELL4PJr7SouDmoswGtTQa-2-WKFciykHc9QA"width="400" height="400"/>
        <p>Planet Earth and the boundless universe surrounding us are among the most mysterious and beautiful topics in human history, forcing us to reflect on our existence and our place within this infinity. Our planet, Earth, is just a tiny speck by cosmic standards, yet it is exceptional to us, as it is currently the only known place where life exists. Its perfect distance from the Sun allows water to remain in liquid form, while the atmosphere protects us from destructive cosmic radiation. Although we seem to be stationary, Earth rotates around the Sun at a tremendous speed, being one of the eight planets in the Solar System.</p>

<p>If we venture beyond the borders of our system, we will see that our Sun is just one of the hundreds of billions of stars in the Milky Way galaxy, many of which have their own planets. However, the infinity of the universe truly begins beyond our galaxy, where trillions of other galaxies exist within the observable space. This entire system is not static; since the moment of the Big Bang, for about 13.8 billion years now, the universe has continued to expand at a great speed in all directions. Thus, our blue planet, suspended in the vast and dark infinity of space, is the only home we have, which makes us appreciate it even more and, at the same time, always strive toward the unknown stars with our minds.</p>

        </div> 
        },
  { 
    id: 'science-missions', 
    title: 'SCIENCE MISSIONS', 
    desc: 'Գիտական հետազոտություններ և փորձեր ուղեծրում', 
    content:
     <div>
      <h2>Science Missions</h2>
      <p>According to official NASA data, research conducted on the International Space Station (ISS) is aimed at improving life on Earth and conquering deep space. Space weightlessness (microgravity) allows scientists to study phenomena that are impossible to observe on Earth due to gravity.</p>
      <h4>Here is a concise summary of NASA's main research directions:</h4>
      <ul>
        <li><b>Space Medicine:</b> Studies accelerated bone and muscle loss, as well as vision changes in weightlessness. This helps develop treatment methods both for astronauts and for patients suffering from osteoporosis on Earth.</li>
      <li><b>Biology and Pharmaceuticals:</b> Protein crystals grow with perfect precision in space, helping pharmacologists create more effective, targeted drugs against cancer.</li>
    <li><b>Space Agriculture:</b> Under LED lights, astronauts successfully grow fresh food (lettuce, peppers, cabbage) to provide a sustainable food source for crews on future interplanetary flights.</li>
    <li><b>Physics and Materials Science:</b> In the Cold Atom Lab, materials are cooled to near absolute zero to study quantum physics. Meanwhile, combustion experiments show that fire burns spherically (as a cool flame) in weightlessness, which helps in developing cleaner engines for Earth.</li>
   <li><b>Earth and Space Observation:</b> External instruments on the station measure Earth's plant temperatures and atmospheric dust to predict droughts, while the NICER telescope studies neutron stars to create a new navigation (GPS) system for future spacecraft.</li>
    </ul>
      </div> 
      },
  { 
    id: 'aeronautics', 
    title: 'AERONAUTICS',
     desc: 'Ավիացիա և մթնոլորտային թռիչքների տեխնոլոգիաներ', 
     content:
      <div>
        <h2>Aeronautics</h2>
        <img src="https://www.nasa.gov/wp-content/uploads/2026/03/x-59-afrc2026-0048-17.jpg?resize=2000,1333"width="500" height="300"/>
        <p>Aviation and atmospheric flight technologies encompass the scientific and engineering solutions that enable aircraft to perform controlled flights within Earth's air mass, relying on the physical properties of air. Four main forces act upon a flying vehicle: lift, which is created due to the special aerodynamic shape of the wings; weight (gravity), which opposes it; thrust, generated by engines to propel the vehicle forward; and aerodynamic drag, which slows its progress. The development of aviation is closely linked to the evolution of engines, ranging from piston systems in small aircraft to modern turbojets and ramjet/scramjet engines for supersonic and hypersonic flights.</p>
        <p>Today, the field is undergoing a digital and ecological revolution. Aircraft are managed by complex "Fly-by-Wire" computer systems that ensure safety, while traditional aluminum is being replaced by lightweight and ultra-strong carbon composites, significantly saving fuel. To reduce emissions, sustainable aviation fuels (SAF), as well as electric, hybrid, and hydrogen propulsion systems—including electric air taxis (eVTOL)—are being actively developed. In parallel, the advancement of unmanned aerial vehicles (UAVs/drones), driven by artificial intelligence and precision sensors, is completely transforming flight dynamics in logistics, agriculture, and the military industry.</p>
         <ClickToPlayVideo videoUrl="https://www.youtube.com/embed/gR4Xuslczoo?si=S-g-Ng_dP3tG32UA" />
        </div> 
        },
  { 
    id: 'nasa-missions', 
    title: 'NASA MISSIONS',
     desc: 'ՆԱՍԱ-ի գլխավոր պատմական և նոր ծրագրերը',
      content:
       <div>
        <h2>NASA Missions</h2>
        <img src ="https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=6600&h=3712&fit=crop&crop=faces%2Cfocalpoint"width="600" height="600"/>
        <p>According to official NASA data, the agency's history and current operations consist of historic achievements that have reshaped human understanding, alongside cutting-edge programs directed toward deep space.</p>
        <h4>Here is a summary of NASA's core programs, based on their official sources:</h4>
        <h2> Major Historical Programs</h2>
        <ul>
          <li><b>Apollo:</b> NASA's most famous program, which successfully achieved the first human landing and walk on the Moon in 1969 during the Apollo 11 mission.</li>
        <li><b>Space Shuttle:</b> A reusable spacecraft program that served as the foundation for constructing the International Space Station (ISS) and launching the Hubble Space Telescope into orbit.</li>
        <li><b>Voyager:</b> Two probes launched in 1977 that studied the giant planets of the Solar System. Today, they are the farthest human-made objects from Earth and have already entered interstellar space.</li>
        <li><b>Mars Exploration: </b>A series of Mars rovers (Spirit, Opportunity, Curiosity) that proved the Red Planet once possessed liquid water and environments suitable for life in its past.</li>
        </ul>
       <h2>Major New and Current Programs</h2>
       <ul>
        <li><b>Artemis:</b> NASA's largest current program, aimed at landing humans (including the first woman) back on the Moon, establishing a sustainable base there, and preparing for future missions to Mars.</li>
       <li><b>James Webb Space Telescope (JWST):</b> The most powerful space telescope, operating in the infrared spectrum, which allows NASA to see the first galaxies of the universe and study the atmospheres of other planets.</li>
       <li><b>Perseverance & Mars Sample Return:</b> An active rover currently collecting Martian soil samples that may contain signs of ancient life, which are to be brought back to Earth by a future follow-up mission.</li>
      <li><b>Commercial Crew Program:</b> A partnership with private companies (such as SpaceX) to transport astronauts to the ISS, allowing NASA to focus its resources on more distant deep-space missions.</li>
       </ul>
        </div> 
        },
  { 
    id: 'nasa-eyes-earth',
     title: 'NASA EYES ON EARTH',
      desc: 'ՆԱՍԱ-ի աչքերը Երկրի վրա՝ արբանյակային տվյալներ', 
      content:
       <div>
        <h2>NASA Eyes on Earth</h2>
        <p>NASA's Eyes on Earth" is a satellite system that monitors our planet's health, climate, and natural disasters in real time. Satellites like Terra, Aqua, Aura, and Landsat measure ocean temperatures, atmospheric purity, glacier melt, and deforestation. In line with NASA's policy, all of this data is open and free to scientists worldwide, and during disasters, images are made public within just 3 hours to assist in rescue operations and drought forecasting.</p>
        <button 
          onClick={() => window.open('https://eyes.nasa.gov/apps/earth/#/', '_blank')}
          className="watch-video-btn" /* Օգտագործում է քո CSS-ի սիրուն կարմիր ոճը */
        >
          🌐 Explore Earth in 3D
        </button>
        </div> }
];

export default function App() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  // Ֆունկցիա, որը որոշում է, թե որտեղ տեղադրել տեղեկատվական բլոկը
  const renderRowInfoBox = (index) => {
    const currentActiveData = spaceCardsData.find(card => card.id === activeCard);
    if (!activeCard) return null;

    // Գտնում ենք ակտիվ քարտի ինդեքսը ցուցակում
    const activeIndex = spaceCardsData.findIndex(card => card.id === activeCard);
    
    // Որոշում ենք, թե քանի սյունակ ունենք ըստ էկրանի չափսի (3 սյունակ սովորական էկրաններին)
    let columns = 3;
    if (window.innerWidth <= 600) columns = 1;
    else if (window.innerWidth <= 900) columns = 2;

    // Գտնում ենք տվյալ տողի վերջին տարրի ինդեքսը
    const isLastInRow = (index % columns === columns - 1) || (index === spaceCardsData.length - 1);
    
    // Ստուգում ենք՝ արդյո՞ք ակտիվ քարտը գտնվում է այս տողում
    const cardRow = Math.floor(activeIndex / columns);
    const currentRow = Math.floor(index / columns);

    if (currentRow === cardRow && isLastInRow) {
      return (
        <div className="info-box full-row-info content-fade-in">
          {currentActiveData?.isComponent ? <APOD /> : currentActiveData?.content}
        </div>
      );
    }
    return null;
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

      {/* ԿՈՃԱԿՆԵՐԻ ՑԱՆՑ */}
      <div className="space-grid">
        {spaceCardsData.map((card, index) => (
          <Fragment key={card.id}>
            <div 
              className={`space-card ${activeCard === card.id ? 'active' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <span className="arrow-btn">→</span>
            </div>
            {/* Տեղեկատվական տուփը կհայտնվի հենց այս տողի ներքևում */}
            {renderRowInfoBox(index)}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

// Չմոռանաս React-ից ներմուծել Fragment-ը ֆայլի ամենավերևում, կամ օգտագործիր <> </> տեգերը
import { Fragment } from 'react';