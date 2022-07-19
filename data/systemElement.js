//Canvas---------------------------------------------------------------------

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


let offset = localStorage.length === 0 ?
    {
        x: -740,
        y: -650
    } : {
        x: JSON.parse(localStorage.getItem('playerPosition')).x,
        y: JSON.parse(localStorage.getItem('playerPosition')).y
    }


const FRAME = 4


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

let animationBag

let animationBattleId

let renderedSprites = []
let queue = []

let playerMonster
let enemyMonster


CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}

eventListener()

function eventListener() {

    let played = false

    window.addEventListener('keydown', e => {
        console.log(background.position)
        if (!played) {
            played = true
            audio.map.play()
        }
        switch (e.key) {
            case 'Tab':
                e.preventDefault()
                break
            case 'w':
                keys.w = true
                break
            case 's':
                keys.s = true
                break
            case 'a':
                keys.a = true
                break
            case 'd':
                keys.d = true
                break
        }
    })

    window.addEventListener('keyup', e => {
        switch (e.key) {
            case 'w':
                keys.w = false
                break
            case 's':
                keys.s = false
                break
            case 'a':
                keys.a = false
                break
            case 'd':
                keys.d = false
                break
        }
    })

    window.addEventListener('click', () => {
        if (!played) {
            played = true
            audio.map.play()
        }
    })
}

function countDown() {
    if (timer > 0) {
        timer--
    } else {
        isClicked = false
    }
}


