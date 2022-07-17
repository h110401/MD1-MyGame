//Canvas---------------------------------------------------------------------

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const offset = {x: -740, y: -650}

const FPS = 60

const keys = {
    w: false,
    s: false,
    a: false,
    d: false,
}


const battlePosition = {
    enemy: {
        x: 795,
        y: 90,
        scale: 1.5
    },
    player: {
        x: 270,
        y: 290,
        scale: 2
    }
}

let battle = false

let isClicked = false
let delay = 30
let timer = 0

let animationStartId

let animationId

let animationBattleId

let renderedSprites = []
let queue = []

let playerMonster
let enemyMonster


function countDown() {

    console.log(timer)

    // if (isClicked) {
    if (timer > 0) {
        timer--
    } else {
        isClicked = false
    }
    // }
}


//---------------------------------------StartScene---------------------------------




