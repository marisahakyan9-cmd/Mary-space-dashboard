const name = "Mari" 
let count = 0

console.log(name)
console.log(count)

count = count + 1
console.log(count)

//Traditional
function formatCoord(coord) {
    return parseFloat(coord).toFixed(2) * 0.621
}


console.log(formatCoord("411"))

function dascribeAstronaut(name,craft){
    return `${name} is currently aboard the ${craft}`
}
console.log(dascribeAstronaut("Alice","ISS"))


 const issPosition = {
latitude: "55.7",
longitude: "88,3"
}
console.log(issPosition.latitude);

const asteroids = [
    {name: "2024 AB1", diameter : 120, hazardous:false},
    {name: "2024 CD2", diameter : 45, hazardous:true},
    {name: "2024 EF3", diameter : 890, hazardous:false},
    {name: "2024 GH4", diameter : 23, hazardous:true},
]
const names = asteroids.map(person =>person.name)
console.log(names);

const diameter = asteroids.filter(person =>person.diameter)
console.log(diameter);

const hazardous = asteroids.slice(0,1)
console.log(hazardous );

const hazardousNames = asteroids
  .filter(asteroid => asteroid.hazardous)
  .map(asteroid => asteroid.name);

  console.log("hazardousNames");