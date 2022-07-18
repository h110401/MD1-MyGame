//Battle Scene -------------------------------------------------


function initBattle(playerName, enemyName) {
//-----------------------------------Reset to new Battle--------------------------------//

    document.querySelector('#menu').style.display = 'none'
    document.querySelector('#bag').style.display = 'none'

    playerMonster = new Mob({...monsterList[playerName], lv: playerBag.monster[playerBag.combatIndex].lv})
    playerMonster.hp = playerBag.monster[playerBag.combatIndex].hp
    playerMonster.position = {...battlePosition.player}

    enemyMonster = new Mob({...monsterList[enemyName], lv: Math.floor(Math.random() * 2 + 1)})
    enemyMonster.position = {...battlePosition.enemy}
    enemyMonster.isEnemy = true
    enemyMonster.flip = true

    document.querySelector('#playerMonsterName').innerHTML = playerMonster.name + ' Lv.' + playerMonster.lv
    document.querySelector('#enemyMonsterName').innerHTML = enemyMonster.name + ' Lv.' + enemyMonster.lv

    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = Math.floor((playerMonster.hp / playerMonster.maxHP) * 100) + '%'
    document.querySelector('#attackBox').replaceChildren()

    renderedSprites = [enemyMonster, playerMonster]

    queue = []

    playerMonster.statusUpdate()
    enemyMonster.statusUpdate()

//-----------------------------------Reset to new Battle--------------------------------//


//-----------------------------------Create Attack Buttons--------------------------------//
    playerMonster.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attackBox').append(button)
    })
//-----------------------------------Create Attack Buttons--------------------------------//


    //-------------------------------Button Click Event-----------------------------//
    document.querySelectorAll('#attackBox > button').forEach(button => {
        button.addEventListener('click', e => {
            if (timer > 0) return
            isClicked = true
            timer = delay
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            e.currentTarget.blur()
            //Player Attack----------------------------------------------
            playerMonster.attack({
                attack: selectedAttack,
                target: enemyMonster
            })

            if (enemyMonster.hp <= 0) {
                queue.push(() => {
                    playerBag.monster[playerBag.combatIndex].hp = playerMonster.hp
                    playerBag.monster[playerBag.combatIndex].exp += 10
                    playerBag.monster.forEach(monster => {
                        if (monster.name !== playerName) monster.exp += 2
                    })
                    playerBag.monster.forEach(monster => {
                        if (monster.exp >= monster.maxEXP) {
                            monster.lv++
                            monster.exp -= playerMonster.maxEXP
                            let monsterr = new Mob({...monsterList[playerName], lv: monster.lv})
                            monster.hp = monsterr.maxHP
                            monster.maxHP = monsterr.maxHP
                            monster.atk = monsterr.atk
                            monster.def = monsterr.def
                        }
                    })

                    enemyMonster.faint()
                    audio.battle.stop()
                    audio.victory.play()
                })
                queue.push(() => {
                    gsap.to('#overlap', {
                        opacity: 1,
                        onComplete() {
                            window.cancelAnimationFrame(animationBattleId)
                            battle = false
                            audio.victory.stop()
                            audio.map.play()
                            initMap()
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            document.querySelector('#dialogueBox').style.display = 'none'
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
                if (playerMonster.hp <= 0) {
                    queue.push(() => {
                        playerBag.monster[playerBag.combatIndex].hp = 0
                        playerMonster.faint()
                    })
                    queue.push(() => {
                        gsap.to('#overlap', {
                            opacity: 1,
                            onComplete() {
                                window.cancelAnimationFrame(animationBattleId)
                                audio.battle.stop()
                                audio.map.play()
                                document.querySelector('#userInterface').style.display = 'none'
                                document.querySelector('#dialogueBox').style.display = 'none'
                                gsap.to('#overlap', {
                                    opacity: 0,
                                    delay: 0.3,
                                    onComplete() {
                                        battle = false
                                        initMap()
                                        animate()
                                    }
                                })
                            }
                        })
                    })
                }
            })
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


    countDown()

    c.drawImage(battleBackgroundImage, 0, 0)

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })

    animationBattleId = requestAnimationFrame(animateBattle)
}

// Perform Attack ----------------------------------------------------------------------------

