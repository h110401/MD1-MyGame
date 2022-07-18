//Canvas---------------------------------------------------------------------

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const offset = {x: -740, y: -650}

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


function countDown() {
    if (timer > 0) {
        timer--
    } else {
        isClicked = false
    }
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

//---------------------------------------StartScene---------------------------------




