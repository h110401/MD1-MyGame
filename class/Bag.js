class Bag {
    constructor() {
        this.monster = []
        this.item = []
        this.combatIndex = 0
    }

    add(something, type) {
        if (type === 'monster') {
            this.monster.push(something)
        } else if (type === 'item') {
            this.item.push(something)
        }
    }

    setCombatIndex(value){
        this.combatIndex = value
    }

}