//Battle Scene -------------------------------------------------

let animationId

let animationBattleId
let renderedSprites
let queue
let playerMonster
let enemyMonster


function initBattle(playerMob, enemyMob) {
//-----------------------------------Reset to new Battle--------------------------------//

    playerMonster = new Monster(monster[playerMob])
    playerMonster.position = {...battlePosition.player}
    enemyMonster = new Monster(monster[enemyMob])
    enemyMonster.position = {...battlePosition.enemy}
    enemyMonster.isEnemy = true
    enemyMonster.flip = true

    document.querySelector('#playerMonsterName').innerHTML = playerMonster.name
    document.querySelector('#enemyMonsterName').innerHTML = enemyMonster.name

    document.querySelector('#userInterface').display = 'block'
    document.querySelector('#dialogueBox').display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attackBox').replaceChildren()


    renderedSprites = [enemyMonster, playerMonster]

    queue = []

//-----------------------------------Reset to new Battle--------------------------------//


//-----------------------------------Draw Attack Buttons--------------------------------//
    playerMonster.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attackBox').append(button)
    })
//-----------------------------------Draw Attack Buttons--------------------------------//


    //-------------------------------Button Click Event-----------------------------//
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', e => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            e.currentTarget.blur()
            //Player Attack----------------------------------------------
            playerMonster.attack({
                attack: selectedAttack,
                target: enemyMonster
            })

            if (enemyMonster.health <= 0) {
                queue.push(() => {
                    enemyMonster.faint()
                })
                queue.push(() => {
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

            //Enemy Attack-------------------------------------------------

            const randomAttack = enemyMonster.attacks[Math.floor(Math.random() * enemyMonster.attacks.length)]

            queue.push(() => {
                enemyMonster.attack({
                    attack: randomAttack,
                    target: playerMonster
                })
            })

            if (playerMonster.health <= 0) {
                queue.push(() => {
                    playerMonster.faint()
                })
                queue.push(() => {
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
    console.log(enemyMonster.position.y, battlePosition.enemy.y)
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
