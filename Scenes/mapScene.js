
//--------------------------------------------------------------

function initMap() {
    document.querySelector('#menu').style.display = 'block'
    document.querySelector('#userInterface').style.display = 'none'
    document.querySelector('#dialogueBox').style.display = 'none'
}

function animate() {

    countDown()

    background.draw()

    arrayToRenderer(boundaries)

    arrayToRenderer(battleZones)

    player.draw()

    foreground.draw()

    if (battle) {
        player.animate = false
        return
    }

    checkBattle()

    player.update()

    animationId = requestAnimationFrame(animate)

}


//Functions-----------------------------------------------------

function arrayToRenderer(array) {
    array.forEach(item => {
        item.draw();
    })
}

function checkCollision(item) {
    return item.position.x <= player.position.x + player.width * 0.85 &&
        item.position.x + item.width >= player.position.x + player.width * 0.15 &&
        item.position.y <= player.position.y + player.height &&
        item.position.y + item.width / 4 >= player.position.y
}

function checkBattle() {
    battleZones.forEach(zone => {
        if (checkCollision(zone)
            && player.position.x > zone.position.x
            && player.position.x + player.width < zone.position.x + zone.width + 3
            && player.position.y + player.height > zone.position.y
            && player.position.y + player.height < zone.position.y + zone.height + 3
            && document.querySelector('#overlap').style.opacity === '0'
        ) {
            if (bag.monster[bag.combatIndex].hp === 0) {
                document.querySelector('#dialogueBox').style.display = 'block'
                document.querySelector('#dialogueBox').innerHTML = "Your monster can't fight!"
                return
            }
            if (player.animate && Math.random() < 0.5) {

                battle = true
                audio.map.stop()
                audio.initBattle.play()
                audio.battle.play()
                gsap.to('#overlap', {
                    opacity: 1,
                    duration: 0.3,
                    repeat: 3,
                    yoyo: true,
                    onComplete() {
                        gsap.to('#overlap', {
                            opacity: 1,
                            onComplete() {
                                window.cancelAnimationFrame(animationId)
                                initBattle(bag.monster[bag.combatIndex].name, randomEnemy())
                                animateBattle()
                                gsap.to('#overlap', {
                                    opacity: 0,
                                    delay: 0.4
                                })

                            }
                        })
                    }
                })
            }
        }
    })
}


function randomEnemy() {
    return Math.floor(Math.random() * 2) === 0 ? 'Emby' : 'Draggle'
}