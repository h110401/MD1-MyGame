eventListener()

//--------------------------------------------------------------

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
        ) {
            if (playerBag.monster[playerBag.combatIndex].hp === 0) {
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
                                initBattle(playerBag.monster[0].name, randomEnemy())
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

function eventListener() {

    let played = false

    window.addEventListener('keydown', e => {
        if (!played) {
            played = true
            audio.map.play()
        }
        switch (e.key) {
            case 'Tab':
                e.preventDefault()
                break
            case 'w':
                keys.w = true
                break
            case 's':
                keys.s = true
                break
            case 'a':
                keys.a = true
                break
            case 'd':
                keys.d = true
                break
        }
    })

    window.addEventListener('keyup', e => {
        switch (e.key) {
            case 'w':
                keys.w = false
                break
            case 's':
                keys.s = false
                break
            case 'a':
                keys.a = false
                break
            case 'd':
                keys.d = false
                break
        }
    })

    window.addEventListener('click', () => {
        if (!played) {
            played = true
            audio.map.play()
        }
    })
}

function randomEnemy() {
    return Math.floor(Math.random() * 2) == 0 ? 'Emby' : 'Draggle'
}

function initMap() {
    document.querySelector('#menu').style.display = 'block'
}

