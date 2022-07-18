if (localStorage.length !== 0) {
    document.querySelector('#continueGameBtn').style.display = 'block'
}

animateStart()

function animateStart() {
    startScene.draw()
    c.imageSmoothingEnabled = false
    c.drawImage(title, 512 - title.width, 20, title.width * 2, title.height * 2)
    animationStartId = requestAnimationFrame(animateStart)
}

function startGame() {
    gsap.to('#overlap', {
        opacity: 1,
        onComplete() {
            cancelAnimationFrame(animationStartId)
            document.querySelector('#startScreen').style.display = 'none'
            if (localStorage.length === 0) {
                document.querySelector('#dialogueBox').style.display = 'block'
            }
            gsap.to('#overlap', {
                opacity: 0
            })
            initMap()
            animate()
        }
    })
}

let emby = new Mob({...monsterList.Emby, lv: 3})
let draggle = new Mob({...monsterList.Draggle, lv: 2})


if (localStorage.length === 0) {
    playerBag.add({
        name: emby.name,
        lv: emby.lv,
        hp: emby.maxHP,
        maxHP: emby.maxHP,
        exp: 0,
        maxEXP: emby.maxEXP,
        atk: emby.atk,
        def: emby.def
    }, 'monster')
    playerBag.add({
        name: draggle.name,
        lv: draggle.lv,
        hp: draggle.maxHP,
        maxHP: draggle.maxHP,
        exp: 0,
        maxEXP: draggle.maxEXP,
        atk: draggle.atk,
        def: draggle.def
    }, 'monster')
} else {
    playerBag.monster = JSON.parse(localStorage.getItem('playerMonsterList'))
}


function saveGame() {
    localStorage.setItem('playerMonsterList', JSON.stringify(playerBag.monster))
    console.log(JSON.parse(localStorage.getItem('playerMonsterList')))
}

function startNewGame() {
    localStorage.clear()
    gsap.to('#overlap', {
        opacity: 1,
        onComplete() {
            cancelAnimationFrame(animationStartId)
            document.querySelector('#startScreen').style.display = 'none'
            if (localStorage.length === 0) {
                document.querySelector('#dialogueBox').style.display = 'block'
            }
            gsap.to('#overlap', {
                opacity: 0
            })
            initMap()
            animate()
        }
    })
}

function about() {
    // document.querySelector('#about').style.zIndex = '1'
    document.querySelector('#about').style.display = 'flex'
}

function closeAbout() {
    // document.querySelector('#about').style.zIndex = '-1'
    document.querySelector('#about').style.display = 'none'
}

function backToMainMenu() {
    gsap.to('#overlap', {
        opacity: 1,
        onComplete() {
            document.querySelector('#menu').style.display = 'none'
            cancelAnimationFrame(animationId)
            document.querySelector('#startScreen').style.display = 'flex'
            if (localStorage.length === 0) {
                document.querySelector('#dialogueBox').style.display = 'none'
            }
            gsap.to('#overlap', {
                opacity: 0
            })
            animateStart()
        }
    })
}

function closeBag() {
    document.querySelector('canvas').style.zIndex = '0'
    window.cancelAnimationFrame(animationBag)
    document.querySelector('#bag').style.display = 'none'
    animate()
}

function openBag() {
    document.querySelector('canvas').style.zIndex = '10'
    window.cancelAnimationFrame(animationId)
    initBag()
    animateBag()
    document.querySelector('#bag').style.display = 'flex'

}

let mob = new Mob({...monsterList[playerBag.monster[0].name], position: bagPosition})

function initBag() {
    document.querySelector('#monsterList').replaceChildren()
    playerBag.monster.forEach(monster => {
        let button = document.createElement('button')
        button.innerHTML = monster.name
        document.querySelector('#monsterList').append(button)
    })
    document.querySelector('#monsterName').innerHTML = 'Lv.' + playerBag.monster[playerBag.combatIndex].lv + ' ' + playerBag.monster[playerBag.combatIndex].name
    document.querySelector('#monsterInfor').innerHTML = `<p>HP: ${playerBag.monster[playerBag.combatIndex].hp} / ${playerBag.monster[playerBag.combatIndex].maxHP}</p>`
        + `<p>EXP: ${playerBag.monster[playerBag.combatIndex].exp} / ${playerBag.monster[playerBag.combatIndex].maxEXP}</p>`
        + `<p>ATK: ${playerBag.monster[playerBag.combatIndex].atk}</p> <p>DEF: ${playerBag.monster[playerBag.combatIndex].def}</p>`
        + attacksToString(playerBag.monster[playerBag.combatIndex].name)
    document.querySelectorAll('#monsterList > button').forEach((button, i) => {
        i === playerBag.combatIndex ? button.style.color = 'green' : button.style.color = 'black'
        button.addEventListener('mouseenter', e => {
            mob = new Mob({...monsterList[playerBag.monster[i].name], position: bagPosition})
            document.querySelector('#monsterName').innerHTML = 'Lv.' + playerBag.monster[i].lv + ' ' + playerBag.monster[i].name
            document.querySelector('#monsterInfor').innerHTML = `<p>HP: ${playerBag.monster[i].hp} / ${playerBag.monster[i].maxHP}</p>`
                + `<p>EXP: ${playerBag.monster[i].exp} / ${playerBag.monster[i].maxEXP}</p>`
                + `<p>ATK: ${playerBag.monster[i].atk}</p> <p>DEF: ${playerBag.monster[i].def}</p>`
                + attacksToString(playerBag.monster[i].name)
        })
        button.addEventListener('mouseout', e => {
            mob = new Mob({...monsterList[playerBag.monster[playerBag.combatIndex].name], position: bagPosition})
            document.querySelector('#monsterName').innerHTML = 'Lv.' + playerBag.monster[playerBag.combatIndex].lv + ' ' + playerBag.monster[playerBag.combatIndex].name
            document.querySelector('#monsterInfor').innerHTML = `<p>HP: ${playerBag.monster[playerBag.combatIndex].hp} / ${playerBag.monster[playerBag.combatIndex].maxHP}</p>`
                + `<p>EXP: ${playerBag.monster[playerBag.combatIndex].exp} / ${playerBag.monster[playerBag.combatIndex].maxEXP}</p>`
                + `<p>ATK: ${playerBag.monster[playerBag.combatIndex].atk}</p> <p>DEF: ${playerBag.monster[playerBag.combatIndex].def}</p>`
                + attacksToString(playerBag.monster[playerBag.combatIndex].name)
        })
        button.addEventListener('click', e => {
            playerBag.setCombatIndex(i)
            document.querySelectorAll('#monsterList > button').forEach((button, i) => {
                i === playerBag.combatIndex ? button.style.color = 'green' : button.style.color = 'black'
            })
        })

    })
}

function attacksToString(name) {
    let attacks = ''
    monsterList[name].attacks.forEach(attack => {
        attacks += attack.name + ', '
    })
    return attacks
}

function animateBag() {
    c.fillStyle = 'white'
    c.fillRect(100, 100, 100, 100)
    c.lineWidth = 3
    c.strokeRect(100, 100, 100, 100)
    mob.draw()

    animationBag = requestAnimationFrame(animateBag)
}