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

const monster = {
    Emby: {
        image: {
            src: 'image/mob/embySprite.png'
        },
        position: battlePosition.player,
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.FireBall, attacks.WaterBall]
    },
    Draggle: {
        image: {
            src: 'image/mob/draggleSprite.png'
        },
        position: battlePosition.enemy,
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks: [attacks.Tackle, attacks.WaterBall]
    }
}