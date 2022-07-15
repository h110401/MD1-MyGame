const audio = {
    map: new Howl({
        src: './audio/map.wav',
        html5: true,
        volume: 0.5
    }),
    initBattle: new Howl({
        src: '/audio/initBattle.wav',
        html5: true,
        volume: 0.1
    }),
    battle: new Howl({
        src: '/audio/battle.mp3',
        html5: true,
        volume: 0.5
    })
}
