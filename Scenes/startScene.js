animateStart()

function animateStart() {

    startScene.draw()
    c.imageSmoothingEnabled = false
    c.drawImage(title, 512 - title.width, 40, title.width * 2, title.height * 2)
    animationStartId = requestAnimationFrame(animateStart)
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

let emby = new Mob({...monsterList.Emby, lv: 3})

player.monsterList.push({
    name: emby.name,
    lv: emby.lv,
    hp: emby.maxHP,
    exp: 0,
})


console.log(player.monsterList)