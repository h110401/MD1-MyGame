eventListener()
animate()
changeSceneCheck = false

function animate() {
    requestAnimationFrame(animate)

    // background.draw()
    //
    // arrayToRenderer(boundaries)
    //
    // arrayToRenderer(battleZones)
    //
    // player.draw()
    //
    // foreground.draw()
    //

    // if (battle) {
    // if (document.getElementById('cover').style.opacity == 1) {
    //     changeSceneCheck = true
    //     gsap.to('#cover', {duration: 0.5, opacity: 0})
    // }
    // if (changeSceneCheck) {
    displayBattleScene()

    // }
    //     return
    // }
    //
    // player.update()
    //
    // activeBattle()
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
            if (player.moving) { //& Math.random() < 0.1
                console.log('battle')
                battle = true
                gsap.to('#cover', {duration: 0.5, opacity: 1})
            }
        }
    })
}

function eventListener() {
    window.addEventListener('keydown', e => {
        switch (e.key) {
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
    window.addEventListener('click', e => {
        client.click = true
    })
}

//Test------------------------------------------------------------

function displayBattleScene() {

    c.drawImage(battleBackgroundImage, 0, 0)
    draggle.draw(position.enemy.x, position.enemy.y, position.enemy.scale)
    emby.draw(position.player.x, position.player.y, position.player.scale)

    battleButton.forEach((button,i) => {
        button.update()
    })
    client.click = false

}