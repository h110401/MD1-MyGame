class Mob extends Sprite {
    constructor({image, position, frames, animate, isEnemy = false, name, attacks}) {
        super({image, position, frames, animate});

        this.isEnemy = isEnemy

        this.name = name
        this.health = 100
        this.attacks = monster[this.name].attacks
    }

    attack({attack, target}) {

        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name

        const fireBallImage = new Image()
        fireBallImage.src = 'image/attack/fireBall.png'
        const fireBall = new Sprite({
            image: fireBallImage,
            position: {
                x: this.position.x + (this.isEnemy ? -50 : 50),
                y: this.position.y,
                scale: (this.isEnemy ? 1.2 : 1.5)
            },
            frames: {
                max: 4,
                hold: 4,
            },
            animate: true,
            rotation: this.isEnemy ? -1 : 1
        })

        target.health -= attack.damage

        let distance = this.isEnemy ? -20 : 20
        let healthBar = this.isEnemy ? '#playerHealthBar' : '#enemyHealthBar'

        const tl = gsap.timeline()

        switch (attack.name) {
            case 'Tackle':
                tl.to(this.position, {
                    x: this.position.x - distance,
                    duration: 0.4
                }).to(this.position, {
                    x: this.position.x + distance * 2,
                    duration: 0.1,
                    onComplete() {
                        gsap.to(target.position, {
                            x: target.position.x + distance,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1
                        })
                        gsap.to(target, {
                            duration: 0.1,
                            opacity: 0,
                            yoyo: true,
                            repeat: 5
                        })
                        gsap.to(healthBar, {
                            width: target.health + '%'
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                })
                break
            case 'FireBall':
                tl.to(this.position, {
                    x: this.position.x - distance,
                    duration: 0.4
                }).to(this.position, {
                    x: this.position.x + distance * 2,
                    duration: 0.1,
                    onComplete() {
                        renderedSprites.splice(1, 0, fireBall)
                        gsap.to(fireBall.position, {
                            x: target.position.x,
                            y: target.position.y,
                            duration: 0.5,
                            onComplete() {
                                renderedSprites.splice(1, 1)

                                gsap.to(target.position, {
                                    x: target.position.x + distance,
                                    duration: 0.2,
                                    yoyo: true,
                                    repeat: 1
                                })
                                gsap.to(target, {
                                    duration: 0.1,
                                    opacity: 0,
                                    yoyo: true,
                                    repeat: 5
                                })
                                gsap.to(healthBar, {
                                    width: target.health + '%'
                                })
                            }
                        })

                    }
                }).to(this.position, {
                    x: this.position.x,
                })
                break
        }
    }

    faint() {
        document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!'
        gsap.to(this, {
            opacity: 0
        })
        gsap.to(this.position, {
            y: this.position.y + 40
        })
        this.animate = false
    }
}