//Canvas---------------------------------------------------------------------

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const offset = {x: -740, y: -650}

//---------------------------------------------------------------------------

//System-Element-------------------------------------------------------------

const client = {
    x: 0,
    y: 0,
    click: false,
}

const keys = {
    w: false,
    s: false,
    a: false,
    d: false,
}

let boundaries = arrayMapToPosition(collisionMap, Boundary)

let battleZones = arrayMapToPosition(battleZoneMap, Boundary)

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

let battle = true

//Images---------------------------------------------------------------------

const backgroundImage = new Image()
backgroundImage.src = 'image/background/background.png'
const background = new Sprite({
    image: backgroundImage,
    position: {
        x: offset.x,
        y: offset.y,
        scale: 1
    }
})


const foregroundImage = new Image()
foregroundImage.src = 'image/background/foreground.png'
const foreground = new Sprite({
    image: foregroundImage,
    position: {
        x: offset.x,
        y: offset.y,
        scale: 1
    }
})


const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'image/background/battleBackground.png'


const playerImageUp = new Image()
playerImageUp.src = 'image/player/playerUp.png'
const playerImageDown = new Image()
playerImageDown.src = 'image/player/playerDown.png'
const playerImageLeft = new Image()
playerImageLeft.src = 'image/player/playerLeft.png'
const playerImageRight = new Image()
playerImageRight.src = 'image/player/playerRight.png'

const player = new Player({
    image: playerImageDown,
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerImageUp,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight,
    }
})

//Pokemon--------------------------------------------------------------------

const draggleImage = new Image()
draggleImage.src = 'image/mob/draggleSprite.png'
const draggle = new Mob({
    image: draggleImage,
    position: battlePosition.enemy,
    frames: {
        max: 4,
        hold: 20
    },
    animate: true,
    isEnemy: true,
    name: 'Draggle'
})

const embyImage = new Image()
embyImage.src = 'image/mob/embySprite.png'
const emby = new Mob({
    image: embyImage,
    position: battlePosition.player,
    frames: {
        max: 4,
        hold: 10
    },
    animate: true,
    name: 'Emby'
})

//---------------------------------------------------------------------------

const moveables = [background, foreground, ...battleZones, ...boundaries]


//---------------------------------------------------------------------------

function arrayMapToPosition(array, className) {
    let tempArr = []
    for (let i = 0; i < array.length; i += 70) {
        tempArr.push(array.slice(i, i + 70));
    }
    let arrayReturn = []
    tempArr.forEach((row, i) => {
        row.forEach((element, j) => {
            if (element === 1025) {
                arrayReturn.push(new className({
                    position: {
                        x: j * className.width + offset.x,
                        y: i * className.height + offset.y
                    }
                }))
            }
        })
    })
    return arrayReturn
}