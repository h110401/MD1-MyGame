const monsterList = {
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
        attacks: [attacks.Tackle, attacks.FireBall],
        lv: 1,
        maxHP: 100,
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
        attacks: [attacks.Tackle],
        maxHP: 150,
    }
}