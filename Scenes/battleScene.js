//Battle Scene -------------------------------------------------

let animationId

let animationBattleId
let renderedSprites
let queue
let emby
let draggle

function initBattle() {
//-----------------------------------Reset to new Battle--------------------------------//

    document.querySelector('#userInterface').display = 'block'
    document.querySelector('#dialogueBox').display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attackBox').replaceChildren()

    emby = new Mob(monster.Emby)
    draggle = new Mob(monster.Draggle)
    renderedSprites = [draggle, emby]
    queue = []

//-----------------------------------Reset to new Battle--------------------------------//


//-----------------------------------Draw Attack Buttons--------------------------------//
    emby.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attackBox').append(button)
    })
//-----------------------------------Draw Attack Buttons--------------------------------//


    //-------------------------------Button Click Event-----------------------------//
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', e => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            console.log()
            e.currentTarget.blur()
            emby.attack({
                attack: selectedAttack,
                target: draggle
            })

            if (draggle.health <= 0) {
                queue.push(() => {
                    draggle.faint()
                })
                queue.push(() => {
                    draggle.animate = false
                    gsap.to('#overlap', {
                        opacity: 1,
                        onComplete() {
                            window.cancelAnimationFrame(animationBattleId)
                            battle = false
                            audio.battle.stop()
                            audio.map.play()
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlap', {
                                opacity: 0,
                                delay: 0.4
                            })
                        }
                    })
                })

                return
            }

            const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

            queue.push(() => {
                draggle.attack({
                    attack: randomAttack,
                    target: emby
                })
            })

            if (emby.health <= 0) {
                queue.push(() => {
                    emby.faint()
                })
                queue.push(() => {
                    draggle.animate = false
                    gsap.to('#overlap', {
                        opacity: 1,
                        onComplete() {
                            window.cancelAnimationFrame(animationBattleId)
                            battle = false
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlap', {
                                opacity: 0,
                                delay: 0.4
                            })
                        }
                    })
                })
            }
        })
        //-------------------------------Button Click Event-----------------------------//


        //-------------------------------MouserEnter-Display-Attack-Type-----------------------------//


        button.addEventListener('mouseenter', e => {
            let selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attackTypeBox').innerHTML = selectedAttack.type
            document.querySelector('#attackTypeBox').style.color = selectedAttack.color

        })
        button.addEventListener('mouseout', e => {
            document.querySelector('#attackTypeBox').innerHTML = 'Attack Type'
            document.querySelector('#attackTypeBox').style.color = 'black'
        })

        //-------------------------------MouserEnter-Display-Attack-Type-----------------------------//

    })
}


function animateBattle() {

    animationBattleId = requestAnimationFrame(animateBattle)

    c.drawImage(battleBackgroundImage, 0, 0)

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })

}

// Perform Attack ----------------------------------------------------------------------------


document.querySelector('#dialogueBox').addEventListener('click', e => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})

// Perform Attack Scene ----------------------------------------------------------------------------
