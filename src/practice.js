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
