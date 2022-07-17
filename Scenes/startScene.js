if (localStorage.length !== 0) {
    document.querySelector('#continueGameBtn').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
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
            gsap.to('#overlap', {
                opacity: 0
            })
            initMap()
            animate()
        }
    })
}

let emby = new Mob({...monsterList.Emby, lv: 3})

if (localStorage.length === 0) {
    player.monsterList.push({
        name: emby.name,
        lv: emby.lv,
        hp: emby.maxHP,
        exp: 0,
    })
} else {
    player.monsterList = JSON.parse(localStorage.getItem('playerMonsterList'))
}


function saveGame() {
    localStorage.setItem('playerMonsterList', JSON.stringify(player.monsterList))
    console.log(JSON.parse(localStorage.getItem('playerMonsterList')))
}

function startNewGame() {
    localStorage.clear()
    initMap()
    animate()
}

function about() {
    // document.querySelector('#about').style.zIndex = '1'
    document.querySelector('#about').style.display = 'flex'
}

function closeAbout() {
    // document.querySelector('#about').style.zIndex = '-1'
    document.querySelector('#about').style.display = 'none'
}