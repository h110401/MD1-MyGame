class Sprite {
    constructor({image, position}) {
        this.image = image
        this.position = position
    }

    draw() {
        c.imageSmoothingEnabled = false;
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * 4,
            this.image.height * 4,
        )
    }
}

class Pokemon {
    constructor({image, frames = {max: 1}}) {
        this.image = image
        this.frames = {...frames, index: 0, timePerFrame: 10}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw(x,y) {
        c.drawImage(
            this.image,
            this.frames.index * this.width,
            0,
            this.width,
            this.height,
            x,
            y,
            this.width,
            this.height,
        )

        this.frames.timePerFrame++

        if (this.frames.timePerFrame % 10 === 0) {
            if (this.frames.index < this.frames.max - 1) {
                this.frames.index++
            } else {
                this.frames.index = 0
            }
            this.frames.timePerFrame = 0
        }
    }
}

class Player extends Sprite {

    constructor({image, position, frames = {max: 1}, sprites, velocity = {x: 0, y: 0}}) {
        super({image, position})
        this.frames = {...frames, index: 0, timePerFrame: 10}
        this.sprites = sprites
        this.velocity = velocity

        this.moving = false
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.index * this.width,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
        if (!this.moving) {
            this.frames.index = 0
            return
        }
        if (this.frames.max > 1) this.frames.timePerFrame++

        if (this.frames.timePerFrame % 10 === 0) {
            if (this.frames.index < this.frames.max - 1) {
                this.frames.index++
            } else {
                this.frames.index = 0
            }
            this.frames.timePerFrame = 0
        }
    }

    update() {

        this.moving = false

        if (keys.w) {
            this.image = this.sprites.up
            this.moving = true
            this.velocity.y = 3
        } else if (keys.s) {
            this.image = this.sprites.down
            this.moving = true
            this.velocity.y = -3
        } else if (keys.a) {
            this.image = this.sprites.left
            this.moving = true
            this.velocity.x = 3
        } else if (keys.d) {
            this.image = this.sprites.right
            this.moving = true
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
