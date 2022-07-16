
const monster = {
    Emby: {
        name: 'Emby',
        image: {
            src: 'image/monster/embySprite.png'
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        attacks: [attacks.Tackle, attacks.FireBall]
    },
    Draggle: {
        name: 'Draggle',
        image: {
            src: 'image/monster/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        attacks: [attacks.Tackle]
    }
}