class Bag {
    constructor() {
        this.monster = []
        this.item = []
        this.combatIndex = 0
        this.position = {
            x: 100,
            y: 100,
            scale: 1.5
        }

    }

    addMonster(name, lv) {
        let mob = new Mob({...monsterList[name], lv})
        this.monster.push({
            name: mob.name,
            lv: mob.lv,
            hp: mob.maxHP,
            maxHP: mob.maxHP,
            exp: 0,
            maxEXP: mob.maxEXP,
            atk: mob.atk,
            def: mob.def
        })
    }

    addItem(item) {
        this.item.push(item)
    }

    setCombatIndex(value) {
        this.combatIndex = value
    }

    draw() {

        c.fillStyle = '#ffffff'
        c.roundRect(95,95,110,110, 20).fill()
        c.strokeStyle = '#2f454f'
        c.lineWidth = 4
        c.roundRect(95,95,110,110, 20).stroke()

    }

    close() {
        window.cancelAnimationFrame(animationBag)
        document.querySelector('#bag').style.display = 'none'
        animate()
    }

    open() {
        window.cancelAnimationFrame(animationId)
        this.init()
        animateBag()
        document.querySelector('#bag').style.display = 'flex'
    }

    init() {
        let monsterL = document.querySelector('#monsterList')
        let monsterName = document.querySelector('#monsterName')
        let monsterInfor = document.querySelector('#monsterInfor')

        monsterL.replaceChildren()

        this.monster.forEach(monster => {
            let button = document.createElement('button')
            button.innerHTML = monster.name
            monsterL.append(button)
        })
        monsterName.innerHTML = 'Lv.' + this.monster[this.combatIndex].lv + ' ' + this.monster[this.combatIndex].name

        monsterInfor.innerHTML = `<p>HP: ${this.monster[this.combatIndex].hp} / ${this.monster[this.combatIndex].maxHP}</p>`
            + `<p>EXP: ${this.monster[this.combatIndex].exp} / ${this.monster[this.combatIndex].maxEXP}</p>`
            + `<p>ATK: ${this.monster[this.combatIndex].atk}</p> <p>DEF: ${this.monster[this.combatIndex].def}</p>`
            + this.attacksToString(this.monster[this.combatIndex].name)

        document.querySelectorAll('#monsterList > button').forEach((button, i) => {
            i === this.combatIndex ? button.style.color = 'green' : button.style.color = 'darkslategray'
            button.addEventListener('mouseenter', e => {
                mob = new Mob({...monsterList[this.monster[i].name], position: this.position})
                monsterName.innerHTML = 'Lv.' + this.monster[i].lv + ' ' + this.monster[i].name
                monsterInfor.innerHTML = `<p>HP: ${this.monster[i].hp} / ${this.monster[i].maxHP}</p>`
                    + `<p>EXP: ${this.monster[i].exp} / ${this.monster[i].maxEXP}</p>`
                    + `<p>ATK: ${this.monster[i].atk}</p> <p>DEF: ${this.monster[i].def}</p>`
                    + this.attacksToString(this.monster[i].name)
            })
            button.addEventListener('mouseout', e => {
                mob = new Mob({...monsterList[this.monster[this.combatIndex].name], position: this.position})
                monsterName.innerHTML = 'Lv.' + this.monster[this.combatIndex].lv + ' ' + this.monster[this.combatIndex].name
                monsterInfor.innerHTML = `<p>HP: ${this.monster[this.combatIndex].hp} / ${this.monster[this.combatIndex].maxHP}</p>`
                    + `<p>EXP: ${this.monster[this.combatIndex].exp} / ${this.monster[this.combatIndex].maxEXP}</p>`
                    + `<p>ATK: ${this.monster[this.combatIndex].atk}</p> <p>DEF: ${this.monster[this.combatIndex].def}</p>`
                    + this.attacksToString(this.monster[this.combatIndex].name)
            })
            button.addEventListener('click', e => {
                e.currentTarget.blur()
                this.setCombatIndex(i)
                document.querySelectorAll('#monsterList > button').forEach((button, i) => {
                    i === this.combatIndex ? button.style.color = 'green' : button.style.color = 'darkslategray'
                })
            })

        })
    }

    attacksToString(name) {
        let attacks = ''
        monsterList[name].attacks.forEach(attack => {
            attacks += attack.name + ', '
        })
        return attacks
    }
}
