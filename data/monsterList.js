const monsterList = {
    Emby: {
        name: 'Emby',
        image: {
            src: 'image/monster/embySprite.png'
        },
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
            max: FRAME,
            hold: 20
        },
        attacks: [attacks.Tackle],
        maxHP: 150,
    }
}