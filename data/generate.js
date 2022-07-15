//Canvas---------------------------------------------------------------------

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const offset = {x: -740, y: -650}

//---------------------------------------------------------------------------


//System-Element-------------------------------------------------------------
let battle = false

const keys = {
    w: false,
    s: false,
    a: false,
    d: false,
}

let boundaries = arrayMapToPosition(collisionMap, Boundary)

let battleZones = arrayMapToPosition(battleZoneMap, Boundary)


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


const foreground = new Sprite({
    image: {
        src: 'image/background/foreground.png'
    },
    position: {
        x: offset.x,
        y: offset.y,
        scale: 1
    }
})


const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'image/background/battleBackground.png'


const playerUpImage = new Image()
playerUpImage.src = 'image/player/playerUp.png'
const playerDownImage = new Image()
playerDownImage.src = 'image/player/playerDown.png'
const playerLeftImage = new Image()
playerLeftImage.src = 'image/player/playerLeft.png'
const playerRightImage = new Image()
playerRightImage.src = 'image/player/playerRight.png'

const player = new Player({
    image: playerUpImage,
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage,
    }
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