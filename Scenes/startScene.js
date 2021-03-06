initMainMenu()
animateStart()

function initMainMenu() {
    if (localStorage.length === 0) {

        bag.addMonster('Emby', 3)

        bag.addMonster('Draggle', 4)

    } else {
        document.querySelector('#continueGameBtn').style.display = 'block'
        bag.monster = JSON.parse(localStorage.getItem('playerMonsterList'))

    }
}

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
            cancelAnimationFrame(animationId)
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

function saveGame() {
    localStorage.setItem('playerMonsterList', JSON.stringify(bag.monster))
    localStorage.setItem('playerPosition', JSON.stringify(background.position))
}

function startNewGame() {
    if (localStorage.length !== 0) {
        localStorage.clear()
        window.location.reload()
    }
    gsap.to('#overlap', {
        opacity: 1,
        onComplete() {
            cancelAnimationFrame(animationId)
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
    document.querySelector('#about').style.display = 'flex'
}

function closeAbout() {
    document.querySelector('#about').style.display = 'none'
}

function backToMainMenu() {
    gsap.to('#overlap', {
        opacity: 1,
        onComplete() {
            document.querySelector('#menu').style.display = 'none'
            cancelAnimationFrame(animationId)
            cancelAnimationFrame(animationStartId)
            document.querySelector('#startScreen').style.display = 'flex'
            if (localStorage.length === 0) {
                document.querySelector('#dialogueBox').style.display = 'none'
            }
            gsap.to('#overlap', {
                opacity: 0
            })
            initMainMenu()
            animateStart()
        }
    })
}


function closeBag() {
    bag.close()
}

function openBag() {
    bag.open()
}


let mob = new Mob({...monsterList[bag.monster[bag.combatIndex].name], position: bag.position})

function animateBag() {

    bag.draw()
    mob.draw()

    animationBag = requestAnimationFrame(animateBag)

}


