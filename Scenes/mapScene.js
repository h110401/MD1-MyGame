eventListener()

// animate()

//--------------------------------------------------------------

function animate() {
    let animationId = requestAnimationFrame(animate)

    background.draw()

    arrayToRenderer(boundaries)

    arrayToRenderer(battleZones)

    player.draw()

    foreground.draw()


    player.update()

    activeBattle()

    if (battle) {
        window.cancelAnimationFrame(animationId)
    }
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

function activeBattle() {
    battleZones.forEach(zone => {
        if (checkCollision(zone)
            && player.position.x > zone.position.x
            && player.position.x + player.width < zone.position.x + zone.width + 3
            && player.position.y + player.height > zone.position.y
            && player.position.y + player.height < zone.position.y + zone.height + 3
        ) {
            if (player.animate && Math.random() < 0.5) {
                battle = true
                gsap.to('#overlap', {
                    opacity: 1,
                    duration: 0.3,
                    repeat: 3,
                    yoyo: true,
                    onComplete() {
                        gsap.to('#overlap', {
                            opacity: 1,
                            onComplete() {
                                gsap.to('#overlap', {
                                    opacity: 0,
                                    delay: 0.4
                                })
                                animateBattle()
                            }
                        })
                    }
                })
            }
        }
    })
}



function eventListener() {
    window.addEventListener('keydown', e => {
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


    window.addEventListener('mousemove', e => {
        client.x = e.clientX - 10
        client.y = e.clientY - 10
    })
}

//Test------------------------------------------------------------

