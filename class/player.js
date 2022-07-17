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
        this.monsterList = []
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
