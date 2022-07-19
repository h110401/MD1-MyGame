const boundaries = arrayMapToPosition(collisionMap, Boundary)

const battleZones = arrayMapToPosition(battleZoneMap, Boundary)


//Images---------------------------------------------------------------------

const background = new Sprite({
    image: newImage('image/background/background.png'),
    position: {
        x: offset.x,
        y: offset.y,
        scale: 1
    }
})


const foreground = new Sprite({
    image: newImage('image/background/foreground.png'),
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
    image: playerDownImage,
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: newImage('image/player/playerUp.png'),
        down: newImage('image/player/playerDown.png'),
        left: newImage('image/player/playerLeft.png'),
        right: newImage('image/player/playerRight.png'),
    }
})

const bag = new Bag()



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


const title = new Image()
title.src = 'image/Title.png'


const startScene = new Sprite({
    image: newImage('image/startScene.png'),
    position: {
        x: 0,
        y: -100,
        scale: 1.15
    },
    frames: {
        max: 2,
        hold: 40
    },
    animate: true
})

function newImage(src) {
    let img = new Image()
    img.src = src
    return img
}

