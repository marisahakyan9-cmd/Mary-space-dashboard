/// <reference path="./lib/Intellisense/js-turtle_hy.ts" />
//DOCUMENTATION: https://hanumanum.github.io/js-turtle/


// goto(150, -3);
// color([161, 161, 161]);
// for (let a = 0; a < 360; a++) {
//     forward(1);
//     left(1)

// }

// function hetagic(x, y, radius) {
//     color("white")
//     for (let i = 0; i < 360; i++) {
//         goto(x, y)
//         penup()
//         forward(radius)
//         pendown()
//         left(90)
//         forward(10)
//         goto(x, y)
//         left(1)
//     }
// }

// function sun(x, y, col, radius) {
//     for (let i = 0; i < 360; i++) {
//         color(col);
//         goto(x, y);
//         forward(radius);
//         left(1);
//         goto(x, y)

//     }

// }

// function randomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min) + min)
// }






// let x = 120
// let y = 0


// setInterval(() => {
//     clear()
//     x += 2


//     if (y < 15) {
//         y += 3

//     }
//     for (let i = 0; i < 20; i++) {
//         let x = randomNumber(-350, 350)
//         let y = randomNumber(-350, 350)
//         sun(x, y, "white", 3)


//     }

//     hetagic(0, 0, 200)
//     hetagic(0, 0, 160)
//     hetagic(0, 0, 120)
//     hetagic(0, 0, 240)
//     hetagic(0, 0, 280)
//     hetagic(0, 0, 320)

//     sun(0, 0, "yellow", 80)
//     sun(x, y, "blue", 20)
//     sun(160, 40, "orange", 30)
//     sun(160, 120, "red", 25)
//     sun(160, 180, "aqua", 20)
//     sun(160, -230, "maroon", 35)
//     sun(255, -190, "purple", 33)

// }, 10)


function hetagic(x, y, radius) {
    color("white");
    for (let i = 0; i < 360; i++) {
        goto(x, y);
        penup();
        forward(radius);
        pendown();
        left(90);
        forward(10);
        goto(x, y);
        left(1);
    }
}

function sun(x, y, col, radius) {


        for (let i = 0; i < 360; i++) {
        color(col);
        goto(x, y);
        forward(radius);
        left(1);
        goto(x, y)

    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getCoordinatesOnCircle(radius, angle) {
    return {
        x: radius * Math.cos(angle * Math.PI / 180),
        y: radius * Math.sin(angle * Math.PI / 180)
    };
}

let x = 120;
let y = 0;

setInterval(() => {
    clear();
    x += 2;

    if (y < 15) {
        y += 3;
    }

    for (let i = 0; i < 20; i++) {
        let randomX = randomNumber(-350, 350);
        let randomY = randomNumber(-350, 350);
        sun(randomX, randomY, [randomNumber(0,255),randomNumber(0,255),randomNumber(0,255)], 3);
    }

    hetagic(0, 0, 200);
    hetagic(0, 0, 160);
    hetagic(0, 0, 120);
    hetagic(0, 0, 240);
    hetagic(0, 0, 280);
    


    

    let angle = (x % 360);
    
    let pos2 = getCoordinatesOnCircle(160, angle+30);
    let pos3 = getCoordinatesOnCircle(120, angle+10);
    let pos4 = getCoordinatesOnCircle(240, angle-60);
    let pos5 = getCoordinatesOnCircle(280, angle+40);
    let pos6 = getCoordinatesOnCircle(200, angle);
    
    
    sun(0, 0, "yellow", 80)
    sun(pos2.x, pos2.y, "blue", 20);
    sun(pos3.x, pos3.y, "orange", 30);
    sun(pos4.x, pos4.y, "red", 25);
    sun(pos5.x, pos5.y, "aqua", 20);
    sun(pos6.x, pos6.y, "maroon", 35);


}, 10);
