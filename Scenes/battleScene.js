//Battle Scene -------------------------------------------------

const renderedSprites = [draggle, emby]
animateBattle()
function animateBattle() {
    let animationBattleId = requestAnimationFrame(animateBattle)


    c.drawImage(battleBackgroundImage, 0, 0)

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })


    if (!battle) {
        window.cancelAnimationFrame(animationBattleId)
        animate()
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', e => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        console.log()
        e.currentTarget.blur()
        emby.attack({
            attack: selectedAttack,
            target: draggle
        })
    })

})