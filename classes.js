class Sprite {
    constructor({
                    image,
                    position = {x: 0, y: 0, scale: 1},
                    frames = {max: 1, hold: 10},
                    animate = false
                }) {
        this.image = image
        this.position = position
        this.frames = {...frames, index: 0, timePerFrame: 0}
        this.animate = animate
        this.opacity = 1
        this.image.onload = () => {
            this.width = this.image.width * 4 * this.position.scale / this.frames.max
            this.height = this.image.height * 4 * this.position.scale
        }
    }

    draw() {
        c.save()
        c.imageSmoothingEnabled = false
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.index * this.image.width / this.frames.max,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        c.restore()

        if (!this.animate) {
            this.frames.index = 0
            return
        }

        if (this.frames.timePerFrame % this.frames.hold === 0) {
            if (this.frames.index < this.frames.max - 1) {
                this.frames.index++
            } else {
                this.frames.index = 0
            }
            this.frames.timePerFrame = 0
        }
        this.frames.timePerFrame++
    }
}

class Player extends Sprite {

    constructor({
                    image,
                    position = {x: 0, y: 0},
                    frames = {max: 1},
                    animate = false,
                    sprites
                }) {
        super({image, position, frames, animate})
        this.sprites = sprites
        this.velocity = {x: 0, y: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    update() {

        this.animate = false

        if (keys.w) {
            this.image = this.sprites.up
            this.animate = true
            this.velocity.y = 3
        } else if (keys.s) {
            this.image = this.sprites.down
            this.animate = true
            this.velocity.y = -3
        } else if (keys.a) {
            this.image = this.sprites.left
            this.animate = true
            this.velocity.x = 3
        } else if (keys.d) {
            this.image = this.sprites.right
            this.animate = true
            this.velocity.x = -3
        }

        boundaries.forEach(boundary => {
            if (this.playerCheckCollision(boundary)) {
                this.velocity.x = 0
                this.velocity.y = 0
            }
        })

        moveables.forEach(moveable => {
            moveable.position.x += this.velocity.x;
            moveable.position.y += this.velocity.y;
        })

        this.velocity.x = 0
        this.velocity.y = 0

    }

    playerCheckCollision(item) {
        return item.position.x + this.velocity.x <= this.position.x + this.width * 0.85 &&
            item.position.x + item.width + this.velocity.x >= this.position.x + this.width * 0.15 &&
            item.position.y + this.velocity.y <= this.position.y + this.height &&
            item.position.y + item.width * 0.25 + this.velocity.y >= this.position.y
    }

}

class Mob extends Sprite {
    constructor(image, position, frames, animate) {
        super(image, position, frames, animate);
    }

    attack({attack, target}) {
        const tl = gsap.timeline()
        tl.to(this.position, {
            x: this.position.x - 20,
            duration: 0.4
        }).to(this.position, {
            x: this.position.x + 40,
            duration: 0.1,
            onComplete() {
                gsap.to(target.position, {
                    x: target.position.x + 20,
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
            }
        }).to(this.position, {
            x: this.position.x
        })
    }
}

class Boundary {
    static width = 48
    static height = 48

    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgb(255,0,0,0.2)'
        c.fillRect(this.position.x, this.position.y, Boundary.height, Boundary.width)
    }
}
