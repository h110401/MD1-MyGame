animateStart()

function animateStart() {

    startScene.draw()
    c.imageSmoothingEnabled = false
    c.drawImage(title, 512 - title.width, 40, title.width * 2, title.height * 2)
    setTimeout(() => {
        animationStartId = requestAnimationFrame(animateStart)
    }, 1000 / FPS)
}

function startGame() {
    gsap.to('#overlap', {
        opacity: 1,
        onComplete() {
            cancelAnimationFrame(animationStartId)
            document.querySelector('#startScreen').style.display = 'none'
            document.querySelector('#dialogueBox').style.display = 'block'
            gsap.to('#overlap', {
                opacity: 0
            })
            animate()
        }
    })
}


player.monsterList.push({
    name: 'Emby',
    lv: 1,
    exp: 0,
    hp: monster.Emby.maxHP
})

player.monsterList.push({
    name: 'Draggle',
    lv: 1,
    exp: 0,
    hp: monster.Draggle.maxHP
})