//Canvas---------------------------------------------------------------------
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const OFFSET = {x: -740, y: -650}
//---------------------------------------------------------------------------


//Images---------------------------------------------------------------------
const backgroundImage = new Image()
backgroundImage.src = 'image/background.png'
const background = new Sprite({
    image: backgroundImage,
    position: {
        x: OFFSET.x,
        y: OFFSET.y,
    }
})

const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'image/battleBackground.png'


const playerImageUp = new Image()
playerImageUp.src = 'image/playerUp.png'
const playerImageDown = new Image()
playerImageDown.src = 'image/playerDown.png'
const playerImageLeft = new Image()
playerImageLeft.src = 'image/playerLeft.png'
const playerImageRight = new Image()
playerImageRight.src = 'image/playerRight.png'
const player = new Player({
    image: playerImageDown,
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    frames: {
        max: 4
    },
    sprites: {
        up: playerImageUp,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight,
    }
})


const foregroundImage = new Image()
foregroundImage.src = 'image/foreground.png'
const foreground = new Sprite({
    image: foregroundImage,
    position: {
        x: OFFSET.x,
        y: OFFSET.y
    }
})

//Pokemon--------------------------------------------------------------------

const draggleImage = new Image()
draggleImage.src = 'image/draggleSprite.png'
const draggle = new Pokemon({
    image: draggleImage,
    frames: {
        max: 4
    }
})

const embyImage = new Image()
embyImage.src = 'image/embySprite.png'
const emby = new Pokemon({
    image: embyImage,
    frames: {
        max: 4
    }
})

//---------------------------------------------------------------------------

const attackButtonImage = new Image()
attackButtonImage.src = 'image/button/attackButton.png'
const attackButton = new Button({
    image: attackButtonImage,
    position: {
        x: 0,
        y: canvas.height - attackButtonImage.height * 4
    }
})
const skillButtonImage = new Image()
skillButtonImage.src = 'image/button/skillButton.png'
const skillButton = new Button({
    image: skillButtonImage,
    position: {
        x: skillButtonImage.width * 4,
        y: canvas.height - skillButtonImage.height * 4
    }
})
const itemButtonImage = new Image()
itemButtonImage.src = 'image/button/itemButton.png'
const itemButton = new Button({
    image: itemButtonImage,
    position: {
        x: itemButtonImage.width * 4 * 2,
        y: canvas.height - itemButtonImage.height * 4
    }
})
const runButtonImage = new Image()
runButtonImage.src = 'image/button/runButton.png'
const runButton = new Button({
    image: runButtonImage,
    position: {
        x: runButtonImage.width * 4 * 3,
        y: canvas.height - runButtonImage.height * 4
    }
})

//System-Element-------------------------------------------------------------
const position = {
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

let battle = false

const battleButton = [attackButton, skillButton, itemButton, runButton]

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
                        x: j * className.width + OFFSET.x,
                        y: i * className.height + OFFSET.y
                    }
                }))
            }
        })
    })
    return arrayReturn
}